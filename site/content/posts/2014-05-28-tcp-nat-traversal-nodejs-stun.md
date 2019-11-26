---
title: How To TCP NAT Traversal using Node.js and a STUN Server
author: Shanti
date: 2014-05-28T07:57:00+00:00
image: /img/2016/04/2.Produits.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - développement
  - Nodejs

---
With the scarecity of IPv4 addresses, and IPv6 still not available at large, NAT traversal is becoming a necessity. Especially with the generalisation of Carrier-grade NATs that you can find on mobile connections. Even with IPv6 you may suffer NAT66. Imagine your mobile device that gets only a single Ipv6 address, and you want to share it on your computer.

The solution might be in a decentralized protocol for address attribution such as cjdns. In cjdns, addresses are private cryptographic keys. Anyone can generate his or her own address at will. This requires however a change in the routing protocols.

But let’s dive in the subject at hand. How to do NAT traversal. Let’s first refresh our memory about basic sockets.

## UDP Sockets

UDP is the most simple application protocol on top of the IP stack. It only add the notion of source port number and destination port number above IP. There is nothing that is preventing packet loss and if your payload is too large for the network MTU, it is silently dropped. Dumb simple, isn’t it ?

A UDP socket is a file descriptor that is bound locally on your computer to a local IP address (most probably the address of your computer in your local area network) and a local port. Any UDP packet that comes through this interface for the port you are listening on, will be put on that file descriptor. It might come from anywhere as there is no idea of a continuous connection between to computers in UDP

This is how UDP sockets are set up using unix system calls:

* `socket(AF_INET, SOCK_DGRAM, 0)`: create the file descriptor
* `bind(fd, addr, len)`: bind the socket to an address and port on your computer

And now, your socket is ready to receive and send messages. This is done with:

* `sendto(fd, payload, len, flags, dest_addr, addr_len)`: Send a packet to the specified address.
* `recvfrom(fd, payload, len, flags, src_addr, addr_len)`: Fetch the received packet along with the address it comes from.

## TCP Sockets

TCP sockets are a bit more complicated as they have the notion of a continued connection between two computers. They each have to keep track of the previous packets of that connection and assemble them into a stream, especially
  
considering that multiple connections are often running on the same port.

We thus have one file descriptor for each running connection. There is also a special _listening_ file descriptor that can be set up to accept packets that do not fit in any existing connection. This is used to set up new connections.

For UDP, incoming packets are sorted using the destination address and port number only. Using just this, the kernel knows in which file descriptor to put the packet. In TCP, the kernel has to also keep track of the source IP address and source port of the TCP packet in addition to the destination IP and port.

## Simple TCP connections

Let’s see the system calls required to create a simple TCP connecton:

* `socket(AF_INET, SOCK_STREAM, 0)`: creates the file descriptor
* `bind(fd, addr, len)`: bind the socket to an address and port on your computer. Optional in case of TCP (a source port will be chosen automatically at random)
* `connect(fd, addr, len)`: connect the socket to a destination IP and port.

As we can see, there is now a new system call, `connect`, that is used to tell the kernel the destination IP and port. Then data can be transmitted using:

* `send(fd, buffer, len, flags)`
* `recv(fd, buffer, len, flags)`

Note that contrary to UDP, the `send` and `recv` system calls don’t take an address as it has already been given during `connect`.

## Multiple sockets on the same port

What if you want to have multiple connections on the same port of your computer ? You’ll first have to add the option `SO_REUSEADDR` to the existing TCP sockets on the same port to tell them they are not exclusive. Then, any number of sockets can be bound on the same port. The system call is:

{{< highlight js >}}
int so_reuseaddr = TRUE;
setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &so_reuseaddr, sizeof so_reuseaddr);
{{< /highlight >}}

Also, to have multiple sockets, they must be bound on a specific local address, and not on the default address `0.0.0.0` (which will receive packets from any interface).

## The listening socket

Now, using TCP you can also set up the special _listening_ socket. This is how it is done:

* `socket(AF_INET, SOCK_STREAM, 0)`: creates the file descriptor
* `bind(fd, addr, len)`: bind the socket to an address and port on your computer. This is no longer optional as we do not create a connection.
* `listen(fd, backlog)`: mark the socket as the listening socketfor the local address and port. Any packet not fitting in an existing connection will be associated to this socket.

When you have a listening socket on your local address, you an no longer create connection sockets directly. You must wait for the other end to contact your listening socket that will then spawn file descriptors for each connection that is arriving. This is done using:

{{< highlight js >}}
accept(fd, src_addr, addr_len, flags)
{{< /highlight >}}

When a packet comes in and it is not put into any existing connection, the `accept` system call will create a new connection for that sender and return a connected socket as return value of `accept`. Then, `send` and `recv` can be used on that new socket.

## Network Address Translator

Now that we talked about sockets in general, let’s talk about the dreaded address translator. The address translator is a special gateway that will make an entire network look like only a single or a few hosts. Behind the translator, you have hosts that can only have a one way connection.

When a packet comes out of a computer of the translated network, the translator remembers where it comes from and where it goes, and then rewrites the source address and port of the packet before distribution on a larger network.

On the public network, it looks as if the translator itself sent the packet. And the reply is sent back at the translator address. There is no way for the receiver of the packet to know it doesn’t comes from the translator but a host behind it.

When the reply comes back to the translator, it remembers using the port number that it came from a specific host on its sub-network. It rewrites the destination port and address to make as if the packet was sent directly to the originating host, and send it on its private network.

Consequences:

* By relying on associating a private IP address with a port on the translator, it won’t work with protocols below TCP or UDP. new protocols over IP won’t be accessible to the private network.
* It doesn’t work if all the hosts of the private network make use of all of their 65536 ports. The translator just won’t have enough ports to keep track of all the connections.
* And of course, the hosts on the private network are not directly reachable.

## UDP Hole Punching

UDP hole punching is a simple algorithm to get through NATs. And this is where the STUN server might be of some help. The idea is as follows:

* Send the STUN server a UDP query
* The STUN server replies with your public IP address and port. Behind a NAT, this is the IP address of the NAT and the port the NAT has chosen to associate to your host in the private network.

In most configuration this is enough to get anyone else contacting you using UDP through the IP address and port you have been given. The NAT will probably forward them. it is not guaranteed though because when someone else than the STUN server tries to contact you, the source IP and port will be different, and the NAT might check them too.

For this reason, the STUN server can check if the NAT allows that by changing the source IP address or source port and see if you can still be reached.

You will also need to keep some traffic running on that port, else the NAT might stop the redirection, thinking your buisness is finished.

## The same on TCP, please

On TCP, the idea is quite the same with the additional difficulty that you must keep the connection open to the STUN server, and listen on the same port for incoming connections. As we saw, this is possible using `SO_REUSEADDR`. However, the connection to the STUN server must be initiated first before setting up the listening socket. This is how it works:

* Connect to the STUN server, and get your public IP and port
* Set up the listening socket on the same local port as you are contacting the STUN server
* Tell your peers that cou can be contacted through your public IP and port and hope the NAT will forward the requests to you.
* Never disconnect from the STUN server, else the NAT might close your redirection.

The success rate is somewhat lower with this method because NAT generally track more things about the TCP connections than UDP.

## Node.js implementation

You have to find a STUN server that talk TCP. There are not many out there. I could find ((stun.stunprotocol.org))[http://stunprotocol.org] that does it, but unfortunately, it closes the connection after the first exchange. I believe this is in contradiction with RFC 5389 §7.2.2:

```
At the server end, the server SHOULD keep the connection open, and let the client close it, unless the server has determined that the connection has timed out (for example, due to the client disconnecting from the network).  Bindings learned by the client will remain valid in intervening NATs only while the connection remains open.  Only the client knows how long it needs the binding.
```

Next, you have to find a Node.js implementation that speaks TCP. I hacked the existing vs-stun node module to use TCP instead of UDP. The code is available on [github mildred/vs-stun](https://github.com/mildred/vs-stun/). Because stun.stunprotocol.org closes the connection too early and vs-stun send multiple queries to determine the type of NAT (by changing the source port and source IP), it failed. So I simplified vs-stun using a short parameter. In this mode, it doesn’t check everything.

To this day, I haven’t got it to work. Mostly because I haven’t found a suitable STUN server. Otherwise, I think it would work.

I crafted a `PublicTCP` object:

{{< highlight js >}}
var shortenSTUN = true; // set to true if your STUN server disconnects too early
var localIP = '192.168.0.x'; // You can try 0.0.0.0

var net    = require('net');
var stun   = require('vs-stun');
var events = require('events');

var PublicTCP = function(cb){
  if(cb) this.on('refresh', cb);
}

PublicTCP.prototype = new events.EventEmitter;

PublicTCP.prototype.start = function(stunserver){ // example: stun.stunprotocol.org
  if(typeof stunserver === 'string') stunserver = {host: stunserver};
  stunserver.port = stunserver.port || 3478;

  var self = this;
  var sock = this.socket = net.connect({port: stunserver.port, host: stunserver.host, localAddress: localIP},
    function(){
      stun.resolve_tcp(sock, stunserver, function(err, value) {
        if (err) {
          console.log('Something went wrong: ' + err);
        } else {
          console.log("STUN Response:")
          console.log(value);
          self.emit('refresh', value);
        }
      }, {short: shortenSTUN});
    });
}

PublicTCP.prototype.close = function(){
  this.emit('close');
  this.socket.end();
}
{{< /highlight >}}

This `PublicIP` object will connect to a STUN server when issued `start(stunserver)` and will emit the `refresh` event with the STUN response to signal the listening socket can be started.

There are two quirks in that code:

* The first (`shortenSTUN`) that we already saw is used to avoid checking every detail of the NAT and only reply with the first answer. This doesn’t help however because the STUN connection is closed and the NAT is likely removing the binding from its translation table.
* Then, when using `net.connect` we specify `localAddress` to bind to the local address of the computer. If not specified it defults to `0.0.0.0` which binds to every interface. However binding the socket to every interface prevent creating the listening socket later on with the same port.

This is and example of how this prototype can be used:

{{< highlight js >}}
var tcp = new PublicTCP();
tcp.on('refresh', function(data){
  sock = net.createServer(function(c){});
  sock.listen(data.local.port, data.local.host);
  console.log("Local listening socket:");
  console.log(sock.address());
  setTimeout(function(){
    console.log("timeout");
    tcp.close(); 
  }, 5000);
  tcp.on('close', function(){
    sock.close();
  });
});
tcp.start("stun.stunprotocol.org");
{{< /highlight >}}

## Conclusion

If you want to use TCP, you’ll probably need to host your own server. Then you no longer need to keep to the STUN protocol. For this project I decided to come up with something similar to STUN in principle, without the diagnosis techniques, and using WebSockets. This will make it possible to add further functionnality in the protocol. Such as a virtual builtin-board so each client can access the address of other clients. Useful to get seeds in a P2P protocol.

If you want to host this kind of server in web providers, beware that they might themselves be hosting the servers behind a NAT. This kind of server must have a public IP to have access to the untranslated packet headers.

## References

* [Peer-to-Peer Communication Across Network Address Translators](http://www.brynosaurus.com/pub/net/p2pnat/)
* [RFC 5389](https://tools.ietf.org/html/rfc5389) [and the obsolete (RFC 3489](https://tools.ietf.org/html/rfc3489))
* [draft-ietf-behave-nat-behavior-discovery-02](http://wiki.tools.ietf.org/html/draft-ietf-behave-nat-behavior-discovery-02) that has some bits from RFC 3489 not included in RFC 5389.

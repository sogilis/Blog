---
title: The Future of the Web in Peer to Peer
author: Sogilis
date: 2014-09-05T12:26:00+00:00
featured_image: /wp-content/uploads/2016/04/2.Produits.jpg
pyre_show_first_featured_image:
  - no
pyre_portfolio_width_100:
  - default
pyre_image_rollover_icons:
  - default
pyre_post_links_target:
  - no
pyre_related_posts:
  - default
pyre_share_box:
  - default
pyre_post_pagination:
  - default
pyre_author_info:
  - default
pyre_post_meta:
  - default
pyre_post_comments:
  - default
pyre_slider_position:
  - default
pyre_slider_type:
  - no
pyre_avada_rev_styles:
  - default
pyre_display_header:
  - yes
pyre_header_100_width:
  - default
pyre_header_bg_full:
  - no
pyre_header_bg_repeat:
  - repeat
pyre_displayed_menu:
  - default
pyre_display_footer:
  - default
pyre_display_copyright:
  - default
pyre_footer_100_width:
  - default
pyre_sidebar_position:
  - default
pyre_page_bg_layout:
  - default
pyre_page_bg_full:
  - no
pyre_page_bg_repeat:
  - repeat
pyre_wide_page_bg_full:
  - no
pyre_wide_page_bg_repeat:
  - repeat
pyre_page_title:
  - default
pyre_page_title_text:
  - default
pyre_page_title_text_alignment:
  - default
pyre_page_title_100_width:
  - default
pyre_page_title_bar_bg_full:
  - default
pyre_page_title_bg_parallax:
  - default
pyre_page_title_breadcrumbs_search_bar:
  - default
fusion_builder_status:
  - inactive
avada_post_views_count:
  - 3034
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:0:"";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - développement
  - peertopeer

---
## A little bit of History

We got far away from the original ideas that founded the Internet. At first, it was a network of computers. Each computer on the network was given an IP address, and all computers were connected freely and were all equal in rights. Computers were not personal computers then. They were in places like universities and were online most of the time. They were always available for communication.

That was the good old time that I’m quite unfortunate not to have known.

Then, came the personal computer. it was powered up only when you needed and powered down when you finished what you had to do. To connect to the Internet, there was dial-up connections. Again, you connected when you needed to, and quickly disconnected. When connecting, you couldn’t place or receive phone calls, and the cost was proportional to your connected time.

Instead of communicating freely with the other computers at any time, personal computers were forced to communicate at very limited times. They most generally could not receive communications from other computers as they were so frequently away. They had to have buddies, on the other end of the phone cable, that were connected all the time and could receive communication for them.

Some were called the mail servers. They were in charge of receiving the mail for hundreds of other computers that could not receive it directly.

There were other servers as well, such as web servers. They hosted the web pages that the authors could not host directly for exactly the same reasons.

Then we got the DSL. bandwidth was much more important, and more importantly, computers could be connected all the time at their leisure. They could get back all the services they delegated to other computers. But they did not. Why?

* because personal computers became lazy. Why do something we can let another computer do instead of us?
* because they are still not powered on all the time and protocols were not designed for that
* because the bandwidth, while greater, might still not be enough
* and also because they soon were not able to talk to other computers freely. Something called NAT was invented, and computers were forced to talk through a device that censored what they said or what the other computer they wanted to talk to said. In particular:
  * the computers were then forced to talk either TCP or UDP, and no other language was accepted by the device
  * the personal computer could only ask a question and receive a response. The device censored any computer trying to contact the personal computer directly

The personal computer did not fight back. After all, this as all for very good reasons.

## Empowering the personal computer

It is time to restore the personal computer’s constitutional rights: “all computers are connected freely and are all equal in rights”. We can do that by finding ways for computers to communicate with each other that bypass the restrictions that might be imposed on personal computers. Personal computers will then have an equal position on the community than any other computer.

* It should be easy to maintain to counteract laziness
* It should continue to work in perfect condition even when one computer goes asleep (also known as powering it down)
* It shouldn’t consume too much bandwidth so it stays accessible to slow links
* It should use many tricks to bypass the nasty device called NAT

## Empowering the human society

As humans, we also need empowering. There are constant threats on our free speech, and many entities would like to censor us. There are also many threats on out privacy. CIA and great companies known a lot more than we want to think. They can track us on the Internet in real time, and they often do.

Internet is a tool that makes us grow, think, interact. It’s a new stage in History, just like the invention of writing, and the printing press. It is changing the face of the world, and destabilize the current world order. That’s why there are so many people that want to control it. And that’s also why we must keep it free.

What should we be able to do with the web?

* Be able to produce content without having to ask a third party (that could be pressured to censor what you want to say)
* Be able to view content produced by anyone.
* Be relatively anonymous (complete anonymity is quite impossible). Have no easy central place that can track what you are doing.

## Introducing BitWeb

There is already an interesting protocol out there that provides many of the things we need. It’s called BitTorrent. Can we use it to run the web?

* It can be installed as a software that is very easy to run on any computer
* It can bypass the nasty NAT device
* If a computer stops working, the content is always available in many other places
* It can share content at great speeds because content comes from many different places

That solves the personal computer problems. What about empowering us, humans ?

* anyone can publish content. Using trackerless (or DHT) torrents, it is not necessary to have an intermediate to share the content for us
* it is possible to download any content. None is in the power to decide that you cannot download a torrent. You always can, and if it’s illegal, you might be tracked for it (but that’s just normal police work, or it should)
* there is no central place when using trackerless torrents. None knows exactly what you did.

## How can we replace the web with it

The short answer is: no we can’t completely replace the web by that. We can only replace most of it. As it was designed, the web allowed applications to run on top of it. Those will have to stay with the old protocols. We can only replace websites and webpages.

### What is the difference between web applications and websites?

**Web Applications**: are applications that run on a server. If we remove the server, the application stops working. For example, this includes Google, GMail, the editor in Wikipedia, …

**Websites**: A website is a collection of pages, each containing some content that was put there by the author. This includes YouTube, News sites, Blogs, the public pages of Wikipedia, …

### But, in websites, not everything is static, and a server software is needed…

A server software is needed only because a software is needed to generate content, and the software that does that is generally made to work on a server, and nowhere else. It is completely possible to have software that generates a website that do not run on a server. These are generally called _HTML editors_ or _static website generators_. But it can be anything, really.

There is one exception to that: the user comments. When you read an article or view a video, you can generally add a comment. This is provided as a form of web application embedded within your web page. There are ways to do that that do not involve creating a different web application on each website. It can be integrated as part of the web directly.

### Ok, so how would you do that?

If you don’t know what is BitTorrent, I suggest you use it a little before continuing reading. If you can look at how it works (including how a Distributed Hash Table (DHT) works), it’s even better.

Let’s agree on one thing: a website is a collection of files that do not change in time, except when the website is updated by its author. It can contain dynamic content but only if the browser is equipped to generate it. It is generally provided by JavaScript.

So we can say that a website can be represented as a torrent. **We just need a way to update the files in a torrent.** The problem is that BitTorrent software is not generally equipped to view webpages, so **let’s have a BitTorrent client that can serve websites/torrents to web browsers.** We’ll just have to **find a way to add comments to webpages** then. We might also want to ensure that **until we decided so, no one knows what website we promote.**

#### Make torrents viewable in a web browser

That’s quite easy. Torrents can be identified by their _info hash_, wich is a 20 bytes binary string that can be encoded in human readable format. Giving them domain name would be possible with th current DNS system. Although centralized, in the event of censorship, we can always fall back to the cryptic identifier.

There is also alternatives to the DNS system such as namecoin or djdns. This article is not about them though.

Once identified, we need a software that can produce a webpage for an url like [http://9420241a7fbf98730abfbfe26a6289eeca732aa2.bitweb/page.html](http://9420241a7fbf98730abfbfe26a6289eeca732aa2.bitweb/page.html). It’s relatively easy to create a HTTP proxy software, or a HTTP server, that would return the content of the torrent.

#### Update files in a torrent

If you want to modify your website, just create a new torrent. You then need to link the new one to the old one. The problem is that once created, a torrent cannot be modified. You need a mechanism to tell everyone that a specific torrent has a new version. There are many ways to do that.

One includes using a protocol extension [DHT Store](http://www.rasterbar.com/products/libtorrent/dht_store.html) that is being created at the moment. You then have to use cryptography to ensure that only the author can update its torrent.

#### Find a way to add comments to a webpage

The comments problem can be generalized. Instead of adding a comment to a webpage, you have to think in terms of linking a resource (the content) to the web page. To display comments on the page, the page will just have to display linked content.

The major problem is that the comment links directly to the page it talks about, but the page is not directly linking the comments. This is the backlinks problem, or how to find the content that references us and we don’t make references to.

The solution can be found with the DHT as well. The distributed hash table can serve as a global registry of links, and backlinks could be found using a simple request. Or perhaps the peers that distribute the torrent/website to the other peers (the seeders) could be globally responsible to handle the backlink registry for that torrent/website.

The solution is not obvious, but it is not impossible either.

#### Make sure no one knows which page we are visiting

Unfortunately, this is impossible. Even the anonymity networks such as Tor or I2P can’t ensure that none will ever know. You have just good chances no one does.

What we can easily do is ensure there is no central point that knows what you are doing when you visit a website, and that there is no global registry where this information can be found.

* When you visit a website, you have do download it. Those you download from will know what you downloaded and there is no way around that apart from using anonymity networks.
* The software must not share the parts it downloaded until you decided you wanted to participate in distributing the website. This will add you in the global DHT registry and anyone knows that ou have this site, probably because you looked at it.

If you want increased anonymity, you’ll have to use the same strategy as the anonymity networks: ask a neighbor to ask a neighbor to download the piece for you.

## So, what do we get then

We get a protocol that:

* enables anyone to put a site online with no added costs
* is completely decentralized. No censorship is easily possible.
* has no central point to track what you are doing
* allow fast downloads by downloading from multiple peers at once
* allow some interactive behavior using JavaScript

This is being developped on [github](https://github.com/mildred/bitweb) but the main job for the moment is to agree on an extension for mutable torrents. This has to take place on the [BitTorrent mailing list](http://bittorrent.org/mailing_list.html) (which seems to have problems). It can also be discussed on the [libtorrent](http://thread.gmane.org/gmane.network.bit-torrent.libtorrent/4969) mailing list.

To perfect privacy, content that is not within bitweb should be blocked by the browser and JavaScript should be limited to bitweb in accessing the network.

We should then try to move away from JavaScript by standardizing the applications it implements (such as the comment).
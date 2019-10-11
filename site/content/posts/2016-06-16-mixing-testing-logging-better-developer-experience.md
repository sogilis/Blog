---
title: Mixing Testing and Logging for a Better Developer Experience
author: Tiphaine
date: 2016-06-16T15:06:54+00:00
featured_image: /wp-content/uploads/2016/06/Article-Simon.jpg
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
  - 2737
sbg_selected_sidebar:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_replacement:
  - 'a:1:{i:0;s:12:"Blog Sidebar";}'
sbg_selected_sidebar_2:
  - 'a:1:{i:0;s:1:"0";}'
sbg_selected_sidebar_2_replacement:
  - 'a:1:{i:0;s:0:"";}'
categories:
  - DÉVELOPPEMENT
tags:
  - développement
  - english

---
People love a great article about a new programming paradigm/vision/motto which change the way you architect/develop/maintain your system. This is not one of those articles. **I am gonna talk about the stupid daily life of a programmer &#8211; and the problems you don&rsquo;t hear so much about because they seem so dull and obvious: getting the right feedback through logs and tests.**

&nbsp;

## [][1]{#user-content-getting-the-right-feedback-with-logging.anchor}**Getting the Right Feedback with Logging**

What to do with <span style="text-decoration: underline;"><a href="https://en.wikipedia.org/wiki/Logfile">logging</a></span>? A log is a trace of events, which allows one to reconstruct what has happened. Good practices tell you to have events at different levels of granularity. I especially like the ones from <span style="text-decoration: underline;"><a href="https://github.com/trentm/node-bunyan#levels">bunyan</a></span> on this topic. Shameless copy-paste from the doc:

> « fatal »: The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
  
> « error »: Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish). « warn »: A note on something that should probably be looked at by an operator eventually.
  
> « info »: Detail on regular operation.
  
> « debug »: Anything else, i.e. too verbose to be included in « info » level.
  
> « trace »: Logging from external libraries used by your app or very detailed application logging.

While developing my system, I might use log events to:

  * validate its behavior: do I get a consistent trace, with events as expected?
  * explore how it behaves when running an edge case
  * diagnose what leads to an unexpected behavior

But depending on the case, I want different levels of details about the behavior of my system. The default one is « info », since it traces all regular operations. It should be good enough when validating or exploring the system &#8211; with the occasional look at debug level when one wants to check finer details. Meanwhile, when debugging, I might run anywhere between the error level (because there is too much noise otherwise) and the debug or trace level (because I want maximum details about what led to this bad behavior).

The important ability here is filtering events, either through a predefined level (all events below being discarded) or, even more interestingly, through a post-mortem filter which takes the full trace but only outputs the chosen events.

Let&rsquo;s take a look at bunyan again. I can configure a stream to output events at or above a level given by the `LOGLEVEL `environment variable.

<pre class="wp-code-highlight prettyprint">bunyan.createLogger({
    name: &#039;myApp&#039;,
    level: process.env.LOGLEVEL
  })

$ LOGLEVEL=info npm start

13:49:45.726Z  INFO mw: Server listening on http://:::3000
13:49:47.163Z  INFO mw: Handler send requestStatus (context=printers, message={"command":"requestStatus"})
13:49:47.171Z  WARN mw: PrintingStopped - Item marked in error (context=printers)
13:50:21.910Z  INFO mw: GET /printers -&gt; Status 200 (context=restApp)
13:50:35.349Z ERROR mw: Can not get, Id unknown 10 (context=restApp)
    Error: Can not get, Id unknown 10
13:50:35.351Z  WARN mw: GET /productions/10 -&gt; Status 404 (context=restApp)
</pre>

Or I can use the bunyan CLI to filter log output on the command line.

<pre class="wp-code-highlight prettyprint">$ npm start | bunyan --level warn

13:49:47.171Z  WARN mw: PrintingStopped - Item marked in error (context=printers)
13:50:35.349Z ERROR mw: Can not get, Id unknown 10 (context=restApp)
    Error: Can not get, Id unknown 10
13:50:35.351Z  WARN mw: GET /productions/10 -&gt; Status 404 (context=restApp)
</pre>

Pretty easy right?

On larger systems, I also like to add some context data to each event &#8211; basically where it does come from. It allows one to filter by context when consuming the log. Maybe you only want log events from some parts of the system, or you do not want those events from a noisy module which has no relation to your current concern.

Again, one can use the bunyan CLI to filter log output on the fly.

<pre class="wp-code-highlight prettyprint">const log = bunyanLogger.child({
    context: &#039;restApp&#039;
  });

$ npm start | bunyan --condition &#039;this.context == "restApp"&#039;

13:50:21.910Z  INFO mw: GET /printers -&gt; Status 200 (context=restApp)
13:50:35.349Z ERROR mw: Can not get, Id unknown 10 (context=restApp)
    Error: Can not get, Id unknown 10
13:50:35.351Z  WARN mw: GET /productions/10 -&gt; Status 404 (context=restApp)
</pre>

In any case, partitioning your log output to ease filtering is a good idea. I like the approach of <span style="text-decoration: underline;"><a href="https://github.com/visionmedia/debug">node debug</a></span> (although, as its name implies, I would keep it for debugging purpose).

<pre class="wp-code-highlight prettyprint">const debug = require(&#039;debug&#039;)(&#039;restApp&#039;)

  debug(&#039;GET %s&#039;, route)

$ DEBUG=restApp npm start
restApp GET /printers
</pre>

That was rather down-to-earth. Notice I did not discuss where to put the log, how to rotate files etc. This is <span style="text-decoration: underline;"><a href="http://12factor.net/logs">not your app concern</a></span>: it should just dump events on standard output and let the infrastructure manages it. This, however, can have some impact on our next practice &#8211; testing.

&nbsp;

## [][2]{#user-content-getting-the-right-feedback-with-automated-tests.anchor}Getting the Right Feedback with Automated Tests?

This is actually quite a hard topic. I will not discuss here the way to design your tests, how they should be independent (or not), how to have good failure messages&#8230; I will simply focus on how I use the test report in my console, and how it interacts with log output.

Sometimes I just want a basic feedback from my tests, something like a GREEN/RED status, because I am performing an health check, or refactoring my code. Let&rsquo;s try to run some tests naively, with logger default settings.

<pre class="wp-code-highlight prettyprint">$ npm test

Started
....{"level":30,"msg":"Handler register printer abcd-1234","time":"2016-03-30T15:45:44.881Z","v":0}
.{"level":40,"msg":"Handler: no UUID found in printer message { content: &#039;invalid&#039; }","time":"2016-03-30T15:45:44.896Z","v":0}
{"level":40,"msg":"Handler: unknown message from printer { content: &#039;invalid&#039; }","time":"2016-03-30T15:45:44.897Z","v":0}
.{"level":30,"msg":"Handler register printer abcd-1234","time":"2016-03-30T15:45:44.899Z","v":0}
{"level":30,"msg":"Item started 10777bfa-fe9f-477a-874c-abfa89a3dbee","time":"2016-03-30T15:45:44.899Z","v":0}
.{"level":30,"msg":"Handler register printer abcd-1234","time":"2016-03-30T15:45:44.901Z","v":0}
{"level":30,"msg":"Item progress 01cae871-3531-440f-bab9-e26d2042fa7e, 60","time":"2016-03-30T15:45:44.901Z","v":0}

// CUT FOR BREVITY: 68 lines of log output

.{"context":"restApp","level":30,"msg":"GET /productions/10 -&gt; Status 200","time":"2016-03-30T15:45:45.188Z","v":0}
.{"context":"restApp","level":30,"msg":"POST /models/upload -&gt; Status 204","time":"2016-03-30T15:45:45.215Z","v":0}
.


52 specs, 0 failures
Finished in 0.347 seconds
</pre>

For 52 specifications, I got 68 lines of output, mostly logs, which I don&rsquo;t really care about right now. Given my [tests are fast][3], I also would like to run them in watch mode. This would have the further inconvenience to flood my console with log output whenever I save a file and the tests run.

Now let&rsquo;s say I can omit all log outputs.

<pre class="wp-code-highlight prettyprint">$ npm test

Started
....................................................


52 specs, 0 failures
Finished in 0.26 seconds
</pre>

Nice and clear message: all is right on the front line. This is much better, and I can now use my watch mode to run tests continuously, without the noise of log output. Having a lean test report is also beneficial when you run into problems. When a test fails unexpectedly, I want to have the failure and the stack trace right in front fo my eyes, not having to scroll up pages and pages of logs.

We could easily jump to the conclusion a null logger is the perfect tool to use in tests &#8211; one which redirects all output to`/dev/null`.

<pre class="wp-code-highlight prettyprint">const nullLogger = bunyan.createLogger({
    name: &#039;nullLogger&#039;,
    streams: [{
      path: &#039;/dev/null&#039;
    }]
  })
  // inject nullLogger in your modules while testing
</pre>

&nbsp;

## [][4]{#user-content-customizing-the-log-level-for-tests.anchor}**Customizing the Log Level for Tests**

However, there may be good reasons to not discard all outputs while running your tests. Sometimes the stack trace is not enough and you want more data about the current run from, guess what, the log.

> You might argue that your IDE formats test results for you, already filtering log noise. Yet there is still some cases where you want to look at the log produced by a test &#8211; debugging is one such case.

The second reason is that you might have an error handler in your system: it could log the error then recover the bad case. With a null logger, the error would be swallowed and you will never get to see it in your test report. This can easily lead to head scratching or debugging nightmare as you have a failing test without the most basic cue that something went wrong somewhere in your system.

<pre class="wp-code-highlight prettyprint">try {
    // something may throw an Error
  } catch(e) {
    // log the error and recover
    log.error(e) // error redirected to /dev/null !
  }
</pre>

This gives us two use cases for which we want to use log events in tests. The solution looks rather obvious. I should be able to customize the log level for my tests, so that I can get more details if need be. And by default, I only want errors to appear in my test log. This way, my test report is not disturbed by log events, unless something bad happens.

<pre class="wp-code-highlight prettyprint">const testLogger = bunyan.createLogger({
    name: &#039;testLogger&#039;,
    level: (process.env.LOGLEVEL || &#039;error&#039;)
  })
  // inject testLogger in your modules while testing
</pre>

In other words, _by default, log events should equate test failures_.

<pre class="wp-code-highlight prettyprint">$ npm test

Started
....{"name":"testLogger","level":50,"err":{"name":"SyntaxError","message":"Unexpected token u","time":"2016-03-30T17:15:56.173Z","v":0}
F...............................................

Failures:
1) PrinterHandler: When a message is received, registers itself as handler
  Message:
    Expected undefined to be PrinterHandler.

52 specs, 1 failure
Finished in 0.267 seconds
npm ERR! Test failed.  See above for more details.
</pre>

In the above example, my test fails on its assertion. But the root cause can easily be inferred from the error log screaming « Syntax Error ».

&nbsp;

## [][5]{#user-content-a-last-small-refinement.anchor}**A Last Small Refinement**

To cover our codebase, we could have a test case for error handling, checking that the error is recovered. Let&rsquo;s take the following sample and its accompanying test.

<pre class="wp-code-highlight prettyprint">function resilientParse(body)
    try {
      return JSON.parse(body)
    } catch (e) {
      log.error(e)
      return {}
    }
  }

  it(&#039;ignores non-json message&#039;, () =&gt; {
    expect(() =&gt; {
      resilientParse(&#039;not a JSON string&#039;)
    }).not.toThrowError(SyntaxError)
  });
</pre>

Then running the test would produce an error output in the log. However, since the error is expected, having this output in our test report is not in line with _« log events should equate test failures »_. Why not silence the logger for this case?

<pre class="wp-code-highlight prettyprint">it(&#039;ignores non-json message&#039;, () =&gt; {
    expect(() =&gt; {
      let lvl = testLogger.level()
      testLogger.level(&#039;fatal&#039;) // silence error logging
      resilientParse(&#039;not a JSON string&#039;)
      testLogger.level(lvl)
    }).not.toThrowError(SyntaxError)
  })
</pre>

&nbsp;

## [][6]{#user-content-final-guidelines.anchor}**Final Guidelines**

What to keep of this stuff? Just follow those basic principles next time.

  * Do log your system events and use log levels accordingly.
  * Make the log level customizable (through environment or other means). When debugging the system or the tests, you might want to temporarily increase or decrease the volume of information.
  * Use a logger with a default level of error in your tests: you won&rsquo;t be drowned/annoyed by the regular logs, but you will still get the right feedback when some unexpected error happens.
  * If you write tests for error cases, you might want to temporarily disable logging. This way you do not get the false signal that something is wrong because an error log flashed in your test report.

[<span style="text-decoration: underline;"><strong>Simon Denier</strong></span>][7]

 [1]: https://github.com/sdenier/Articles-Sogilis/blob/testing_logging/testing_logging/testing_logging.md#getting-the-right-feedback-with-logging
 [2]: https://github.com/sdenier/Articles-Sogilis/blob/testing_logging/testing_logging/testing_logging.md#getting-the-right-feedback-with-automated-tests
 [3]: https://pragprog.com/magazines/2012-01/unit-tests-are-first
 [4]: https://github.com/sdenier/Articles-Sogilis/blob/testing_logging/testing_logging/testing_logging.md#customizing-the-log-level-for-tests
 [5]: https://github.com/sdenier/Articles-Sogilis/blob/testing_logging/testing_logging/testing_logging.md#a-last-small-refinement
 [6]: https://github.com/sdenier/Articles-Sogilis/blob/testing_logging/testing_logging/testing_logging.md#final-guidelines
 [7]: https://twitter.com/simondenier
---
title: End-to-end testing with chrome headless at SquareScale
author: Tiphaine
date: 2017-11-07T12:32:09+00:00
featured_image: /wp-content/uploads/2017/11/preview-full-s_600ppi.png
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
  - 5650
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
  - chrome headless
  - chromeless
  - end-to-end testing
  - puppeteer
  - squarescale

---
# End-to-end testing with chrome headless at SquareScale {#end-to-end-testing-with-chrome-headless-at-squarescale}

We just completed writing our first tests using chrome with [Puppeteer][1] at [SquareScale][2] and we are very proud of it. That’s why we really wanted to share it with everybody. But before diving in to how we test our frontend application, we would like to say a few words about how we work on features, our workflow and how we realized that we needed automated tests in a browser.

## Highway to production {#highway-to-production}

The big idea of our workflow is that a feature has no value before it lands in our production platform. In other words, a feature has to reach our production platform as fast as possible. But be careful, this doesn’t mean we don’t test anything. This means pushing to production must be easy and must be performed by everyone, at any time. This also means we have to reduce human actions as much as possible.

We have different steps for a feature before reaching production. To manage those different steps we decided to use a kanban board. My point here is not to explain everything about our workflow, but to explain why we really needed end-to-end tests to strengthen our application and speed up our productivity.

We decided that every ticket should be linked to a test case. By “test case” I mean a scenario which would be played by the tester to ensure the feature works from the user point of view. When a test case is validated, the ticket can either move from the staging platform to the production platform or can be closed.

During the first months we had only one tester, Stephane. We chose him because it was our product owner, and because he was not involved in the software development that much. We quickly reached some limits. First, because SquareScale is a young company, Stephane had to deal with a lot of appointments and didn’t have much time to test the platform. Second, testing manually can be boring, you do almost always the same thing, and you end up to botch things. Finally, testing following a scenario does not guarantee you there is no regression.

This is when we felt like end to end tests could be a solution.

## On the road to Puppeteer {#on-the-road-to-puppeteer}

We decided to write our scenarii as code, and to run it as often as possible. In our case a Jenkins server is playing our tests every 6 hours. We then had to choose which tool to use to perform our tests. I hadn’t set up any end-to-end tests ever. We first heard about [Chromeless][3] and decided to take a look. Of course [Selenium][4] came to our mind but we choose Chromeless because it looked very easy to use and because it was brand new. Moreover, one of the big advantages is that you can run it on Amazon lambda, which can help us to easily run our tests in parallel.

The first milestone for me was to set up the whole environment and process with a simple test that would output our homepage’s HTML. At SquareScale, everything is run inside Docker. It allows us to have the same environment from our development to our production environment. The first problem I ran into was to run Chrome inside docker. The documentation of Chromeless states that Chrome is automatically launched when creating a Chromeless instance. The problem is that I needed to add some arguments so it could run in the docker node image that I used to run the tests. Because the Chromeless api didn’t allow me to do it I had to manually launch a chromium instance with chrome-launcher, which is one of Chromeless dependencies. Once everything was set up I had to write the first test.

The API is really easy to handle. As you can see on their website it is very straight forward, `goto(url)`, `click()`, `type()`. In the end, showing the homepage’s URL code was really tiny:

<pre class="wp-code-highlight prettyprint">const exists = await chromeless
.goto(sqsc_url)
.html()
</pre>

I then decided to write a more complex test which would check if a user could login from the front page. But I run into my second problem, different executions of my test led to different results. Sometimes timeouts, sometimes it could not find the right DOM element. Moreover the whole team had to work for the imminent release and continuing on this project became less important. I felt very disappointed to drop one week of work. I also felt a bit exhausted to have worked one week just to package chrome into docker to finally see that the library I chose was not reliable. On the top of that, the number of contributions on the project, which were quite high when I started to use the library, started to decrease.

That’s when Romain came into the game. He told us about Puppeteer. Puppeteer is also a library to run tests with Chrome but it had several advantages that chromeless doesn’t have: it is maintained by the google chrome team, and it packages chrome in its dependencies. It also has almost the same API as chromeless which meant we wouldn’t have to drop all my work. Beside moving our tests to Puppeteer he also introduced [Jest][5] as a framework to run our tests.

## The result {#the-result}

### Setting up the test framework with Jest {#setting-up-the-test-framework-with-jest}

I told earlier that we wanted to perform scenarii. We chose Jest as our framework because it is simple to set up, it can parallelize test executions and we use it to test our [React][6] frontend. It allows us to factor out the chrome instantiation before every test, to have a scenario per file into a specs directory. A simple file ending with `.test.js` will be executed, no need to write code anywhere else!

Here is the code that allows us to instantiate a new chrome instance before every test, to pass it, and finally to destroy it at the end:

src/setup/browser.js

<pre class="wp-code-highlight prettyprint">const puppeteer = require(&#039;puppeteer&#039;);

beforeEach(async () =&gt; {
  jest.setTimeout(2400000); // 40mn by test

  browser = await puppeteer.launch({
    args: [
      &#039;--no-sandbox&#039;,
      &#039;--disable-setuid-sandbox&#039;
    ]
  });

  page = await browser.newPage();

  // Capture logging
  page.on(&#039;console&#039;, (...args) =&gt; console.log.apply(console, [&#039;[Browser]&#039;, ...args]));
});

afterEach(async () =&gt; {
  await browser.close();
});
</pre>

src/jest.config.js

<pre class="wp-code-highlight prettyprint">const env = process.env.ENV;
const sqsc_url = env === &#039;dev&#039; ? &#039;squarescale.local&#039; : `squarescale.${env}`;

module.exports = {
  setupTestFrameworkScriptFile: &#039;./setup/browser.js&#039;,
  globals: { // available in all tests
    browser: null,
    page: null,
    sqsc_url
  }
};
</pre>

We chose to run a new instance of chrome for every test to keep them separated from each others. We can also imagine that it will be better when we will run them in parallel. In the end, it add a few seconds of overhead but it is non significant compared to the time taken by the test itself.

### Writing scenarii with Puppeteer, ensure login feature works {#writing-scenarii-with-puppeteer-ensure-login-feature-works}

<pre class="wp-code-highlight prettyprint">const login = process.env.GITHUB_LOGIN;
const password = process.env.GITHUB_PASSWORD;
const secret = process.env.GITHUB_SECRET;

const loginSelector = &#039;#login_field&#039;;
const passwordSelector = &#039;#password&#039;;
const otpSelector = &#039;#otp&#039;;

try {
  await page.goto(sqsc_url);
  await page.click(&#039;form[action="/users/auth/github"] button[type=submit]&#039;);
  await page.waitForSelector(loginSelector);
  await page.focus(loginSelector);
  await page.type(login);
  await page.focus(passwordSelector);
  await page.type(password);
  await page.click(&#039;.btn&#039;);
  await page.waitForSelector(otpSelector);
  await page.focus(otpSelector);
  await page.type(gotp(secret, 6, 30, Math.floor(Date.now() / 1000)));
  await page.click(&#039;.btn&#039;);
  await page.waitForNavigation({ waitUntil: &#039;networkidle&#039; });
  await page.waitForSelector(&#039;html.signed&#039;);
}
catch (e) {
  console.error(e);
  throw &#039;Exception during login&#039;;
}
</pre>

### Running with Docker {#running-with-docker}

The Dockerfile is also very simple, we chose to use a node js image and to add some libraries needed by puppeteer on top of it.

Credit to <https://github.com/alekzonder/docker-puppeteer>.

<pre class="wp-code-highlight prettyprint">FROM node:8-slim

RUN apt-get update && \
  apt-get install -yq \
    gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget && \
  apt-get clean && \
  apt-get autoremove -y && \
  rm -rf /var/lib/apt/lists/*
</pre>

We simply have to use the image to run our tests with Jest:

<pre class="wp-code-highlight prettyprint">docker run --rm --name &#039;qa-front&#039; qa-front yarn run test
</pre>

### Jenkins {#jenkins}

Our Jenkins simply use the docker container we made to run the tests (notice `agent { dockerfile true }`). We configured it to provide the secrets, and to run the tests every 6 hours:

<pre class="wp-code-highlight prettyprint">pipeline {
  triggers {
    cron(&#039;0 5,11,17,23 * * *&#039;)
  }
  parameters {
    string(
      name: &#039;env&#039;,
      defaultValue: env.BRANCH_NAME == &#039;production&#039; ? &#039;production&#039; : &#039;staging&#039;,
      description: &#039;Environment (staging|production)&#039;)
  }

  environment {
    GITHUB_LOGIN = credentials(&#039;github-login&#039;)
    GITHUB_PASSWORD = credentials(&#039;github-password&#039;)
    GITHUB_SECRET = credentials(&#039;github-secret&#039;)
  }

  agent { dockerfile true }

  stages {
    stage(&#039;Run&#039;) {
      steps {
        sh &#039;yarn install&#039;;
        sh &#039;ENV=${params.env} yarn run test&#039;
      }
    }
  }
  post {
    always {
      withCredentials([
        string(credentialsId: &#039;qa-${params.env}-slack-webhook&#039;, variable: &#039;SQSC_QA_SLACK_WEBHOOK&#039;)
      ]) {
        script {
          notifyBuild(currentBuild.currentResult)
        }
      }
    }
  }
}
</pre>

## The final word {#the-final-word}

The road to our final framework was a bit long but the result is quite simple. The fact that it is performed inside Docker allows us to run it from everywhere, on every platform, even in dev mode. I hope this can help you to set your own tests. We are also interested about your experience. Feel free to tell us how it works in your company. We plan to do a blog post titled « mplement the Page Object pattern in your Puppeteer e2e test ».
  
Stay tuned!

[Adrien Hamraoui][7]

Special thanks to Alexandre, Marien, Shanti, Romain, Graham, and Yves for their feedbacks.

 [1]: https://github.com/GoogleChrome/puppeteer
 [2]: http://www.squarescale.com/
 [3]: https://github.com/graphcool/chromeless/
 [4]: http://seleniumhq.org/
 [5]: https://facebook.github.io/jest/
 [6]: https://reactjs.org/
 [7]: https://github.com/hamadr/
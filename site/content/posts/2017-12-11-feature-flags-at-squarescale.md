---
title: 'Privé : Feature flags at SquareScale'
author: Sogilis
date: 2017-12-11T15:20:42+00:00
draft: true
private: true
featured_image: /wp-content/uploads/2017/12/flipper.png
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
  - 11
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
  - feature flag
  - flipper
  - ruby
  - ruby on rails
  - sogilis
  - squarescale
format: quote

---
# Feature flags at SquareScale {#feature-flags-at-squarescale}

We started to talk about feature flags a while ago at SquareScale but never had the time to introduce themin our web application. None of us had the chance to work with feature flags in a previous application so we did not know very much about how to implement them, how to manage them in the application lifetime, and the most important part is that we didn&rsquo;t have any feedbacks about feature flags being used in production. That being said, we of course read about it. We especially read Martin Fowler&rsquo;s article: [Feature Toggles (aka Feature Flags)][1]. There are many reasons we need feature flags.

First, and as I said in [my previous blog post][2], we give a lot of importance to continuous delivery. Only code pushed and used on our production platform has value. But sometimes you don&rsquo;t want to enable it for everybody.

Second, new features can break things. What about having a feature flag for new features? It would allow us to disable them without having to rollback our docker image, database, and such, in production. Moreover, it would be instant.

A couple of weeks ago, we decided to introduce them into our ruby on rails backend application. We had a look at what existed, and two gems caught our attention.
  
[Rollout][3]: It is the highest ranking gem to deal with feature toggles, however, it relies on Redis,
  
but it gives us a lot of interesting features such is incremental rollout, specific user enabling etc.
  
[Flipper][4]: It has various adapters, and doesn&rsquo;t rely specifically on Redis. It&rsquo;s simple to use and seems to do what we need it to. We decided to go with Flipper. Mainly because it had an active record adapter, and a UI to manage the feature flags.

I will not dig into what Flipper offers because you can read everything on their Github (or because RTFM!). As a very quick sumary you can name flags and then choose several options to enable them. You can enable them for users, group of users, choose a percentage of actors, or a percentage of time. In our case, the group of users feature interested us the most, as we will mainly use feature flags to test new features first.

## Flipper set up {#flipper-set-up}

The setup is really easy. We just needed to add three gems. One is for flipper, two is for the UI, three is for the active record adapter.

<pre class="wp-code-highlight prettyprint">gem &#039;flipper&#039;
gem &#039;flipper-ui&#039;
gem &#039;flipper-active_record&#039;
</pre>

A rails command allows us to generate the migrations, creating two tables.

<pre class="wp-code-highlight prettyprint">rails g flipper:active_record
</pre>

A bit of configuration into `config/initializers/flipper.rb`.

<pre class="wp-code-highlight prettyprint">require &#039;flipper/adapters/active_record&#039;

Flipper.configure do |config|
  config.default do
    adapter = Flipper::Adapters::ActiveRecord.new
    Flipper.new(adapter)
  end
end
</pre>

Adding the route for the UI.

<pre class="wp-code-highlight prettyprint">mount Flipper::UI.app(Flipper) =&#062; &#039;/flipper&#039;</pre>

And that&rsquo;s it. You&rsquo;re all done!

## Using Flipper {#using-flipper}

As I said, we wanted to use Flipper to allow access to our new features to a group of users. The documentation shows how to do it:

<pre class="wp-code-highlight prettyprint"># this registers a group
Flipper.register(:admins) do |actor|
  actor.respond_to?(:admin?) &amp;&amp; actor.admin?
end
</pre>

Here, an actor is anything having a `flipper_id` method.
  
In our case our actors will be instances of `User`.
  
We simply had to add

<pre class="wp-code-highlight prettyprint">Contract None =&gt; String
def flipper_id
  "User;#{id}"
end
</pre>

(I know we use contracts in Ruby, stay tuned for more information)

The thing in that example is that you have to introduce a boolean into your actor class for every group you want to create.
  
We don&rsquo;t want to pollute our user class with a lot of booleans. We chose to create a `FlipperMembership` class containing all those booleans for a `User` with a `:has_one` relation.

<pre class="wp-code-highlight prettyprint">class CreateFlipperMembership &lt; ActiveRecord::Migration[5.0]
  def change
    create_table :flipper_memberships do |t|
      t.boolean :new_feature_1_tester, default: false
      t.belongs_to :user, index: true
    end

    User.all.each do |user|
      user.update flipper_membership: FlipperMembership.new
    end
  end
end
</pre>

<pre class="wp-code-highlight prettyprint">class User &lt; ApplicationRecord
    has_one :flipper_membership
end
</pre>

And then to add a `is?` method on the `User` class ([thanks for the idea][5]).

<pre class="wp-code-highlight prettyprint">Contract Symbol =&gt; Bool
def is?(group)
  flipper_membership.send(group)
end
</pre>

This way we can declare any Flipper group without forgetting to update our `FlipperMembership` model.

<pre class="wp-code-highlight prettyprint">Flipper.register(:db_choices_testers) do |actor|
  actor.respond_to?(:is?) &amp;&amp; actor.is?(:new_feature_1_tester)
end
</pre>

Now we just have to protect our code with Flipper:

<pre class="wp-code-highlight prettyprint">if Flipper.enabled? :new_feature_1, current_user
    ...
end
</pre>

And that&rsquo;s all for now folks. It is really new for us at the moment, that&rsquo;s why we have no feedback to give yet (except it is really easy to set up). We will certainly write an other blog post about that in the coming months, stay tuned!

Cheers,
  
[Adrien][6]

Special thanks to Haze for his feedback.

 [1]: https://martinfowler.com/articles/feature-toggles.html
 [2]: http://sogilis.com/blog/end-to-end-testing-chrome-headless-squarescale/
 [3]: https://github.com/fetlife/rollout
 [4]: https://github.com/jnunemaker/flipper
 [5]: https://stackoverflow.com/questions/25712621/cant-get-flipper-feature-to-enable-for-a-group
 [6]: https://github.com/hamadr/
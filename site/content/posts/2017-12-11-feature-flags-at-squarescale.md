---
title: "Privé : Feature flags at SquareScale"
author: Adrien
date: 2017-12-11T15:20:42+00:00
draft: true
private: true
image: /img/2017/12/flipper.png
categories:
  - DÉVELOPPEMENT
tags:
  - feature flag
  - flipper
  - ruby
  - ruby on rails
  - sogilis
  - squarescale

---
# Feature flags at SquareScale {#feature-flags-at-squarescale}

We started to talk about feature flags a while ago at SquareScale but never had the time to introduce themin our web application. None of us had the chance to work with feature flags in a previous application so we did not know very much about how to implement them, how to manage them in the application lifetime, and the most important part is that we didn't have any feedbacks about feature flags being used in production. That being said, we of course read about it. We especially read Martin Fowler's article: [Feature Toggles (aka Feature Flags)][1]. There are many reasons we need feature flags.

First, and as I said in [my previous blog post][2], we give a lot of importance to continuous delivery. Only code pushed and used on our production platform has value. But sometimes you don't want to enable it for everybody.

Second, new features can break things. What about having a feature flag for new features? It would allow us to disable them without having to rollback our docker image, database, and such, in production. Moreover, it would be instant.

A couple of weeks ago, we decided to introduce them into our ruby on rails backend application. We had a look at what existed, and two gems caught our attention.

[Rollout][3]: It is the highest ranking gem to deal with feature toggles, however, it relies on Redis,

but it gives us a lot of interesting features such is incremental rollout, specific user enabling etc.

[Flipper][4]: It has various adapters, and doesn't rely specifically on Redis. It's simple to use and seems to do what we need it to. We decided to go with Flipper. Mainly because it had an active record adapter, and a UI to manage the feature flags.

I will not dig into what Flipper offers because you can read everything on their Github (or because RTFM!). As a very quick sumary you can name flags and then choose several options to enable them. You can enable them for users, group of users, choose a percentage of actors, or a percentage of time. In our case, the group of users feature interested us the most, as we will mainly use feature flags to test new features first.

## Flipper set up {#flipper-set-up}

The setup is really easy. We just needed to add three gems. One is for flipper, two is for the UI, three is for the active record adapter.

{{< highlight bash >}}
gem 'flipper'
gem 'flipper-ui'
gem 'flipper-active_record'
{{< /highlight >}}

A rails command allows us to generate the migrations, creating two tables.

{{< highlight bash >}}
rails g flipper:active_record
{{< /highlight >}}

A bit of configuration into `config/initializers/flipper.rb`.

{{< highlight ruby >}}
require 'flipper/adapters/active_record'

Flipper.configure do |config|
  config.default do
    adapter = Flipper::Adapters::ActiveRecord.new
    Flipper.new(adapter)
  end
end
{{< /highlight >}}

Adding the route for the UI.

{{< highlight ruby >}}
mount Flipper::UI.app(Flipper) => '/flipper'
{{< /highlight >}}

And that's it. You're all done!

## Using Flipper {#using-flipper}

As I said, we wanted to use Flipper to allow access to our new features to a group of users. The documentation shows how to do it:

{{< highlight ruby >}}
# this registers a group
Flipper.register(:admins) do |actor|
  actor.respond_to?(:admin?) && actor.admin?
end
{{< /highlight >}}

Here, an actor is anything having a `flipper_id` method.

In our case our actors will be instances of `User`.

We simply had to add

{{< highlight ruby >}}
Contract None => String
def flipper_id
  "User;#{id}"
end
{{< /highlight >}}

(I know we use contracts in Ruby, stay tuned for more information)

The thing in that example is that you have to introduce a boolean into your actor class for every group you want to create.

We don't want to pollute our user class with a lot of booleans. We chose to create a `FlipperMembership` class containing all those booleans for a `User` with a `:has_one` relation.

{{< highlight ruby >}}
class CreateFlipperMembership < ActiveRecord::Migration[5.0]
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
{{< /highlight >}}

{{< highlight rb >}}
class User < ApplicationRecord
    has_one :flipper_membership
end
{{< /highlight >}}

And then to add a `is?` method on the `User` class ([thanks for the idea][5]).

{{< highlight rb >}}
Contract Symbol => Bool
def is?(group)
  flipper_membership.send(group)
end
{{< /highlight >}}

This way we can declare any Flipper group without forgetting to update our `FlipperMembership` model.

{{< highlight rb >}}
Flipper.register(:db_choices_testers) do |actor|
  actor.respond_to?(:is?) && actor.is?(:new_feature_1_tester)
end
{{< /highlight >}}

Now we just have to protect our code with Flipper:

{{< highlight rb >}}
if Flipper.enabled? :new_feature_1, current_user
    ...
end
{{< /highlight >}}

And that's all for now folks. It is really new for us at the moment, that's why we have no feedback to give yet (except it is really easy to set up). We will certainly write an other blog post about that in the coming months, stay tuned!

Cheers,

[Adrien][6]

Special thanks to Haze for his feedback.

[1]: https://martinfowler.com/articles/feature-toggles.html
[2]: http://sogilis.com/blog/end-to-end-testing-chrome-headless-squarescale/
[3]: https://github.com/fetlife/rollout
[4]: https://github.com/jnunemaker/flipper
[5]: https://stackoverflow.com/questions/25712621/cant-get-flipper-feature-to-enable-for-a-group
[6]: https://github.com/hamadr/

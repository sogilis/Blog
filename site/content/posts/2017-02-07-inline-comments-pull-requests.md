---
title: 'Inline Comments: the Stuff that Pull Requests Are Made of'
author: Tiphaine
date: 2017-02-07T15:49:06+00:00
featured_image: /wp-content/uploads/2017/02/Matching_columns-2.png
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
  - 5290
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
  - codereview
  - development
  - git
  - github
  - inlinecomments
  - plugin
  - pullrequests
  - tuleap

---
## **Did you ever wonder how GitHub-like code review works? Fear no more, and discover the intricacies of developing a system for inline comments !**

Thanks to GitHub and the like, the practice of code review have become widespread. Even for small projects, one can feel the benefits: catching errors, loopholes, or artificial complexity, sharing the knowledge of how code fulfills its function, enforcing or teaching common guidelines and patterns&#8230; Last year, we were asked to develop a Pull Request plugin for the <span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff; text-decoration: underline;" href="https://www.tuleap.org/" target="_blank">Tuleap</a></span></span> platform (an open-source forge to track project development). This plugin was designed as an alternative to <span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff; text-decoration: underline;" href="https://www.gerritcodereview.com/" target="_blank">Gerrit</a></span></span> (which ships by default), in order to support different team workflows. This project gave us a wonderful opportunity to dive into the intricacies of a web-based code review system: how do you manage the workflow of a pull request, from creation to updates and final merge ? How do you detect conflicts ? What&rsquo;s the best way to display diffs ? And most of all, **how do you implement an inline comments system for code review** ?

In this article, we will focus on this last problem as this is the hallmark of any code review system. As we will see, this is not so obvious and requires some conceptualization and computation. But it will serve as a good illustration of the power of <span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff; text-decoration: underline;" href="http://sogilis.com/blog/demystifying-git-concepts-to-understand/" target="_blank">changesets</a></span></span> for any capable VCS (namely Git), as it is an important cornerstone of our solution.

### What Problem Are We Talking about?

In the general picture, the whole process goes something like this:

<li style="font-weight: 400;">
  developer Jim pushes a branch with some changes and sends a request for code review
</li>
<li style="font-weight: 400;">
  developer Kate reads the changes, and notifies acceptance or rejection of the request with proposals for updates
</li>
<li style="font-weight: 400;">
  developer Jim updates its code following the remarks
</li>
<li style="font-weight: 400;">
  developer Kate can see which comments have been fulfilled, whether there is remaining work to do, or if some new things call the attention
</li>
<li style="font-weight: 400;">
  &#8230; and so on until everybody is satisfied with the changes
</li>

In the past, code review was mainly patch-based. But now many code review systems are web-based. The cornerstone of such online systems is the inline comments mechanism. Anybody knows the thrill of picking your first line to comment. It goes something like this:

<li style="font-weight: 400;">
  « this line does not take into account case XXX &#8211; better add a proper error check »
</li>
<li style="font-weight: 400;">
  « I find this part is complicated and not sure I understand all the details &#8211; can we rewrite it? »
</li>
<li style="font-weight: 400;">
  « Cool! That&rsquo;s a neat way to solve this issue. I will be sure to apply it next time I have the same problem. »
</li>

<img class="aligncenter wp-image-1719 size-full" src="http://sogilis.com/wp-content/uploads/2017/02/Github_inline_comment.png" alt="Github_inline_comment" width="997" height="300" srcset="http://sogilis.com/wp-content/uploads/2017/02/Github_inline_comment.png 997w, http://sogilis.com/wp-content/uploads/2017/02/Github_inline_comment-300x90.png 300w, http://sogilis.com/wp-content/uploads/2017/02/Github_inline_comment-768x231.png 768w" sizes="(max-width: 997px) 100vw, 997px" />

And then you proceed to the next chunk of code which you feel is either unsatisfactory/confusing/cool&#8230; Later you get a full review of your comments and associated diffs, provide a global comment and request changes before approval. Then the changeset gets updated by the original developer, and you can see at first sight which of your comments are still relevant and which ones are outdated, showing progress in the review process. Sometimes it just feels good…

<img class="aligncenter size-full wp-image-1720" src="http://sogilis.com/wp-content/uploads/2017/02/Github_show_outdated.png" alt="Github_show_outdated" width="711" height="127" srcset="http://sogilis.com/wp-content/uploads/2017/02/Github_show_outdated.png 711w, http://sogilis.com/wp-content/uploads/2017/02/Github_show_outdated-300x54.png 300w" sizes="(max-width: 711px) 100vw, 711px" />

Wait! What just happens when we talked about outdated comments? How does GitHub knows whether my comment is still relevant or not? As is often the case in a complex system, complicated issues can hide in plain sight (1). Let&rsquo;s dive into the intricacies of keeping inline comments up to date during a code review process.

_(1) The real complexity lies in the diff algorithm, but we won&rsquo;t dive into it in this article._

### First Approach: High-Level Requirements

More often than not, inline comments are linked to changes. So they are attached to a representation of changes. In this post we will focus on a Unidiff representation (because it will be simpler to visualize and reason about than the side-by-side diff). This leads us to a first definition:

<p style="padding-left: 30px;">
  <em>An inline comment is a block of data (text) attached to a line in a unidiff.</em>
</p>

Here is an example with a dummy unidiff. Ax represents one line content. Deleted lines are prefixed by &#8211; and added lines by +. Let&rsquo;s say A3 has been added and you put an inline comment on it.

<pre class="wp-code-highlight prettyprint">A1
  A2
+ A3   ### your inline comment: say something about this change
  A4
  A5
</pre>

Now some changes are made and the pull request is updated. What can happen? For example, the reviewer requested that A3 is no good and should be deleted. The updated unidiff would look like:

<pre class="wp-code-highlight prettyprint">A1
A2
A4
A5
</pre>

Line A3 has disappeared. What can we do with the inline comment? It can not be displayed in a meaningful way, next to the line it was attached too, so it appears to be irrelevant, in other words outdated. Fair enough, we seem to have a simple rule to update an inline comment:

<p style="padding-left: 30px;">
  <em>If the inline comment is attached to a line which has disappeared with the last update, mark it as outdated.</em>
</p>

Obviously, if line A3 still existed in the new update, we should have seen the inline comment as still relevant and would have keep it. What about this case?

<pre class="wp-code-highlight prettyprint">A1
+ B1
+ B2
  A2
+ A3   ### your inline comment: say something about this change
  A4
  A5
</pre>

Rather than changing the A3 line, the update provides two new lines B1 and B2 (which become parts of the global pull request, including A3). The system can not decide whether the change resolves or even affects the inline comment. Thus, it should still display the comment to let the reviewer decided whether it is relevant or not. Of course, it should still appear next to the A3 line, which means in this case the comment has « moved down » from the third line in the original unidiff to the fifth line in the new unidiff.

<p style="padding-left: 30px;">
  <em>If the inline comment is still relevant w.r.t to the last update, it should follow the diff line to which it is attached.</em>
</p>

As a side note, we can wonder what happens for an inline comment on line A4, which is kept from the original source. If we apply the same reasoning as above, we can infer straight away that the same rules apply. Also, nothing prevent us to add many inline comments to the same line. Let&rsquo;s rephrase the rules to clarify that:

&nbsp;

<li style="font-weight: 400;">
  <i><i>If an added or kept line of the original unidiff is removed by the update, then any inline comments on the line become outdated.</i></i>
</li>

<li style="font-weight: 400;">
  <i>If an added or kept line of the original unidiff is moved (up or down) by the update, then any inline comments on the line should follow the move.</i>
</li>

&nbsp;

These rules imply that inline comments system are able to track lines between changesets and identify which one has been removed and which one have moved. Notice we said nothing of lines which were already deleted in the original diff. We will save that for later!

### An Intuition of Solution

The first thing to recognize is that we do not deal with a single diff (a.k.a changeset) but at least two:

<li style="font-weight: 400;">
  the current (or original) diff from the pull request, on which comments were made
</li>
<li style="font-weight: 400;">
  the new diff from the pull request, after the update, which contains both updated changes and untouched original changes
</li>

Also, let index each content line by its offset in the diff. For starters, it is the simplest way to link an inline comment to its content line: we know that inline comment at offset 4 goes to line 4 in the unidiff.

Let&rsquo;s start with the following content:

<pre class="wp-code-highlight prettyprint">A1
A2
A3
A4
A5
</pre>

We create a pull request which inserts a line B1 between A4 and A5. So the original unidiff for the pull request looks like:

<pre class="wp-code-highlight prettyprint">1   A1
2   A2
3   A3
4   A4
5 + B1
6   A5
</pre>

The review goes like this:

<img class="aligncenter size-full wp-image-1721" src="http://sogilis.com/wp-content/uploads/2017/02/PR_before_update.png" alt="PR_before_update" width="418" height="168" srcset="http://sogilis.com/wp-content/uploads/2017/02/PR_before_update.png 418w, http://sogilis.com/wp-content/uploads/2017/02/PR_before_update-300x121.png 300w" sizes="(max-width: 418px) 100vw, 418px" />

After review, it is decided to introduce another change between lines A1 and A2, and to delete A3, so the updated pull request looks like (notice how the deleted line still counts in the diff offset):

<img class="aligncenter size-full wp-image-1723" src="http://sogilis.com/wp-content/uploads/2017/02/PR_after_update.png" alt="PR_after_update" width="418" height="168" srcset="http://sogilis.com/wp-content/uploads/2017/02/PR_after_update.png 418w, http://sogilis.com/wp-content/uploads/2017/02/PR_after_update-300x121.png 300w" sizes="(max-width: 418px) 100vw, 418px" />

So far so good. Any inline comments on line 1 should stay in place. Any inline comments on the second line or below should move down by one line. The inline comment on A3 should be marked as outdated.

How do we know which lines does not change, which are deleted, and which are moved in the update? We can compute the update diff itself, which only contains changes between the current diff (current pull request state) and the updated pull request (i.e. it contains only changes made for the update).

In our example, since B1 change has already been introduced, the update diff looks like:

<pre class="wp-code-highlight prettyprint">1   A1
2 + C1
3   A2
4 - A3
5   B1
6   A4
7   A5
</pre>

What if we juxtapose the offset coordinates from the original diff on this one?

<pre class="wp-code-highlight prettyprint">1 1   A1
  2 + C1
2 3   A2
3 4 - A3
4 5   B1
5 6   A4
6 7   A5
</pre>

It is pretty easy to infer which lines were in the previous diff (kept and removed lines) and which ones are only in the new diff (added lines) &#8211; and thus, it is pretty easy to compute offsets for **both original and new diffs** on the update diff. We can then translate offsets from one space to the other.

<img class="aligncenter size-full wp-image-1734" src="http://sogilis.com/wp-content/uploads/2017/02/PR_update.png" alt="PR_update" width="599" height="207" srcset="http://sogilis.com/wp-content/uploads/2017/02/PR_update.png 599w, http://sogilis.com/wp-content/uploads/2017/02/PR_update-300x104.png 300w" sizes="(max-width: 599px) 100vw, 599px" />

We can detail the procedure to update inline comments on an added or kept line:

<li style="font-weight: 400;">
  <i><i>take the offset of the inline comment in the original diff</i></i>
</li>

<li style="font-weight: 400;">
  <i>then look up the corresponding line in the update diff</i>
</li>

<li style="font-weight: 400;">
  <i>a) if line has been deleted by the update, mark the comment as outdated</i>
</li>

<li style="font-weight: 400;">
  <i>b) otherwise, move the comment to the new offset given by the update diff</i>
</li>

### When the Intuition Falls Down (but is a Good First Start Anyway)

Right now we just talked about added and untouched lines in the diff. Let&rsquo;s make things a bit more complicated by having both added and deleted lines in the original pull request. What happens if we put inline comments on deleted lines?

<pre class="wp-code-highlight prettyprint">1   A1
2 + B1
3   A2
4 - A3
5   A4
6   A5
</pre>

For example reviewer requests that line A3 should not be deleted. Do the above rules apply? Quite obviously, if the next update does not change the line, the comment holds. On the contrary, if the next update reestablish the line, then we can consider the comment to be outdated.

What if lines are moved around as in the updated pull request below?

<pre class="wp-code-highlight prettyprint">1   A1
2 + C1
3 + B1
4   A2
5 - A3
6   A4
7   A5
</pre>

The update diff would look like this (with offsets):

<pre class="wp-code-highlight prettyprint">1 1   A1
2   + C1
3     B1
2 4   A2
4 5   A4
5 6   A5
</pre>

Oups! Line A3 has disappeared from the diff (since it is already deleted) so we can no longer get its coordinates &#8211; the hint is that we no longer have the complete suite of offsets from the original diff in the leftmost column.

### A Systematic Computation for Translation: Basic Case

Still, it looks like we were onto something when using our systems of offset coordinates and translations. Let&rsquo;s find a systematic way to do that.

We will describe each line in a unidiff with a triple coordinates system: offset in the diff, offset before change, offset after change. As noted above, it is pretty easy to infer such offsets just by iterating over each diff line and looking at their status (added, kept, or deleted). Let&rsquo;s compute unidiffs with a more in-depth example.

_Original_ pull request:

<pre class="wp-code-highlight prettyprint">// O = diff Offset, B = offset Before, A = offset After
O B A
1 1 1   A1
2   2 + B1
3   3 + B2
4   4 + B3
5 2 5   A2
6 3   - A3
7 4 6   A4
8 5 7   A5
</pre>

_Update_ diff (from original to final):

<pre class="wp-code-highlight prettyprint">O B A
1 1 1   A1
2   2 + C1
3   3 + C2
4 2 4   B1
5 3   - B2
6 4 5   B3
7 5 6   A2
8 6   - A4
9 7 7   A5
</pre>

_Final_ pull request:

<pre class="wp-code-highlight prettyprint">O B A
1 1 1   A1
2   2 + C1
3   3 + C2
4   4 + B1
5   5 + B3
6 2 6   A2
7 3   - A3
8 4   - A4
9 5 7   A5
</pre>

With these rules for computing offsets, it is obvious that some offset columns offer a match between diffs. We can use these matches to look up and translate offsets between the diffs.

<li style="font-weight: 400;">
  The <i>Original[After]</i> column matches with the <i>Update[Before]</i> column
</li>
<li style="font-weight: 400;">
  The <i>Update[After]</i> column matches with the <i>Final[After]</i> column
</li>
<li style="font-weight: 400;">
  The <i>Original[Before]</i> column matches with the <i>Final[Before]</i> column
</li>

<img class="aligncenter size-full wp-image-1732" src="http://sogilis.com/wp-content/uploads/2017/02/Matching_columns.png" alt="Matching_columns" width="598" height="322" srcset="http://sogilis.com/wp-content/uploads/2017/02/Matching_columns.png 598w, http://sogilis.com/wp-content/uploads/2017/02/Matching_columns-300x162.png 300w" sizes="(max-width: 598px) 100vw, 598px" />

Then we can redefine the rules to update inline comments. For added or kept lines in the original diff:

<li style="font-weight: 400;">
  <i><i>translate Original[O] -> Original[A] in the original diff</i></i>
</li>

<li style="font-weight: 400;">
  <i>look up the matching line Original[A] = Update[B] in the update diff</i>
</li>

<li style="font-weight: 400;">
  <i>a) if line has been deleted by the update, mark the comment as outdated</i>
</li>

<li style="font-weight: 400;">
  <i>b) otherwise, translate Update[B] -> Update[A], look up Update[A] = Final[A] in the final diff, then translate Final[A] -> Final[O] to get the new offset in the final diff</i>
</li>

For removed lines, the rules play differently:

<li style="font-weight: 400;">
  <i><i>translate Original[O] -> Original[B] in the original diff</i></i>
</li>

<li style="font-weight: 400;">
  <i>look up the matching line Original[B] = Final[B] in the final diff</i>
</li>

<li style="font-weight: 400;">
  <i>a) if the line is no longer deleted in the final diff, mark the comment as outdated</i>
</li>

<li style="font-weight: 400;">
  <i>b) otherwise, translate Final[B] -> Final[O] to get the new offset in the final diff</i>
</li>

It the rules seem a bit complicated, the visualization plays nicely to understand the mechanism.

<img class="aligncenter size-full wp-image-1733" src="http://sogilis.com/wp-content/uploads/2017/02/Matching_update.png" alt="Matching_update" width="598" height="253" srcset="http://sogilis.com/wp-content/uploads/2017/02/Matching_update.png 598w, http://sogilis.com/wp-content/uploads/2017/02/Matching_update-300x127.png 300w" sizes="(max-width: 598px) 100vw, 598px" />

### The General Problem and its Solution

Did we really solve the full problem? Actually, we made a strong hidden hypothesis: the pull request base, against which the original diff is computed, never changes with update. In other words, the update is always a fast forward. But this is not necessarily the case. It is pretty common in a pull request to ask the developer to **rebase** changes against the latest source. Suddenly, the original diff against which inline comments were made does not reflect the state of the pull request before update. In other words, some comments may be outdated because the base itself has changed. Also, the updated (or &lsquo;final&rsquo;) pull request should now be computed against the new base to reflect the changes.

<img class="aligncenter size-full wp-image-1738" src="http://sogilis.com/wp-content/uploads/2017/02/Update_vs_rebase.png" alt="Update_vs_rebase" width="706" height="238" srcset="http://sogilis.com/wp-content/uploads/2017/02/Update_vs_rebase.png 706w, http://sogilis.com/wp-content/uploads/2017/02/Update_vs_rebase-300x101.png 300w" sizes="(max-width: 706px) 100vw, 706px" />

Here is an example. We will focus on deleted lines to illustrate the problems.

<img class="aligncenter size-full wp-image-1735" src="http://sogilis.com/wp-content/uploads/2017/02/Rebase.png" alt="Rebase" width="733" height="436" srcset="http://sogilis.com/wp-content/uploads/2017/02/Rebase.png 733w, http://sogilis.com/wp-content/uploads/2017/02/Rebase-300x178.png 300w" sizes="(max-width: 733px) 100vw, 733px" />

What has changed? The rebase has deleted two lines from the original base, including one which was also part of the pull request itself. This implies that any comment put on lines A2 and A3 are now outdated. Also some offsets should move around. Let&rsquo;s apply our previous procedure with three diffs:

<img class="aligncenter size-full wp-image-1736" src="http://sogilis.com/wp-content/uploads/2017/02/Rebase_naive.png" alt="Rebase_naive" width="598" height="215" srcset="http://sogilis.com/wp-content/uploads/2017/02/Rebase_naive.png 598w, http://sogilis.com/wp-content/uploads/2017/02/Rebase_naive-300x108.png 300w" sizes="(max-width: 598px) 100vw, 598px" />

It seems we can still apply the rules to outdate or move inline comments on added or kept lines, _even though_ the final diff is computed against a different base. This happens because both the final and update diffs have the same final state. However, we now have a problem with inline comments on deleted lines: especially the offset _Original[B]_ does not match _Final[B]_ for line A5. How can we translate the inline comment in this case?

Fortunately, we now have a good grasp about how diffs can be used to translate offsets. From the full figure, it is quite obvious that the _base diff_ is the missing link between the old master and the new master. Let&rsquo;s plug it into our translation schema.

<img class="aligncenter size-full wp-image-1737" src="http://sogilis.com/wp-content/uploads/2017/02/Rebase_ok.png" alt="Rebase_ok" width="598" height="467" srcset="http://sogilis.com/wp-content/uploads/2017/02/Rebase_ok.png 598w, http://sogilis.com/wp-content/uploads/2017/02/Rebase_ok-300x234.png 300w" sizes="(max-width: 598px) 100vw, 598px" />

Again, it is important to notice how offset columns match between diffs:

<li style="font-weight: 400;">
  the <i>Original[After]</i> column matches with the <i>Update[Before]</i> column
</li>
<li style="font-weight: 400;">
  the <i>Update[After]</i> column matches with the <i>Final[After]</i> column
</li>
<li style="font-weight: 400;">
  the <i>Original[Before]</i> column matches with the <i>Base[Before]</i> column since they share the same old master state
</li>
<li style="font-weight: 400;">
  the <i>Base[After]</i> column matches with the <i>Final[Before]</i> column since it represents the new master state
</li>

We have a complete coverage of offsets, which allows us to always translate between diffs. We define the definitive rules for removed lines (since rebase does not affect added or kept lines, we do not change those rules):

<li style="font-weight: 400;">
  <i><i>translate Original[O] -> Original[B] in the original diff</i></i>
</li>

<li style="font-weight: 400;">
  <i>look up the matching line Original[B] = Base[B] in the base diff</i>
</li>

<li style="font-weight: 400;">
  <i>a) if the line is deleted in the base diff, mark the comment as outdated and STOP</i>
</li>

<li style="font-weight: 400;">
  <i>otherwise, translate Base[B] -> Base[A] and look up Base[A] = Final[B] in the final diff</i>
</li>

<li style="font-weight: 400;">
  <i>b) if the line is no longer deleted in the final diff, mark as outdated</i>
</li>

<li style="font-weight: 400;">
  <i>c) otherwise, translate Final[B] -> Final[O] to get the new offset in the final diff</i>
</li>

Notice that rules are now a bit more complicated for removed lines. In particular, there are two cases which mark comments as outdated. Rule (a) invalidates comments on lines which are already deleted in the base (as for the A3 line in the example) and rule (b) invalidates comments on lines which are reestablished in the final diff.

### Conclusion

As it happens, defining the algorithmic rules for updating inline comments was not so trivial. Cases like rebase long baffled us and we were not sure we understood how it impacted inline comments. Actually, it took us a few iterations to set things straight. Yet, once we found the gist of it, it looked surprisingly natural: we just describe the space of each changeset with some coordinates, identify how those spaces connect to each other, and apply rules to translate coordinates between connected spaces.

_Simon Denier   <a class="" style="color: #0000ff; text-decoration: underline;" href="https://twitter.com/simondenier" target="_blank">@twitter</a> &#8211; <a href="https://github.com/sdenier/" target="_blank" style="color: #0000ff; text-decoration: underline;">@github</a>_
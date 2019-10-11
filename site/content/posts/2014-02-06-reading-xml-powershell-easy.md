---
title: Reading xml from PowerShell is really easy!
author: Tiphaine
date: 2014-02-06T08:07:00+00:00
featured_image: /wp-content/uploads/2016/04/2.La-vie-a-Sogilis.jpg
tumblr_sogilisblog_permalink:
  - http://sogilisblog.tumblr.com/post/75781572874/reading-xml-from-powershell-is-really-easy
tumblr_sogilisblog_id:
  - 75781572874
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
  - 3002
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
  - code
  - dev
  - Powershell

---
It is amazing to see how simple we can read xml node values from powershell:

<!-- more -->

**Here is a peace of xml file**

<pre class="wp-code-highlight prettyprint">&lt;?xml version="1.0" standalone="yes"?&gt;
&lt;CoverageDSPriv&gt;
  &lt;Module&gt;
    &lt;ModuleName&gt;myLib.dll&lt;/ModuleName&gt;
    &lt;ImageSize&gt;122880&lt;/ImageSize&gt;
    &lt;ImageLinkTime&gt;0&lt;/ImageLinkTime&gt;
    &lt;LinesCovered&gt;791&lt;/LinesCovered&gt;
    &lt;LinesPartiallyCovered&gt;23&lt;/LinesPartiallyCovered&gt;
    &lt;LinesNotCovered&gt;856&lt;/LinesNotCovered&gt;
    &lt;BlocksCovered&gt;1220&lt;/BlocksCovered&gt;
    &lt;BlocksNotCovered&gt;1289&lt;/BlocksNotCovered&gt;
    &lt;NamespaceTable&gt;
      &lt;BlocksCovered&gt;939&lt;/BlocksCovered&gt;
      &lt;BlocksNotCovered&gt;1054&lt;/BlocksNotCovered&gt;
    &lt;/NamespaceTable&gt;
  &lt;/Module&gt;
&lt;/CoverageDSPriv&gt;
</pre>

**PowerShell converts XML elements to properties on .NET objects without the need to
  
write any parsing code!**

<pre class="wp-code-highlight prettyprint">$coverageFileXml = “C:tempmyCoverageInfo.xml”
[xml]$xml = (get-content $coverageFileXml)
[int]$BlocksCovered = $xml.CoverageDSPriv.Module.BlocksCovered
[int]$BlocksNotCovered = $xml.CoverageDSPriv.Module.BlocksNotCovered
[int]$TotalBlocks = $BlocksCovered + $BlocksNotCovered
$CoveragePercent = $BlocksCovered * 100 / $TotalBlocks
$CoveragePercent2Decimals =  "{0:N2}" -f $CoveragePercent
Write-Host "Coverage is $CoveragePercent2Decimals %" 
</pre>

**Output is : Coverage is 48.62 %**

More exemples <span style="text-decoration: underline;"><a href="http://www.codeproject.com/Articles/61900/PowerShell-and-XML" target="_blank">here</a></span>.

**Luc**
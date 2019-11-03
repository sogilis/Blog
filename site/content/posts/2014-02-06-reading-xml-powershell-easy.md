---
title: Reading xml from PowerShell is really easy!
author: Luc
date: 2014-02-06T08:07:00+00:00
featured_image: /img/2016/04/2.La-vie-a-Sogilis.jpg
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

**Here is a peace of xml file**

{{< highlight xml >}}

<?xml version="1.0" standalone="yes"?>
<CoverageDSPriv>
  <Module>
    <ModuleName>myLib.dll</ModuleName>
    <ImageSize>122880</ImageSize>
    <ImageLinkTime>0</ImageLinkTime>
    <LinesCovered>791</LinesCovered>
    <LinesPartiallyCovered>23</LinesPartiallyCovered>
    <LinesNotCovered>856</LinesNotCovered>
    <BlocksCovered>1220</BlocksCovered>
    <BlocksNotCovered>1289</BlocksNotCovered>
    <NamespaceTable>
      <BlocksCovered>939</BlocksCovered>
      <BlocksNotCovered>1054</BlocksNotCovered>
    </NamespaceTable>
  </Module>
</CoverageDSPriv>
{{< /highlight >}}

**PowerShell converts XML elements to properties on .NET objects without the need to write any parsing code!**

{{< highlight powershell >}}
$coverageFileXml = “C:tempmyCoverageInfo.xml”
[xml]$xml = (get-content $coverageFileXml)
[int]$BlocksCovered = $xml.CoverageDSPriv.Module.BlocksCovered
[int]$BlocksNotCovered = $xml.CoverageDSPriv.Module.BlocksNotCovered
[int]$TotalBlocks = $BlocksCovered + $BlocksNotCovered
$CoveragePercent = $BlocksCovered \* 100 / $TotalBlocks
$CoveragePercent2Decimals = "{0:N2}" -f $CoveragePercent
Write-Host "Coverage is $CoveragePercent2Decimals %"
{{< /highlight >}}

**Output is : Coverage is 48.62 %**

More exemples [here](http://www.codeproject.com/Articles/61900/PowerShell-and-XML).

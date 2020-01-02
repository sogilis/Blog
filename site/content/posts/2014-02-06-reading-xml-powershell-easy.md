---
title: Reading xml from PowerShell is really easy!
author: Luc
date: 2014-02-06T08:07:00+00:00
image: /img/2016/04/2.La-vie-a-Sogilis.jpg
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

**Output is : Coverage is 48.62 %**

More exemples [here](http://www.codeproject.com/Articles/61900/PowerShell-and-XML).

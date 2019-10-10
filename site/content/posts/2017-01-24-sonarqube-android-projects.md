---
title: SonarQube for Android Projects
author: Tiphaine
date: 2017-01-24T09:26:44+00:00
featured_image: /wp-content/uploads/2016/04/2.Notre-vision.jpg
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
  - 33118
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
  - Android
  - Couverture
  - Coverage
  - dev
  - développement
  - Gradle
  - Java
  - javascript
  - Measure
  - Mesure
  - Qualité
  - Quality
  - SonarQube

---
# <span style="font-weight: 400;">How to monitor code quality of your Android application with SonarQube ?</span>

<span style="font-weight: 400;"><a href="http://www.sonarqube.org" target="_blank">SonarQube.org</a></span><span style="font-weight: 400;"> is a powerful tool to monitor and analyze code quality, and especially technical debt on Java projects (and more). As Android projects are based on Java sources, it is possible to analyze such projects with SonarQube. But if you already tried this, you probably noticed how difficult it is to find right and complete documentation.</span>

<span style="font-weight: 400;">So, we will see here how to configure an existing Android project built with </span>**gradle** <span style="font-weight: 400;">with 3 different modules: a </span>**android application**<span style="font-weight: 400;">, a </span>**android library,** <span style="font-weight: 400;">and a common </span>**java library**<span style="font-weight: 400;">.</span>

&nbsp;

<span style="font-weight: 400;">A sample project is available here: </span><span style="text-decoration: underline; color: #0000ff;"><a style="color: #0000ff;" href="https://github.com/sogilis/sonarqube-for-android-example"><span style="font-weight: 400;">https://github.com/sogilis/sonarqube-for-android-example</span></a><span style="font-weight: 400;">.</span></span>

## <span style="font-weight: 400;">Prerequisites</span>

<span style="font-weight: 400;">Gradle 3.x is not compatible with Sonar plugin, you have to choose </span>**Gradle 2.x**<span style="font-weight: 400;">.</span>

## <span style="font-weight: 400;">Get SonarQube Server</span>

<span style="font-weight: 400;">First of all, a SonarQube server instance may be useful to check your configuration.</span>

<span style="font-weight: 400;">The simplest way to do this is maybe with the </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://store.docker.com/images/3f8fc4ce-eb8e-40ad-88ba-69e97299c64f?tab=description"><span style="font-weight: 400;">sonarqube docker image</span></a></span></span><span style="font-weight: 400;">, especially with </span>**sonarqube:alpine** <span style="font-weight: 400;">lightweight image.</span>

## <span style="font-weight: 400;">Configure Gradle</span>

<span style="font-weight: 400;">Add the following configuration in </span>**build.gradle** <span style="font-weight: 400;">for an </span>**android application** <span style="font-weight: 400;">module (i.e. with </span>**com.android.application** <span style="font-weight: 400;">plugin):</span>

<pre class="wp-code-highlight prettyprint">buildscript {
   dependencies {
       classpath "org.sonarsource.scanner.gradle:sonarqube-gradle-plugin:2.0.1"
   }
}

apply plugin: &#039;org.sonarqube&#039;

sonarqube {
   properties {
       // TODO Update your android.jar path (with path and Android version)
       def libraries = project.android.sdkDirectory.getPath() + "/platforms/android-23/android.jar" + ", build/intermediates/exploded-aar/**/classes.jar"

       property "sonar.sources", "src/main/java"
       // Defines where the java files are
       property "sonar.binaries", "build/intermediates/classes/debug"
       property "sonar.libraries", libraries
       // Defines where the xml files are
       property "sonar.java.binaries", "build/intermediates/classes/debug"
       property "sonar.java.libraries", libraries

       property "sonar.tests", "src/test/java, src/androidTest/java"

       property "sonar.java.test.binaries", "build/intermediates/classes/debug"
       property "sonar.java.test.libraries", libraries

       property "sonar.jacoco.reportPath", "build/jacoco/testDebugUnitTest.exec"
       property "sonar.java.coveragePlugin", "jacoco"
       property "sonar.junit.reportsPath", "build/test-results/Debug"
       property "sonar.android.lint.report", "build/outputs/lint-results.xml"
   }
}</pre>

<span style="font-weight: 400;">Add the same configuration in </span>**build.gradle** <span style="font-weight: 400;">for an </span>**android library** <span style="font-weight: 400;">module (i.e. with </span>**com.android.library** <span style="font-weight: 400;">plugin) with following modifications:</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Remove </span><span style="font-weight: 400;">« build/intermediates/exploded-aar/**/classes.jar »</span><span style="font-weight: 400;"> from </span><span style="font-weight: 400;">library</span><span style="font-weight: 400;"> variable as follow:</span>
</li>

<pre class="wp-code-highlight prettyprint">def libraries = project.android.sdkDirectory.getPath() + "/platforms/android-23/android.jar"</pre>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Remove folder </span><span style="font-weight: 400;">src/androidTest/java</span><span style="font-weight: 400;"> from</span><span style="font-weight: 400;"> “sonar.tests” </span><span style="font-weight: 400;">property as follow:</span>
</li>

<pre class="wp-code-highlight prettyprint">property "sonar.tests", "src/test/java"</pre>

&nbsp;

<span style="font-weight: 400;">SonarQube configuration for a </span>**java module** <span style="font-weight: 400;">is straightforward with a single line in </span>**build.gradle**<span style="font-weight: 400;">:</span>

<pre class="wp-code-highlight prettyprint">apply plugin: &#039;org.sonarqube&#039;</pre>

## <span style="font-weight: 400;">Test your configuration</span>

<span style="font-weight: 400;">Now, you can test your configuration by analyzing your project with a SonarQube server:</span>

<pre class="wp-code-highlight prettyprint">./gradlew clean test jacocoTestReport sonarqube \
          -Dsonar.host.url=http://[Sonarqube server IP]:9000 \
          --info --stacktrace</pre>

## <span style="font-weight: 400;">Configure SonarQube analysis</span>

<span style="font-weight: 400;">In addition to standard Java rules plugin (like </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://github.com/checkstyle/sonar-checkstyle"><span style="font-weight: 400;">Checkstyle</span></a></span></span><span style="font-weight: 400;">, </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://github.com/SonarQubeCommunity/sonar-findbugs"><span style="font-weight: 400;">Findbugs</span></a></span></span><span style="font-weight: 400;">, </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://github.com/SonarQubeCommunity/sonar-pmd"><span style="font-weight: 400;">PMD</span></a></span></span><span style="font-weight: 400;">), you can install a SonarQube plugin dedicated to Android : </span>[<span style="font-weight: 400;"><span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;">Android</span> <span style="color: #0000ff; text-decoration: underline;">Lint</span> </span><span style="text-decoration: underline; color: #0000ff;">Plugin</span></span>][1]<span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">This plugin will parse and import android lint report.</span>

## <span style="font-weight: 400;">Code coverage</span>

<span style="font-weight: 400;">The configuration above does not provide any code coverage metrics. This can be done with jacoco in </span>**android application and library**<span style="font-weight: 400;">:</span>

<pre class="wp-code-highlight prettyprint">buildscript {
   dependencies {
       classpath "com.dicedmelon.gradle:jacoco-android:0.1.1"
   }
}

apply plugin: &#039;jacoco-android&#039;

android {
   debug {
      testCoverageEnabled = true
   }
   testOptions {
      unitTests.all {
         jacoco {
            includeNoLocationClasses = true
         }
      }
   }
}

sonarqube {
   properties {
       property "sonar.jacoco.reportPath", "build/jacoco/testDebugUnitTest.exec"
       property "sonar.java.coveragePlugin", "jacoco"
   }
}

jacoco {
   toolVersion = "0.7.6.201602180812"
}

jacocoAndroidUnitTestReport {
   csv.enabled false
   html.enabled false
   xml.enabled true
}</pre>

<span style="font-weight: 400;">… and as follow with java modules:</span>

<pre class="wp-code-highlight prettyprint">apply plugin: &#039;jacoco&#039;

jacoco {
   toolVersion = "0.7.6.201602180812"
}</pre>

## <span style="font-weight: 400;">Result</span>

<span style="font-weight: 400;">Here is what you can get :</span>

<img class="aligncenter size-full wp-image-1701" src="http://sogilis.com/wp-content/uploads/2017/01/SonarQube.jpg" alt="SonarQube" width="904" height="451" srcset="http://sogilis.com/wp-content/uploads/2017/01/SonarQube.jpg 904w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-300x150.jpg 300w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-768x383.jpg 768w" sizes="(max-width: 904px) 100vw, 904px" />

## <span style="font-weight: 400;">Android Studio plugin</span>

<span style="font-weight: 400;">Android Studio can analyze your code in real time with </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://developer.android.com/studio/write/lint.html"><span style="font-weight: 400;">Android Lint</span></a></span></span><span style="font-weight: 400;">. But it is also possible to install </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="http://www.sonarlint.org/intellij/"><span style="font-weight: 400;">SonarLint for IntelliJ</span></a></span></span> <span style="font-weight: 400;">and analyze your code based on SonarQube configuration.</span>

## <span style="font-weight: 400;">Useful tips</span>

<span style="font-weight: 400;">You can skip some project from being analyzed like this:</span>

<pre class="wp-code-highlight prettyprint">sonarqube {
   skipProject = true
}</pre>

<span style="font-weight: 400;">… or like this from parent </span>**build.gradle**<span style="font-weight: 400;">:</span>

<pre class="wp-code-highlight prettyprint">project(":modulename_to_skip") {
   sonarqube {
       skipProject = true
   }
}</pre>

<span style="font-weight: 400;">You can overwrite sonar project name and key like this:</span>

<pre class="wp-code-highlight prettyprint">sonarqube {
    properties {
        property "sonar.projectName", "My project"
        property "sonar.projectKey", "com.organisation:my-project"
    }
}</pre>

## <span style="font-weight: 400;">Limitations</span>

<span style="font-weight: 400;">Android flavors are not managed natively with SonarQube gradle plugin. You have to choose a single flavor when analyzing your sources.</span>

<span style="font-weight: 400;">The given configuration here allow you to analyze a single module without others. But each module will appear as a stand alone project in SonarQube like this:</span>

<img class="aligncenter size-large wp-image-1702" src="http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects-1024x225.jpg" alt="SonarQube Projects" width="669" height="147" srcset="http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects-1024x225.jpg 1024w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects-300x66.jpg 300w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects-768x169.jpg 768w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects.jpg 1214w" sizes="(max-width: 669px) 100vw, 669px" />

<span style="font-weight: 400;">If you want all modules in a single project in SonarQube, you can move SonarQube plugins from modules to parent </span>**build.gradle** <span style="font-weight: 400;">(see </span><span style="text-decoration: underline;"><span style="color: #0000ff;"><a style="color: #0000ff;" href="https://github.com/sogilis/sonarqube-for-android-example/tree/merge_modules_in_single_sonarqube_project"><span style="font-weight: 400;">branch merge_modules_in_single_sonarqube_project in example project</span></a></span></span><span style="font-weight: 400;">):</span>

<img class="aligncenter size-large wp-image-1703" src="http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects2-1024x165.jpg" alt="SonarQube Projects2" width="669" height="108" srcset="http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects2-1024x165.jpg 1024w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects2-300x48.jpg 300w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects2-768x124.jpg 768w, http://sogilis.com/wp-content/uploads/2017/01/SonarQube-Projects2.jpg 1227w" sizes="(max-width: 669px) 100vw, 669px" />

## <span style="font-weight: 400;">Possible issues</span>

<li style="font-weight: 400;">
  <span style="font-weight: 400;">Follow gradle constraints (</span><b>buildscript</b><span style="font-weight: 400;"> before </span><b>plugins</b><span style="font-weight: 400;"> before else)</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">StackOverflowError : remove involved rule or source file</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">Exception while applying a rule : remove rule</span>
</li>

<pre class="wp-code-highlight prettyprint">Exception applying rule CommentDefaultAccessModifier on file /Users/Jibidus/Development/Sogilis/Repos/sonarqube-for-android-example/android-app/src/main/java/com/sogilis/example/android/app/MainActivity.java, continuing with next rule
java.lang.NullPointerException</pre>

<li style="font-weight: 400;">
  <b>StackOverflowError</b><span style="font-weight: 400;"> with </span><b>sonar-gradle-plugin 2.1</b><span style="font-weight: 400;"> : downgrade to </span><b>2.0.1</b>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">Jenkins does not find XML test report. Check Jenkins does look after </span><span style="font-weight: 400;">*/build/test-results/**/*.xml</span><span style="font-weight: 400;">.</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">My workspace:module-name</span><span style="font-weight: 400;"> is not a valid project or module key. Allowed characters are alphanumeric, &lsquo;-&lsquo;, &lsquo;_&rsquo;, &lsquo;.&rsquo; and &lsquo;:&rsquo;, with at least one non-digit. The Default SonarQube project name is the project folder. So if this folder contains invalid character, this could be the explanation. You can set project name and key (see tips above).</span>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">:jacocoTestReport SKIPPED</span><span style="font-weight: 400;">: run </span><b>test</b><span style="font-weight: 400;"> task before </span><b>jacocoTestReport</b>
</li>
<li style="font-weight: 400;">
  <span style="font-weight: 400;">org.gradle.internal.jvm.Jvm.getRuntimeJar()Ljava/io/File</span><span style="font-weight: 400;"> : incompatible gradle version. Downgrade from gradle 3 to 2.</span>
</li>

## <span style="font-weight: 400;">Appendix</span>

<span style="font-weight: 400;">Here are some useful links to go further:</span>

<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="http://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner+for+Gradle"><span style="font-weight: 400;">SonarQube gradle plugin documentation</span></a></span></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="http://macoscope.com/blog/using-sonarqube-with-jenkins-continuous-integration-and-github-to-improve-code-review/"><span style="font-weight: 400;">Using SonarQube with Jenkins Continuous Integration and GitHub to Improve Code Review</span></a></span></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="https://www.coshx.com/blog/2015/03/31/android-continuous-integration-using-gradle-android-studio-and-jenkins/"><span style="font-weight: 400;">Android continuous integration using Gradle, Android Studio and Jenkins</span></a></span></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="http://docs.sonarqube.org/display/PLUG/GitHub+Plugin"><span style="font-weight: 400;">SonarQube GitHub Plugin</span></a></span></span>
</li>
<li style="font-weight: 400;">
  <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="http://www.sonarqube.org/github-pull-request-analysis-helps-fix-the-leak/"><span style="font-weight: 400;">GitHub pull request analysis</span></a></span></span>
</li>
  * <span style="text-decoration: underline;"><span style="color: #0000ff; text-decoration: underline;"><a style="color: #0000ff; text-decoration: underline;" href="http://stackoverflow.com/questions/32047585/jenkins-sonar-github-integration"><span style="font-weight: 400;">jenkins + sonar + github integration</span></a></span></span><span style="color: #ff0000;"><br /> </span>

Jean-Baptiste

&nbsp;

 [1]: https://github.com/SonarQubeCommunity/sonar-android
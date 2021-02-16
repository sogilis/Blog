---
title: SonarQube for Android Projects
author: Jean-Baptiste
date: 2017-01-24T09:26:44+00:00
image: /img/2016-04-2.Notre-vision.jpg
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

# How to monitor code quality of your Android application with SonarQube ?

[SonarQube.org](http://www.sonarqube.org) is a powerful tool to monitor and analyze code quality, and especially technical debt on Java projects (and more). As Android projects are based on Java sources, it is possible to analyze such projects with SonarQube. But if you already tried this, you probably noticed how difficult it is to find right and complete documentation.

So, we will see here how to configure an existing Android project built with **gradle** with 3 different modules: a **android application**, a **android library,** and a common **java library**.

A sample project is available here: [https://github.com/sogilis/sonarqube-for-android-example](https://github.com/sogilis/sonarqube-for-android-example).

## Prerequisites

Gradle 3.x is not compatible with Sonar plugin, you have to choose **Gradle 2.x**.

## Get SonarQube Server

First of all, a SonarQube server instance may be useful to check your configuration.

The simplest way to do this is maybe with the [sonarqube docker image](https://store.docker.com/images/3f8fc4ce-eb8e-40ad-88ba-69e97299c64f?tab=description), especially with **sonarqube:alpine** lightweight image.

## Configure Gradle

Add the following configuration in **build.gradle** for an **android application** module (i.e. with **com.android.application** plugin):

```groovy
buildscript {
   dependencies {
       classpath "org.sonarsource.scanner.gradle:sonarqube-gradle-plugin:2.0.1"
   }
}

apply plugin: 'org.sonarqube'

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
}
```

Add the same configuration in **build.gradle** for an **android library** module (i.e. with **com.android.library** plugin) with following modifications:

- Remove « build/intermediates/exploded-aar/\*\*/classes.jar » from library variable as follow:

  ```groovy
  def libraries = project.android.sdkDirectory.getPath() + "/platforms/android-23/android.jar"
  ```

- Remove folder src/androidTest/java from “sonar.tests” property as follow:
  ```groovy
  property "sonar.tests", "src/test/java"
  ```

SonarQube configuration for a **java module** is straightforward with a single line in **build.gradle**:

```groovy
apply plugin: 'org.sonarqube'
```

## Test your configuration

Now, you can test your configuration by analyzing your project with a SonarQube server:

```bash
./gradlew clean test jacocoTestReport sonarqube \
          -Dsonar.host.url=http://[Sonarqube server IP]:9000 \
          --info --stacktrace
```

## Configure SonarQube analysis

In addition to standard Java rules plugin (like Plugin][1].

This plugin will parse and import android lint report.

## Code coverage

The configuration above does not provide any code coverage metrics. This can be done with jacoco in **android application and library**:

```java
buildscript {
   dependencies {
       classpath "com.dicedmelon.gradle:jacoco-android:0.1.1"
   }
}

apply plugin: 'jacoco-android'

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
}
```

… and as follow with java modules:

```java
apply plugin: 'jacoco'

jacoco {
   toolVersion = "0.7.6.201602180812"
}
```

## Result

Here is what you can get :

![SonarQube](/img/2017-01-SonarQube.jpg)

## Android Studio plugin

Android Studio can analyze your code in real time with SonarLint for IntelliJ</a> and analyze your code based on SonarQube configuration.

## Useful tips

You can skip some project from being analyzed like this:

```java
sonarqube {
   skipProject = true
}
```

… or like this from parent **build.gradle**:

```groovy
project(":modulename_to_skip") {
   sonarqube {
       skipProject = true
   }
}
```

You can overwrite sonar project name and key like this:

```java
sonarqube {
    properties {
        property "sonar.projectName", "My project"
        property "sonar.projectKey", "com.organisation:my-project"
    }
}
```

## Limitations

Android flavors are not managed natively with SonarQube gradle plugin. You have to choose a single flavor when analyzing your sources.

The given configuration here allow you to analyze a single module without others. But each module will appear as a stand alone project in SonarQube like this:

![SonarQube Projects](/img/2017-01-SonarQube-Projects-1024x225.jpg)

If you want all modules in a single project in SonarQube, you can move SonarQube plugins from modules to parent **build.gradle** (see branch [merge_modules_in_single_sonarqube_project](https://github.com/sogilis/sonarqube-for-android-example/tree/merge_modules_in_single_sonarqube_project) in example project):

![SonarQube Projects2](/img/2017-01-SonarQube-Projects2-1024x165.jpg)

## Possible issues

- Follow gradle constraints (**buildscript** before **plugins** before else)
- StackOverflowError : remove involved rule or source file
- Exception while applying a rule : remove rule

```bash
Exception applying rule CommentDefaultAccessModifier on file /Users/Jibidus/Development/Sogilis/Repos/sonarqube-for-android-example/android-app/src/main/java/com/sogilis/example/android/app/MainActivity.java, continuing with next rule
java.lang.NullPointerException
```

- **StackOverflowError** with **sonar-gradle-plugin 2.1** : downgrade to **2.0.1**
- Jenkins does not find XML test report. Check Jenkins does look after _/build/test-results/\*\*/_.xml.
- My workspace:module-name is not a valid project or module key. Allowed characters are alphanumeric, `-`, `_`, `.` and `:`, with at least one non-digit. The Default SonarQube project name is the project folder. So if this folder contains invalid character, this could be the explanation. You can set project name and key (see tips above).
- :jacocoTestReport SKIPPED: run **test** task before **jacocoTestReport**
- org.gradle.internal.jvm.Jvm.getRuntimeJar()Ljava/io/File : incompatible gradle version. Downgrade from gradle 3 to 2.

## Appendix

Here are some useful links to go further:

- [SonarQube gradle plugin documentation](http://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner+for+Gradle)
- [SonarQube GitHub Plugin](http://docs.sonarqube.org/display/PLUG/GitHub+Plugin)
- [GitHub pull request analysis](http://www.sonarqube.org/github-pull-request-analysis-helps-fix-the-leak/)
- [jenkins + sonar + github integration](http://stackoverflow.com/questions/32047585/jenkins-sonar-github-integration)

Jean-Baptiste

[1]: https://github.com/SonarQubeCommunity/sonar-android

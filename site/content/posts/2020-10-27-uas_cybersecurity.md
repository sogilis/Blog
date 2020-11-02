---
title: Toward Cybersecurity - UAS operations use case
author: Duc, Amin
date: 2020-10-26
image: /img/article_uas_cybersecurity/2020_10_27_cybersecurity.jpg
categories:
  - DÉVELOPPEMENT
tags:
  - code
  - dev

---
***Abstract—* For several years, the civil Unmanned Aircraft System (UAS) has become more and more popular with many applications such as aerial photography, goods transportation, surveillance, etc. However, the lack of human observation, communication capacities, and protection makes UAS a good target for cyber-attacks. Therefore, the risk related to the cybersecurity of UAS should be assessed and taken into account in the early phase of UAS development.**   

## I. Introduction

To deal with the progressive increase in the number of UAS operations, the European Aviation Safety Agency (EASA) classified UAS operations into three categories according to their risk levels: Open, Specific and Certified. In the "Specific" category, we could expect the operation of large drones flying above populated areas, out of the visual line of sight of the pilot and sharing the airspace with manned aircrafts. These operations could pose significant harm to the people overflown and the manned aircraft, especially in the case of a cyber-attack. 
To the best of our knowledge, the most common risk assessment methodology in the UAS domain is Specific Operation Risk Assessment (SORA), which is endorsed by the European Union Aviation Safety Agency (EASA) as an acceptable means to fulfill the requirements of the EU regulations related to UAS. However, at this moment, the methodology focuses on only the safety aspect and ignores the cybersecurity aspect.
 
## II. GENERAL CONCEPT OF THE SORA METHODOLOGY 

### A. Risk Model 

At this moment, the SORA methodology considers only risks of harms to a person’s life: “fatal injuries to third parties on ground”, “fatal injuries to third parties in air”. To illustrate the risk scenarios related to these harms (or how these harms could happen), the methodology provides a risk model as shown in Figure 1. It includes three major segments: Harms, Hazard, Threats. The direct causes of these harms is a generic hazard “UAS operation out of control” shown in the center of the model. This hazard is defined as an operation being conducted outside of the operator’s intention
(e.g the aircraft flies outside of visual observation of the pilot in a Visual Line Of Sight operation). The hazard could be caused by several threats which are grouped into categories in the left part of the model. Because SORA methodology considers only the safety aspect but not the security aspect, only unintentional threat categories are represented in the model.

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_001.png" title="Figure 1. Risk Model of the SORA methodology" width="700">}}

### B. Assessment process 

1) Quantitative approach:
Traditionally, the risk assessment process requires to analyze two parameters of risk: 
- Likelihood,
- Severity.

However, the risks in the SORA methodology is tied to only likelihood parameters because the methodology basically focuses on only risks of harms to the person’s life. The severity of these harms could be considered as extremely high. In other words, the safety objectives will be determined to maintain the likelihood of each harm under the acceptable value (10-6  fatal injuries per flight hour, equivalent to some manned aircraft operation).

2)	Qualitative approach:
The SORA methodology proposes a qualitative approach based on the main ideas of the quantitative approach. First, we determine two qualitative factors: 
-	Ground Risk Class (GRC)
-	 Air Risk Class (ARC).

These factors represent qualitatively the likelihoods that the harms occur in the case of UAS operation out of control. The GRC and ARC are determined based on the intrinsic characteristics of the operation such as operational area, attitude, weight of the UAS and the availability of harm barriers.

Then, we determine two Specific Assurance and Integrity Levels (SAIL) values, which represent the
level of confidence that the UAS operation will stay under control. One SAIL value corresponds to GRC and the other corresponds to ARC. Then, the higher SAIL value will be chosen as an objective to drive the required safety objectives.

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_002.png" title="Figure 2. SAIL Determination" width="300" align="center">}}

## III.	Toward Cybersecurity

Our proposed solution consists of two parts which are called Harm Extension and Threat Extension. 

**Harm Extension** extends the risk scenarios under consideration with new harms; and completes the evaluation of critical level of a given UAS operation. 

**Threat Extension** extends the scenarios under consideration with new cybersecurity threats; and determines the corresponding threat barriers for a given UAS operation. 

In Harm Extension, we concern the harm-side of the risk model. Besides the harms to the person’s life, the public concerns also the other harms such as:
-	Privacy Violation
-	Physical damages to infrastructure
-	Digital damages to infrastructure

Therefore, these new harms come to mind as important issues that should be taken into account in the methodology. In Harm Extension, our strategy to address the new harms includes four steps as follows:

1) Chose a new harm that needs to be addressed
2) Determine factors/characteristics of the UAS operation, which have an impact on the likelihood of the chosen harm.
3) Establish formulas or tables to evaluate qualitatively the likelihood based on the determined factors
4) Extend “SAIL determination” step to cover the likelihood of the new harm.

In Threat Extension, we will concern the threat-side of the risk model. The potential cybersecurity threats need to be identified and grouped in new threat categories. To illustrate the new scenarios, the new threat categories will be added into the threat-side of the risk model as shown in Figure 3. Corresponding to each new threat category, a list of possible threat barriers will be also established. For a given UAS operation, the new threat barriers are chosen in correspondence with the value of the SAIL factor.

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_003.png" title="Figure 3. Extended risk model" width="700" align="center">}}

## IV.	CYBERSECURITY for privacy issues in UAS operations

Nowadays, the privacy violation is one of the most concerned issues for public acceptance of UAS application. However, the general privacy is a very large term and it’s difficult to define it precisely and to address it. We will focus on only three aspects of this harm: 

1) Disclosure of personal information;
2) Illegal personal surveillance; and
3) Intrusion into private location.

We first analyze the likelihood of the privacy violation to determine the possible factors related to this harm, which could be used for the assessment. Then we propose extensions for the assessment process by adding a new step called “Privacy Risk Class (PRC) determination”. With the privacy harm taken into account, the objective of risk assessment is extended to maintain the harm likelihood to privacy under a certain acceptable level. 

Similar to the likelihood of harms to the person’s life, the one of the privacy harm could be decomposed as shown in Figure 4. The combination of the two components (2) and (3) of this equation represents the likelihood that the privacy of third parties is violated after ”UAS operation out of control”.

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_004.png" title="Figure 4. Likelihood of privacy violation" width="700" align="center">}}

We identified three intrinsic features of a UAS operation to evaluate the likelihood of privacy violation in case of “UAS operation out of control”:

- Density of operational area: urban zone vs. rural zone
- Type of operation: BLOS vs. BVLOS (Beyond Visual Line of Sight)
- Level of detail of the captured images.

Similar to harms introduced in the classical SORA methodology, the likelihood of privacy harm could be reduced by applying some harm barriers. In this extension, we address three types of harm barriers to mitigate the privacy harms:

-	Privacy protection filters: these algorithms reduce unnecessary information that could violate the privacy of person from the video/image such as Blurring, Pixelization, Masking, Warping
-	 Restriction on private space: the operator avoids making a flight path across a private space
-	 Operation-aware announcement to public: the public under observation of a UAS operation should be informed about it.

the likelihood of privacy violation in the case of ”UAS operation out of control” is represented qualitatively by the Privacy Risk Class (PRC) value. The intrinsic PRC value is determined based on the intrinsic features of operation as shown in Figure 5.

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_005.png" title="Figure 5. Intrinsic PRC Determination" width="600" align="center">}}

{{< figure src="/img/article_uas_cybersecurity/uas_cybersecurity_006.png" title="Figure 6. PRC Correction factor of harm barriers" width="600" align="center">}}

Then the determined intrinsic PRC could be reduced by the harm barriers: “Privacy protection filters”, “Restriction on private space” and “Operation-aware announcement to public”. Each harm barrier corrects the intrinsic PRC with a reduction factor shown in figure 6. 

According to figure 5, the intrinsic PRC is at the C level. Upon analysis of the privacy issue, the operator decides to upgrade the onboard camera with a digital filter that makes image of a person blur and unable to be recognized. In this case, the PRC is reduced with 1 level from the C to B level.

The last step consists in new SAIL determination, the process is described as follows:

1) Determine a SAIL corresponding to the values of ARC and GRC (see Figure. 2) (classical SORA methodology). This value is called 2D-SAIL.
2) Determine SAIL value corresponding to PRC value
3) Choose the higher SAIL value (more critical) between the two determined SAIL values as the 3D-SAIL or the final SAIL corresponding to the operation.

The 2D-SAIL and 3D-SAIL mentioned above are two different values. The main different point between them
is only the way that they are determined. The 2D-SAIL is a combination of GRC and ARC without taking into account PRC (privacy harm). Meanwhile 3D-SAIL takes into account the privacy harm. But both of them represent the level of confidence that “the UAS operation will stay under control” that needs to be achieved.

## IV.	Conclusions

The risk assessment process could be resumed as: 

1) Evaluation of the critical level of a UAS operation based on the likelihood of harms, 
2) Determinatino of safety objectives corresponding to the critical level. 

Based on this concept, we proposed a general approach to extend the existing methodology to support cybersecurity aspect by adding new relevant threats and harms. New harms will be taken into account to evaluate the critical level of the UAS operation. Meanwhile, new threats will be added to anticipate new causes of incidents related to cybersecurity and determine corresponding means of mitigation (or cybersecurity objectives).







---
title: ""
tags: [""]
abrv: null
draft: false
references:
  [
    "https://mne.tools/stable/auto_tutorials/stats-sensor-space/10_background_stats.html",
    "https://en.wikipedia.org/wiki/Statistical_inference",
  ]
---

Statistical inference is the process of drawing conculusions about a poulations properties based on a sample taken from the population. It allows to draw conculusions beyond the data available. Statstical inference is used together with hypotheses that are validated (failed to reject) or rejected through exeripments.

### Fundamental assumptions of inference

- a sample is likely to be a good representation of a population
- there is a certain degree of uncetainty in how well the sample represents a population
- the sampling technique used to draw from a population matters

### Types of interference

#### Frequentist interference

Frequentist interference aims to test for the plausability of propositions (hyptoheses) considering repeated sampling from a population that was generated by an underlying distrubtion function (data generating process). The techniques used to test those hypotheses are:

- p-values
- Confidence intervals
- Null hyptoehsis and significance testing

#### Bayesian interference

Bayesian interference is aiming to describe the probability (or as it's called, the _degree of belief_) that an event is happening, while taking in consideration posterior beliefs. Common techniques are:

- Credible intervals
- Bayesian factors

### Interfernce models

Statistical interference requires assumptions. Those assumptions form a statistical model. A set of assumptions describe the generation of data similar to the observed data. Data and hence the models generating it fall into three categories:

- **Fully parametric** means that the number of parameters in the model are finite. The parameters in the model are able to fully describe the data generating process
- **Non-parametric** means that the numbers of parameters in the model are infite and hence cannot be captured by parameters, for example when the data is distribution free
- **Semi-parametrized** means that the model has some parametric as well as nonparametric components. It has anywhere between infitie and finite parameters

### Outputs of statistical inference

Statistical inference can be used to generate insights such as:

- **Point estimate** is a value that most likely approximates the populations property
- **Confidence interval** In frequentist probability the confidence interval is a probable interval (range) of values which even with repeated sampling will stay within the interval, given a certain confidence level
- **Credible interval** In bayesian statistics the credible interval is a probable interval that an unobserved, posterior parameter will occure with a certain probability
- **Clustering** can be performed by formulating the null hyptoehsis as the size of a cluster
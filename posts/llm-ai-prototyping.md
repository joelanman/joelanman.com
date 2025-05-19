---
layout: main.njk
title: Joe Lanman - Making an LLM/AI web app for GOV.UK prototyping
---

Joe Lanman - Designer

<div class="home-link">

  [Home](/)

</div>


# Making an LLM/AI web app for GOV.UK prototyping


I made an LLM/AI web app to configure GOV.UK components for prototypes, you can try it here:

[Component pad](https://component-pad-production.up.railway.app)

## What it does

Note - this is an experiment and not an official GOV.UK project.

<img width="1999" height="1393" src="/assets/images/component-pad.png" alt="Screenshot. Component pad. List of components down the left side. Heading GOV.UK Frontend Checkboxes. Link component guide. Textarea prompt, contains text pizza toppings add a none option. Button update. Heading response, a rendered list of checkboxes for pizza toppings, with a None option. Links for HTML and Nunjucks.">

First you select a component, for example checkboxes, then you prompt for the configuration you want. The app shows the component with that configuration (mostly - we’ll come back to this), and you can view the code to copy and paste into your prototype.

## Background

A few years ago I co-founded the [GOV.UK Prototype Kit](/projects/govuk-prototype-kit) - an app to quickly make working, accessible prototypes of GOV.UK services and test them with people.

The kit uses components from the [GOV.UK Design System](https://design-system.service.gov.uk/), however we know from research that it can be tricky to design in code. Some of the components can get quite complex, for example here is the code for some checkboxes:

```
{% raw %}
{{ govukCheckboxes({
  name: "waste",
  fieldset: {
    legend: {
      text: "Which types of waste do you transport?",
      isPageHeading: true,
      classes: "govuk-fieldset__legend--l"
    }
  },
  hint: {
    text: "Select all that apply"
  },
  items: [
    {
      value: "carcasses",
      text: "Waste from animal carcasses"
    },
    {
      value: "mines",
      text: "Waste from mines or quarries"
    },
    {
      value: "farm",
      text: "Farm or agricultural waste"
    }
  ]
}) }}
{% endraw %}
```

So I thought this might be an area where LLMs (large language models, also referred to as AI) might be helpful.

Before I talk about how it works under the hood, I want to talk about some of the issues with LLMs.

## The problem with LLMs

Ah so many! But let’s focus on a few:

Hype and mis-selling is a big one – I think calling the technology ‘AI’ is part of that. LLMs store a huge amount of ‘training’ data, then take an input and provide a likely output based on that training data. This is an interesting technology and can be useful, but it isn’t ‘intelligent’. Even now the best models confidently make mistakes. Asked about GOV.UK components that don’t exist, they will simply make up an answer that seems plausible. I think it’s dangerous to base anything important on such unreliable tech.

Ethics – in particular what the training data is and where it comes from. None of the big LLM companies will say, but we know that by hoovering up as much as they can, it contains all sorts of [copyright](https://hls.harvard.edu/today/does-chatgpt-violate-new-york-times-copyrights/), personal and inappropriate material.

Climate impact – we know that LLMs take a large amount of energy to train, and again when prompted. In addition the data centres where they run [use a lot of water for cooling](https://www.theguardian.com/environment/2025/apr/09/big-tech-datacentres-water), a valuable resource which is becoming scarce. Obviously many activities have climate impacts, but it’s vital that we be mindful of how we’re using our resources and try to minimise impact. Creating lots of silly AI images for example doesn’t strike me as very useful. 

## How it works

I wanted to try and get useful output from more open, local LLMs like [Mistral Small](https://mistral.ai/news/mistral-small-3-1) - models that you can run on your own computer. So I thought creating configuration for components might be a good fit - a relatively small, focused task with a lot of value – helping people make accessible prototypes.

This is important as it means less energy usage due to smaller models, prompts and outputs, and it means the project isn’t stuck with a large, closed commercial model. Some models are even completely open about their training data, like [OLMo 2](https://allenai.org/language-models).

Each GOV.UK component has a file that defines what options are available, for example the button component has a `text` option. This file is called a schema, and you can see one here: the button component schema.

So to begin with, I combined the user’s prompt with the schema and some rules to make a prompt like this:

```
Generate JSON config for the ${component.name}
GOV.UK component based on the PROMPT.

**SCHEMA**

${componentSchema}
  
**PROMPT**

${prompt}
```

In general it worked pretty well, results were generally accurate and came back in about 10 - 20 seconds.

> ### A note on chat UIs
> LLMs like ChatGPT are often presented in a chat UI, message, response, message, response. However, LLMs only ever work on a single input, so what’s happening under the hood is each time, the _entire_ chat – all the user messages and LLM responses are being sent to the LLM. Over time obviously this becomes bigger. This uses more energy and will actually break if it goes over the LLM’s maximum input.

> For this reason I did not implement a chat UI – if you need a different output, you can change your prompt.

## Testing and changes

There were some situations where it didn’t do so well, for example the [date input](https://design-system.service.gov.uk/components/date-input/) component would get drawn with the input fields the wrong size. This is because you need to apply CSS classes that aren’t in the schema. To fix this I added component examples from the Design System to the prompt, like the [secondary button example](https://github.com/alphagov/govuk-design-system/blob/main/src/components/button/secondary/index.njk).

To put the app online, I used the Gemini Flash 2 model, as this is a relatively small, cheap remote LLM. As it is running faster online than my laptop, I added a feature to make it a bit safer - text responses to the user.

One of the problems with LLMs is that they are generally confirmation machines. Whatever you ask for they will try to give a likely response, even if it is unhelpful or wrong. So for example the GOV.UK select component does not support ‘multiple select’ by design – it is a poor user experience and it is better to use checkboxes. However when asked, an LLM would try and configure it anyway.

So I added a feature where the LLM could also respond with a text message instead of a component configuration. Now it will often respond to that multiple select request by telling the user it is not supported, and to try the checkboxes component instead.

## Summary

The app has had a really positive response from the design community, with people being able to make prototypes they weren’t able to do before, or hugely speeding up the prototyping process.

It definitely still makes mistakes, and is as unreliable as any LLM tool - sometimes responses will be good quality, other times not so much. I’ve added a warning to the app, and I’ll be keeping an eye on feedback to see if there are improvements I can make.

In future I’d like to make it easier to run locally with a choice of LLM, and to add more components, for example from department design systems like [HMRC](https://design.tax.service.gov.uk/hmrc-design-patterns/), or from the [NHS](https://service-manual.nhs.uk/design-system).

If you're interested in design and LLMs, try my friend Tim Paul's article on his similar experiment: [Generating forms from PDFs](https://www.timpaul.co.uk/posts/using-ai-to-generate-web-forms-from-pdfs/)

Thanks to Rebecca Cottrell for reviewing this post.

<div class="post-date">Last updated: 19/5/25</div>

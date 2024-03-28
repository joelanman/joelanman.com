---
layout: main.njk
title: Joe Lanman - Using the GOV.UK Prototype Kit with GitHub Codespaces
---

Joe Lanman - designer

<div class="home-link">

  [Home](/)

</div>

# Using the GOV.UK Prototype Kit with GitHub Codespaces

The normal way to run the GOV.UK Prototype Kit is to use the command line. However there is another approach which might be easier, especially if you cannot install Node (for example if your employer has blocked it).

There are online services which let you edit and run code without installing anything on your computer. We will use GitHub Codespaces for this tutorial.

1. Get a [GitHub account](https://github.com/signup) if you don’t have one
2. Go to [GitHub Codespaces](https://github.com/codespaces)
3. Click the **New codespace** button

You should now see the **Create a new codespace** page.

1. Click **Select a repository**
2. Type in ​​`joelanman/govuk-prototype-kit-prototype`
3. Make sure the **Region** is near you
4. Click **Create codespace**

You will see a new page containing the Visual Studio Code editor. Wait a while until it finishes processing, then

1. In the Terminal at the bottom, type `npm run dev`
2. This should display a popup at the bottom, click **Open in Browser**

Your prototype should open in a new tab.

If this is your first time using the GOV.UK Prototype Kit, try the [tutorial](https://prototype-kit.service.gov.uk/docs/make-first-prototype/start).

<div class="post-date">Last updated: 28/3/24</div>

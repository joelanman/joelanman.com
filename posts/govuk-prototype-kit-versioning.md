---
layout: main.njk
title: Joe Lanman - GOV.UK Prototype Kit - Versioning your prototype
---

Joe Lanman - Designer

<div class="home-link">

  [Home](/)

</div>

# GOV.UK Prototype Kit - Versioning your prototype

It's often useful to create different versions of your prototype.

For example you may want to test two different approaches, or refer back to older versions to discuss changes that you've made.

Here is one approach to versioning:

## Views

1. In `app/views/layouts` folder create a layout file, for example `v2.html`:

{% raw %}
```
{% extends "layouts/main.html" %}

{% set bodyClasses = "v2" %}
{% set version = "v2" %}
```
{% endraw %}

2. In `app/views` folder create a version folder, for example `v2`

3. Create a page in that folder, for example `test.html`:

{% raw %}
```
{% extends "layouts/v2.html" %}

{% block content %}

    <p>This is a page in version: {{ version }}</p>

{% endblock %}
```
{% endraw %}

You can now visit the page `localhost:3000/v2/test` in your browser.

## Styles

1. In `app/assets/sass` create a `v2.scss` file:

```
.v2 {
    p {
        color: red;
    }
}
```

2. In `app/assets/application.scss` add this to the top of the file:

```
@import 'v2.scss';
```

The text in your test page should now be red.

## Routes

1. In `app` create a `routes` folder

2. In `app/routes` create a `v2.js` file:

```
const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter('/v2')

const version = 'v2'

router.get('/test2', function(request, response) {
    response.send('test2')
})
```

Note that the path in the route is just `/test2` - you don't need to say `/v2/test2`. All the routes in this file will assume they are in the folder `v2`.

However, for `redirect` and `render` you do need to use the version, like this:

```
response.redirect('/' + version + '/my-page')
```
```
response.render(version + '/my-page')
```

3. In `app/routes.js` add this line:
```
require('./routes/v2.js')
```

If you visit `localhost:3000/v2/test2` in your browser, it should say 'test2'.

## Notes

 - You need to repeat these steps for each version, though it may be easier to copy and paste the existing version files and folders.
 - We've called our version `v2`, but you can call it anything. Use lower case and hyphens, for example `my-version`.
 - It's helpful to have a link to each version from your home page
 - You can create pages from templates in your version folder, however those pages will use the base layout. Edit the `extends` line to use your version layout instead.
 - In form `action`s and link `href`s, use the `{% raw %}{{ version }}{% endraw %}` variable. For example:

 {% raw %}
 ```
 <a href="/{{ version }}/page-2">Page 2</a>
 ```
 {% endraw %}

<div class="post-date">Last updated: 23/2/24</div>

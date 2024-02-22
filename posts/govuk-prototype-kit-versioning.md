---
layout: main.njk
title: Joe Lanman - GOV.UK Prototype Kit - Versioning your prototype
---

Joe Lanman - designer

<div class="home-link">

  [Home](/)

</div>

# GOV.UK Prototype Kit - Versioning your prototype

It's often useful to create different versions of your prototype.

For example you may want to test two different approaches, or refer back to older versions to discuss changes that you've made.

Here is one approach to versioning:

## Views

1. In `app/views/layouts` folder create a layout file, for example `v2.html`:
```
{% raw %}
{% extends "layouts/main.html" %}

{% set bodyClasses = "v2" %}
{% endraw %}
```

2. In `app/views` folder create a version folder, for example `v2`

3. Create a page in that folder, for example `test.html`:
```
{% raw %}
{% extends "layouts/v2.html" %}

{% block content %}

    <p>This is a page in version 2</p>

{% endblock %}
{% endraw %}
```

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
const express = require('express')
const router = express.Router()

router.get('/test2', function(request, response) {
    response.send('test2')
})

module.exports = router

```

Note that the path in the route is just `/test2` - you don't need to say `/v2/test2`. All the routes in this file will assume they are in the folder `v2`.

3. In `app/routes.js` add this line:
```
router.use('/v2', require('./routes/v2.js'))
```

If you visit `localhost:3000/v2/test2` in your browser, it should say 'test2'.

## Notes

 - You need to repeat these steps for each version, though it may be easier to copy and paste the existing version files and folders.
 - We've called our version `v2`, but you can call it anything. Use lower case and hyphens, for example `my-version`.
 - You can create pages from templates in your version folder, however those pages will use the base layout. Edit the `extends` line to use your version layout instead.

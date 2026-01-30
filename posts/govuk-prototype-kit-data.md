---
layout: main.njk
title: Joe Lanman - GOV.UK Prototype Kit - Working with data
---

Joe Lanman - Designer

<div class="home-link">

  [Home](/)

</div>

# GOV.UK Prototype Kit - Working with&nbsp;data

One of the big advantages of using the GOV.UK Prototype Kit is the ability to use data.

For example take an admin system with a list of items, and a page to view and edit each item. In traditional prototyping apps, you might have to create a page for each item, and update both the list and the page separately if you want to change something.

Using the kit you can define the list as data, and design just the list page and an item page. You can now change the list, add or remove items and all the pages update automatically.

The kit tutorial is about getting a (fictional) [juggling licence](https://prototype-kit.service.gov.uk/docs/make-first-prototype/start). So for this tutorial, let's design the admin side - where we can process the applications for a juggling licence.

## About JSON

We'll be using a format called JSON (JavaScript Object Notation) for our data.

### Some JSON basics

**Array** (a list)

```json
[
    "Apples",
    "Blueberries",
    "Pears",
    "Strawberries"
]
```

Arrays begin and end with square brackets [ ]

**Object**, with name/value pairs
```json
{
    "name": "Giulia",
    "age": 63
}
```

 - objects begin and end with curly brackets { }
 - the name of each value is in quotes, followed by a colon
 - strings (text values) are in quotes
 - each name/value pair ends in a comma, except the last one

You can put arrays in objects, or objects in arrays:

```json
[
    {
        "name": "Giulia",
        "age": 63
    },
    {
        "name": "Rhian",
        "age": 22
    }
]
```

## 1. Adding data

Open the session data defaults file:

```
/app/data/session-data-defaults.js
```

Add our data:

```javascript
module.exports = {

  // Insert values here

  "applications": [
    {
        "id" : 1,
        "name": "Giulia",
        "date": "1/2/2026",
        "how-many-balls": "1 or 2",
        "most-impressive-trick": "Juggling on a unicycle"
    },
    {
        "id" : 2,
        "name": "Rhian",
        "date": "2/2/2026",
        "how-many-balls": "3 or more",
        "most-impressive-trick": "Juggling live ferrets"
    },
    {
        "id" : 3,
        "date": "4/2/2026",
        "name": "Maeve",
        "how-many-balls": "1 or 2",
        "most-impressive-trick": "Upside down"
    }
  ]

}
```

## 2. Applications list page

In the `app/views` folder create a new file called `applications.html`

Add this code:

{% raw %}
```nunjucks
{% extends "layouts/main.html" %}

{% set pageName="Applications" %}

{% block content %}

    <h1 class="govuk-heading-l">
        Juggling licence applications
    </h1>

    <table class="govuk-table">

      <thead>
        <tr>
          <th scope="col" class="govuk-table__header">
            Name
          </th>
          <th scope="col" class="govuk-table__header">
            Date sent
          </th>
        </tr>
      </thead>

      <tbody>

        {% for application in data['applications'] %}

          <tr>

            <th scope="row" class="govuk-table__header">
                <a href="/application/{{ application['id'] }}">
                    {{ application['name'] }}
                </a>
            </th>

            <td class="govuk-table__cell">
              {{ application['date']}}
            </td>

          </tr>

        {% endfor %}

      </tbody>

    </table>

{% endblock %}
```
{% endraw %}

Your page should look like this:

<img width="1770" height="960" src="/assets/images/govuk-prototype-kit-data/applications.png" alt="Screenshot showing a table with 3 applications">

## 3. Application view page

In the `app/views` folder create a new file called `application.html`.

Add this code:

{% raw %}
```nunjucks
{% extends "layouts/main.html" %}

{% set pageName="Application" %}

{% block beforeContent %}
  {{ govukBackLink({
    text: "Back",
    href: "/applications"
  }) }}
{% endblock %}

{% block content %}

<div class="govuk-grid-row">
  <div class="govuk-grid-column-two-thirds">

    <h1 class="govuk-heading-l">
        {{ application['name']}}
    </h1>

    <dl class="govuk-summary-list">

        <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
                How many balls can you juggle?
            </dt>
            <dd class="govuk-summary-list__value">
                {{ application['how-many-balls'] }}
            </dd>
        </div>

        <div class="govuk-summary-list__row">
            <dt class="govuk-summary-list__key">
                Most impressive juggling trick?
            </dt>
            <dd class="govuk-summary-list__value">
                {{ application['most-impressive-trick'] }}
            </dd>
        </div>
        
    </dl>

  </div>
</div>

{% endblock %}
```
{% endraw %}

If you view the page in the browser, the details will be blank. We need to write a route to get the data.

## 4. Add a route

In `routes.js` add this code:

```javascript
// Add your routes here

router.get('/application/:id', function(request, response) {

    var id = request.params.id
    var data = request.session.data

    var application = data.applications.find(function(application){
        return application.id == id
    })

    response.locals.application = application
    response.render('application')

})
```

If you go to the applications list page in the browser and click the links, you should now get a page with details for each application, like this:

<img width="1772" height="9676" src="/assets/images/govuk-prototype-kit-data/application.png" alt="Screenshot showing an application view with the name and other details">

<div class="post-date">Last updated: 30/1/26</div>

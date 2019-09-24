> ## 🛠 Status: In Development
>
> This custom elements catalog is currently in development.

<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Custom Elements Catalog

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

This let's you search the npm registry for web components.

## Adding a web component

Be sure to have a `custom-elements.json` describing all (or one) web components within your package.

Example:

```json
{
  "version": 2,
  "tags": [
    {
      "label": "test-wc-card"
    }
  ]
}
```

As this is still a pilot phase you will have to manually index your package.

1. Go to [http://catalog.open-wc.org/add.html](http://catalog.open-wc.org/add.html)
2. Enter you package name followed by `@` and version (example `test-wc-card@0.0.6` or `@foo/bar@1.0.0`)

(only the latest npm versions get added to the search index - but older vesions can still be added to our database)

## Working on it

```bash
yarn install
yarn storybook # for individual parts with mocked data
yarn start # for live page
```

## Background

Uses

- Funadb to store the data in a normalized way
- Elasticsearch (aws) to store flattened docs to make them performant searchable

## custom-elements.json

This is still a proposal so [follow the discussion!!](https://github.com/w3c/webcomponents/issues/776).

Possible example:

```json
{
  "version": 2,
  "tags": [
    {
      "label": "test-wc-card",
      "attributes": [
        {
          "label": "header"
        },
        {
          "label": "side",
          "values": [{ "label": "A" }, { "label": "B" }]
        }
      ],
      "properties": [
        {
          "label": "header"
        },
        {
          "label": "headerColor"
        },
        {
          "label": "side",
          "values": [{ "label": "A" }, { "label": "B" }]
        }
      ],
      "events": [],
      "slots": []
    }
  ]
}
```

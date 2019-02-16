> ## 🛠 Status: In Development
> This custom elements catalog is currently in development.

<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Custom Elements Catalog

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc) 

This let's you search the npm registry for web components.

## Adding a web component

All you need to do to be listed on http://catalog.open-wc.org is add a keyword to your `package.json` like so.
```
"keywords": [
  "web-component",
],
```

We also feature a special "version-save" search. e.g. while searching you can specify to only see components that are based on
- lit-element-2.x
- polymer-3.x
- stencil-0.x

in order to be listed in these searches you will need to add this specific keyword as well.
You only need ONE keyword to be listed so if you are based on polymer 3 pls only add `polymer-3.x`.

Warning: Deliberately providing wrong keywords may result in a ban. (so pls don't set lit-element-2.x if you are a polymer-3.x component)

## Adding a "version-save" search

If you are the author of a base class and you want to add a new filter or a new major version . feel free to create a PR for this [file](./src/values.js).
As soon as you or you users start using the keyword you it can be used to filter.

## Working on it

```bash
yarn install
yarn start
```

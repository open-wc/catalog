export const keywords = [
  'web-components',
  'web-component',
  'polymer',
  'webcomponent',
  'webcomponents',
  'custom-element',
  'customelement',
  'custom-elements',
  'customelements',
];
export const wcTypes = [
  { key: '', label: 'All', icon: '', description: 'This is', url: './' },
  {
    key: 'lit-element-2.x',
    label: 'Lit Element 2',
    icon: '<img src="https://img.shields.io/badge/lib-lit--element--2.x-brightgreen.svg">',
    description: 'This is',
    url: './',
  },
  {
    key: 'polymer-3.x',
    label: 'Polymer 3',
    icon: '<img src="https://img.shields.io/badge/lib-polymer--3.x-brightgreen.svg">',
    description: 'This is',
    url: './',
  },
  {
    key: 'stencil-0.x',
    label: 'Stencil',
    icon: '<img src="https://img.shields.io/badge/lib-stencil--0.x-brightgreen.svg">',
    description: 'This is',
    url: './',
  },
];

// adds "special" keywords to standard keywords
wcTypes.forEach(wcType => {
  if (wcType.key !== '') {
    keywords.push(wcType.key);
  }
});

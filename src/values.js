import fire from './icons/fire';
import openWcLogo from './icons/open-wc-logo';

export const keywords = ['web-components', 'web-component', 'polymer'];
export const wcTypes = [
  { key: '', label: 'All webcomponents', icon: openWcLogo, description: 'This is', url: './' },
  {
    key: 'lit-element-2.x',
    label: 'lit-element 2.x',
    icon: fire,
    description: 'This is',
    url: './',
  },
  { key: 'polymer-3.x', label: 'polymer 3.x', icon: openWcLogo, description: 'This is', url: './' },
  { key: 'stencil-0.x', label: 'stencil 0.x', icon: openWcLogo, description: 'This is', url: './' },
];

// adds "special" keywords to standard keywords
wcTypes.forEach(wcType => {
  if (wcType.key !== '') {
    keywords.push(wcType.key);
  }
});

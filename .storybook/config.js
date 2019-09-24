import { configure, addDecorator } from '@storybook/polymer';
import { withA11y } from '@storybook/addon-a11y';
import '@storybook/addon-console';

// const req = require.context('../stories', true, /\.stories\.js$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

addDecorator(withA11y);
// configure(loadStories, module);

// import { configure } from '@storybook/polymer';

const req = require.context('../packages', true, /\.stories\.(js|mdx)$/);
configure(req, module);

// force full reload to not reregister web components
if (module.hot) {
  module.hot.accept(req.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, null, currentLocationHref);
    location.reload();
  });
}


export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/library-management-angular-django/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "C:/Program Files/Git/library-management-angular-django/chunk-OFH5HIFL.js"
    ],
    "route": "/Program%20Files/Git/library-management-angular-django"
  },
  {
    "renderMode": 2,
    "redirectTo": "/Program%20Files/Git/library-management-angular-django",
    "route": "/Program%20Files/Git/library-management-angular-django/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 6778, hash: 'c8908bf7e169d176edf618aaff42b80879a83593266b1da896970f0362d9195a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1436, hash: '8c4156b5706722a0cc29972ee771232d527eb17c8b7d743e8bbce1a54ac8d9a8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-4BOVM7M3.css': {size: 1465573, hash: 'vTVYi4T9BBc', text: () => import('./assets-chunks/styles-4BOVM7M3_css.mjs').then(m => m.default)}
  },
};

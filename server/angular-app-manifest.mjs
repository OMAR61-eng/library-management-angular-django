
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'C:/Program Files/Git/library-management-angular-django/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-OFH5HIFL.js"
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
    'index.csr.html': {size: 6448, hash: '08e6d9b12164ec97e676b565b0e67253eebbe4938403bf3d9b47ac151c946105', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1161, hash: 'd0c0fbab4f1d0afc5ee09f7e55101b9bc186414b7dc96ebe101f05a5c032d07c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-4BOVM7M3.css': {size: 1465573, hash: 'vTVYi4T9BBc', text: () => import('./assets-chunks/styles-4BOVM7M3_css.mjs').then(m => m.default)}
  },
};

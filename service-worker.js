(global => {
  'use strict';

  // Load the sw-toolbox library.
  importScripts('./bower_components/sw-toolbox/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = false;

  // We want to precache the following items. 
  //contact details are precached to provide offline experience all the time for contact.
  toolbox.precache([ './index.html',
                     './data/contact-cbe.json',
                     './data/contact-che.json',
                     './data/contact-dgl.json',
                     './data/contact-mdu.json'
                     ]);

  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'fonts',
      maxEntries: 30,
      maxAgeSeconds: 604800
    },
    origin: /\.gstatic\.com$/,
    // Set a timeout threshold of 4 seconds
    networkTimeoutSeconds: 4
  });

  toolbox.router.get('/DindigulBiriyaniPWA/css/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'biriyani-stylesheets',
      maxEntries: 10,
      maxAgeSeconds: 604800
    },
    // Set a timeout threshold of 4 seconds
    networkTimeoutSeconds: 4
  });

  toolbox.router.get('/DindigulBiriyaniPWA/images/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'biriyani-images',
      maxEntries: 300,
      maxAgeSeconds: 604800
    },
    // Set a timeout threshold of 10 seconds
    networkTimeoutSeconds: 10
  });

  toolbox.router.get('/DindigulBiriyaniPWA/js/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'biriyani-javascript',
      maxEntries: 10,
      maxAgeSeconds: 604800
    },
    // Set a timeout threshold of 10 seconds
    networkTimeoutSeconds: 10
  });

  toolbox.router.get('/DindigulBiriyaniPWA/data/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'biriyani-data',
      maxEntries: 200,
      maxAgeSeconds: 604800
    },
    // Set a timeout threshold of 4 seconds
    networkTimeoutSeconds: 4
  });

  // Ensure that our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);

function getFilenameFromUrl(path){
    path = path.substring(path.lastIndexOf("/")+ 1);
    return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0];
}

// Add in some offline functionality
this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              var cachedFile = getFilenameFromUrl(event.request.url);
              // Return the offline page
              return caches.match(cachedFile);
          })
    );
  }
});

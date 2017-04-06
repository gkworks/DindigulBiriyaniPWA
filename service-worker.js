(global => {
  'use strict';

  // Load the sw-toolbox library.
  importScripts('./bower_components/sw-toolbox/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  global.toolbox.options.debug = false;

  // We want to precache the following items
  toolbox.precache([ './',
                      './index.html',
                      './css/site.css',
                      './css/material.min.css',
                      './js/material.min.js',
                      './images/biriyani.jpg']);

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

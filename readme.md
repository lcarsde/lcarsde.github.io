# lcarsde.github.io
This repository contains the website for the lcarsde project.

The website consists of basic html pages, some styling and a service worker.

## Adding pages
If you want to add new pages simply make a copy of the template and edit the content of the main container. Make sure to add navigation links to all pages.

## The service worker
The service worker is used to preload all content pages as well as the styling. When a resource (page, image, ...) is requested, the service worker returns it from the cache if possible and also loads the resource from the server into the cache to get updates. If the resource is not in the cache the server version is returned to the user directly. Therefore it is not required to update the service worker for any content updates.

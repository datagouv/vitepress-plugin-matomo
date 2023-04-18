/**
 * A library to add Matomo tracking to vitepress router.
 * 
 * @remarks
 * This injects Matomo default script to the page, while handling SSR.
 * It requires access to Vitepress router to hook into `onAfterRouteChanged` event.
 * 
 *  @packageDocumentation
 */

import type { Router } from "vitepress";

declare global {
  interface Window {
    _paq?: any[][] // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

/**
 * Interface for plugin parameters
 * @public
 */
export interface IParameters {
  /**
   * Enable/disable link click tracking, defaults to true
   * @defaultValue true
   */
  enableLinkTracking?: boolean;

  /**
   * Remember consent
   * 
   * @remarks not working right now
   * 
   * @defaultValue false
   */
  rememberConsent?: boolean;

  /**
   * Requires user consent before sending events
   * 
   * @remarks not working right now
   * 
   * @defaultValue false
   */
  requireConsent?: boolean;

  /**
   * Vitepress router component
   */
  router: Router;

  /**
   * Matomo numeric site ID of the site you want to track
   */
  siteID: number;

  /**
   * Name of the js file to call on the matomo server
   * @defaultValue "piwik.js"
   */
  trackerJsFile?: string;

  /**
   * Name of the php file to call on the matomo server
   * @defaultValue "piwik.php"
   */
  trackerPhpFile?: string;

  /**
   * URL where the piwik.php/piwik.js files can be found
   */
  trackerUrl: string;
}

/**
 * Load Matomo in your vitepress project.
 * 
 * @remarks
 * This is mostly a generalized version of the basic matomo
 * tracker code you'd insert in a JS page. However, since vuepress is SSR, it
 * requires some special workarounds to make sure paq object storage happens
 * correctly.
 * 
 * @public
*/
export default function(parameters: IParameters) {
  const { 
    router,
    trackerUrl,
    rememberConsent = false,
    requireConsent = false,
    siteID,
    trackerJsFile = "piwik.js",
    trackerPhpFile = "piwik.php",
    enableLinkTracking = true
  } = parameters;
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' &&
  siteID && trackerUrl) {
    // We're in SSR space here, meaning that we have to explictly attach _paq to
    // the window in order to store it globally.
    if (window._paq == undefined) {
      window._paq = [];
    }
    // Create convenience variable here, but don't expect it to last. Use
    // window._paq elsewhere when needed, including closure scopes.
    const _paq = window._paq;
    // If user requests consent checking, do this before we actually track.
    // Note: this doesn't work at the moment because the user has no way to set
    // whether consent was given. Oops.
    if (requireConsent) {
      _paq.push(['requireConsent']);
      if (rememberConsent) {
        _paq.push(['rememberConsentGiven']);
      }
    }
    // Tracker methods like "setCustomDimension" should be called before
    // "trackPageView".
    _paq.push(['trackPageView']);
    if (enableLinkTracking) {
      _paq.push(['enableLinkTracking']);
    }
    (function() {
      let u=trackerUrl;
      // Make sure URLs end in a slash
      if (u.length > 0 && !u.endsWith("/")) {
        u = u.concat("/");
      }
      _paq.push(['setTrackerUrl', u+trackerPhpFile]);
      _paq.push(['setSiteId', siteID]);
      const g = document.createElement('script');
      g.type='text/javascript';
      g.async=true;
      g.defer=true;
      g.src=u+trackerJsFile;
      document.body.insertBefore(g, document.body.firstChild);
    })();
    let existingCallback: typeof router.onAfterRouteChanged;
    if(router.onAfterRouteChanged) {
      existingCallback = router.onAfterRouteChanged;
    }
    router.onAfterRouteChanged = (to) => {
      if(existingCallback) {
        existingCallback(to); // eslint-disable-line @typescript-eslint/no-floating-promises
      }
      window._paq?.push(['setDocumentTitle', document.title]);
      window._paq?.push(['setCustomUrl', to]);
      window._paq?.push(['trackPageView']);
    };
  }
}
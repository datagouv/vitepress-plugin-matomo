import type { Router } from "vitepress";

/**
 * @public
 */
export interface Parameters {
  /**
   * Enable/disable link click tracking, defaults to true
   * @defaultValue true
   */
  enableLinkTracking?: boolean;

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
export default function(parameters: Parameters) {
  const { 
    // router,
    trackerUrl,
    // siteID,
    // trackerJsFile = "piwik.js",
    // trackerPhpFile = "piwik.php",
    // enableLinkTracking = true
  } = parameters;
  console.log(trackerUrl);
}
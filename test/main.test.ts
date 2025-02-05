import { beforeEach, expect, test, vi } from 'vitest';
import matomo from "../src/main";
import type { Router } from "vitepress";

const siteID = 123;
const title = "someTitle";
const trackerUrl = "http://www.someurl.com";

beforeEach(() => {
    window._paq = undefined;
});

vi.doMock("vitepress", () => {
    return {
        useRouter(): Router {
            return {
                route: {
                    path: "/",
                    data: {
                        relativePath: "",
                        title,
                        description: "",
                        headers: [],
                        frontmatter: {},
                    },
                    component: null,
                },
                go() {return Promise.resolve();},
                onBeforeRouteChange(to: string) { return Promise.resolve();},
                onAfterRouteChanged(to: string) { return Promise.resolve();},
            }
        }
    }
});
const { useRouter } = await import('vitepress');
const router = useRouter();

test('in default env, matomo script is not loaded', () => {
    matomo({
        router,
        siteID,
        trackerUrl,
    });

    expect(document.documentElement.outerHTML).not.toContain(siteID);
    expect(document.documentElement.outerHTML).not.toContain(trackerUrl);
});

test('in production env, matomo script is loaded', () => {
    vi.stubEnv('NODE_ENV', 'production');

    matomo({
        router,
        siteID,
        trackerUrl,
    });
    expect(document.documentElement.outerHTML).toContain(trackerUrl);
    expect(window._paq).toBeInstanceOf(Array);
    if(!window._paq) { return;}
    const setSiteId = window._paq.find(e => e[0] === "setSiteId");
    expect(setSiteId).toBeInstanceOf(Array);
    if(!setSiteId) { return;}
    expect(setSiteId[1]).toEqual(siteID);
});

test('in production env, matomo script is loaded with additional params', () => {
    vi.stubEnv('NODE_ENV', 'production');

    matomo({
        router,
        siteID,
        trackerUrl,
        requireConsent: true,
        rememberConsent: true,
        setDoNotTrack: true,
        });
    expect(document.documentElement.outerHTML).toContain(trackerUrl);
    expect(window._paq).toBeInstanceOf(Array);
    if(!window._paq) { return;}
    const requireConsent = window._paq.find(e => e[0] === "requireConsent");
    expect(requireConsent).toBeInstanceOf(Array);
    const rememberConsentGiven = window._paq.find(e => e[0] === "rememberConsentGiven");
    expect(rememberConsentGiven).toBeInstanceOf(Array);
    const setDoNotTrack = window._paq.find(e => e[0] === "setDoNotTrack");
    expect(setDoNotTrack).toBeInstanceOf(Array);
});

test('in production env, matomo script is loaded with correct params', () => {
    vi.stubEnv('NODE_ENV', 'production');

    matomo({
        router,
        siteID,
        trackerUrl,
        requireConsent: false,
        rememberConsent: true,
        setDoNotTrack: false,
    });
    expect(document.documentElement.outerHTML).toContain(trackerUrl);
    expect(window._paq).toBeInstanceOf(Array);
    if(!window._paq) { return;}
    const requireConsent = window._paq.find(e => e[0] === "requireConsent");
    expect(requireConsent).toBeUndefined();
    const rememberConsentGiven = window._paq.find(e => e[0] === "rememberConsentGiven");
    expect(rememberConsentGiven).toBeUndefined();
    const setDoNotTrack = window._paq.find(e => e[0] === "setDoNotTrack");
    expect(setDoNotTrack).toBeUndefined();
});

test('in production env, after a page change, a new url is tracked', () => {
    vi.stubEnv('NODE_ENV', 'production');
    const newUrl = "http://some-new-url.com";
    const newTitle = "New Title";

    matomo({
        router,
        siteID,
        trackerUrl,
    });
    document.title = newTitle;
    router.onAfterRouteChanged?.(newUrl)
    expect(window._paq).toBeInstanceOf(Array);
    if(!window._paq) { return;}

    const setDocumentTitle = window._paq.find(e => e[0] === "setDocumentTitle");
    expect(setDocumentTitle).toBeInstanceOf(Array);
    if(!setDocumentTitle) { return;}
    expect(setDocumentTitle[1]).toEqual(newTitle);
    const setCustomUrl = window._paq.find(e => e[0] === "setCustomUrl");
    expect(setCustomUrl).toBeInstanceOf(Array);
    if(!setCustomUrl) { return;}
    expect(setCustomUrl[1]).toEqual(newUrl);
    const trackPageView = window._paq.find(e => e[0] === "trackPageView");
    expect(trackPageView).toBeInstanceOf(Array);
});

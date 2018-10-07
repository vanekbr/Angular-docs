Error.stackTraceLimit = Infinity;

require("core-js/es6");
require("reflect-metadata");

require("zone.js/dist/zone");
require("zone.js/dist/long-stack-trace-zone");
require("zone.js/dist/proxy");
require("zone.js/dist/sync-test");
require("zone.js/dist/jasmine-patch");
require("zone.js/dist/async-test");
require("zone.js/dist/fake-async-test");

const testing = require("@angular/core/testing");
const browser = require("@angular/platform-browser-dynamic/testing");

__karma__.loaded = function () {};

testing.TestBed.initTestEnvironment(
    browser.BrowserDynamicTestingModule,
    browser.platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('../../src', true, /\.spec\.ts$/);
context.keys().map(context);
__karma__.start();

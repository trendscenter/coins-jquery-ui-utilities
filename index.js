// Exports a set of dialog generators and jquery-ui button definitions
// For use when building jquery ui components using consistent COINS schemes
"use strict";

var me = module.exports;

var _ = window._;
var jQuery = window.jQuery;

if (!_ || !jQuery || !jQuery.ui) {
    throw new Error('coins-jquery-utilities dependencies not met');
}

var defaultOptions = {};

me.button = require('./lib/button.js');
me.dialog = require('./lib/dialog.js');
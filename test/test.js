"use strict";
// require('../node_modules/mocha/index.js');
var jQuery = window.jQuery = window.$ = require('jquery');
require('jquery-ui');
var _ = window._ = require('lodash');
var should = require('should');
var Promise = require('rsvp').Promise; // jshint ignore:line

var jquu = require('../index.js');

var $el, $dia;
var resolve;
var pageReady = new Promise(function(resolver, reject) {
    resolve = resolver;
});

describe('button interface', function() {

    beforeEach(function(done) {
        jQuery(window.document).ready(function() { resolve(); });
        pageReady.then(function() {
            $el = jQuery('<button>');
            jQuery(window.document.body).append($el);
            done();
        });
    });

    afterEach(function(done) {
        $el.remove();
        done();
    });

    it('should build a error without options', function() {
        (function(){
            var $b = jquu.button.base();
        }).should.throw();
    });

    it('should build a raw object for passing to button constructor when passed NO el', function() {
        var $b = jquu.button.base({});
        ($b instanceof jQuery).should.be.not.ok; // jshint ignore:line
        $b.should.be.an.instanceOf(Object);
    });

    it('should build a jQuery button when passed an el', function() {
        var $b = jquu.button.base({
            el: $el
        });
        ($b instanceof jQuery).should.be.ok; // jshint ignore:line
    });

    it('should build a generic button with a `click` option', function(done) {
        var $b = jquu.button.base({
            el: $el,
            click: function() {
                done();
            }
        });
        $b.click();
    });

    it('should build a generic button with a `action` option, trigged on click', function(done) {
        var $b = jquu.button.base({
            el: $el,
            action: function() {
                done();
            }
        });
        $b.click();
    });

    it('should support `action` and `click`', function(done) {
        var clicked = false;
        var actioned = false;
        var $b = jquu.button.base({
            el: $el,
            click: function() {
                clicked = true;
            },
            action: function() {
                actioned = true;
            }
        });
        $b.click();
        clicked.should.be.ok; // jshint ignore:line
        actioned.should.be.ok; // jshint ignore:line
        done();
    });

    it('should support delete button', function(done) {
        var $b = jquu.button.delete({
            el: $el,
            action: function() { done(); }
        });
        $b.click();
    });

    it('should not support delete without action or click', function() {
        (function() {
            var $b = jquu.button.delete({
                el: $el
            });
        }).should.throw();
    });

});

describe('dialog interface', function() {
    afterEach(function() {
        // $dia.dialog("destroy");
    });

    it('should not generate dialog without options, without body', function() {
        (function() {
            jquu.dialog.base();
        }).should.throw();
        (function() {
            jquu.dialog.base({});
        }).should.throw();
    });

    it('should generate dialog, matching input text', function(done) {
        var title, body;
        $dia = jquu.dialog.base({
            title: 'testDialog',
            body: 'testBody'
        });
        title = document.querySelector('.ui-dialog-title');
        title.innerHTML.should.be.equal('testDialog');

        title = document.querySelector('.ui-dialog-content');
        title.innerHTML.should.be.equal('testBody');

        done();
    });

    it('should generate dialog, default close button', function(done) {
        var title, body;
        $dia = jquu.dialog.base({
            title: 'testDialog',
            body: 'testBody'
        });
        title = document.querySelector('.ui-dialog-title');
        title.innerHTML.should.be.equal('testDialog');

        title = document.querySelector('.ui-dialog-content');
        title.innerHTML.should.be.equal('testBody');

        done();
    });
});

describe('dialog using button interface', function() {
    it('should support close');
    it('should support delete');
    it('should support closeDialog');
});


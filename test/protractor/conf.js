'use strict';

// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['admin-spec.js'],
    jasmineNodeOpts: {
        showColors: true
    }
};

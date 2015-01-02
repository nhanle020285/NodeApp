requirejs.config({
    baseUrl: 'public/admin',
    paths: {
        'jquery': 'jquery/dist/jquery.min',
        'underscore': 'underscore/dist/underscore',
        'backbone': 'backbone/backbone'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone',
        },
        'underscore': {
            exports: '_'
        }
    }
});
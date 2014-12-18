/*
 * Directive to prefix product image src string with the app's image base path
 * Usage:
 * <img class="img-polaroid" data-product-img-src="{{product.image}}" title="{{product.name}}"/>
 */
(function(angular) {
    'use strict';

    angular.module( "mean" ).directive( 'menuHref', [menuHref] );

    function menuHref (menu) {
        function linkFn (scope, element, attrs) {
            attrs.$observe('menuHref', function (menu) {
                var obj = JSON.parse(menu);
                if(obj.isRedirect)
                {
                    attrs.$set('href', obj.link);
                }
            });
        }

        return {
            priority: 99, // it needs to run after the attributes are interpolated
            link    : linkFn
        };
    };

}( this.angular ));

// global function for creating namespaces
function namespace(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';

    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }

    return parent;
}

var ns = namespace("lhn.ecommerce.admin");

ns.utils = function () {
    function init(options) {
    }

    return {
        init: init
    }
}();
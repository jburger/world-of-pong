var math = (function() {
    'use strict'; 
    return {
        lerp: function(v1, v2, amount) {
            return v1 + (v2 - v1) * amount;
        }
    }
})();
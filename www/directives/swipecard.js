(function () {
    
        angular.module('ikl.directives', [])
        .directive("swipecard", [ function () {
            return {
                restrict: "EA",
                scope:{data:'='},
                template: '<ion-slide-page><div class="card"><div class="item item-text-wrap">This is a basic Card which contains an item that has wrapping text.</div></div></ion-slide-page>'
            }
        }]);
})();
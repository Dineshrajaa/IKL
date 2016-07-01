app.controller('homeCtrl', function($scope, $state,tipService) {
    $scope.bloodTips=tipService.listTips();
    $scope.changeTo = function(pageTo) {
        $state.go(pageTo);
    };
   /* $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
    };
    $scope.$on("$ionicSlides.sliderInitialized", function(event, data) {
        // data.slider is the instance of Swiper
        console.warn(data);
        $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function(event, data) {
        console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function(event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.activeIndex;
        $scope.previousIndex = data.previousIndex;
        console.log(data.activeIndex);
    });*/
})

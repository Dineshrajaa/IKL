
app.controller('SearchBloodCtrl', function($scope, bloodService) {
    $scope.bloodGroups = bloodService.listBloodGroups();
})

coreModule.controller('coreCtrl', ['$scope', 'userService', function ($scope, userService) {

  userService.getLoggedUser(function(data){
    $scope.loggedUser = data;

  });


}]);

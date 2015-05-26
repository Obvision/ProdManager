/**
 * Created by nizaroukhchi on 03/04/15.
 */


var app = angular.module('app', ['dependencies', 'modules']);


app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('cadrosphere')
    .setStorageType('localStorage')
    .setNotify(true, true)
}]);

app.config(['$breadcrumbProvider', function ($breadcrumbProvider) {
  $breadcrumbProvider.setOptions({
    templateUrl: 'app/templates/breadcrumb.html'
  });
}]);

app.run(['$state', '$rootScope', function ($state, $rootScope) {
  $rootScope.$state = $state;
}]);

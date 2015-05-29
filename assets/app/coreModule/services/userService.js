coreModule.factory('userService', ['$http', '$sails', 'localStorageService', function ($http, $sails, localStorageService) {
  var o = {
    users: [],
    single: {},
    loggedUser: {}
  };

  o.getSingle = function () {

  };

  o.getLoggedUser = function (callback) {
    $sails.get('/user/getloggeduser').success(function (data, status, headers, config) {
      o.loggedUser = angular.copy(data);
      if (callback)
        callback(data);
    }).error(function (data, status, headers, config) {
      console.log(status);
    });
  };

  o.getAll = function (callback, update) {
    if (localStorageService.get('users') != null) {
      callback(localStorageService.get('users'));
      $sails.get("/user").success(function (data, status, headers, jwr) {
        localStorageService.set('users', data);
        update(data);
      });
    } else {
      $sails.get("/user").success(function (data, status, headers, jwr) {
        localStorageService.set('users', data);
        update(data);
      });
    }
  };

  o.add = function (user, callback) {
    $http.post('/settings/users/create', user).success(function (data, status, headers, config) {
      callback(data);
    }).error(function (data, status, headers, config) {
      console.log(status);
    });
  };

  o.update = function (user, callback) {

  };

  o.remove = function (userId, callback) {

  };

  o.subscribe = function (userID) {

  };

  o.absent = function (callback) {
    $sails.get('/user/absent').success(function (data, status, headers, config) {
      o.loggedUser = angular.copy(data);
      if (callback)
        callback(data);
    }).error(function (data, status, headers, config) {
      console.log(status);
    });
  };

  o.available = function (callback) {
    $sails.get('/user/available').success(function (data, status, headers, config) {
      o.loggedUser = angular.copy(data);
      if (callback)
        callback(data);
    }).error(function (data, status, headers, config) {
      console.log(status);
    });
  };

  o.cacheData = function (data) {
    localStorageService.set('users', data);
  };

  return o;
}]);

'use strict';

var app = angular.module('myApp', ['ui.router', 'satellizer', 'btford.socket-io']);

app.run(function($rootScope, User) {
  $rootScope.currentUser = {};
  User.setCurrent();
});

app.config(function($authProvider) {
  $authProvider.loginUrl = '/api/users/login';
  $authProvider.signupUrl = '/api/users/signup';

  $authProvider.facebook({
    clientId: '638147416343689',
    url: '/api/users/facebook'
  });
});

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', { url: '/', templateUrl: '/html/home.html' })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'loginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'registerCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/html/profile.html',
      controller: 'profileCtrl',
      resolve: {
        Profile: function(User) {
          return User.getProfile();
        }
      }
    })
    .state('users', {
      url: '/users',
      templateUrl: '/html/users.html',
      controller: 'usersCtrl',
      resolve: {
        Users: function(User) {
          return User.getAll();
        }
      }
    })
    .state('profileEditPage', {
      url: '/profileEditPage/:profileId',
      templateUrl:'/html/profileEdit.html',
      controller: 'profileEditCtrl',
      resolve: {
        Profile: function(User) {
          return User.getProfile();
        }
      }

    })
    .state('wall', {
      url:'/wall',
      templateUrl:'/html/wall.html',
      controller: 'wallCtrl'
    })
    .state('nonRegisteredUsers', {
      url:'/nonRegisteredUsers',
      templateUrl:'html/nonRegisteredUsers.html',
      controller: 'nonRegisteredUsersCtrl'
    })
    .state('savedStocks', {
      url:'/profileStocks/',
      templateUrl:'/html/savedStocks.html',
      controller:'savedStocksCtrl'
    })

  $urlRouterProvider.otherwise('/');
});

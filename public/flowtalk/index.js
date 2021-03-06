'use strict';

angular.module('angularMaterialAdmin', [
  'ngAnimate', 
  'ngCookies', 
  'ngTouch',
  'ngSanitize',
  'ui.router', 
  'ngMaterial', 
  'nvd3',
  'ngRoute',
  'updateMeta',
  'ui-notification',
  'ngclipboard',
  'ngClipboard',
  'summernote',
  'app'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,$mdIconProvider,NotificationProvider,$locationProvider) {
    $stateProvider
      .state('authorize',{
        url: '/',
        title:'Authorize',
        layout: 'column',
        templateUrl: 'app/views/authorize.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.dashboard', {
        title: 'Dashboard',
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
        }
      })
      .state('home.profile', {
        url: '/profile',
        title:'profile',
        templateUrl: 'app/views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Profile'
        }
      })
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
        }
      });

    $urlRouterProvider.otherwise('/dashboard');

    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#E75753',
      '300': '#E75753',
      '400': '#E75753',
      '500': '#E75753',
      '600': '#E75753',
      '700': '#E75753',
      '800': '#E75753',
      '900': '#E75753',
      'A100': '#E75753',
      'A200': '#E75753',
      'A400': '#E75753',
      'A700': '#E75753'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
    $locationProvider
        .html5Mode(true);
    NotificationProvider
        .setOptions({
          delay: 10000,
          startTop: 20,
          startRight: 10,
          verticalSpacing: 20,
          horizontalSpacing: 20,
          positionX: 'left',
          positionY: 'bottom'
        });
  })
  .run(['$rootScope', '$stateParams','$cookieStore','$state', '$location', function ($rootScope,$stateParams,$cookieStore,$state,$location) {
      //ngMeta.init();
     $rootScope.$on('$stateChangeSuccess', function() {
        document.title = $state.current.title;
         $rootScope.$state = $state;
         $rootScope.$stateParams = $stateParams;
      });
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to home page if user is loged in and tryin to access authorize page
        var authPage = $.inArray($location.path(), ['/', '/register']) === -1;
        var loggedIn = $cookieStore.get('flowtalklog');
        if (!authPage && loggedIn == 'logged') {
          $location.path('/home');
        }
      });
    }])
    .filter('trusturls',['$sce', function ($sce) {
      return function (val) {
        return $sce.trustAsResourceUrl(val);
      };
    }])
    .filter('totrusted',['$sce', function ($sce) {
      return function (value) {
        return $sce.trustAsHtml(value);
      };

    }])
    .directive('showFocus', function($timeout) {
      return function(scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function (newValue) {
              $timeout(function() {
                newValue && element.focus();
              });
            },true);
      };
    });

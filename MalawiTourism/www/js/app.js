// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){


var app = angular.module('starter', ['ionic', 'ngCordova', 'firebase']);

var fb = new Firebase("https://shining-torch-8813.firebaseio.com/");

app.config(function($stateProvider, $urlRouterProvider) {

//home
  $stateProvider.state('home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html'
      }
   }

  })

  //parks and reserves states
  $stateProvider.state('parksReservesList', {
    url: '/parksReservesList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/parksReservesList.html',
        controller: 'ParksReservesListController'
      }
    }
  })

  $stateProvider.state('detail', {
    url: '/parksReservesList/:aId',
    views: {
      'tab-home' : {
        templateUrl: 'templates/detail.html',
        controller: 'ParksReservesListController'
      }
    }
  })

  //lake activities
  $stateProvider.state('lakeActivitiesList', {
    url: '/lakeActivitiesList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/lakeActivitiesList.html',
        controller: 'LakeActivitiesListController'
      }
    }
  })

  $stateProvider.state('detailsLakeActivities', {
    url: '/lakeActivitiesList/:aId',
    views: {
      'tab-home' : {
        templateUrl: 'templates/detailsLakeActivities.html',
        controller: 'LakeActivitiesListController'
      }
    }
  })

  //settings
  $stateProvider.state('settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html'
      }
    }

  })

  // maps
  $stateProvider.state('map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/map.html',
        controller:'MapCtrl'
      }
    }

  })

  //firebase
  $stateProvider.state('firebase', {
       url: '/firebase',
       views: {
         'tab-firebase': {
           templateUrl: 'templates/firebase.html',
           controller: "FirebaseController",
           cache: false
         }
       }

     })

     //secure state
     $stateProvider.state('secure', {
       url: '/secure',
       views: {
         'tab-firebase': {
           templateUrl: 'templates/secure.html',
           controller: "SecureController"
         }
       }


     })


  //list
    $stateProvider.state('list', {
      url: '/list',
     views: {
        'tab-home': {
          templateUrl: 'templates/list.html'
        }
      }

    })

  //edit state
    $stateProvider.state('edit', {
       url: '/edit/:noteId',
       views: {
          'tab-home': {
            templateUrl: 'templates/edit.html',
            controller:'EditController'
          }
        }

    })

    $stateProvider.state('add', {
       url: '/add',
       views: {
          'tab-home': {
            templateUrl: 'templates/edit.html',
            controller:'AddController'
          }
        }

    })


  $urlRouterProvider.otherwise('/home');
})

//=======================Factory for views sharing the same functions======
app.factory('NoteStore', function(){

  var notes = angular.fromJson(  window.localStorage['notes'] ||'[]');

// store notes in local storage
    function persist()
    {
      window.localStorage['notes'] = angular.toJson(notes);
    }

  return {
    // list
    list: function(){
      return notes;
    },
    // getNote
    get: function(noteId){
      for(var i=0; i<notes.length; i++)
      {
        if(notes[i].id == noteId)
        {
          return notes[i];
        }
      }
      return undefined;
    },

    //createNote
    create: function(note){
        notes.push(note);
        persist();
    },
    //updateNote
    update: function(note)
    {
      for(var i=0; i<notes.length; i++)
      {
        if(notes[i].id == note.id)
        {
          notes[i]= note;
          persist();
          return;
        }
      }
    },

    //move re-order
    move: function(note, fromIndex, toIndex){
        notes.splice(fromIndex, 1);
        notes.splice(toIndex, 0, note);
        persist();
    },

    //remove note
    remove: function(noteId){
      for(var i=0; i<notes.length; i++){
        if(notes[i].id == noteId){
          notes.splice(i, 1);
            persist();
            return;
        }//if
      }//for
    }//func

  };

});


//========================Controllers==============
app.controller('ListCtrl', function($scope, NoteStore){
//populate the list
  $scope.notes = NoteStore.list();

  $scope.reordering = false;

  // delete/ remove from list
  $scope.remove = function(noteId){
  NoteStore.remove(noteId);
  };

// re-order button
  $scope.move = function(note, fromIndex, toIndex){
      NoteStore.move(note, fromIndex, toIndex);
  };

    //reordering
  $scope.toggleReordering = function(){
      $scope.reordering = !$scope.reordering;
  };


})

//add controller
app.controller('AddController', function($scope, $state, NoteStore) {
  $scope.note = {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };
  $scope.save = function(){
    NoteStore.create($scope.note);
    $state.go('list');
  };


});

//edit controller
app.controller('EditController', function($scope, $state, NoteStore) {
  $scope.note = angular.copy(NoteStore.get($state.params.noteId));
  $scope.save = function(){
    NoteStore.update($scope.note);
    $state.go('list');
  };
});

//===========================Camera Controllers======================================
app.controller("FirebaseController", function($scope, $state, $firebaseAuth){
  var fbAuth = $firebaseAuth(fb);
  $scope.login = function(username, password){
    //mapping email & password to email & assword
    fbAuth.$authWithPassword({
      email: username,
      password: password
    }).then(function(authData){
      //this is a sucess promise then go to secure page
      $state.go("secure");
    }).catch(function(error){
      console.error("ERROR: " + error);
    });
  }

  //register username
    $scope.register = function(username, password){
      fbAuth.$createUser({
        email: username,
        password: password
      }).then(function(userData){
        return fbAuth.$authWithPassword({
          email: username,
          password: password
        });
      }).then(function(authData){
          $state.go("secure");
      }).catch(function(error){
          console.error("ERROR: " + error);
      });
    }

});

//secure controller
app.controller("SecureController", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera){
  $ionicHistory.clearHistory();

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } else {
        $state.go("firebase");
    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});

//============================Map==================================
app.controller('MapCtrl', function($scope, $state,$compile) {

  function initialize() {
       var lakeMalawi = new google.maps.LatLng(-14.0333300000,34.8833300000);
       var kasungu = new google.maps.LatLng(-15.8057987,35.0410169);
	   var nyika = new google.maps.LatLng( -10.8000, 33.8000);
	   var liwonde = new google.maps.LatLng(-14.844135, 35.3466253);
	   var nkhotakota = new google.maps.LatLng(-12.826411, 34.019583);
	   var majete = new google.maps.LatLng(-15.978670, 34.569230);

       var mapOptions = {
         streetViewControl:true,
         center: lakeMalawi,
         zoom: 12,
         mapTypeId: google.maps.MapTypeId.TERRAIN
       };


       var map = new google.maps.Map(document.getElementById("map"),
           mapOptions);

       //Marker + infowindow + angularjs compiled ng-click
       var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
       var compiled = $compile(contentString)($scope);

       var infowindow = new google.maps.InfoWindow({
         content: compiled[0]
       });

	   //=============Markers=======================

       var marker = new google.maps.Marker({
         position: lakeMalawi,
         map: map,
         title: 'Lake Malawi National Park'
       });

       var kasunguRoute = new google.maps.Marker({
         position: kasungu,
         map: map,
         title: 'kasungu National Park'
       });

	    var nyikaRoute = new google.maps.Marker({
         position: nyika,
         map: map,
         title: 'Nyika National Park'
       });

	    var liwondeRoute = new google.maps.Marker({
         position: liwonde,
         map: map,
         title: 'liwonde National Park'
       });

	    var nkhotakotaRoute = new google.maps.Marker({
         position: nkhotakota,
         map: map,
         title: 'Nkhotakota Wildlife Reserve'
       });

	   var majeteRoute = new google.maps.Marker({
         position: majete,
         map: map,
         title: 'Majete Wildlife Reserve'
       });


	   //=================================
	   /*
       var infowindow = new google.maps.InfoWindow({
            content:"Project Location"
       });
	   */

	   //================Windows==================

       infowindow.open(map,marker);

	    var lakeMalawiwindow = new google.maps.InfoWindow({
            content:"lake Malawi National Park"
       });

       var kasunguwindow = new google.maps.InfoWindow({
            content:"kasungu National Park"
       });

	    var nyikawindow = new google.maps.InfoWindow({
            content:"Nyika National Park"
       });

	   var liwondewindow = new google.maps.InfoWindow({
            content:"Liwonde National Park"
       });

	    var nkhotakotawindow = new google.maps.InfoWindow({
            content:"Lengwe National Park"
       });

	    var majetewindow = new google.maps.InfoWindow({
            content:"Majete Wildlife Reserve"
       });
	   //====================Load Routes============================

		kasunguwindow.open(map,kasunguRoute);
		nyikawindow.open(map,nyikaRoute);
		liwondewindow.open(map,liwondeRoute);
		lengwewindow.open(map,nkhotakotaRoute);
		majetewindow.open(map,majeteRoute);
		lakeMalawiwindow.open(map,marker);



	   //===============================================

       google.maps.event.addListener(marker, 'click', function() {
         infowindow.open(map,marker);
       });


       $scope.map = map;

       var directionsService = new google.maps.DirectionsService();
       var directionsDisplay = new google.maps.DirectionsRenderer();

       var request = {
           origin : lakeMalawi,
           destination1 : kasungu,
		   destination2 : nyika,
		   destination3 : liwonde,
		   destination4 : nkhotakota,
		   destination5 : majete,
           travelMode : google.maps.TravelMode.DRIVING
       };
       directionsService.route(request, function(response, status) {
           if (status == google.maps.DirectionsStatus.OK) {
               directionsDisplay.setDirections(response);
           }
       });

       directionsDisplay.setMap(map);

     }

     //google.maps.event.addDomListener(window, 'load', initialize);
     ionic.Platform.ready(initialize);

     $scope.centerOnMe = function() {
       if(!$scope.map) {
         return;
       }

       $scope.loading = $ionicLoading.show({
         content: 'Getting current location...',
         showBackdrop: false
       });
       navigator.geolocation.getCurrentPosition(function(pos) {
         $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         $scope.loading.hide();
       }, function(error) {
         alert('Unable to get location: ' + error.message);
       });
     };

     $scope.clickTest = function() {
       alert('Example of infowindow with ng-click')
     };
});

//=============================Parks & Reserves List Controller=============
app.controller('ParksReservesListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.places = data.places;
      $scope.whichplace=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.places.splice($scope.places.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.places = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }


      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.places.splice(fromIndex, 1);
        $scope.places.splice(toIndex, 0, item);
        //NoteStore.move(note, fromIndex, toIndex);
      };
    });
}]);

//=============================Lake Activities List Controller=============
app.controller('LakeActivitiesListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/lakeactivities.json').success(function(data) {
      $scope.places = data.places;
      $scope.whichplace=$state.params.aId;
      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.places.splice($scope.places.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/lakeactivities.json').success(function(data) {
          $scope.places = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }


      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.places.splice(fromIndex, 1);
        $scope.places.splice(toIndex, 0, item);
        //NoteStore.move(note, fromIndex, toIndex);
      };
    });
}]);

//==================================================================

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
}());

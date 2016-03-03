// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){


  var app = angular.module('starter', ['ionic', 'ngCordova', 'firebase']);

  var fb = new Firebase("https://shining-torch-8813.firebaseio.com/");
  var ref = new Firebase("https://discovermalawi.firebaseio.com/");

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
         controller: 'ParksReserveList'
       }
     }
   })

   //details states
   $stateProvider.state('detail', {
     url: '/detail/:id',
     views: {
       'tab-home' : {
         templateUrl: 'templates/detail.html',
         controller: 'DetailsCtrl'
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
    url: '/detailsLakeActivities/:id',
    views: {
      'tab-home' : {
        templateUrl: 'templates/detailsLakeActivities.html',
        controller: 'LakeDetailsCtrl'
      }
    }
  })

  //events and adventures
  $stateProvider.state('eventsList', {
    url: '/eventsList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/eventsList.html',
        controller: 'EventsListController'
      }
    }
  })

  $stateProvider.state('eventsDetails', {
    url: '/eventsDetails/:id',
    views: {
      'tab-home' : {
        templateUrl: 'templates/eventsDetails.html',
        controller: 'EventsDetailsCtrl'
      }
    }
  })


  //moutains and plateaus
  $stateProvider.state('mountainList', {
    url: '/mountainList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/mountainList.html',
        controller: 'MountainListController'
      }
    }
  })

//mountain details
  $stateProvider.state('detailsmountain', {
    url: '/detailsmountain/:id',
    views: {
      'tab-home' : {
        templateUrl: 'templates/detailsmountain.html',
        controller: 'DetailsMountainListController'
      }
    }
  })

  //historical details
  $stateProvider.state('historicalsitesList', {
    url: '/historicalsitesList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/historicalsitesList.html',
        controller: 'HistoryListController'
      }
    }
  })


  $stateProvider.state('historicalsitesDetails', {
    url: '/historicalsitesDetails/:id',
    views: {
      'tab-home' : {
        templateUrl: 'templates/historicalsitesDetails.html',
        controller: 'HistoryDetailsCtrl'
      }
    }
  })

  //cities
  $stateProvider.state('citiesList', {
    url: '/citiesList',
    views: {
      'tab-home' : {
        templateUrl: 'templates/citiesList.html',
        controller: 'CityListController'
      }
    }
  })

  $stateProvider.state('citiesDetails', {
    url: '/citiesDetails/:id',
    views: {
      'tab-home' : {
        templateUrl: 'templates/citiesDetails.html',
        controller: 'CityDetailsCtrl'
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

    //dictionary
      $stateProvider.state('dictionary', {
        url: '/dictionary',
       views: {
          'tab-home': {
            templateUrl: 'templates/dictionary.html',
            controller:'DictionaryCtrl'
          }
        }

      })

  $urlRouterProvider.otherwise('/home');
})

//=======================Factory for views sharing the same functions======
app.factory('NoteStore', function($firebaseArray, $firebaseObject){

  var notes = angular.fromJson(  window.localStorage['notes'] ||'[]');



// store notes in local storage
    function persist()
    {
      window.localStorage['notes'] = angular.toJson(notes);
    }

  return {

    //get all parks
    getAllParks: function(){
       return $firebaseArray(ref.child('park'));
    },

    //get individual park
   getPark: function(parkId){
       return $firebaseObject(ref.child('park').child(parkId));
  },

  //get all lake activites
  getAllLakes: function(){
     return $firebaseArray(ref.child('lake'));
  },

  //get individual lake activites
  getLake: function(lakeId){
     return $firebaseObject(ref.child('lake').child(lakeId));
   },

   //get all mountain activites
   getAllMountains: function(){
      return $firebaseArray(ref.child('mountains'));
   },

   //get individual mountain
   getMountain: function(mountainId){
      return $firebaseObject(ref.child('mountains').child(mountainId));
    },

    //get all event activites
    getAllEvents: function(){
       return $firebaseArray(ref.child('events'));
    },

    //get individual event
    getEvent: function(eventsId){
       return $firebaseObject(ref.child('events').child(eventsId));
     },

     //get all history
     getAllHistory: function(){
        return $firebaseArray(ref.child('historical'));
     },

     //get individual history
     getHistory: function(historyId){
        return $firebaseObject(ref.child('historical').child(historyId));
      },

      //get all cities
      getAllCities: function(){
         return $firebaseArray(ref.child('cities'));
      },

      //get individual cities
      getCity: function(cityId){
         return $firebaseObject(ref.child('cities').child(cityId));
       },

       //getAllDictionary
       getAllDictionary: function(){
          return $firebaseArray(ref.child('dictionary'));
       },


    // Notes list
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

//=============================Lake Activities List Controller=============
app.controller('LakeActivitiesListController', function($scope, NoteStore) {
  $scope.alllakes = NoteStore.getAllLakes();
//================
  $scope.doRefresh =function() {
    $scope.alllakes = NoteStore.getAllLakes();
      $scope.places = alllakes;
      $scope.$broadcast('scroll.refreshComplete');

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

//================lake details controller=========================

app.controller('LakeDetailsCtrl', function($scope, $stateParams, NoteStore, $ionicPlatform, $cordovaSocialSharing){
     $ionicPlatform.ready(function() {

        var message = 'A beach like no other. Amazing fresh waters';
        var subject = 'Lake Malawi';
        var link = 'http://www.visitmalawi.mw/'; // fake image

        $scope.nativeShare = function() {
            $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
        };
        $scope.FaceBookShare = function() {
            $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
        };

        $scope.twitterShare = function() {
            $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
        };
    });

    var lakeId =  $stateParams.id;
    $scope.whichplace = lakeId;
    $scope.lake = NoteStore.getLake(lakeId);
});

//=============================Mountains List Controller=============
app.controller('MountainListController', function($scope, NoteStore) {
  $scope.allmountains = NoteStore.getAllMountains();
//================
  $scope.doRefresh =function() {
    $scope.allmountains = NoteStore.getAllMountains();
      $scope.places = allmountains;
      $scope.$broadcast('scroll.refreshComplete');

  }

  $scope.toggleStar = function(item) {
    item.star = !item.star;
  }


  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.places.splice(fromIndex, 1);
    $scope.places.splice(toIndex, 0, item);
  };
});

//=============================Mountains Details Controller=============
app.controller('DetailsMountainListController', function($scope, $stateParams, NoteStore,$ionicPlatform, $cordovaSocialSharing) {
  $ionicPlatform.ready(function() {

     var message = 'Beautiful Mountains and Plateaus';
     var subject = 'Mountain climbing';
     var link = 'http://www.visitmalawi.mw/'; // fake image

     $scope.nativeShare = function() {
         $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
     };
     $scope.FaceBookShare = function() {
         $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
     };

     $scope.twitterShare = function() {
         $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
     };
 });

  var mountainId =  $stateParams.id;
  $scope.whichplace = mountainId;
  $scope.mountain = NoteStore.getMountain(mountainId);
});


// ======ParksReserveList Controller====================

app.controller('ParksReserveList', function($scope, NoteStore){
  $scope.allparks = NoteStore.getAllParks();
//================
  $scope.doRefresh =function() {
    $scope.allparks = NoteStore.getAllParks();
      $scope.places = allparks;
      $scope.$broadcast('scroll.refreshComplete');

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

// ======Dictionary Controller====================

app.controller('DictionaryCtrl', function($scope, NoteStore){
  $scope.alldictionary = NoteStore.getAllDictionary();
//================
  $scope.doRefresh =function() {
    $scope.alldictionary = NoteStore.getAllDictionary();
      $scope.places = alldictionary;
      $scope.$broadcast('scroll.refreshComplete');

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


//============Events Details Controller====================
app.controller('EventsListController', function($scope, NoteStore){
  $scope.allevents = NoteStore.getAllEvents();
//================
  $scope.doRefresh =function() {
    $scope.allevents = NoteStore.getAllEvents();
      $scope.places = allevents;
      $scope.$broadcast('scroll.refreshComplete');

  }

  $scope.toggleStar = function(item) {
    item.star = !item.star;
  }


  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.places.splice(fromIndex, 1);
    $scope.places.splice(toIndex, 0, item);
    //NoteStore.move(note, fromIndex, toIndex);
  };
})

//============History Controller====================
app.controller('HistoryListController', function($scope, NoteStore){
  $scope.allhistory = NoteStore.getAllHistory();
//================
  $scope.doRefresh =function() {
    $scope.allhistory = NoteStore.getAllHistory();
      $scope.places = allhistory;
      $scope.$broadcast('scroll.refreshComplete');

  }

  $scope.toggleStar = function(item) {
    item.star = !item.star;
  }


  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.places.splice(fromIndex, 1);
    $scope.places.splice(toIndex, 0, item);
    //NoteStore.move(note, fromIndex, toIndex);
  };
})

//============City Controller====================
app.controller('CityListController', function($scope, NoteStore){
  $scope.allcities = NoteStore.getAllCities();
//================
  $scope.doRefresh =function() {
    $scope.allcities = NoteStore.getAllCities();
      $scope.places = allcities;
      $scope.$broadcast('scroll.refreshComplete');

  }

  $scope.toggleStar = function(item) {
    item.star = !item.star;
  }


  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.places.splice(fromIndex, 1);
    $scope.places.splice(toIndex, 0, item);
    //NoteStore.move(note, fromIndex, toIndex);
  };
})


//================ Parks Details controller=========================

app.controller('DetailsCtrl', function($scope, $stateParams, NoteStore,$ionicPlatform, $cordovaSocialSharing){
  $ionicPlatform.ready(function() {

        var message = 'Beautiful Wildlife Parks';
        var subject = 'Safari in Malawi';
        var link = 'http://www.visitmalawi.mw/'; // fake image

        $scope.nativeShare = function() {
            $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
        };
        $scope.FaceBookShare = function() {
            $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
        };

        $scope.twitterShare = function() {
            $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
        };
    });

  var parkId =  $stateParams.id;
  $scope.whichplace = parkId;
  $scope.park = NoteStore.getPark(parkId);

});

//================ Events Details controller=========================

app.controller('EventsDetailsCtrl', function($scope, $stateParams, NoteStore,$ionicPlatform, $cordovaSocialSharing){
  $ionicPlatform.ready(function() {

        var message = 'Good social life';
        var subject = 'Events in Malawi';
        var link = 'http://www.visitmalawi.mw/'; // fake image

        $scope.nativeShare = function() {
            $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
        };
        $scope.FaceBookShare = function() {
            $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
        };

        $scope.twitterShare = function() {
            $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
        };
    });

  var eventId =  $stateParams.id;
  $scope.whichplace = eventId;
  $scope.event = NoteStore.getEvent(eventId);

});

//================ History Details controller=========================

app.controller('HistoryDetailsCtrl', function($scope, $stateParams, NoteStore,$ionicPlatform, $cordovaSocialSharing){
  $ionicPlatform.ready(function() {

        var message = 'The best place to visit';
        var subject = 'Historical Sites in Malawi';
        var link = 'http://www.visitmalawi.mw/'; // fake image

        $scope.nativeShare = function() {
            $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
        };
        $scope.FaceBookShare = function() {
            $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
        };

        $scope.twitterShare = function() {
            $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
        };
    });

  var historyId =  $stateParams.id;
  $scope.whichplace = historyId;
  $scope.history = NoteStore.getHistory(historyId);

});

//================ City Details controller=========================

app.controller('CityDetailsCtrl', function($scope, $stateParams, NoteStore,$ionicPlatform, $cordovaSocialSharing){
  $ionicPlatform.ready(function() {

        var message = 'Very beautiful and safe';
        var subject = 'Cities in Malwi';
        var link = 'http://www.visitmalawi.mw/'; // fake image

        $scope.nativeShare = function() {
            $cordovaSocialSharing.share(message, subject, link); // Share via native share sheet
        };
        $scope.FaceBookShare = function() {
            $cordovaSocialSharing.shareViaFacebook(message, subject, link); // Share via native share sheet
        };

        $scope.twitterShare = function() {
            $cordovaSocialSharing.shareViaTwitter(message, subject, link); // Share via native share sheet
        };
    });

  var cityId =  $stateParams.id;
  $scope.whichplace = cityId;
  $scope.city = NoteStore.getCity(cityId);

});
//==================================================================
//social media sharing


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

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){

  var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
    function($q, $resource, $http, FORECASTIO_KEY) {
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    var weatherResource = $resource(url, {
      callback: 'JSON_CALLBACK',
    }, {
      get: {
        method: 'JSONP'
      }
    });

    return {
      //getAtLocation: function(lat, lng) {
      getCurrentWeather: function(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK&units=si&lang=en');
      }
    }
  }];


  var app = angular.module('starter', ['ionic', 'ngCordova', 'firebase', 'ngResource','ngStorage']);
            app.config(function($ionicConfigProvider){
                $ionicConfigProvider.tabs.position('buttom');
                })
  var ref = new Firebase("https://discovermalawi.firebaseio.com/");
  app.constant('FORECASTIO_KEY', 'b468b50051718710a04b134824010076')

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
        controller:'MapCtrl',
        cache: false
      }
    }

  })

  //weather
  $stateProvider.state('weather', {
       url: '/weather',
       views: {
         'tab-weather': {
           templateUrl: 'templates/weather.html',
           controller: "WeatherCtrl",
           cache: false
         }
       }

     })

     //=====================================
     //accommodation contacts
       $stateProvider.state('contacts', {
            url: '/contacts',
            views: {
              'tab-contacts': {
                templateUrl: 'templates/contacts.html',
                controller: "AccommodationListListController",
                cache: false
              }
            }

          })

          //secure state
          $stateProvider.state('contacts_detail', {
            url: '/contacts_detail/:id',
            views: {
              'tab-contacts': {
                templateUrl: 'templates/contacts_detail.html',
                controller: "AccommodationDetailsCtrl"
              }
            }


          })

          //travel agents
            $stateProvider.state('travel', {
                 url: '/travel',
                 views: {
                   'tab-home': {
                     templateUrl: 'templates/travel.html',
                     controller: "TravelListController",
                     cache: false
                   }
                 }

               })

               //secure state
               $stateProvider.state('travel_details', {
                 url: '/travel_details/:id',
                 views: {
                   'tab-home': {
                     templateUrl: 'templates/travel_details.html',
                     controller: "TravelDetailsCtrl"
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

    $stateProvider.state('about', {
     url: '/about',
     views: {
       'tab-about': {
         templateUrl: 'templates/about.html',
         controller: "AboutController",
         cache: false
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

//======================weather Lilongwe ==================================
app.factory('DataStore', function() {
    //create datastore with default values
    var DataStore = {

            city:       'Lilongwe',
            latitude:   -13.9833333,
            longitude:  33.7833333

        };

        DataStore.setCity = function (value) {
        DataStore.city = value;
    };

    DataStore.setLatitude = function (value) {
       DataStore.latitude = value;
    };

    DataStore.setLongitude = function (value) {
       DataStore.longitude = value;
    };

    return DataStore;
})

//======================weather Blantyre ==================================
app.factory('DataStoreBT', function() {
    //create datastore with default values
    var DataStoreBT = {

            city2:       'Blantyre',
            latitude2:  -15.7861111 ,
            longitude2:  35.0058333

        };

        DataStoreBT.setCity = function (value) {
        DataStoreBT.city2 = value;
    };

    DataStoreBT.setLatitude = function (value) {
       DataStoreBT.latitude2 = value;
    };

    DataStoreBT.setLongitude = function (value) {
       DataStoreBT.longitude2 = value;
    };

    return DataStoreBT;
})

//======================weather Zomba ==================================
app.factory('DataStoreZA', function() {
    //create datastore with default values
    var DataStoreZA = {

          city3:       'Zomba',
          latitude3:   -15.3833333,
          longitude3:  35.3333333

        };

        DataStoreZA.setCity = function (value) {
        DataStoreZA.city3 = value;
    };

       DataStoreZA.setLatitude = function (value) {
       DataStoreZA.latitude3 = value;
    };

       DataStoreZA.setLongitude = function (value) {
       DataStoreZA.longitude3 = value;
    };

    return DataStoreZA;
})

//======================weather Mzuzu ==================================
app.factory('DataStoreMZ', function() {
    //create datastore with default values
    var DataStoreMZ = {

          city4:       'Mzuzu',
          latitude4:   -11.465560,
          longitude4:  34.020710

        };

        DataStoreMZ.setCity = function (value) {
        DataStoreMZ.city4 = value;
    };

       DataStoreMZ.setLatitude = function (value) {
       DataStoreMZ.latitude4 = value;
    };

       DataStoreMZ.setLongitude = function (value) {
       DataStoreMZ.longitude4 = value;
    };

    return DataStoreMZ;
})

//======================weather Salima ==================================
app.factory('DataStoreSA', function() {
    //create datastore with default values
    var DataStoreSA = {

          city5:       'Salima',
          latitude5:   -13.7804,
          longitude5:  34.4587

        };

        DataStoreSA.setCity = function (value) {
        DataStoreSA.city5 = value;
    };

       DataStoreSA.setLatitude = function (value) {
       DataStoreSA.latitude5 = value;
    };

       DataStoreSA.setLongitude = function (value) {
       DataStoreSA.longitude5 = value;
    };

    return DataStoreSA;
})

//======================weather Mangochi ==================================
app.factory('DataStoreMH', function() {
    //create datastore with default values
    var DataStoreMH = {

          city6:       'Mangochi',
          latitude6:   -14.47815,
          longitude6:  35.26448

        };

        DataStoreMH.setCity = function (value) {
        DataStoreMH.city6 = value;
    };

       DataStoreMH.setLatitude = function (value) {
       DataStoreMH.latitude6 = value;
    };

       DataStoreMH.setLongitude = function (value) {
       DataStoreMH.longitude6 = value;
    };

    return DataStoreMH;
})





//==================== factory weather forecastioWeather
app.factory('Weather', forecastioWeather)


//=======================Factory for views sharing the same functions======
app.factory('NoteStore', function($firebaseArray, $firebaseObject){

//retrieve notes from local storage
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

       //get all accommodation
       getAllAccommodation: function(){
          return $firebaseArray(ref.child('accommodation'));
       },

       //get individual accommodation
       getAccommodation: function(accommodationId){
          return $firebaseObject(ref.child('accommodation').child(accommodationId));
        },

        //get all travel
        getAllTravel: function(){
           return $firebaseArray(ref.child('travel'));
        },

        //get individual travel
        getTravel: function(travelId){
           return $firebaseObject(ref.child('travel').child(travelId));
         },

         //get all about
         getAllAbout: function(){
            return $firebaseArray(ref.child('about'));
         },

         //get individual travel
         getAbout: function(aboutId){
            return $firebaseObject(ref.child('about').child(aboutId));
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
app.controller('LakeActivitiesListController', function($scope, $localStorage, NoteStore) {
  $scope.alllakes = NoteStore.getAllLakes();

   $localStorage.lakeData = NoteStore.getAllLakes();

   $scope.lakes = $localStorage.lakeData;

  $scope.doRefresh =function() {
  //  $scope.alllakes = NoteStore.getAllLakes();
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

//============AccommodationList Controller====================
app.controller('AccommodationListListController', function($scope, NoteStore){
  $scope.allaccommodation = NoteStore.getAllAccommodation();
//================
  $scope.doRefresh =function() {
    $scope.allaccommodation = NoteStore.getAllAccommodation();
      $scope.places = allaccommodation;
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

//================ Accommodation Details controller=========================

app.controller('AccommodationDetailsCtrl', function($scope, $stateParams, NoteStore){

  var accommodationId =  $stateParams.id;
  $scope.whichplace = accommodationId;
  $scope.accommodation = NoteStore.getAccommodation(accommodationId);

});

//============About Controller====================
app.controller('AboutController', function($scope, $stateParams, NoteStore){

    $scope.allabout = NoteStore.getAllAbout();

})


//============TravelList Controller====================
app.controller('TravelListController', function($scope, NoteStore){
  $scope.alltravel = NoteStore.getAllTravel();
//================
  $scope.doRefresh =function() {
    $scope.alltravel = NoteStore.getAllTravel();
      $scope.places = alltravel;
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

//================ Travel Details controller=========================

app.controller('TravelDetailsCtrl', function($scope, $stateParams, NoteStore){

  var travelId =  $stateParams.id;
  $scope.whichplace = travelId;
  $scope.travel = NoteStore.getTravel(travelId);

});



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
//============================WeatherCtrl======================================
app.controller('WeatherCtrl', function($scope,$state,Weather,DataStore,DataStoreBT,DataStoreZA,DataStoreMZ,DataStoreMH,DataStoreSA) {
    //read default settings into scope - LL
    console.log('inside weather');
    $scope.city  = DataStore.city;
    var latitude  =  DataStore.latitude;
    var longitude = DataStore.longitude;

    //call getCurrentWeather method in factory ‘Weather --LL’
    Weather.getCurrentWeather(latitude,longitude).then(function(resp) {
      $scope.current = resp.data;
      console.log('GOT CURRENT', $scope.current);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });
//=============================================================================
    //read default settings into scope - BT
    console.log('inside weather');
    $scope.city2  = DataStoreBT.city2;
    var latitude2  =  DataStoreBT.latitude2;
    var longitude2 = DataStoreBT.longitude2;

    //call getCurrentWeather method in factory ‘Weather --BT’
    Weather.getCurrentWeather(latitude2,longitude2).then(function(resp) {
      $scope.currentBT = resp.data;
      console.log('GOT CURRENT', $scope.currentBT);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

//=============================================================================
    //read default settings into scope - ZA
    console.log('inside weather');
    $scope.city3  = DataStoreZA.city3;
    var latitude3  =  DataStoreZA.latitude3;
    var longitude3 = DataStoreZA.longitude3;


    //call getCurrentWeather method in factory ‘Weather --ZA’
    Weather.getCurrentWeather(latitude3,longitude3).then(function(resp) {
      $scope.currentZA = resp.data;
      console.log('GOT CURRENT', $scope.currentZA);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

    //read default settings into scope - MZ
    console.log('inside weather');
    $scope.city4  = DataStoreMZ.city4;
    var latitude4  =  DataStoreMZ.latitude4;
    var longitude4 = DataStoreMZ.longitude4;

    //call getCurrentWeather method in factory ‘Weather --MZ’
    Weather.getCurrentWeather(latitude4,longitude4).then(function(resp) {
      $scope.currentMZ = resp.data;
      console.log('GOT CURRENT', $scope.currentMZ);
      //debugger;
    }, function(error) {
      alert('Unable to get current conditions');
      console.error(error);
    });

    //=============================================================================
        //read default settings into scope - SA
        console.log('inside weather');
        $scope.city5  = DataStoreSA.city5;
        var latitude5  =  DataStoreSA.latitude5;
        var longitude5 = DataStoreSA.longitude5;

        //call getCurrentWeather method in factory ‘Weather --SA’
        Weather.getCurrentWeather(latitude5,longitude5).then(function(resp) {
          $scope.currentSA = resp.data;
          console.log('GOT CURRENT', $scope.currentSA);
          //debugger;
        }, function(error) {
          alert('Unable to get current conditions');
          console.error(error);
        });

        //read default settings into scope - MH
        console.log('inside weather');
        $scope.city6  = DataStoreMH.city6;
        var latitude6  =  DataStoreMH.latitude6;
        var longitude6 = DataStoreMH.longitude6;

        //call getCurrentWeather method in factory ‘Weather --MH’
        Weather.getCurrentWeather(latitude6,longitude6).then(function(resp) {
          $scope.currentMH = resp.data;
          console.log('GOT CURRENT', $scope.currentMH);
          //debugger;
        }, function(error) {
          alert('Unable to get current conditions');
          console.error(error);
        });


})
//========================END Ctrl==========================================

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

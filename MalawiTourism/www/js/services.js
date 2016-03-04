'use strict';

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

angular.module('starter.services', ['ngResource'])
.factory('Cities', function() {
var cities = [
    { id: 0, name: 'Lilongwe', lat: -13.9833333 , lgn: 33.7833333 },
    { id: 1, name: 'Blantyre' ,lat: -15.7861111 , lgn: 35.0058333 },
    { id: 2, name: 'Zomba' ,lat:-15.3833333 , lgn: 35.3333333 },
    { id: 3, name: 'Mzuzu' ,lat: -11.465560 , lgn: 34.020710 }

  ];

  return {
    all: function() {
      return cities;
    },
    get: function(cityId) {
      // Simple index lookup
      return cities[cityId];
    }
  }
}).
factory('DataStore', function() {
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
.factory('Weather', forecastioWeather);

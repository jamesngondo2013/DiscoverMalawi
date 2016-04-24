//adding dependencies that we will use
myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

     //hold actual auth from firebase
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
        //fetch user info from firebase and put in an object
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
        // this object will have all the info we need
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });


  var myObject = {
      //=======login method=====
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/success'); //successful login redirects us to success page
      }).catch(function(error) {
       $rootScope.message = error.message;
      });
    }, 

      // ======logout method======
    logout: function() {
      return auth.$unauth();
    }, //logout

      //====auth method to protect our routes/ pages======
    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

      //===registration method=======
    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) { //regUser is what is comming form firebase

          //register users to an object in the firebase
        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname, //get this from our form
          lastname: user.lastname,
          email:  user.email
        }); //user info

        myObject.login(user);

      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };

//when this factory is called, its gonna return an object with different functions - login -- reg
  return myObject;
      
      
}]); //factory


myApp.controller('TravelAgentsController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var myTravel = new Firebase('https://discovermalawi.firebaseio.com/travel');
    $scope.travel = $firebaseArray(myTravel);
    
    //wired to the plus button
    $scope.showForm = function(){
       
        $scope.addFormShow = true;   //turn on the addForm visibility
        
        $scope.editFormShow = false;  //turn off the editForm visibility
        clearForm();
    }
    
     //wired to the minus button - to turn off the visibility of the addParks form
    $scope.hideForm = function(){
        $scope.addFormShow = false; 
       
    }
    
    //clearing up the scope of the variables
    function clearForm(){
        $scope.name ='';
        $scope.location='';
        $scope.telephone='';
        $scope.email='';
        $scope.website='';
        $scope.image='';
    }
    
    $scope.addFormSubmit = function(isValid){
        
    if (isValid){
        $scope.travel.$add({
            
            name:$scope.name,
            location:$scope.location,
            telephone:$scope.telephone,
            email:$scope.email,
            website:$scope.website,
            image:$scope.image
        });
        clearForm();
    }
        
    }//$scope
    
    //function to handle the edit button by pulling data based on id
    $scope.showTravel = function(item){
        
        $scope.addFormShow = false;   //turn on the addForm visibility
        $scope.editFormShow = true;  //turn off the editForm visibility
        
        $scope.name = item.name;
        $scope.location = item.location;
        $scope.telephone = item.telephone;
        $scope.email = item.email;
        $scope.website = item.website;
        $scope.image = item.image;
        $scope.id = item.$id;
    }
    
    //function to handle actual update to the firebase db after edit
    $scope.editFormSubmit = function(){
        
        var id = $scope.id; //to keep a reference of the product being edited
        
        var record = $scope.travel.$getRecord(id); //to store the whole park we're editing
        record.name = $scope.name;
        record.location = $scope.location;
        record.telephone = $scope.telephone;
        record.email =$scope.email;
        record.website =$scope.website;
        record.image =$scope.image;
        $scope.travel.$save(record); //commit changes to firebase
        clearForm();
       
       
    }
   
    //function to delete travel
    $scope.deleteTravel = function(item){
       $scope.travel.$remove(item);
        
    }
    
}]);
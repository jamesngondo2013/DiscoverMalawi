myApp.controller('AboutController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
   var myAbout = new Firebase('https://discovermalawi.firebaseio.com/about');
    $scope.about = $firebaseArray(myAbout);
    
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
        $scope.info ='';
        $scope.geography='';
        $scope.lake='';
        $scope.language='';
        $scope.image='';
    }
    
    $scope.addFormSubmit = function(isValid){
        
     if (isValid)
      {
            $scope.about.$add({
            
            info:$scope.info,
            geography:$scope.geography,
            lake:$scope.lake,
            language:$scope.language,
            image:$scope.image
        
        });
        clearForm();
             
      }
        
    }//$scope
    
    //function to handle the edit button by pulling data based on id
    $scope.showAbout = function(item){
        
        $scope.addFormShow = false;   //turn on the addForm visibility
        $scope.editFormShow = true;  //turn off the editForm visibility
        
        $scope.info = item.info;
        $scope.geography = item.geography;
        $scope.lake = item.lake;
        $scope.language = item.language;
        $scope.image = item.image;
        $scope.id = item.$id;
    }
    
    //function to handle actual update to the firebase db after edit
    $scope.editFormSubmit = function(){
        
        var id = $scope.id; //to keep a reference of the product being edited
        
        var record = $scope.about.$getRecord(id); //to store the whole park we're editing
        record.info = $scope.info;
        record.geography = $scope.geography;
        record.lake = $scope.lake;
        record.language =$scope.language;
        record.image =$scope.image;
        
        $scope.about.$save(record); //commit changes to firebase
        clearForm();
       
    }
   
    //function to delete park
    $scope.deleteAbout = function(item){
       $scope.about.$remove(item);
        
    }
    
}]);
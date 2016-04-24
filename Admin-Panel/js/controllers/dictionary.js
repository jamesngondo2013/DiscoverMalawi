myApp.controller('DictionaryController', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var myDictionary = new Firebase('https://discovermalawi.firebaseio.com/dictionary');
    $scope.dictionary = $firebaseArray(myDictionary);
    
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
        $scope.english ='';
        $scope.chichewa='';
    }
    
    $scope.addFormSubmit = function(isValid){
        
    if(isValid){
        $scope.dictionary.$add({
            
            english:$scope.english,
            chichewa:$scope.chichewa
        });
        clearForm();
    }
        
    }//$scope
    
    //function to handle the edit button by pulling data based on id
    $scope.showDict = function(item){
        
        $scope.addFormShow = false;   //turn on the addForm visibility
        $scope.editFormShow = true;  //turn off the editForm visibility
        
        $scope.english = item.english;
        $scope.chichewa = item.chichewa;
        $scope.id = item.$id;
    }
    
    //function to handle actual update to the firebase db after edit
    $scope.editFormSubmit = function(){
        
        var id = $scope.id; //to keep a reference of the product being edited
        
        var record = $scope.dictionary.$getRecord(id); //to store the whole park we're editing
        record.english = $scope.english;
        record.chichewa = $scope.chichewa;
        
        $scope.dictionary.$save(record); //commit changes to firebase
        clearForm();
       
    }
   
    //function to delete dictionary
    $scope.deleteDict = function(item){
        $scope.dictionary.$remove(item);
        
    }
    
}]);
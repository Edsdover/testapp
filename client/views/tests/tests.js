'use strict';

angular.module('poseidon')
.controller('SubjectCtrl', function($scope, Subject){
  var afUser = $scope.afUser = Subject.init();
  afUser.$loaded().then(syncNames);

  $scope.addSubject = function(name){
    Subject.add(name).then(syncNames);
    $scope.subjectName = '';
  };
  $scope.addScore = function(name, tx){
    Subject.addScore(name, tx);
    $scope.scoreForm = {};
  };
  $scope.delTest = function(tx, index){
    Subject.delTest(tx, index);
  };
  $scope.editTest = function(tx, index){
    Subject.editTest(tx, index);
  }
  function syncNames(){
    $scope.names = afUser.names ? afUser.names.split(',') : [];
  }
});

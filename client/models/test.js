'use strict';

angular.module('poseidon')
.factory('Subject', function($rootScope, $firebaseObject, $firebaseArray){
  var fbUser;
  var afUser;

  function Test(){
  }

  Test.init = function(){
    fbUser = $rootScope.fbRoot.child('users/' + $rootScope.activeUser.uid);
    afUser = $firebaseObject(fbUser);
    return afUser;
  };

  Test.add = function(name){
    var names = afUser.names ? afUser.names.split(',') : [];
    names.push(name);
    afUser.names = names.join(',');
    return afUser.$save();
  };

  Test.delTest = function(tx, index){
    var fbTests = fbUser.child('tests/' + tx.type);
    var afTests = $firebaseArray(fbTests);
    afTests.$loaded().then(function(){
      var foundTx = afTests[index];
      afTests.$remove(foundTx);
    });
  };
  Test.editTest = function(tx, test){
    var fbTests = fbUser.child('tests/' + tx.type);
    var afTests = $firebaseArray(fbTests);
    $rootScope.test = test;
  };

  Test.addScore = function(name, tx){
    var score = angular.copy(tx);
    score.date = score.date.getTime();
    score.name = name;
    var fbScores = fbUser.child('tests/' + score.type);
    var afScores = $firebaseArray(fbScores);
    afScores.$add(score);
    score = {};
  };
  return Test;
});

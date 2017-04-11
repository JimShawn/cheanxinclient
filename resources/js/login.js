/**
 * Created by 向麒 on 2017/1/14.
 * 登录管理
 */
'use strict';

var login = angular.module('login',['httpservice']);

login.controller('LoginController', function($scope,$http,$location,$rootScope,httpService,$state, commonUtil) {
    $scope.username = "";
    $scope.password = "";
    $scope.showId = false;


    $scope.login = function() {

        var pwdEncode = commonUtil.encodePassword($scope.password);
        // var pwdEncode = $scope.password;
        httpService.login($scope.username,pwdEncode).then(function() {
            $rootScope.isLogin = true;
            $state.go("main.mainpage");
        },function(error) {
            console.error(error);
            alert("用户名或者密码错误");
        })
    };


});

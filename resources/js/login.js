/**
 * Created by 向麒 on 2017/1/14.
 * 登录管理
 */
'use strict';

var login = angular.module('login',['httpservice', 'toaster']);

login.controller('LoginController', function($scope, $http, $location, $rootScope ,httpService, $state, commonUtil, toaster) {
    $scope.username = "";
    $scope.password = "";
    $scope.showId = false;


    $scope.login = function() {

        var pwdEncode = commonUtil.encodePassword($scope.password);
        // var pwdEncode = $scope.password;
        httpService.login($scope.username,pwdEncode).then(function() {
            $rootScope.isLogin = true;
            toaster.success("已登录");
            $state.go("main.mainpage");
        },function(error) {
            toaster.error("用户名或者密码错误");
        })
    };


});

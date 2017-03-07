/**
 * Created by 向麒 on 2017/1/14.
 * 登录管理
 */
'use strict';

var login = angular.module('login',['httpservice']);

login.controller('LoginController', ['$scope', '$http','$location','$rootScope', 'httpService','$state',function ($scope,$http,$location,$rootScope,httpService,$state) {
    $scope.username = "";
    $scope.password = "";
    $scope.showId = false;


    $scope.login = function () {

        var pwdEncode = $scope.password;
        // for (var i=0;i<128;i++){
        //     pwdEncode = hex_md5(pwdEncode+"financial");
        // }
        httpService.login($scope.username,pwdEncode).then(function (result) {
            $rootScope.isLogin = true;
            console.log(result);
            $state.go("main.mainpage");
        },function (error) {
            console.log(error);
            alert("用户名或者密码错误");
        })
    };


}]);

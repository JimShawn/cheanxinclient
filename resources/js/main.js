var authors = angular.module('main', []);

authors.controller('MainController', ['$scope', '$http', '$location', '$rootScope', '$state', 'httpService',function ($scope, $http, $location, $rootScope, $state, httpService) {

    $scope.$watch('$viewContentLoaded', function() {
        var winWid=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winHei=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var frameLeftWid=$('.frameLeft').width();
        var headerHei=$('.header').height();
        var breadHei=$('.bread').height();
        console.log("aaa");
        $('.frameRight').css({'width':(winWid-frameLeftWid)+'px'});
        $('.mainContent').css({'height':(winHei-headerHei)+'px'});
        $('.frameBox').css({'height':(winHei-headerHei-breadHei)+'px'});
    });

    $scope.menuItems = [true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    $scope.changeItem = function (i) {
        for (var j=0;j<$scope.menuItems.length;j++){
            if(i==j){
                $scope.menuItems[j] = true;
            }else{
                $scope.menuItems[j] = false;
            }
        }
    }

    $scope.manManagement = function () {//切换到人员管理页面
        $state.go("main.manmanagement");
    };
    $scope.productManagement =function () {
        $state.go("main.productmanagement");
    };
    $scope.subProductManagement =function () {
        $state.go("main.subproductmanagement");
    };
    $scope.positionManagement =function () {
        $state.go("main.positionmanagement");
    };
    $scope.deptManagement = function () {
        $state.go("main.deptmanagement");
    };
    $scope.LoanPreliminary = function () {
        $state.go("main.loanpreliminary");
    };
    $scope.setPricing = function () {
        $state.go("main.carpricinglist");
    };
    $scope.loanRecheck = function () {
        $state.go("main.loanrecheck");
    };
    $scope.signManagement = function () {
        $state.go("main.signmanagement");
    };
    $scope.giveupList = function () {
        $state.go("main.giveuplist");
    };
    $scope.logout = function () {
        httpService.logout().then(function () {
            $state.go("login");
        },function (err) {
            console.error(err.data.errorMessage);
        });
    };
}]);
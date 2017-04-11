var authors = angular.module('main', []);

authors.controller('MainController', function($scope, $http, $location, $rootScope, $state, httpService, $window, $interval, toaster) {

    $scope.$watch('$viewContentLoaded', function() {
        var winWid=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winHei=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var frameLeftWid=$('.frameLeft').width();
        var headerHei=$('.header').height();
        var breadHei=$('.bread').height();
        $('.frameRight').css({'width':(winWid-frameLeftWid)+'px'});
        $('.mainContent').css({'height':(winHei-headerHei)+'px'});
        $('.frameBox').css({'height':(winHei-headerHei-breadHei)+'px'});
    });
    var user = JSON.parse($window.sessionStorage["userInfo"]);
    $scope.userName = user.data.realName;
    $interval(function(){
        var now=new Date();
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var day=now.getDate();
        var hours=now.getHours();
        var minutes=now.getMinutes();
        var seconds=now.getSeconds();
        if(month<10){
            month = 0+""+month;
        }
        if(day<10){
            day = 0+""+day;
        }
        if(hours<10){
            hours = 0+""+hours;
        }
        if(minutes<10){
            minutes = 0+""+minutes;
        }
        if(seconds<10){
            seconds = 0+""+seconds;
        }
        $scope.nowTime = year+"-"+month+"-"+day+"   "+hours+":"+minutes+":"+seconds;
    },1000);

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
    $scope.afterTransfer = function () {
        $state.go("main.afterTransferLoanList");
    };
    $scope.afterMortgage = function () {
        $state.go("main.afterMortgageLoanList");
    };
    $scope.logout = function () {
        httpService.logout().then(function () {
            toaster.success("您已安全退出");
            $state.go("login");
        },function (err) {
            toaster.error(err.data.errorMessage);
        });
    };
});
/**
 * Created by 向麒 on 2017/4/5.
 * 放款管理
 */
'use strict';
var lending = angular.module('lending',['httpservice']);
lending.controller("afterTransferListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout) {


    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,23);//过户后放款
    $scope.tab = 8;
    $scope.goToTab = function (tabNo) {
        $scope.tab = tabNo;
        $scope.getList(0,10,tabNo);
    }

    $scope.changePageSizeFun = function (size) {
        $scope.query.page = $scope.data.number;
        $scope.query.size = size;
        $scope.getList($scope.data.number,size,23);
    };

    $scope.gotoPageFun = function (x) {
        $scope.query.page = x;
        $scope.query.size = $scope.data.size;
        $scope.getList(x,$scope.data.size,23);
    };

}]);

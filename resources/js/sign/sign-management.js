/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var sign = angular.module('sign',['httpservice']);
sign.controller("signListController",function ($scope, $http, $location, $rootScope, httpService, $state, $timeout, commonUtil, cityJson, $stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "signTabs", httpService);

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;

    $scope.operate = function (loan) {
        $state.go("main.eiditSign",{items:loan})
    }

});

loanrecheck.controller("signEditController",['$filter','$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    $scope.showGiveupDiaog =false;


    $scope.cancel = function () {
        $state.go("main.signmanagement");
    };
    $scope.giveup=function () {
        $scope.showGiveupDiaog =true;
    };
    $scope.commit = function () {
        var date = new Date($scope.singData);
        console.log(date.getTime());
        var signPicFileIds = $filter('filter')($scope.signPic, '').join(",");
        if(signPicFileIds == ""){
            alert("请添加签约材料");
            return;
        }
        var loan = {
            contractNumber:$scope.contractNumber,
            contractCreatedTime:date.getTime()/1000,
            contractFileIds:signPicFileIds
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},3).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.signmanagement");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    };
    $scope.doCancel = function () {
        $scope.showGiveupDiaog =false;
    };
    $scope.doGiveup = function () {

        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.signmanagement");
            $scope.showGiveupDiaog =false;
        },function (err) {
            console.log(err);
        });
    };
}]);

sign.controller("giveupListController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson, $stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "giveupTabs", httpService);

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;

    $scope.operate = function (loan) {
        $state.go("main.eiditGiveup",{items:loan})
    }

});

loanrecheck.controller("giveupEditController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    $scope.showGiveupDiaog =false;
    $scope.showAdjustDialog = false;
    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];

    $scope.getOperateLog = function (id, from, to) {
        httpService.getOperateLog(id,from,to).then(function (res) {
            console.log(res);
            var data = res.data;
            if (data.length>0){
                $scope.applicationGiveupReason = data[0].remark;
                $scope.operateUserName = data[0].operatorUsername;
                $scope.createdTime = data[0].createdTime;

            }
        },function (err) {
            console.log(err);
        })
    };
    if($scope.applyLoan != null){
        $scope.getOperateLog($scope.applyLoan.id,6,7);
    }



    $scope.cancel = function () {
        $state.go("main.giveuplist");
    };
    $scope.giveup=function () {
        $scope.showGiveupDiaog =true;
    };
    $scope.doCancel = function () {
        $scope.showGiveupDiaog =false;
        $scope.showAdjustDialog = false;
    };
    $scope.changeRate = function () {
        $scope.applicantLoanPrice = $scope.applyLoan.vehicleDealPrice*$scope.selectedRate/10;
    };
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = $scope.applicantLoanPrice/$scope.selectedTerm+$scope.applicantLoanPrice*$scope.selectedProduct.loanMonthlyInterestRate/100;
    };
    $scope.adjust= function () {
        httpService.getProductByCityId($scope.applyLoan.sourceCityId).then(function (res) {
            $scope.products = res.data;
            $scope.showAdjustDialog = true;
        },function (err) {

        })

    };
    $scope.doAdjust = function () {
        var loan = {
            productId:$scope.selectedProduct.id,
            applicantLoanRate:$scope.selectedRate,
            applicantLoanPrice:$scope.applicantLoanPrice,
            loanTerms:$scope.selectedTerm
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.signmanagement");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    };
    $scope.doGiveup = function () {

        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,5).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.giveuplist");
            $scope.showGiveupDiaog =false;
        },function (err) {
            console.log(err);
        });
    };
}]);
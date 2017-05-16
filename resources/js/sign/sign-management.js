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

    $scope.review = function (loan) {
        $state.go("main.viewSign",{items:loan})
    }
});

loanrecheck.controller("signEditController", function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil,toaster) {
    $scope.cities = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.applyLoan = $stateParams.items;
    if($scope.applyLoan){
        $scope.contractNumber = $scope.applyLoan.contractNumber;
        $scope.singData = $scope.applyLoan.contractCreatedTime * 1000;
        $scope.signPhotoes = commonUtil.reassembleImages($scope.applyLoan.contractFileIds);
    }

    $scope.showGiveupDialog =false;


    $scope.cancel = function () {
        $state.go("main.signmanagement");
    };

    $scope.giveup = function () {
        $scope.showGiveupDialog = true;
    };

    $scope.commit = function () {
        if(!$scope.contractNumber){
            toaster.error("请填写合同编号");
            return;
        };
        if(!$scope.singData){
            toaster.error("请选择签约日期");
            return;
        };
        var date = new Date($scope.singData);
        var signPicFileIds = $filter('filter')($scope.signPic, '').join(",");
        if(signPicFileIds == ""){
            toaster.error("请添加签约材料");
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
        $scope.showGiveupDialog = false;
    };

    $scope.doGiveup = function () {
        if(!$scope.giveupReason){
            toaster.error("请填写放弃理由");
            return;
        }
        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id, loanApply, 5).then(function () {
            $state.go("main.giveuplist");
            $scope.showGiveupDialog = false;
            $scope.showResignDialog = false;
        },function (err) {
            console.error(err);
        });
    };
});

loanrecheck.controller("signViewController", function ($filter, $scope, $rootScope, httpService, $state, $stateParams, commonUtil) {
    $scope.applyLoan = $stateParams.items;
    $scope.commonUtil = commonUtil;
    var signPhotoArr = $scope.applyLoan.contractFileIds.split(",");
    $scope.signPhotoes = new Array(signPhotoArr.length);
    for (var i = 0; i < signPhotoArr.length; i++) {
        $scope.signPhotoes[i] = signPhotoArr[i];
    }
    $scope.applyLoan.contractCreatedTime = commonUtil.getDateFromInt($scope.applyLoan.contractCreatedTime);

    $scope.doReview = function (operate) {
        var loanApply = {
            reviewRemark:$scope.reason
        };
        httpService.updateLoandraft($scope.applyLoan.id, loanApply, operate).then(function () {
            $state.go("main.signmanagement");
        },function (err) {
            console.error(err);
        });
    };
});

sign.controller("giveupListController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson, $stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "giveupTabs", httpService);

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;

    $scope.operate = function (loan) {
        $state.go("main.eiditGiveup",{items:loan})
    }

});

loanrecheck.controller("giveupEditController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams','commonUtil',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil) {
    $scope.cities = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.applyLoan = $stateParams.items;
    $scope.showGiveupDialog =false;
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
        $scope.getOperateLog($scope.applyLoan.id,6,17);
    }

    $scope.cancel = function () {
        $state.go("main.giveuplist");
    };
    $scope.giveup = function () {
        $scope.showGiveupDialog = true;
        $scope.showResignDialog = false;
        $scope.showAdjustDialog = false;
    };

    $scope.resign = function () {
        $scope.showGiveupDialog = false;
        $scope.showResignDialog = true;
        $scope.showAdjustDialog = false;
    }

    $scope.doCancel = function () {
        $scope.showGiveupDialog = false;
        $scope.showAdjustDialog = false;
        $scope.showResignDialog = false;
    };
    $scope.changeRate = function () {
        $scope.applicantLoanPrice = $scope.applyLoan.vehicleDealPrice*$scope.selectedRate/10;
    };
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = ($scope.applicantLoanPrice / $scope.selectedTerm + $scope.applicantLoanPrice * $scope.selectedProduct.loanMonthlyInterestRate / 100).toFixed(2);
    };
    $scope.adjust= function () {
        httpService.getProductByCityId($scope.applyLoan.sourceCityId).then(function (res) {
            $scope.products = res.data;
            $scope.showAdjustDialog = true;
            $scope.showGiveupDialog = false;
            $scope.showResignDialog = false;
        },function (err) {
            console.error(err);
        })
    };
    $scope.doAdjust = function () {
        var loan = {
            productId:$scope.selectedProduct.id,
            applicantLoanRate:$scope.selectedRate,
            applicantLoanPrice:$scope.applicantLoanPrice,
            loanTerms:$scope.selectedTerm
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function () {
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function () {
                $state.go("main.signmanagement");
            },function (err) {
                console.error(err);
            });
        },function (err) {
            console.error(err);
        })
    };

    $scope.doGiveup = function () {
        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id, loanApply, 3).then(function () {
            $scope.showGiveupDialog = false;
            $state.go("main.giveuplist");
        },function (err) {
            console.error(err);
        });
    };

    $scope.doResign = function () {
        var loanApply = {
            reviewRemark:$scope.resignReason
        };
        httpService.updateLoandraft($scope.applyLoan.id, loanApply, 4).then(function () {
            $scope.showGiveupDialog = false;
            $scope.showResignDialog = false;
            $state.go("main.signmanagement");
        },function (err) {
            console.error(err);
        });
    };
}]);
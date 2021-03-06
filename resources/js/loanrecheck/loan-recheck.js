/**
 * Created by 向麒 on 2017/3/3.
 */
'use strict';
var loanrecheck = angular.module('loanrecheck',['httpservice']);
loanrecheck.controller("loanRecheckListController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson,$stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "recheckTabs", httpService);
    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.addProduct = function () {
        $state.go("main.addproductmanagement",{items:null});
    };
    $scope.showDetail = function (loan) {

    };
    $scope.check = function (loan) {
        $state.go("main.checkloan",{items:loan});
    };
    $scope.reApply = function (loan) {
        $state.go("main.reapplyloan",{items:loan});
    };
});

loanrecheck.controller("checkLoanController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams','commonUtil',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil) {
    $scope.cities = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.brands = [
        "奥迪","奔驰","宝马","丰田","本田","铃木","比亚迪","吉利","雪佛兰","现代","大众","福特"
    ];
    $scope.factories = [
        "广汽","上汽","北汽","一汽"
    ];
    $scope.series = ["福克斯","科鲁兹","yalris","雷凌","宋","元"];
    $scope.productTypes = [{
        id:0,
        name:"二手车贷款"
    },{
        id:1,
        name:"三手车贷款"
    }];
    $scope.paybackTypes = [{
        id:0,
        name:"等额本息"
    },{
        id:1,
        name:"先息后本"
    }];
    $scope.AvailableRates = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    $scope.produceYears = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];

    $scope.emissiones = ["化油器","国1","国2","欧1","欧2","国3","国3带OBD","欧3","国4","欧4","国5","欧5","欧6","国4(京5)"];
    $scope.applyLoan = $stateParams.items;
    if ($scope.applyLoan && $scope.applyLoan.materialsFileIds) {
        $scope.materialsFileIds = commonUtil.reassembleImages($scope.applyLoan.materialsFileIds);
    }

    $scope.getOperateLog = function (id, from, to) {
        httpService.getOperateLog(id,from,to).then(function (res) {
            console.log(res);
            var data = res.data;
            if (data.length>0){
                    $scope.refuseReason = data[0].remark.replace(/&/g,"  ");
                    $scope.operateUserName = data[0].operatorUsername;
                    $scope.createdTime = data[0].createdTime;

            }
        },function (err) {
            console.log(err);
        })
    };
    if($scope.applyLoan!= null){
        if ($scope.applyLoan.status == 10){
            $scope.getOperateLog($scope.applyLoan.id,4,5);
        }
    };
    $scope.showRefuseDialog = false;
    $scope.showPassDialog = false;
    $scope.creditRemark = "";
    $scope.paybackRemark = "";
    $scope.refuse = function () {
        $scope.mainRefuseReasons = [];
        if($scope.materialFake){
            $scope.mainRefuseReasons.push("材料虚假");
        };
        if($scope.creditBad){
            $scope.mainRefuseReasons.push("客户信用不良"+$scope.creditRemark);
        };
        if($scope.paybackBad){
            $scope.mainRefuseReasons.push("客户还款能力不足"+$scope.paybackRemark);
        };

        $scope.showRefuseDialog = true;
    };
    $scope.pass = function () {

        httpService.getProductByID($scope.applyLoan.productId).then(function (res) {
            console.log(res);
            $scope.paybackType = res.data.repaymentMethod;
            $scope.minRate = res.data.minAvailableRate;
            $scope.maxRate = res.data.maxAvailableRate;
            var termsStr = res.data.availableTerms;
            $scope.availableTerms = termsStr.split(",");
            $scope.showPassDialog = true;
        },function (err) {

        })

    };
    $scope.changeRate = function () {
        $scope.reviewLoanPrice = $scope.applyLoan.vehiclePredictPrice * $scope.reviewLoanRate/10;
    };
    $scope.changeTerms = function () {
        $scope.payPerMonth = $scope.reviewLoanPrice*($scope.applyLoan.productLoanMonthlyInterestRate/100+1/$scope.selectedTerm);
    }
    $scope.doRefuse = function () {
        var errMsg = "";
        for(var i=0;i<$scope.mainRefuseReasons.length;i++){
            errMsg += $scope.mainRefuseReasons[i]+"&";
        };
        if ($scope.otherRefuseReason) {
            errMsg = errMsg+$scope.otherRefuseReason;
        }
        var loanApply = {
            reviewRemark:errMsg
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {
            console.log(res);
            $state.go("main.loanrecheck");
        },function (err) {
            console.log(err);
        });
        
    };
    $scope.doCancel = function () {
        $scope.showRefuseDialog = false;
        $scope.showPassDialog = false;
        
    };
    $scope.doPass=function () {
        var loan = {
            reviewLoanTerms:$scope.selectedTerm,
            reviewLoanRate:$scope.reviewLoanRate,
            reviewLoanPrice:$scope.reviewLoanPrice
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示更新
            httpService.updateLoandraft($scope.applyLoan.id,{},3).then(function (res) {//3表示复审审批通过
                console.log(res);
                $state.go("main.loanrecheck");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        });

    }
}]);

loanrecheck.controller("reApplyLoanController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,$filter,commonUtil) {
    $scope.cities = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.brands = [
        "奥迪","奔驰","宝马","丰田","本田","铃木","比亚迪","吉利","雪佛兰","现代","大众","福特"
    ];
    $scope.factories = [
        "广汽","上汽","北汽","一汽"
    ];
    $scope.series = ["福克斯","科鲁兹","yalris","雷凌","宋","元"];

    $scope.produceYears = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];

    $scope.emissiones = ["化油器","国1","国2","欧1","欧2","国3","国3带OBD","欧3","国4","欧4","国5","欧5","欧6","国4(京5)"];
    $scope.applyLoan = $stateParams.items;
    $scope.getOperateLog = function (id, from, to) {
        httpService.getOperateLog(id,from,to).then(function (res) {
            console.log(res);
            var data = res.data;
            if (data.length>0){
                $scope.refuseReason = data[0].remark.replace(/&/g,"  ");
            }
        },function (err) {
            console.log(err);
        })
    };
    if($scope.applyLoan!=null){
        $scope.getOperateLog($scope.applyLoan.id,4,5);
        $scope.applyLoan.vehicleProductionYearMonth = parseInt($scope.applyLoan.vehicleProductionYearMonth);
    };
    $scope.commit = function () {
        var loanApply = {
            materialsRemark:$scope.reapplyReason,
            materialsFileIds:$filter('filter')($scope.materials, '').join(",")
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,1).then(function () {
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function () {
                $state.go("main.loanrecheck");
            },function (err) {
                console.error(err);
            });
        },function (err) {
            console.error(err);
        });
    };

    $scope.abort = function () {
        httpService.updateLoandraft($scope.applyLoan.id, {}, 5).then(function () {
            $state.go("main.loanrecheck");
        },function (err) {
            console.error(err);
        });
    }

    $scope.cancel = function () {
        $state.go("main.loanrecheck");
    };

    $scope.doCancelRefuse = function () {

    }
});

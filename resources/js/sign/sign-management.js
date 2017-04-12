/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var sign = angular.module('sign',['httpservice']);
sign.controller("signListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','commonUtil','cityJson',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson) {

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;
    $scope.loanStatuses=[
        {
            id:0,
            name:"已放弃"
        },{
            id:1,
            name:"草稿箱",
        },{
            id:2,
            name:"待初审",
        },{
            id:3,
            name:"待定价",
        },{
            id:4,
            name:"待复审",
        },{
            id:5,
            name:"材料待补充",
        },{
            id:6,
            name:"待签约",
        },{
            id:7,
            name:"方案待修改",
        },{
            id:8,
            name:"待过户",
        },{
            id:9,
            name:"初审退回",
        },{
            id:10,
            name:"待复审",
        },{
            id:11,
            name:"拒绝",
        },{
            id:12,
            name:"待复审",
        },{
            id:13,
            name:"拒绝",
        },{
            id:14,
            name:"已放弃",
        },{
            id:15,
            name:"已放弃",
        },{
            id:16,
            name:"已放弃",
        },{
            id:17,
            name:"待审核"
        },{
            id:18,
            name:"待审核"
        },{
            id:19,
            name:"待确认"
        },{
            id:20,
            name:"放弃贷款"
        },{
            id:21,
            name:"材料待补充"
        },{
            id:22,
            name:"待审核"
        },{
            id:23,
            name:"待放款"
        },{
            id:24,
            name:"已放款"
        },{
            id:25,
            name:"待过户"
        },{
            id:26,
            name:"待确认"
        },{
            id:27,
            name:"放弃贷款"
        },{
            id:28,
            name:"材料待补充"
        },{
            id:29,
            name:"待审核"
        },{
            id:30,
            name:"待放款"
        },{
            id:31,
            name:"待还款"
        },{
            id:32,
            name:"待审核"
        },{
            id:33,
            name:"待审核"
        },{
            id:34,
            name:"审核不通过"
        },{
            id:35,
            name:"审核不通过"
        }
    ];

    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,6);
    $scope.waitingSign = true;

    $scope.changePageSizeFun = function (size) {
        console.log(size);
        console.log($scope.data.number);
        $scope.getList($scope.data.number,size);
    };

    $scope.gotoPageFun = function (x) {
        console.log("gotoPageFun");

        console.log($scope.data.size);
        console.log(x);
        $scope.getList(x,$scope.data.size);
    };
    $scope.changeTab=function (pageType) {
        switch (pageType){
            case 1:
                $scope.waitingSign=true;
                $scope.waitingModify =$scope.waitingChecked=$scope.checked=false;
                $scope.getList(0,10,6);
                break;
            case 2:
                $scope.waitingModify=true;
                $scope.waitingSign =$scope.waitingChecked=$scope.checked=false;
                $scope.getList(0,10,0);
                break;
            case 3:
                $scope.waitingChecked=true;
                $scope.waitingSign =$scope.waitingModify=$scope.checked=false;
                break;
            case 4:
                $scope.checked=true;
                $scope.waitingSign =$scope.waitingModify=$scope.waitingChecked=false;
                break;
        }
    };
    $scope.operate = function (loan) {
        $state.go("main.eiditSign",{items:loan})
    }

}]);
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

sign.controller("giveupListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','commonUtil','cityJson',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson) {

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;
    $scope.loanStatuses=[
        {
            id:0,
            name:"已放弃"
        },{
            id:1,
            name:"草稿箱",
        },{
            id:2,
            name:"待初审",
        },{
            id:3,
            name:"待定价",
        },{
            id:4,
            name:"待复审",
        },{
            id:5,
            name:"材料待补充",
        },{
            id:6,
            name:"待签约",
        },{
            id:7,
            name:"方案待修改",
        },{
            id:8,
            name:"待过户",
        },{
            id:9,
            name:"初审退回",
        },{
            id:10,
            name:"待复审",
        },{
            id:11,
            name:"拒绝",
        },{
            id:12,
            name:"待复审",
        },{
            id:13,
            name:"拒绝",
        },{
            id:14,
            name:"已放弃",
        },{
            id:15,
            name:"已放弃",
        },{
            id:16,
            name:"已放弃",
        },{
            id:17,
            name:"待审核"
        },{
            id:18,
            name:"待审核"
        },{
            id:19,
            name:"待确认"
        },{
            id:20,
            name:"放弃贷款"
        },{
            id:21,
            name:"材料待补充"
        },{
            id:22,
            name:"待审核"
        },{
            id:23,
            name:"待放款"
        },{
            id:24,
            name:"已放款"
        },{
            id:25,
            name:"待过户"
        },{
            id:26,
            name:"待确认"
        },{
            id:27,
            name:"放弃贷款"
        },{
            id:28,
            name:"材料待补充"
        },{
            id:29,
            name:"待审核"
        },{
            id:30,
            name:"待放款"
        },{
            id:31,
            name:"待还款"
        },{
            id:32,
            name:"待审核"
        },{
            id:33,
            name:"待审核"
        },{
            id:34,
            name:"审核不通过"
        },{
            id:35,
            name:"审核不通过"
        }
    ];

    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,7);
    $scope.waitingCheck = true;

    $scope.changePageSizeFun = function (size) {
        console.log(size);
        console.log($scope.data.number);
        $scope.getList($scope.data.number,size);
    };

    $scope.gotoPageFun = function (x) {
        console.log("gotoPageFun");

        console.log($scope.data.size);
        console.log(x);
        $scope.getList(x,$scope.data.size);
    };
    $scope.changeTab=function (pageType) {
        switch (pageType){
            case 1:
                $scope.waitingCheck=true;
                $scope.checked=false;
                $scope.getList(0,10,6);
                break;
            case 2:
                $scope.checked=true;
                $scope.waitingCheck=false;
                $scope.getList(0,10,14);
                break;
        }
    };
    $scope.operate = function (loan) {
        $state.go("main.eiditGiveup",{items:loan})
    }

}]);
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
        $scope.paybackPerMonth = $scope.applicantLoanPrice/$scope.selectedTerm+$scope.applicantLoanPrice*$scope.selectedProduct.productLoanMonthlyInterestRate/100;
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
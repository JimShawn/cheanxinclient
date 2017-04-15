/**
 * Created by 向麒 on 2017/4/12.
 * 抵押放款管理
 */
'use strict';
var mortgage = angular.module('mortgage',['httpservice']);
mortgage.controller("afterMortgageListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','commonUtil',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,commonUtil) {

    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;
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
        },{
            id:36,
            name:"待还款"
        },{
            id:37,
            name:"待审核"
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
    $scope.getList(0,10,25);//抵押后放款
    $scope.tab = 8;
    $scope.goToTab = function (tabNo) {
        $scope.tab = tabNo;
        $scope.getList(0,10,tabNo);
    };

    $scope.changePageSizeFun = function (size) {
        $scope.query.page = $scope.data.number;
        $scope.query.size = size;
        $scope.getList($scope.data.number,size,$scope.tab);
    };

    $scope.gotoPageFun = function (x) {
        $scope.query.page = x;
        $scope.query.size = $scope.data.size;
        $scope.getList(x,$scope.data.size,$scope.tab);
    };
    $scope.uploadLendingResult = function (loan) {

        $state.go("main.uploadMortgageResult",{items:loan});
    };
    $scope.check = function (loan) {
        $state.go("main.checkMortgageResult",{items:loan});
    };
    $scope.lending = function (loan) {
        $state.go("main.checkMortgageResult",{items:loan});
    };
    $scope.checkCantMortgage = function (loan) {
        $state.go("main.checkMortgageResult",{items:loan});
    }

}]);


lending.controller("mortgageEditController",['$filter','$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    if($scope.applyLoan){
        if($scope.applyLoan.transferFileIds){
            $scope.transferPhotoes = $scope.applyLoan.transferFileIds.split(",");
        }
        if($scope.applyLoan.transferGPSFileIds){
            $scope.GPSPhotoes = $scope.applyLoan.transferGPSFileIds.split(",");
        }
        if($scope.applyLoan.transferInsuranceFileIds){
            $scope.insuranceContractPhotoes = $scope.applyLoan.transferInsuranceFileIds.split(",");
        }
        if($scope.applyLoan.mortgageFileIds){
            $scope.mortgagePhotoes = $scope.applyLoan.mortgageFileIds.split(",");
        }

    };
    $scope.showGiveupDiaog =false;


    $scope.cancel = function () {
        $state.go("main.afterMortgageLoanList");
    };
    $scope.failTransfer=function () {
        $scope.showGiveupDiaog =true;
    };
    $scope.commit = function () {
        var date = new Date($scope.applyLoan.transferCreatedTime);
        var date1 = new Date($scope.applyLoan.mortgageCreatedTime);
        console.log(date.getTime());
        var GPSPic = $filter('filter')($scope.GPSPic, '').join(",");
        var transferPic = $filter('filter')($scope.transferPic, '').join(",");
        var insuranceContractPic = $filter('filter')($scope.insuranceContractPic, '').join(",");
        var mortgagePic = $filter('filter')($scope.mortgagePic, '').join(",");
        var errMsg = "";
        if(transferPic == ""){
            errMsg += "请上传过户材料"+"\n";
        };
        if(GPSPic == ""){
            errMsg += "请上传GPS安装材料"+"\n";
        };
        if(insuranceContractPic == ""){
            errMsg += "请上传保险合同材料"+"\n";
        };
        if (mortgagePic == ""){
            errMsg += "请上传抵押材料"+"\n";
        }
        if(errMsg != ""){
            alert(errMsg);
            return;
        }
        var loan = {
            transferCardNumber:$scope.applyLoan.transferCardNumber,
            transferCreatedTime:date.getTime()/1000,
            transferFileIds:transferPic,
            transferGPSFileIds:GPSPic,
            transferInsuranceFileIds:insuranceContractPic,
            mortgageCreatedTime:date1.getTime()/1000,
            mortgageFileIds:mortgagePic
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.afterMortgageLoanList");
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
    $scope.doFailTransfer = function () {

        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,5).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.afterMortgageLoanList");
            $scope.showGiveupDiaog =false;
        },function (err) {
            console.log(err);
        });
    };
}]);

lending.controller("mortgageDetailController",['$filter','$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams','commonUtil',function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    $scope.commonUtil = commonUtil;
    $scope.showGiveupDiaog =false;
    if($scope.applyLoan.status == 26){
        httpService.getOperateLog($scope.applyLoan.id,25,26).then(function (res) {
            var data = res.data;
            if (data.length>0){
                $scope.cantTransferReason = data[0].remark;

            }
        },function (err) {

        })
    };
    if($scope.applyLoan.status == 29){
        $scope.transferPhotoes = $scope.applyLoan.transferFileIds.split(",");
        $scope.GPSPhotoes = $scope.applyLoan.transferGPSFileIds.split(",");
        $scope.insuranceContractPhotoes = $scope.applyLoan.transferInsuranceFileIds.split(",");
        $scope.mortgagePhotoes  = $scope.applyLoan.mortgageFileIds.split(",");
    }


    $scope.cancel = function () {
        $state.go("main.afterMortgageLoanList");
    };
    $scope.failTransfer=function () {
        $scope.showGiveupDiaog =true;
    };
    $scope.checkPass = function () {

        httpService.updateLoandraft($scope.applyLoan.id,{},3).then(function (res) {//3
            console.log(res);
            $state.go("main.afterMortgageLoanList");
        },function (err) {
            console.log(err);
        });
    };
    $scope.doCancel = function () {
        $scope.showGiveupDiaog =false;
        $scope.showTransferDiaog = false;
    };
    $scope.doOperateTransfer = function () {
        if(!$scope.transferReason){
            alert('请输入原因');
            return;
        }
        var loanApply = {
            reviewRemark:$scope.transferReason
        };
        var operateNum  = 0;
        if($scope.confirmCantTransfer){
            operateNum = 3;
        }else if($scope.confirmCanTransfer ){
            operateNum = 4;
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,operateNum).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.afterMortgageLoanList");
            $scope.confirmCantTransfer = false;
            $scope.confirmCanTransfer = false;
            $scope.showTransferDiaog = false;
        },function (err) {
            console.log(err);
        });
    };
    $scope.doCantTransfer = function () {
        $scope.showTransferDiaog = true;
        $scope.confirmCantTransfer = true;
        $scope.confirmCanTransfer = false;
    };
    $scope.continueTransfer = function () {
        $scope.showTransferDiaog = true;
        $scope.confirmCantTransfer = false;
        $scope.confirmCanTransfer = true;
    };
    $scope.doFailTransfer = function () {
        if(!$scope.giveupReason){
            alert('请输入原因');
            return;
        }
        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.afterMortgageLoanList");
            $scope.showGiveupDiaog =false;
        },function (err) {
            console.log(err);
        });
    };
    $scope.lendingConfirm = function () {

        var date = new Date($scope.applyLoan.releaseCreatedTime);
        console.log(date.getTime());
        var lendingPic = $filter('filter')($scope.lendingPic, '').join(",");
        if(lendingPic == ""){
            alert("请上传放款材料");
            return;
        };
        var loan = {
            releaseAmount:$scope.applyLoan.applicantLoanPrice,
            releaseCreatedTime:date.getTime()/1000,
            releaseFileIds:lendingPic
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.afterMortgageLoanList");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    };
    $scope.uploadMortgage = function () {
        var date = new Date($scope.applyLoan.mortgageCreatedTime);
        console.log(date.getTime());
        var mortgagePic = $filter('filter')($scope.mortgagePic, '').join(",");
        if(mortgagePic == ""){
            alert("请上传抵押材料");
            return;
        };
        var loan = {
            mortgageCreatedTime:date.getTime()/1000,
            mortgageFileIds:mortgagePic
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.afterMortgageLoanList");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    }
}]);
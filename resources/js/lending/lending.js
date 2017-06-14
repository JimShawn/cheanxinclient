/**
 * Created by 向麒 on 2017/4/5.
 * 放款管理
 */
'use strict';
var lending = angular.module('lending',['httpservice']);
lending.controller("afterTransferListController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,commonUtil,$stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "transferTabs", httpService);

    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.uploadLendingResult = function (loan, operate) {
        loan.operate = operate;
        $state.go("main.uploadTransferResult",{items:loan});
    };
    $scope.check = function (loan, operate) {
        loan.operate = operate;
        $state.go("main.checkTransferResult",{items:loan});
    };
});

lending.controller("transferEditController", function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil,toaster) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    $scope.commonUtil = commonUtil;
    if ($scope.applyLoan) {
        $scope.transferPhotos = commonUtil.reassembleImages($scope.applyLoan.transferFileIds);
        $scope.GPSPhotos = commonUtil.reassembleImages($scope.applyLoan.transferGPSFileIds);
        $scope.insuranceContractPhotos = commonUtil.reassembleImages($scope.applyLoan.transferInsuranceFileIds);
        $scope.applyLoan.transferCreatedTime = $scope.applyLoan.transferCreatedTime * 1000;
    };
    $scope.showGiveupDialog =false;


    $scope.cancel = function () {
        $state.go("main.afterTransferLoanList");
    };
    $scope.failTransfer=function () {
        $scope.showGiveupDialog =true;
    };
    $scope.commit = function () {
        if(!$scope.applyLoan.transferCreatedTime){
            toaster.error("请选择过户时间");
            return;
        };
        if(!$scope.applyLoan.transferCardNumber){
            toaster.error("请填写过户后车牌号");
            return;
        };
        var date = new Date($scope.applyLoan.transferCreatedTime);
        var GPSPic = $filter('filter')($scope.GPSPic, '').join(",");
        var transferPic = $filter('filter')($scope.transferPic, '').join(",");
        var insuranceContractPic = $filter('filter')($scope.insuranceContractPic, '').join(",");
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
        if(errMsg != ""){
            toaster.error(errMsg);
            return;
        }
        var loan = {
            transferCardNumber:$scope.applyLoan.transferCardNumber,
            transferCreatedTime:date.getTime() / 1000,
            transferFileIds:transferPic,
            transferGPSFileIds:GPSPic,
            transferInsuranceFileIds:insuranceContractPic
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.afterTransferLoanList");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    };
    $scope.doCancel = function () {
        $scope.showGiveupDialog =false;
    };
    $scope.doFailTransfer = function () {

        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,5).then(function (res) {
            console.log(res);
            $state.go("main.afterTransferLoanList");
            $scope.showGiveupDialog =false;
        },function (err) {
            console.log(err);
        });
    };

    $scope.uploadMortgage = function () {
        var date = new Date($scope.applyLoan.mortgageCreatedTime);
        console.log(date.getTime());
        var mortgagePic = $filter('filter')($scope.mortgagePic, '').join(",");
        if(mortgagePic == ""){
            toaster.error("请上传抵押材料");
            return;
        };
        var loan = {
            mortgageCreatedTime:date.getTime() / 1000,
            mortgageFileIds:mortgagePic
        };
        httpService.updateLoandraft($scope.applyLoan.id,loan,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.afterTransferLoanList");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    }
});

lending.controller("transferDetailController", function ($filter,$scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil,toaster) {
    $scope.cities = cityJson;

    $scope.applyLoan = $stateParams.items;
    $scope.commonUtil = commonUtil;
    $scope.showGiveupDialog =false;
    if ($scope.applyLoan && $scope.applyLoan.status == 19) {
        httpService.getOperateLog($scope.applyLoan.id,8,19).then(function (res) {
            var data = res.data;
            if (data.length > 0){
                $scope.cantTransferReason = data[0].remark;

            }
        },function (err) {

        })
    };

    if ($scope.applyLoan) {
        $scope.transferPhotos = commonUtil.reassembleImages($scope.applyLoan.transferFileIds);
        $scope.GPSPhotos = commonUtil.reassembleImages($scope.applyLoan.transferGPSFileIds);
        $scope.insuranceContractPhotos = commonUtil.reassembleImages($scope.applyLoan.transferInsuranceFileIds);
        $scope.mortgagePhotos = commonUtil.reassembleImages($scope.applyLoan.mortgageFileIds);
        $scope.applyLoan.releaseCreatedTime = $scope.applyLoan.releaseCreatedTime * 1000;
        $scope.lendingPhotos = commonUtil.reassembleImages($scope.applyLoan.releaseFileIds);
    }

    $scope.cancel = function () {
        $state.go("main.afterTransferLoanList");
    };
    $scope.failTransfer=function () {
        $scope.showGiveupDialog =true;
    };
    $scope.checkPass = function () {
            httpService.updateLoandraft($scope.applyLoan.id,{},3).then(function (res) {//3
                console.log(res);
                $state.go("main.afterTransferLoanList");
            },function (err) {
                console.log(err);
            });
    };
    $scope.doCancel = function () {
        $scope.showGiveupDialog =false;
        $scope.showTransferDialog = false;
    };
    $scope.doOperateTransfer = function () {
        if(!$scope.transferReason){
            toaster.error('请输入原因');
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
            $state.go("main.afterTransferLoanList");
            $scope.confirmCantTransfer = false;
            $scope.confirmCanTransfer = false;
            $scope.showTransferDialog = false;
        },function (err) {
            console.log(err);
        });
    };
    $scope.doCantTransfer = function () {
        $scope.showTransferDialog = true;
        $scope.confirmCantTransfer = true;
        $scope.confirmCanTransfer = false;
    };
    $scope.continueTransfer = function () {
        $scope.showTransferDialog = true;
        $scope.confirmCantTransfer = false;
        $scope.confirmCanTransfer = true;
    };
    $scope.doFailTransfer = function () {
        if(!$scope.giveupReason){
            toaster.error('请输入原因');
            return;
        }
        var loanApply = {
            reviewRemark:$scope.giveupReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {//4表示放弃签约
            console.log(res);
            $state.go("main.afterTransferLoanList");
            $scope.showGiveupDialog =false;
        },function (err) {
            console.log(err);
        });
    };

    $scope.lendingConfirm = function () {
        var date = new Date($scope.applyLoan.releaseCreatedTime);
        var lendingPic = $filter('filter')($scope.lendingPic, '').join(",");
        if(lendingPic == ""){
            toaster.error("请上传放款材料");
            return;
        };
        var loan = {
            releaseCreatedTime:date.getTime() / 1000,
            releaseFileIds:lendingPic
        };
        httpService.release($scope.applyLoan.id,loan).then(function () {
            $state.go("main.afterTransferLoanList");
        },function (err) {
            toaster.error(error.data.errorMessage);
        })
    };
});

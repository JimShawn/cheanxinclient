/**
 * Created by 向麒 on 2017/3/3.
 */
'use strict';
var loanrecheck = angular.module('loanrecheck',['httpservice']);
loanrecheck.controller("loanRecheckListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','commonUtil','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson,$stateParams) {

    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;

        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,4);
    $scope.waitingRecheck=true;
    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;
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
    $scope.addProduct = function () {
        $state.go("main.addproductmanagement",{items:null});
    };
    $scope.test = function () {
        //
        httpService.getChekuangbaoDetailTest().then(function (res) {
            console.log(res);
        },function (err) {
            console.log(err);
        })
    };
    $scope.showDetail = function (loan) {

    };
    $scope.check = function (loan) {
        $state.go("main.checkloan",{items:loan});
    };
    $scope.reApply = function (loan) {
        $state.go();
    }
    $scope.changeTab = function (type) {
        switch (type){
            case 1:
                $scope.waitingRecheck=true;
                $scope.recheckApproal =$scope.recheckRefuse=$scope.clientGiveup=false;
                $scope.getList(0,10,4);
                break;
            case 2:
                $scope.recheckApproal=true;
                $scope.waitingRecheck=$scope.recheckRefuse=$scope.clientGiveup=false;
                $scope.getList(0,10,6);//审核通过
                break;
            case 3:
                $scope.recheckRefuse=true;
                $scope.waitingRecheck =$scope.recheckApproal=$scope.clientGiveup=false;
                $scope.getList(0,10,5);//补充材料
                break;
            case 4:
                $scope.clientGiveup=true;
                $scope.waitingRecheck =$scope.recheckApproal=$scope.recheckRefuse=false;
                $scope.getList(0,10,15);//放弃补充材料
                break;

        }
    }

}]);

loanrecheck.controller("checkLoanController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;

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
    if($scope.applyLoan!=null){
        $scope.applyLoan.vehicleProductionYearMonth = parseInt($scope.applyLoan.vehicleProductionYearMonth);
    };
    $scope.showRefuseDialog = false;
    $scope.showPassDialog = false;
    $scope.refuse = function () {
        var refuseStr = "";
        if($scope.materialFake){
            refuseStr +="材料虚假\n";
        };
        if($scope.creditBad){
            refuseStr +="客户信用不良\n";
        };
        if($scope.paybackBad){
            refuseStr +="客户还款能力不足\n";
        };
        $scope.mainRefuseReason = refuseStr;

        $scope.showRefuseDialog = true;
    };
    $scope.pass = function () {
        
    };
    $scope.doRefuse = function () {
        var loanApply = {
            reviewRemark:$scope.mainRefuseReason+$scope.otherRefuseReason
        };
            httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {//3表示初审审批通过
                console.log(res);
                $state.go("main.loanrecheck");
            },function (err) {
                console.log(err);
            });
        
    };
    $scope.doCancelRefuse = function () {

    }
}]);

loanrecheck.controller("reApplyLoanController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;

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
    if($scope.applyLoan!=null){
        $scope.applyLoan.vehicleProductionYearMonth = parseInt($scope.applyLoan.vehicleProductionYearMonth);
    };
    $scope.showRefuseDialog = false;
    $scope.showPassDialog = false;
    $scope.refuse = function () {
        var refuseStr = "";
        if($scope.materialFake){
            refuseStr +="材料虚假\n";
        };
        if($scope.creditBad){
            refuseStr +="客户信用不良\n";
        };
        if($scope.paybackBad){
            refuseStr +="客户还款能力不足\n";
        };
        $scope.mainRefuseReason = refuseStr;

        $scope.showRefuseDialog = true;
    };
    $scope.pass = function () {

    };
    $scope.doRefuse = function () {
        var loanApply = {
            reviewRemark:$scope.mainRefuseReason+$scope.otherRefuseReason
        };
        httpService.updateLoandraft($scope.applyLoan.id,loanApply,4).then(function (res) {//3表示初审审批通过
            console.log(res);
            $state.go("main.loanrecheck");
        },function (err) {
            console.log(err);
        });

    };
    $scope.doCancelRefuse = function () {

    }
}]);

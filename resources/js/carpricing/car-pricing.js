/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var carpricing = angular.module('carpricing',['httpservice']);
carpricing.controller("carPricingListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','commonUtil','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson,$stateParams) {

    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;

        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,3);
    $scope.waitingPricing=true;
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
    $scope.setPrice = function (loan) {
        $state.go("main.setpricelist",{items:loan});
    };
    $scope.changeTab = function (type) {
        switch (type){
            case 1:
                $scope.waitingPricing=true;
                $scope.Priced =false;
                $scope.getList(0,10,3);
                break;
            case 2:
                $scope.Priced=true;
                $scope.waitingPricing=false;
                $scope.getList(0,10,4);
                break;

        }
    }

}]);
product.controller("setPriceController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
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
    }


    $scope.isRight = true;
    $scope.commit = function () {
        var applyLoantwo = {
                vehiclePredictPrice:$scope.predictPrice,
                vehicleVin:$scope.applyLoan.vehicleVin,
                vehicleManufacturers:$scope.applyLoan.vehicleManufacturers,
                vehicleBrand:$scope.applyLoan.vehicleBrand,
                vehicleSeries:$scope.applyLoan.vehicleSeries,
                vehicleProductionYearMonth:$scope.applyLoan.vehicleProductionYearMonth,
                vehicleRegistrationYearMonth:$scope.applyLoan.vehicleRegistrationYearMonth,
                vehicleKilometers:$scope.applyLoan.vehicleKilometers,
                vehicleUtilityType:$scope.applyLoan.vehicleUtilityType,
                vehicleEmission:$scope.applyLoan.vehicleEmission,
                vehicleType:"中型车"
            };



        httpService.updateLoandraft($scope.applyLoan.id,applyLoantwo,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//3表示初审审批通过
                console.log(res);
                $state.go("main.carpricinglist");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })
    };
    $scope.cancel = function () {

    }
}]);

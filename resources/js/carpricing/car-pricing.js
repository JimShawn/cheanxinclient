/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var carpricing = angular.module('carpricing',['httpservice']);
carpricing.controller("carPricingListController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson,$stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "priceTabs", httpService);

    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.addProduct = function () {
        $state.go("main.addproductmanagement",{items:null});
    };
    $scope.test = function () {
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
});

product.controller("setPriceController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,commonUtil, toaster) {
    $scope.cities = cityJson;
    $scope.commonUtil = commonUtil;

    $scope.produceYears = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];

    $scope.emissiones = ["化油器","国1","国2","欧1","欧2","国3","国3带OBD","欧3","国4","欧4","国5","欧5","欧6","国4(京5)"];
    $scope.applyLoan = $stateParams.items;
    if ($scope.applyLoan != null) {
        $scope.applyLoan.vehicleProductionYearMonth = parseInt($scope.applyLoan.vehicleProductionYearMonth);
        $scope.vehicleRegistrationCertificateFileIds = commonUtil.reassembleImages($scope.applyLoan.vehicleRegistrationCertificateFileIds);
        $scope.vehicleLicenseFileIds = commonUtil.reassembleImages($scope.applyLoan.vehicleLicenseFileIds);
        $scope.vehicleFileIds = commonUtil.reassembleImages($scope.applyLoan.vehicleFileIds);
        //获取汽车品牌
        httpService.getCarBrand().then(function (res) {
            $scope.brands = res.data;
                if($scope.applyLoan.vehicleBrand){
                    for(var i=0;i<$scope.brands.length;i++){
                        if($scope.applyLoan.vehicleBrand == $scope.brands[i].id){
                            $scope.selectedBrand = $scope.brands[i];
                        }
                    };
                    //获取车系
                    if($scope.applyLoan.vehicleSeries){
                        httpService.getCarSeriesByBrand($scope.applyLoan.vehicleBrand).then(function (res) {
                            $scope.series = res.data;
                            for(var j=0;j<$scope.series.length;j++){
                                if($scope.applyLoan.vehicleSeries == $scope.series[j].id){
                                    $scope.selectedSeries = $scope.series[j];
                                }
                            }
                            httpService.getCarTypeBySerie($scope.applyLoan.vehicleSeries).then(function (res) {
                                $scope.carTypes = res.data;
                                for(var k=0;k<$scope.carTypes.length;k++){
                                    if($scope.applyLoan.vehicleType == $scope.carTypes[k].id){
                                        $scope.selectedCarType = $scope.carTypes[k];
                                    }
                                }
                            },function (err) {

                            })
                        },function (err) {

                        })
                    }
                }
        },function (err) {
            toaster.error(err);
        });
    }

    $scope.changeCarBrand = function () {
        if(!$scope.selectedBrand)return;
        httpService.getCarSeriesByBrand($scope.selectedBrand.id).then(function (res) {
            $scope.series = res.data;
        },function (err) {

        })
    };

    $scope.changeCarSeries = function () {
        if(!$scope.selectedSeries)return;
        httpService.getCarTypeBySerie($scope.selectedSeries.id).then(function (res) {
            $scope.carTypes = res.data;
        },function (err) {

        })
    };

    if ($scope.applyLoan) {
        try {
            var cityName = $scope.cities.Citys[$scope.applyLoan.sourceCityId - 1].Name;
            var seriesId = $scope.applyLoan.vehicleSeries;
            var saleName = "111";
            var carTime = new Date($scope.applyLoan.vehicleRegistrationYearMonth.replace(/-/g, '/')).getTime() / 1000;
            var kilometer = $scope.applyLoan.vehicleKilometers * 10000;
            var modelId = $scope.applyLoan.vehicleType;
            httpService.estimate(cityName, seriesId, saleName, carTime, kilometer, modelId).then(function (res) {
                $scope.estimatePrice = res.data;
                if ($scope.estimatePrice < 100) {
                    $scope.estimatePrice = "参数有误，未能评估车价。";
                } else {
                    $scope.estimatePrice = $scope.estimatePrice + "元";
                }
            }, function (err) {
                $scope.estimatePrice = "车价宝返回结果错误，未能评估车价。";
            })
        } catch(err) {
            $scope.estimatePrice = "参数有误，未能评估车价。";
        }

        try {
            httpService.vehicleCondition($scope.applyLoan.vehicleVin).then(function (res) {
                $scope.vehicleCondition = res.data.data;
                if (!$scope.vehicleCondition) {
                    $scope.vehicleCondition = {
                        level: "未知",
                        report_url:""
                    }
                } else {
                    if (!$scope.vehicleCondition.level) {
                        $scope.vehicleCondition.level = "未知";
                    }
                    if (!$scope.vehicleCondition.report_url) {
                        $scope.vehicleCondition.report_url = "";
                    }
                }
            }, function (err) {
                $scope.vehicleCondition = {
                    level: "未知",
                    report_url:""
                }
            })
        } catch(err) {
            $scope.vehicleCondition = {
                level: "未知",
                report_url:""
            }
        }
    }

    $scope.isRight = true;
    $scope.commit = function () {
        if(!$scope.predictPrice){
            toaster.error("评估价非法");
            return;
        };
        if(!$scope.applyLoan.vehicleVin || $scope.applyLoan.vehicleVin.length !=17){
            toaster.error("车架号位17位字符");
            return;
        };
        if(!$scope.applyLoan.vehicleManufacturers){
            toaster.error("请选择厂家");
            return;
        };
        if(!$scope.applyLoan.vehicleBrand){
            toaster.error("请选择品牌");
            return;
        };
        if(!$scope.applyLoan.vehicleSeries){
            toaster.error("请选择车系");
            return;
        };
        if(!$scope.applyLoan.vehicleProductionYearMonth){
            toaster.error("请选择生产年月");
            return;
        };
        if(!$scope.applyLoan.vehicleRegistrationYearMonth){
            toaster.error("请选择首次登记日期");
            return;
        };
        if(!$scope.applyLoan.vehicleKilometers){
            toaster.error("请填写里程数");
            return;
        };
        if(!$scope.applyLoan.vehicleUtilityType){
            toaster.error("请选择使用类型");
            return;
        };
        if(!$scope.applyLoan.vehicleEmission){
            toaster.error("请选择排放标准");
            return;
        };
        var applyLoantwo = {
                vehiclePredictPrice:$scope.predictPrice,
                vehicleVin:$scope.applyLoan.vehicleVin,
                vehicleBrand:$scope.selectedBrand.id,
                vehicleSeries:$scope.selectedSeries.id,
                vehicleType:$scope.selectedCarType.id,
                vehicleDesc:$scope.selectedBrand.name+"/"+$scope.selectedSeries.name+"/"+$scope.selectedCarType.model_name+$scope.selectedCarType.model_year+$scope.selectedCarType.sale_name,
                vehicleProductionYearMonth:$scope.applyLoan.vehicleProductionYearMonth,
                vehicleRegistrationYearMonth:$scope.applyLoan.vehicleRegistrationYearMonth,
                vehicleKilometers:$scope.applyLoan.vehicleKilometers,
                vehicleUtilityType:$scope.applyLoan.vehicleUtilityType,
                vehicleEmission:$scope.applyLoan.vehicleEmission
            };



        httpService.updateLoandraft($scope.applyLoan.id,applyLoantwo,1).then(function (res) {//1表示修改
            httpService.updateLoandraft($scope.applyLoan.id,{},2).then(function (res) {//3表示初审审批通过
                $state.go("main.carpricinglist");
            },function (err) {
                toaster.error(err.data.errorMessage);
            });
        },function (err) {
            toaster.error(err.data.errorMessage);
        })
    };
    $scope.cancel = function () {

    }
});

/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var loanpreliminary = angular.module('loanpreliminary', ['httpservice']);
loanpreliminary.controller("loanpreliminaryListController", function ($scope, $http, $location, $rootScope, httpService, $state, $timeout, commonUtil, cityJson, $stateParams, $window) {
    commonUtil.initTab($scope, $stateParams, $window, "preliminaryTabs", httpService);
    $scope.QueryUserName = "";
    $scope.queryTel = "";
    $scope.sources = [
        {
            id: 0,
            name: "门店"
        },
        {
            id: 1,
            name: "车商"
        },
        {
            id: 2,
            name: "273网站"
        },
        {
            id: 3,
            name: "273业管"
        },
        {
            id: 4,
            name: "其他"
        }
    ];
    $scope.queryCommitBeginDate = "";
    $scope.queryCommitEndDate = "";

    $scope.productTypes = [{
        id: 0,
        name: "二手车贷款"
    }, {
        id: 1,
        name: "三手车贷款"
    }];
    $scope.paybackTypes = [{
        id: 0,
        name: "等额本息"
    }, {
        id: 1,
        name: "先息后本"
    }];
    $scope.status = [{
        id: 0,
        name: "可用"
    }, {
        id: 1,
        name: "不可用"
    }];

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;

    $scope.addProduct = function () {
        $state.go("main.addproductmanagement", {items: null});
    };
    $scope.edit = function (draft) {
        if (draft.status == 2) {
            $state.go("main.eidtloanapply", {items: draft});
        } else {
            $state.go("main.loanapply", {items: draft, type: 2});
        }
    };
});

loanpreliminary.controller("loanapplyController", ['$filter', '$scope', '$http', '$location', '$rootScope', 'httpService', '$state', '$window', 'cityJson', '$stateParams','toaster', function ($filter, $scope, $http, $location, $rootScope, httpService, $state, $window, cityJson, $stateParams,toaster) {
    $scope.sources = [
        {
            id: 0,
            name: "门店"
        },
        {
            id: 1,
            name: "车商"
        },
        {
            id: 2,
            name: "273网站"
        },
        {
            id: 3,
            name: "273业管"
        },
        {
            id: 4,
            name: "其他"
        }
    ];

    $scope.init = function () {
        var userInfo = $window.sessionStorage['userInfo'];
        var userInfoObj = JSON.parse(userInfo);
        $scope.userInfo = userInfoObj;
        $scope.cityArray = [];
        for (var i = 0; i < userInfoObj.data.cityIds.length; i++) {
            $scope.cityArray.push(cityJson.Citys[userInfoObj.data.cityIds[i] - 1]);
        };
        var selectedItem = $stateParams.items;
        $scope.type = $stateParams.type;
        if($scope.type == 2){
            if(selectedItem.applicantCertificateFileIds){
                $scope.identityPhotos = selectedItem.applicantCertificateFileIds.split(",");
            };
            if(selectedItem.applicantQualificationFileIds){
                $scope.applicantQualificationPhotos = selectedItem.applicantQualificationFileIds.split(",");
            };
            if(selectedItem.applicantIncomeFileIds){
                $scope.applicantIncomePhotos = selectedItem.applicantIncomeFileIds.split(",");
            };
            if(selectedItem.applicantEstateFileIds){
                $scope.applicantEstatePhotos = selectedItem.applicantEstateFileIds.split(",");
            };
            if(selectedItem.applicantVehicleFileIds){
                $scope.applicantVehiclePhotos = selectedItem.applicantVehicleFileIds.split(",");
            };
            if(selectedItem.applicantOtherFileIds){
                $scope.applicantOtherPhotos = selectedItem.applicantOtherFileIds.split(",");
            };

            if(selectedItem.coApplicantCertificateFileIds){
                $scope.coIdentityPhotos = selectedItem.coApplicantCertificateFileIds.split(",");
            };
            if(selectedItem.coApplicantIncomeFileIds){
                $scope.coApplicantIncomePhotos = selectedItem.coApplicantIncomeFileIds.split(",");
            };
            if(selectedItem.coApplicantEstateFileIds){
                $scope.coApplicantEstatePhotos = selectedItem.coApplicantEstateFileIds.split(",");
            };
            if(selectedItem.coApplicantOtherFileIds){
                $scope.coApplicantOtherPhotos = selectedItem.coApplicantOtherFileIds.split(",");
            };
            if(selectedItem.guarantorCertificateFileIds){
                $scope.guarantorIdentityPhotos = selectedItem.guarantorCertificateFileIds.split(",");
            };
            if(selectedItem.guarantorIncomeFileIds){
                $scope.guarantorIncomePhotos = selectedItem.guarantorIncomeFileIds.split(",");
            };
            if(selectedItem.guarantorEstateFileIds){
                $scope.guarantorEstatePhotos = selectedItem.guarantorEstateFileIds.split(",");
            };
            if(selectedItem.guarantorOtherFileIds){
                $scope.guarantorOtherPhotos = selectedItem.guarantorOtherFileIds.split(",");
            };
            if(selectedItem.vehicleRegistrationCertificateFileIds){
                $scope.vehicleRegistrationCertificatePhotos = selectedItem.vehicleRegistrationCertificateFileIds.split(",");
            };
            if(selectedItem.vehicleLicenseFileIds){
                $scope.vehicleLicensePhotos = selectedItem.vehicleLicenseFileIds.split(",");
            };
            if(selectedItem.vehicleFileIds){
                $scope.vehiclePhotos = selectedItem.vehicleFileIds.split(",");
            };
            if(selectedItem.applicationPicUrl){
                $scope.applicationPicPhotos = selectedItem.applicationPicUrl.split(",");
            };
        };
        //获取汽车品牌
        httpService.getCarBrand().then(function (res) {
            $scope.brands = res.data;
            if($scope.type ==2){
                if(selectedItem.vehicleBrand){
                    for(var i=0;i<$scope.brands.length;i++){
                        if(selectedItem.vehicleBrand == $scope.brands[i].id){
                            $scope.selectedBrand = $scope.brands[i];
                        }
                    };
                    //获取车系
                    if(selectedItem.vehicleSeries){
                        httpService.getCarSeriesByBrand(selectedItem.vehicleBrand).then(function (res) {
                            $scope.series = res.data;
                            for(var j=0;j<$scope.series.length;j++){
                                if(selectedItem.vehicleSeries == $scope.series[j].id){
                                    $scope.selectedSeries = $scope.series[j];
                                }
                            }
                            httpService.getCarTypeBySerie(selectedItem.vehicleSeries).then(function (res) {
                                $scope.carTypes = res.data;
                                for(var k=0;k<$scope.carTypes.length;k++){
                                    if(selectedItem.vehicleType == $scope.carTypes[k].id){
                                        $scope.selectedCarType = $scope.carTypes[k];
                                    }
                                }
                            },function (err) {

                            })
                        },function (err) {

                        })
                    }
                }
            };
        },function (err) {
            console.log(err);
        });


        //获取当前城市的收单员
        httpService.getUserByCityAndPost(userInfoObj.data.deptId, 24).then(function (result) {
            console.log(result);
            $scope.collectors = result.data;



            if ($scope.type == 2) {
                $scope.productId = selectedItem.productId;
                $scope.productLoanTerms = selectedItem.loanTerms;
                $scope.loanDraftId = selectedItem.id;
                $scope.cityJson = cityJson;
                $scope.commonUtil = commonUtil;
                $scope.sourceCity = cityJson.Citys[selectedItem.sourceCityId - 1];
                for (var i = 0; i < $scope.collectors.length; i++) {
                    if ($scope.collectors[i].realName == selectedItem.sourceReceiver) {
                        $scope.selectedCollector = $scope.collectors[i];
                    }
                };
                $scope.selectedSource = $scope.sources[selectedItem.sourceChannel];
                $scope.selectedMarriages = $scope.marriages[selectedItem.applicantMarriage];
                $scope.sourcePersonName = selectedItem.sourcePersonName;
                $scope.sourcePersonTel = selectedItem.sourcePersonTel;
                $scope.applicantName = selectedItem.applicantName;
                $scope.applicantMobileNumber = selectedItem.applicantMobileNumber;
                $scope.selectedIDType = $scope.IDTypes[selectedItem.applicantCertificateType];
                $scope.applicantCertificateNumber = selectedItem.applicantCertificateNumber;
                $scope.applicantIncomePerMonth = selectedItem.applicantIncomePerMonth;
                $scope.vehicleVin = selectedItem.vehicleVin;
                $scope.vehicleKilometers = selectedItem.vehicleKilometers;
                $scope.vehicleDealPrice = selectedItem.vehicleDealPrice;
                $scope.selectedRate = selectedItem.applicantLoanRate;
                $scope.applicantLoanPrice = selectedItem.applicantLoanPrice;
                $scope.remark = selectedItem.remark;



                $scope.getProductByCity();


            }
        }, function (error) {
            console.log(error);
        });

    };

    $scope.IDTypes = [
        {
            id: 0,
            name: "身份证"
        },
        {
            id: 1,
            name: "护照"
        },
        {
            id: 2,
            name: "户口本"
        }
    ];
    $scope.marriages = [
        {
            id: 0,
            name: "已婚"
        },
        {
            id: 1,
            name: "未婚"
        }
    ];

    $scope.productTypes = [{
        id: 0,
        name: "二手车贷款"
    }, {
        id: 1,
        name: "三手车贷款"
    }];
    $scope.AvailableRates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.init();

    $scope.getProductByCity = function () {
        console.log("hhaaa");
        httpService.getProductByCityId($scope.sourceCity.Id).then(function (res) {
            $scope.products = res.data;
            if ($scope.type == 2) {
                for (var j = 0; j < $scope.products.length; j++) {
                    if ($scope.productId == $scope.products[j].id) {
                        $scope.selectedProduct = $scope.products[j];
                        $scope.selectProduct();
                        $scope.selectedTerm = $scope.productLoanTerms + "";
                        $scope.changeTerms();
                    }
                }
            }
        }, function (err) {

        })
    };

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

    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeRate = function () {
        $scope.applicantLoanPrice = $scope.vehicleDealPrice * $scope.selectedRate / 10;
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = ($scope.applicantLoanPrice / $scope.selectedTerm + $scope.applicantLoanPrice * $scope.selectedProduct.loanMonthlyInterestRate / 100).toFixed(2);
    };
    $scope.commit = function (operateType) {
        //预先获取图片url
        var applicantCertificateFileIds = $filter('filter')($scope.applicantIdentification, '').join(",");
        var applicantQualificationFileIds = $filter('filter')($scope.applicantQualification, '').join(",");
        var applicantIncomeFileIds = $filter('filter')($scope.applicantIncome, '').join(",");
        var applicantEstateFileIds = $filter('filter')($scope.applicantEstate, '').join(",");
        var applicantVehicleFileIds = $filter('filter')($scope.applicantVehicle, '').join(",");
        var applicantOtherFileIds = $filter('filter')($scope.applicantOther, '').join(",");
        var coApplicantCertificateFileIds = $filter('filter')($scope.coApplicantIdentification, '').join(",");
        var coApplicantIncomeFileIds = $filter('filter')($scope.coApplicantIncome, '').join(",");
        var coApplicantEstateFileIds = $filter('filter')($scope.coApplicantEstate, '').join(",");
        var coApplicantOtherFileIds = $filter('filter')($scope.coApplicantOther, '').join(",");
        var guarantorCertificateFileIds = $filter('filter')($scope.guarantorIdentification, '').join(",");
        var guarantorIncomeFileIds = $filter('filter')($scope.guarantorIncome, '').join(",");
        var guarantorEstateFileIds = $filter('filter')($scope.guarantorEstate, '').join(",");
        var guarantorOtherFileIds = $filter('filter')($scope.guarantorOther, '').join(",");
        var vehicleRegistrationCertificateFileIds = $filter('filter')($scope.vehicleRegistrationCertificate, '').join(",");
        var vehicleLicenseFileIds = $filter('filter')($scope.vehicleLicense, '').join(",");
        var vehicleFileIds = $filter('filter')($scope.vehicle, '').join(",");
        var applicationPicUrl = $filter('filter')($scope.applicationPic, '').join(",");
        var isPhone = /^1\d{10}$/;
        var isCertificate = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        if(operateType == 2){//如果是提交，则做必填项以及字段规则的验证
            if(!$scope.sourceCity){
                toaster.error("请选择来源城市");
                return;
            };
            if(!$scope.selectedSource){
                toaster.error("请选择来源渠道");
                return;
            };
            if(!$scope.selectedCollector){
                toaster.error("请选择收单员");
                return;
            };
            if(!$scope.sourcePersonName){
                toaster.error("请输入来源人姓名");
                return;
            };
            if(!$scope.sourcePersonTel){
                toaster.error("请输入来源人手机号");
                return;
            };
            if(!isPhone.test($scope.sourcePersonTel)){
                toaster.error("请输入来源人格式正确的手机号");
                return;
            };
            if(!$scope.applicantName){
                toaster.error("请输入申请人姓名");
                return;
            };
            if(!$scope.applicantMobileNumber){
                toaster.error("请输入申请人手机号");
                return;
            };
            if(!isPhone.test($scope.applicantMobileNumber)){
                toaster.error("请输入申请人格式正确的手机号");
                return;
            };
            if(!$scope.selectedIDType){
                toaster.error("请选择证件类型");
                return;
            };
            if(!$scope.applicantCertificateNumber){
                toaster.error("请输入证件号码");
                return;
            };
            if($scope.selectedIDType.id ==0 &&!isCertificate.test($scope.applicantCertificateNumber)){
                toaster.error("请输入格式正确的身份证号码");
                return;
            };
            if(!$scope.selectedMarriages){
                toaster.error("请选择婚姻状况");
                return;
            };
            if(!$scope.applicantIncomePerMonth){
                toaster.error("请输入本人月收入");
                return;
            };

            if (!applicantCertificateFileIds) {
                toaster.error("请上传申请人身份证图片");
                return;
            };
            if (!applicantIncomeFileIds && !applicantEstateFileIds) {
                toaster.error("申请人收入证明和房产证明必须传一个");
                return;
            };
            if (!coApplicantCertificateFileIds) {
                toaster.error("请上传共同申请人身份证图片");
                return;
            };
            if (!guarantorCertificateFileIds) {
                toaster.error("请上传担保人身份证图片");
                return;
            };
            if(!$scope.vehicleVin || $scope.vehicleVin.length!=17){
                toaster.error("请输入17位车架号");
                return;
            };

            if(!$scope.selectedBrand){
                toaster.error("请选择汽车生产品牌");
                return;
            };
            if(!$scope.selectedSeries){
                toaster.error("请选择汽车款式");
                return;
            };
            if(!$scope.selectedCarType){
                toaster.error("请选择汽车型号");
                return;
            };

            if(!$scope.vehicleKilometers || $scope.vehicleKilometers>=1000 || $scope.vehicleKilometers<=0){
                toaster.error("请输入二手车里程数");
                return;
            };

            if (!vehicleRegistrationCertificateFileIds) {
                toaster.error("请上传车辆登记证书");
                return;
            };
            if (!vehicleLicenseFileIds) {
                toaster.error("请上传机动车行驶证");
                return;
            };
            if (!vehicleFileIds) {
                toaster.error("请上传车辆照片");
                return;
            };
            if(!$scope.selectedProduct){
                toaster.error("请选择产品");
                return;
            };
            if(!$scope.vehicleDealPrice || $scope.vehicleDealPrice>=100000000 || $scope.vehicleDealPrice<0){
                toaster.error("请输入正确的车辆成交价");
                return;
            };
            if(!$scope.selectedRate){
                toaster.error("请选择贷款成数");
                return;
            };
            if(!$scope.applicantLoanPrice){
                toaster.error("请输入贷款金额");
                return;
            };
            if($scope.applicantLoanPrice>$scope.vehicleDealPrice*$scope.selectedProduct.maxAvailableRate/10){
                toaster.error("贷款金额不能大于最高可贷成数的金额");
                return;
            };
            if($scope.applicantLoanPrice<$scope.vehicleDealPrice*$scope.selectedProduct.minAvailableRate/10){
                toaster.error("贷款金额不能小于最高可贷成数的金额");
                return;
            };
            if(!$scope.selectedTerm){
                toaster.error("请选择期数");
                return;
            };
            if (!applicationPicUrl) {
                toaster.error("请上传申请表");
                return;
            };
        };



        var loanDraft = {
            vehicleDealPrice: $scope.vehicleDealPrice,
            applicantLoanRate: $scope.selectedRate,
            applicantLoanPrice: $scope.applicantLoanPrice,
            loanTerms: $scope.selectedTerm,
            remark: $scope.remark,
            sourceFinancialCommissioner: $scope.userInfo.data.realName,
            sourcePersonName: $scope.sourcePersonName,
            sourcePersonTel: $scope.sourcePersonTel,
            applicantName: $scope.applicantName,
            applicantCertificateNumber: $scope.applicantCertificateNumber,
            applicantMobileNumber: $scope.applicantMobileNumber,
            applicantIncomePerMonth: $scope.applicantIncomePerMonth,
            vehicleVin: $scope.vehicleVin,
            vehicleKilometers: $scope.vehicleKilometers,
            status: 1,
            creatorUsername: $scope.userInfo.data.username

        };
        if(applicantCertificateFileIds){
            loanDraft.applicantCertificateFileIds = applicantCertificateFileIds;
        };
        if(applicantQualificationFileIds){
            loanDraft.applicantQualificationFileIds = applicantQualificationFileIds;
        };
        if(applicantIncomeFileIds){
            loanDraft.applicantIncomeFileIds = applicantIncomeFileIds;
        };
        if(applicantEstateFileIds){
            loanDraft.applicantEstateFileIds = applicantEstateFileIds;
        };
        if(applicantVehicleFileIds){
            loanDraft.applicantVehicleFileIds = applicantVehicleFileIds;
        };
        if(applicantOtherFileIds){
            loanDraft.applicantOtherFileIds = applicantOtherFileIds;
        };
        if(coApplicantCertificateFileIds){
            loanDraft.coApplicantCertificateFileIds = coApplicantCertificateFileIds;
        };
        if(coApplicantIncomeFileIds){
            loanDraft.coApplicantIncomeFileIds = coApplicantIncomeFileIds;
        };
        if(coApplicantEstateFileIds){
            loanDraft.coApplicantEstateFileIds = coApplicantEstateFileIds;
        };
        if(coApplicantOtherFileIds){
            loanDraft.coApplicantOtherFileIds = coApplicantOtherFileIds;
        };
        if(guarantorCertificateFileIds){
            loanDraft.guarantorCertificateFileIds = guarantorCertificateFileIds;
        };
        if(guarantorIncomeFileIds){
            loanDraft.guarantorIncomeFileIds = guarantorIncomeFileIds;
        };
        if(guarantorEstateFileIds){
            loanDraft.guarantorEstateFileIds = guarantorEstateFileIds;
        };
        if(guarantorOtherFileIds){
            loanDraft.guarantorOtherFileIds = guarantorOtherFileIds;
        };
        if(vehicleRegistrationCertificateFileIds){
            loanDraft.vehicleRegistrationCertificateFileIds = vehicleRegistrationCertificateFileIds;
        };
        if(vehicleLicenseFileIds){
            loanDraft.vehicleLicenseFileIds = vehicleLicenseFileIds;
        };
        if(vehicleFileIds){
            loanDraft.vehicleFileIds = vehicleFileIds;
        };
        if(applicationPicUrl){
            loanDraft.applicationPicUrl = applicationPicUrl;
        };
        if($scope.selectedProduct){
            loanDraft.productId = $scope.selectedProduct.id;
            loanDraft.productLoanMonthlyInterestRate = $scope.selectedProduct.loanMonthlyInterestRate;
        };
        if($scope.selectedCollector){
            loanDraft.sourceReceiver = $scope.selectedCollector.realName;
        };
        if($scope.sourceCity){
            loanDraft.sourceCityId = $scope.sourceCity.Id;
        };

        if($scope.selectedSource){
            loanDraft.sourceChannel = $scope.selectedSource.id;
        };
        if($scope.selectedMarriages){
            loanDraft.applicantMarriage = $scope.selectedMarriages.id;
        };
        if($scope.selectedIDType){
            loanDraft.applicantCertificateType = $scope.selectedIDType.id;
        };
        if($scope.selectedBrand){
            loanDraft.vehicleBrand = $scope.selectedBrand.id;
            loanDraft.vehicleDesc = $scope.selectedBrand.name+"/";
        };

        if($scope.selectedSeries){
            loanDraft.vehicleSeries = $scope.selectedSeries.id;
            loanDraft.vehicleDesc += $scope.selectedSeries.name+"/";
        };
        if($scope.selectedCarType){
            loanDraft.vehicleType = $scope.selectedCarType.id;
            loanDraft.vehicleDesc += $scope.selectedCarType.model_name+$scope.selectedCarType.model_year+$scope.selectedCarType.sale_name;
        };

        if($scope.type == 1){
            httpService.addLoandraft(loanDraft).then(function (res) {
                if (operateType == 2) {
                    httpService.updateLoandraft(res.data.id, {}, 2).then(function (res) {//2表示提交审批
                        console.log(res);
                        $state.go("main.loanpreliminary");
                    }, function (err) {
                        console.log(err);
                    })
                } else {
                    console.log(res);
                    $state.go("main.loanpreliminary");
                };

            }, function (err) {

            });
        } else {
            httpService.updateLoandraft($scope.loanDraftId, loanDraft, 1).then(function (res) {//1表示提交修改
                if (operateType == 2) {
                    httpService.updateLoandraft($scope.loanDraftId, {}, 2).then(function (res) {//2表示提交审批
                        console.log(res);
                        $state.go("main.loanpreliminary");
                    }, function (err) {
                        console.log(err);
                    })
                } else {
                    console.log(res);
                    $state.go("main.loanpreliminary");
                };
            }, function (err) {
                console.log(err);
            })
        }



    };
    $scope.cancel = function () {
        $state.go("main.loanpreliminary");
    };
}]);

loanpreliminary.controller("editLoanapplyController", function ($scope, $http, $location, $rootScope, httpService, $state, $window, cityJson, $stateParams, commonUtil, toaster) {

    $scope.sources = [
        {
            id: 0,
            name: "门店"
        },
        {
            id: 1,
            name: "车商"
        },
        {
            id: 2,
            name: "273网站"
        },
        {
            id: 3,
            name: "273业管"
        },
        {
            id: 4,
            name: "其他"
        }
    ];
    $scope.IDTypes = [
        {
            id: 0,
            name: "身份证"
        },
        {
            id: 1,
            name: "护照"
        },
        {
            id: 2,
            name: "户口本"
        }
    ];
    $scope.marriages = [
        {
            id: 0,
            name: "已婚"
        },
        {
            id: 1,
            name: "未婚"
        }
    ];
    $scope.otherAddress = false;
    $scope.brands = [
        "奥迪", "奔驰", "宝马", "丰田", "本田", "铃木", "比亚迪", "吉利", "雪佛兰", "现代", "大众", "福特"
    ];
    $scope.factories = [
        "广汽", "上汽", "北汽", "一汽"
    ];
    $scope.series = ["福克斯", "科鲁兹", "yalris", "雷凌", "宋", "元"];
    $scope.produceYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    $scope.productTypes = [{
        id: 0,
        name: "二手车贷款"
    }, {
        id: 1,
        name: "三手车贷款"
    }];
    $scope.paybackTypes = [{
        id: 0,
        name: "等额本息"
    }, {
        id: 1,
        name: "先息后本"
    }];
    $scope.qualifications = ["大专", "本科", "高中", "硕士", "博士"];
    $scope.AvailableRates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.years = ["3年及以上", "1到3年", "半年到一年", "半年以内"];

    $scope.companyTypes = ["党政机关", "事业单位", "军队", "社会团体", "内资企业", "国有企业", "集体企业", "股份合作企业", "联营企业", "有限责任公司", "股份有限公司", "私营企业",
        "外商投资企业(含港、澳、台)", "中外合资经营企业(含港、澳、台)", "中外合作经营企业(含港、澳、台)", "外资企业(含港、澳、台)", "外商投资股份有限公司(含港、澳、台)", "个体经营", "其他", "未知"];
    $scope.industries = ["农、林、牧、渔业", "采矿业制造业电力、燃气及水的生产和供应业", "建筑业", "交通运输、仓储和邮政业", "信息传输、计算机服务和软件业", "批发和零售业", "住宿和餐饮业", "金融业",
        "租赁和商务服务业", "科学研究、技术服务业和地质勘察业", "水利、环境和公共设施管理业", "居民服务和其他服务业", "教育", "卫生、社会保障和社会福利业", "文化、体育和娱乐业", "公共管理和社会组织", "国际组织"];
    $scope.positiones = ["厅局级以上", "处级科级", "高级领导", "中级领导", "一般员工", "机关事业单位-其他", "企业单位-其他"];
    $scope.jobTitles = ["高级职称", "中级职称", "初级称职", "无职称"];
    $scope.occupationes = ["文化艺术及广播电影电视业", "卫生、体育、教育", "金融、保险业", "国家机关、党政机关、军队和社会团体", "电力、煤气及水的生产和供应业", "科学研究和综合技术服务业", "电信、信息传输、计算机服务和软件业"
        , "水利、环境和公共设施管理业", "交通运输、仓储、邮政", "批发和零售贸易", "社会服务业", "住宿和餐饮业", "地质勘查业", "租赁和商业服务", "建筑业", "采掘业", "制造业", "农、林、牧、渔业", "其他"];
    $scope.posts = ["单位主管", "部门主管", "一般职员", "个体经营者", "自由职业者", "下岗或失业"];
    $scope.emissiones = ["化油器", "国1", "国2", "欧1", "欧2", "国3", "国3带OBD", "欧3", "国4", "欧4", "国5", "欧5", "欧6", "国4(京5)"];

    $scope.picTypes = [{
        id: 0,
        name: "申请人身份证"
    }, {
        id: 1,
        name: "申请人学历证明"
    }, {
        id: 2,
        name: "申请人工作及财力证明"
    }, {
        id: 3,
        name: "申请人房产证"
    }, {
        id: 4,
        name: "申请人车产证"
    }, {
        id: 5,
        name: "申请人其他证明"
    }, {
        id: 6,
        name: "共同申请人身份证"
    }, {
        id: 7,
        name: "共同申请人工作及财力证明"
    }, {
        id: 8,
        name: "共同申请人房产证"
    }, {
        id: 9,
        name: "共同申请人其他证明"
    }, {
        id: 10,
        name: "担保人身份证"
    }, {
        id: 11,
        name: "担保人工作及财力证明"
    }, {
        id: 12,
        name: "担保人房产证"
    }, {
        id: 13,
        name: "担保人其他证明"
    }, {
        id: 14,
        name: "车辆登记证书"
    }, {
        id: 15,
        name: "机动车行驶证"
    }, {
        id: 16,
        name: "车辆照片"
    }, {
        id: 17,
        name: "申请表材料"
    }];
    $scope.errMsg = "";
    $scope.errMsgOther = "";

    $scope.init = function () {
        $scope.selectedDraft = $stateParams.items;

        $scope.cityJson = cityJson;
        $scope.commonUtil = commonUtil;
        $scope.selectedSource = $scope.sources[$scope.selectedDraft.sourceChannel];
        $scope.selectedMarriages = $scope.marriages[$scope.selectedDraft.applicantMarriage];
        $scope.selectedIDType = $scope.IDTypes[$scope.selectedDraft.applicantCertificateType];
        $scope.showFillContent = false;
        $scope.classfyPic();
        httpService.getProductByID($scope.selectedDraft.productId).then(function (res) {
            console.log(res);
            $scope.draftProduct = res.data;
        }, function (err) {

        });
        httpService.getCarBrand().then(function (res) {
                $scope.brands = res.data;
                for(var i=0;i<$scope.brands.length;i++){
                    if($scope.selectedDraft.vehicleBrand == $scope.brands[i].id){
                        $scope.selectedBrand = $scope.brands[i];
                    }
                }
            },function (err) {

        });
        httpService.getCarSeriesByBrand($scope.selectedDraft.vehicleBrand).then(function (res) {
            $scope.series = res.data;
            for(var i=0;i<$scope.series.length;i++){
                if($scope.selectedDraft.vehicleSeries == $scope.series[i].id){
                    $scope.selectedSeries = $scope.series[i];
                }
            }
        },function (err) {

        });
        httpService.getCarTypeBySerie($scope.selectedDraft.vehicleSeries).then(function (res) {
            $scope.vehicleTypes = res.data;
            for(var i=0;i<$scope.vehicleTypes.length;i++){
                if($scope.selectedDraft.vehicleType == $scope.vehicleTypes[i].id){
                    $scope.selectedCarType = $scope.vehicleTypes[i];
                }
            }
        },function (err) {

        });


    };

    $scope.getCarSeries = function () {
        httpService.getCarSeriesByBrand($scope.selectedBrand.id).then(function (res) {
            $scope.series = res.data;
        },function (err) {

        })
    };
    $scope.getCarTypes = function () {

        httpService.getCarTypeBySerie($scope.selectedSeries.id).then(function (res) {
            $scope.carTypes = res.data;
        },function (err) {

        })
    };

    //将照片分类
    $scope.classfyPic = function () {
        $scope.picArrays = [];
        $scope.picArrayTwo = [];
        var appId = [];
        var appQua = [];
        var appInc = [];
        var appEst = [];
        var appVeh = [];
        var appOth = [];
        var coAppId = [];
        var coAppInc = [];
        var coAppEst = [];
        var coAppOth = [];
        var guaID = [];
        var guaInc = [];
        var guaEst = [];
        var guaOth = [];
        var vehReg = [];
        var vehLic = [];
        var vehPic = [];
        var applicationFile = [];
        //初始化图片
        if ($scope.selectedDraft) {
            if ($scope.selectedDraft.applicantCertificateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantCertificateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 0,
                        url: fileArray[i]
                    });
                    appId.push({
                        id: 0,
                        url: fileArray[i]
                    });

                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appId);

            if ($scope.selectedDraft.applicantQualificationFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantQualificationFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 1,
                        url: fileArray[i]
                    });
                    appQua.push({
                        id: 1,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appQua);

            if ($scope.selectedDraft.applicantIncomeFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantIncomeFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 2,
                        url: fileArray[i]
                    });
                    appInc.push({
                        id: 2,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appInc);

            if ($scope.selectedDraft.applicantEstateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantEstateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 3,
                        url: fileArray[i]
                    });
                    appEst.push({
                        id: 3,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appEst);

            if ($scope.selectedDraft.applicantVehicleFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantVehicleFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 4,
                        url: fileArray[i]
                    });
                    appVeh.push({
                        id: 4,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appVeh);

            if ($scope.selectedDraft.applicantOtherFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicantOtherFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 5,
                        url: fileArray[i]
                    });
                    appOth.push({
                        id: 5,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appOth);

            if ($scope.selectedDraft.coApplicantCertificateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.coApplicantCertificateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 6,
                        url: fileArray[i]
                    });
                    coAppId.push({
                        id: 6,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppId);
            if ($scope.selectedDraft.coApplicantIncomeFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.coApplicantIncomeFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 7,
                        url: fileArray[i]
                    });
                    coAppInc.push({
                        id: 7,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppInc);

            if ($scope.selectedDraft.coApplicantEstateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.coApplicantEstateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 8,
                        url: fileArray[i]
                    });
                    coAppEst.push({
                        id: 8,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppEst);

            if ($scope.selectedDraft.coApplicantOtherFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.coApplicantOtherFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 9,
                        url: fileArray[i]
                    });
                    coAppOth.push({
                        id: 9,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppOth);
            if ($scope.selectedDraft.guarantorCertificateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.guarantorCertificateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 10,
                        url: fileArray[i]
                    });
                    guaID.push({
                        id: 10,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaID);

            if ($scope.selectedDraft.guarantorIncomeFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.guarantorIncomeFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 11,
                        url: fileArray[i]
                    });
                    guaInc.push({
                        id: 11,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaInc);

            if ($scope.selectedDraft.guarantorEstateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.guarantorEstateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 12,
                        url: fileArray[i]
                    });
                    guaEst.push({
                        id: 12,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaEst);

            if ($scope.selectedDraft.guarantorOtherFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.guarantorOtherFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 13,
                        url: fileArray[i]
                    });
                    guaOth.push({
                        id: 13,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaOth);

            if ($scope.selectedDraft.vehicleRegistrationCertificateFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.vehicleRegistrationCertificateFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 14,
                        url: fileArray[i]
                    });
                    vehReg.push({
                        id: 14,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehReg);
            if ($scope.selectedDraft.vehicleLicenseFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.vehicleLicenseFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 15,
                        url: fileArray[i]
                    });
                    vehLic.push({
                        id: 15,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehLic);
            if ($scope.selectedDraft.vehicleFileIds) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.vehicleFileIds, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 16,
                        url: fileArray[i]
                    });
                    vehPic.push({
                        id: 16,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehPic);
            if ($scope.selectedDraft.applicationPicUrl) {
                var fileArray = commonUtil.reassembleImages($scope.selectedDraft.applicationPicUrl, true);
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 17,
                        url: fileArray[i]
                    });
                    applicationFile.push({
                        id: 17,
                        url: fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(applicationFile);


        }
        ;
    };
    $scope.init();

    $scope.openFillContent = function (item) {
        $scope.selectedType = $scope.picTypes[item.id];

        for (var j = 0; j < $scope.picArrays.length; j++) {
            if ($scope.picArrays[j].id == item.id && $scope.picArrays[j].url.indexOf(item.url) != -1) {
                $scope.selectedPicIndex = j;//当前显示的照片下标
                $scope.startIndex = j - 4;
                $scope.endIndex = j + 4;
                if (j < 4) {
                    $scope.startIndex = 0;

                };
                if (j > $scope.picArrays.length - 4 - 1) {
                    $scope.endIndex = $scope.picArrays.length - 1;

                };
            }
        };
        if($scope.selectedPicIndex ==0){
            $scope.leftIcon = '/resources/img/left-off.png';
        }else {
            $scope.leftIcon = '/resources/img/left-on.png';
        };
        if($scope.selectedPicIndex ==$scope.picArrays.length-1){
            $scope.rightIcon = '/resources/img/right-off.png';
        }else{
            $scope.rightIcon = '/resources/img/right-on.png';
        };
        $scope.currentPage = item.id;
        $scope.showFillContent = true;
    };

    $scope.closeFillContent = function () {
        $scope.showFillContent = false;
    };

    $scope.getProductByCity = function () {
        httpService.getProductByCityId($scope.sourceCity.Id).then(function (res) {
            $scope.products = res.data;
        }, function (err) {

        })
    };
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeRate = function () {
        $scope.applicantLoanPrice = $scope.vehicleDealPrice * $scope.selectedRate / 10;
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = ($scope.applicantLoanPrice / $scope.selectedTerm +  $scope.applicantLoanPrice * $scope.selectedProduct.loanMonthlyInterestRate / 100).toFixed(2);
    };

    var getLoanBean = function (loanDraft) {
        var isPhone = /^1\d{10}$/;
        var isCertificate = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        switch ($scope.currentPage) {
            case 0:
                if(!$scope.selectedDraft.applicantName){
                    toaster.error("请填写申请人姓名");
                    return false;
                };
                loanDraft.applicantName = $scope.selectedDraft.applicantName;

                if(!$scope.selectedIDType){
                    toaster.error("请选择证件种类");
                    return false;
                };
                loanDraft.applicantCertificateType = $scope.selectedIDType.id;
                if(!$scope.selectedDraft.applicantCertificateNumber){
                    toaster.error("请填写证件号码");
                    return false;
                };
                if($scope.selectedIDType.id ==0 &&!isCertificate.test($scope.selectedDraft.applicantCertificateNumber)){
                    toaster.error("请输入格式正确的身份证号码");
                    return;
                };
                loanDraft.applicantCertificateNumber = $scope.selectedDraft.applicantCertificateNumber;
                if(!$scope.selectedDraft.applicantBirthYearMonth){
                    toaster.error("请填写出生日期");
                    return false;
                };
                loanDraft.applicantBirthYearMonth = $scope.selectedDraft.applicantBirthYearMonth;
                loanDraft.applicantGender = $scope.selectedDraft.applicantGender;
                loanDraft.applicantCensusCityId = $scope.selectedDraft.applicantCensusCityId;

                break;
            case 2:
                if(!$scope.selectedDraft.applicantEmployerName){
                    toaster.error("请输入公司名称");
                    return false;
                };
                loanDraft.applicantEmployerName = $scope.selectedDraft.applicantEmployerName;
                if(!$scope.selectedDraft.applicantEmployerAddress){
                    toaster.error("请输入公司地址");
                    return false;
                };
                loanDraft.applicantEmployerAddress = $scope.selectedDraft.applicantEmployerAddress;
                if(!$scope.selectedDraft.applicantEmployerTelephone){
                    toaster.error("请输入公司电话");
                    return false;
                };
                loanDraft.applicantEmployerTelephone = $scope.selectedDraft.applicantEmployerTelephone;
                if(!$scope.selectedDraft.applicantWorkYears){
                    toaster.error("请选择工作年限");
                    return false;
                };
                loanDraft.applicantWorkYears = $scope.selectedDraft.applicantWorkYears;
                if(!$scope.selectedDraft.applicantEmployerType){
                    toaster.error("请选择单位性质");
                    return false;
                };
                loanDraft.applicantEmployerType = $scope.selectedDraft.applicantEmployerType;
                if(!$scope.selectedDraft.applicantEmployerIndustry){
                    toaster.error("请选择单位所属行业");
                    return false;
                };
                loanDraft.applicantEmployerIndustry = $scope.selectedDraft.applicantEmployerIndustry;
                if(($scope.selectedDraft.applicantEmployerType=='党政机关'||$scope.selectedDraft.applicantEmployerType=='国有企业'||$scope.selectedDraft.applicantEmployerType=='集体'||$scope.selectedDraft.applicantEmployerType=='军队')&&!$scope.selectedDraft.applicantPosition){
                    toaster.error("请选择职务");
                    return false;
                };
                loanDraft.applicantPosition = $scope.selectedDraft.applicantPosition;
                if(($scope.selectedDraft.applicantEmployerType=='党政机关'||$scope.selectedDraft.applicantEmployerType=='国有企业'||$scope.selectedDraft.applicantEmployerType=='集体'||$scope.selectedDraft.applicantEmployerType=='军队')&&!$scope.selectedDraft.applicantJobTitle){
                    toaster.error("请选择职称");
                    return false;
                };
                loanDraft.applicantJobTitle = $scope.selectedDraft.applicantJobTitle;
                if(!$scope.selectedDraft.applicantOccupation){
                    toaster.error("请选择本人职业");
                    return false;
                };
                loanDraft.applicantOccupation = $scope.selectedDraft.applicantOccupation;
                if(!$scope.selectedDraft.applicantPost){
                    toaster.error("请选择本人职称");
                    return false;
                };
                loanDraft.applicantPost = $scope.selectedDraft.applicantPost;
                break;
            case 6:
                if(!$scope.selectedDraft.coApplicantName){
                    toaster.error("请输入共同申请人姓名");
                    return false;
                };
                loanDraft.coApplicantName = $scope.selectedDraft.coApplicantName;
                if(!$scope.selectedDraft.coApplicantCensusCityId ){
                    toaster.error("请选择共同申请人户籍");
                    return false;
                };
                loanDraft.coApplicantCensusCityId = $scope.selectedDraft.coApplicantCensusCityId;
                if(!$scope.selectedDraft.coApplicantCertificateNumber){
                    toaster.error("请输入共同申请人证件号码");
                    return false;
                };
                loanDraft.coApplicantCertificateNumber = $scope.selectedDraft.coApplicantCertificateNumber;
                break;
            case 10:
                if(!$scope.selectedDraft.guarantorName){
                    toaster.error("请输入担保人姓名");
                    return false;
                };
                loanDraft.guarantorName = $scope.selectedDraft.guarantorName;
                if(!$scope.selectedDraft.guarantorCensusCityId){
                    toaster.error("请选择担保人户籍");
                    return false;
                };
                    loanDraft.guarantorCensusCityId = $scope.selectedDraft.guarantorCensusCityId;
                if(!$scope.selectedDraft.guarantorCertificateNumber){
                    toaster.error("请输入担保人证件号码");
                    return false;
                };
                    loanDraft.guarantorCertificateNumber = $scope.selectedDraft.guarantorCertificateNumber;
                break;
            case 14:
            case 15:
            case 16:
                if(!$scope.selectedDraft.vehicleVin){
                    toaster.error("请输入车架号");
                    return false;
                };
                loanDraft.vehicleVin = $scope.selectedDraft.vehicleVin;
                if(!$scope.selectedBrand){
                    toaster.error("请选择品牌");
                    return false;
                };
                loanDraft.vehicleBrand = $scope.selectedBrand.id;
                if(!$scope.selectedSeries){
                    toaster.error("请选择车系");
                    return false;
                };
                loanDraft.vehicleSeries = $scope.selectedSeries.id;
                if(!$scope.selectedCarType){
                    toaster.error("请选择车型");
                    return false;
                };
                loanDraft.vehicleManufacturers = $scope.selectedCarType.id;
                loanDraft.vehicleDesc = $scope.selectedBrand.name+"/"+$scope.selectedSeries.name+"/"+$scope.selectedCarType.model_name+$scope.selectedCarType.model_year+$scope.selectedCarType.sale_name;
                if(!$scope.selectedDraft.vehicleProductionYearMonth){
                    toaster.error("请选择汽车生产年月");
                    return false;
                };
                loanDraft.vehicleProductionYearMonth = $scope.selectedDraft.vehicleProductionYearMonth;
                if(!$scope.selectedDraft.vehicleRegistrationYearMonth){
                    toaster.error("请选择首次登记年月");
                    return false;
                };
                loanDraft.vehicleRegistrationYearMonth = $scope.selectedDraft.vehicleRegistrationYearMonth;
                if(!$scope.selectedDraft.vehicleKilometers){
                    toaster.error("请输入里程");
                    return false;
                };
                loanDraft.vehicleKilometers = $scope.selectedDraft.vehicleKilometers;
                if(!$scope.selectedDraft.vehicleUtilityType){
                    toaster.error("请选择使用性质");
                    return false;
                };
                loanDraft.vehicleUtilityType = $scope.selectedDraft.vehicleUtilityType;
                if(!$scope.selectedDraft.vehicleEmission){
                    toaster.error("请选择排放标准");
                    return false;
                };
                loanDraft.vehicleEmission = $scope.selectedDraft.vehicleEmission;
                break;
            case 17:
                if(!$scope.selectedDraft.applicantQualification){
                    toaster.error("请选择教育程度");
                    return false;
                };
                loanDraft.applicantQualification = $scope.selectedDraft.applicantQualification;
                if(!$scope.selectedDraft.applicantAddress){
                    toaster.error("请填写现居住地址");
                    return false;
                };
                loanDraft.applicantAddress = $scope.selectedDraft.applicantAddress;
                loanDraft.applicantTelephone = $scope.selectedDraft.applicantTelephone;
                if(!$scope.selectedDraft.applicantPostAddress){
                    toaster.error("请填写邮寄地址");
                    return false;
                };
                loanDraft.applicantPostAddress = $scope.selectedDraft.applicantPostAddress;
                if(!$scope.selectedDraft.applicantPostCode){
                    toaster.error("请填写邮政编码");
                    return false;
                };
                loanDraft.applicantPostCode = $scope.selectedDraft.applicantPostCode;
                if(!$scope.selectedDraft.coApplicantName){
                    toaster.error("请填写共同申请人姓名");
                    return false;
                };
                loanDraft.coApplicantName = $scope.selectedDraft.coApplicantName;
                if(!$scope.selectedDraft.coApplicantRelationship){
                    toaster.error("请填写共同申请人与申请人关系");
                    return false;
                };
                loanDraft.coApplicantRelationship = $scope.selectedDraft.coApplicantRelationship;
                loanDraft.coApplicantCensusCityId = $scope.selectedDraft.coApplicantCensusCityId;
                if(!$scope.selectedDraft.coApplicantCertificateNumber){
                    toaster.error("请填写共同申请人证件号码");
                    return false;
                };
                loanDraft.coApplicantCertificateNumber = $scope.selectedDraft.coApplicantCertificateNumber;
                if(!$scope.selectedDraft.coApplicantMobileNumber|| !isPhone.test($scope.selectedDraft.coApplicantMobileNumber)){
                    toaster.error("请填写共同申请人手机号码");
                    return false;
                };
                loanDraft.coApplicantMobileNumber = $scope.selectedDraft.coApplicantMobileNumber;
                if(!$scope.selectedDraft.coApplicantQualification){
                    toaster.error("请填写共同申请人教育程度");
                    return false;
                };
                loanDraft.coApplicantQualification = $scope.selectedDraft.coApplicantQualification;
                if(!$scope.selectedDraft.coApplicantIncomePerMonth){
                    toaster.error("请填写共同申请人月收入");
                    return false;
                };
                loanDraft.coApplicantIncomePerMonth = $scope.selectedDraft.coApplicantIncomePerMonth;
                if(!$scope.selectedDraft.guarantorName){
                    toaster.error("请填写担保人姓名");
                    return false;
                };
                loanDraft.guarantorName = $scope.selectedDraft.guarantorName;
                loanDraft.guarantorCensusCityId = $scope.selectedDraft.guarantorCensusCityId;
                if(!$scope.selectedDraft.guarantorRelationship){
                    toaster.error("请填写担保人与申请人关系");
                    return false;
                };
                loanDraft.guarantorRelationship = $scope.selectedDraft.guarantorRelationship;
                if(!$scope.selectedDraft.guarantorCertificateNumber){
                    toaster.error("请填写担保人证件号码");
                    return false;
                };
                loanDraft.guarantorCertificateNumber = $scope.selectedDraft.guarantorCertificateNumber;
                if(!$scope.selectedDraft.guarantorMobileNumber || !isPhone.test($scope.selectedDraft.guarantorMobileNumber)){
                    toaster.error("请填写担保人手机号码");
                    return false;
                };
                loanDraft.guarantorMobileNumber = $scope.selectedDraft.guarantorMobileNumber;
                if(!$scope.selectedDraft.guarantorRealEstateOwnType){
                    toaster.error("请填写担保人房产属权");
                    return false;
                };
                loanDraft.guarantorRealEstateOwnType = $scope.selectedDraft.guarantorRealEstateOwnType;
                if(!$scope.selectedDraft.guarantorIncomePerMonth){
                    toaster.error("请填写担保人月收入");
                    return false;
                };
                loanDraft.guarantorIncomePerMonth = $scope.selectedDraft.guarantorIncomePerMonth;
                if(!$scope.selectedDraft.applicantFirstEmergencyContact){
                    toaster.error("请填写紧急联系人姓名");
                    return false;
                };
                loanDraft.applicantFirstEmergencyContact = $scope.selectedDraft.applicantFirstEmergencyContact;
                if(!$scope.selectedDraft.applicantFirstEmergencyContactRelationship){
                    toaster.error("请填写紧急联系人与申请人关系");
                    return false;
                };
                loanDraft.applicantFirstEmergencyContactRelationship = $scope.selectedDraft.applicantFirstEmergencyContactRelationship;
                if(!$scope.selectedDraft.applicantFirstEmergencyContactMobileNumber || !isPhone.test($scope.selectedDraft.applicantFirstEmergencyContactMobileNumber)){
                    toaster.error("请填写紧急联系人手机号码");
                    return false;
                };
                loanDraft.applicantFirstEmergencyContactMobileNumber = $scope.selectedDraft.applicantFirstEmergencyContactMobileNumber;
                if(!$scope.selectedDraft.applicantFirstEmergencyContactAddress){
                    toaster.error("请填写紧急联系人先居住地址");
                    return false;
                };
                loanDraft.applicantFirstEmergencyContactAddress = $scope.selectedDraft.applicantFirstEmergencyContactAddress;
                break;
        }
        ;
        return true;

    };


    $scope.commit = function () {
        var isPhone = /^1\d{10}$/;
        var isCertificate = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        if(!$scope.selectedDraft.applicantName){
            toaster.error("请填写申请人姓名");
            return false;
        };

        if(!$scope.selectedIDType){
            toaster.error("请选择证件种类");
            return false;
        };
        if(!$scope.selectedDraft.applicantCertificateNumber){
            toaster.error("请填写证件号码");
            return false;
        };
        if($scope.selectedIDType.id ==0 &&!isCertificate.test($scope.selectedDraft.applicantCertificateNumber)){
            toaster.error("请输入格式正确的身份证号码");
            return;
        };
        if(!$scope.selectedDraft.applicantBirthYearMonth){
            toaster.error("请填写出生日期");
            return false;
        };
        if(!$scope.selectedDraft.applicantEmployerName){
            toaster.error("请输入公司名称");
            return false;
        };
        if(!$scope.selectedDraft.applicantEmployerAddress){
            toaster.error("请输入公司地址");
            return false;
        };
        if(!$scope.selectedDraft.applicantEmployerTelephone){
            toaster.error("请输入公司电话");
            return false;
        };
        if(!$scope.selectedDraft.applicantWorkYears){
            toaster.error("请选择工作年限");
            return false;
        };
        if(!$scope.selectedDraft.applicantEmployerType){
            toaster.error("请选择单位性质");
            return false;
        };
        if(!$scope.selectedDraft.applicantEmployerIndustry){
            toaster.error("请选择单位所属行业");
            return false;
        };
        if(($scope.selectedDraft.applicantEmployerType=='党政机关'||$scope.selectedDraft.applicantEmployerType=='国有企业'||$scope.selectedDraft.applicantEmployerType=='集体'||$scope.selectedDraft.applicantEmployerType=='军队')&&!$scope.selectedDraft.applicantPosition){
            toaster.error("请选择职务");
            return false;
        };
        if(($scope.selectedDraft.applicantEmployerType=='党政机关'||$scope.selectedDraft.applicantEmployerType=='国有企业'||$scope.selectedDraft.applicantEmployerType=='集体'||$scope.selectedDraft.applicantEmployerType=='军队')&&!$scope.selectedDraft.applicantJobTitle){
            toaster.error("请选择职称");
            return false;
        };
        if(!$scope.selectedDraft.applicantOccupation){
            toaster.error("请选择本人职业");
            return false;
        };
        if(!$scope.selectedDraft.applicantPost){
            toaster.error("请选择本人职称");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantName){
            toaster.error("请输入共同申请人姓名");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantCensusCityId && $scope.selectedDraft.coApplicantCensusCityId !=0){
            toaster.error("请选择共同申请人户籍");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantCertificateNumber){
            toaster.error("请输入共同申请人证件号码");
            return false;
        };
        if(!$scope.selectedDraft.guarantorName){
            toaster.error("请输入担保人姓名");
            return false;
        };
        if(!$scope.selectedDraft.guarantorCensusCityId && $scope.selectedDraft.guarantorCensusCityId !=0){
            toaster.error("请选择担保人户籍");
            return false;
        };
        if(!$scope.selectedDraft.guarantorCertificateNumber){
            toaster.error("请输入担保人证件号码");
            return false;
        };
        if(!$scope.selectedDraft.vehicleVin){
            toaster.error("请输入车架号");
            return false;
        };
        if(!$scope.selectedBrand){
            toaster.error("请选择品牌");
            return false;
        };
        if(!$scope.selectedSeries){
            toaster.error("请选择车系");
            return false;
        };

        if(!$scope.selectedCarType){
            toaster.error("请选择车型");
            return false;
        };
        if(!$scope.selectedDraft.vehicleProductionYearMonth){
            toaster.error("请选择汽车生产年月");
            return false;
        };
        if(!$scope.selectedDraft.vehicleRegistrationYearMonth){
            toaster.error("请选择首次登记年月");
            return false;
        };
        if(!$scope.selectedDraft.vehicleKilometers){
            toaster.error("请输入里程");
            return false;
        };
        if(!$scope.selectedDraft.vehicleUtilityType){
            toaster.error("请选择使用性质");
            return false;
        };
        if(!$scope.selectedDraft.vehicleEmission){
            toaster.error("请选择排放标准");
            return false;
        };
        if(!$scope.selectedDraft.applicantQualification){
            toaster.error("请选择教育程度");
            return false;
        };
        if(!$scope.selectedDraft.applicantAddress){
            toaster.error("请填写现居住地址");
            return false;
        };
        if(!$scope.selectedDraft.applicantPostAddress){
            toaster.error("请填写邮寄地址");
            return false;
        };
        if(!$scope.selectedDraft.applicantPostCode){
            toaster.error("请填写邮政编码");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantName){
            toaster.error("请填写共同申请人姓名");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantRelationship){
            toaster.error("请填写共同申请人与申请人关系");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantCertificateNumber){
            toaster.error("请填写共同申请人证件号码");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantMobileNumber || !isPhone.test($scope.selectedDraft.coApplicantMobileNumber)){
            toaster.error("请填写共同申请人手机号码");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantQualification){
            toaster.error("请填写共同申请人教育程度");
            return false;
        };
        if(!$scope.selectedDraft.coApplicantIncomePerMonth){
            toaster.error("请填写共同申请人月收入");
            return false;
        };
        if(!$scope.selectedDraft.guarantorName){
            toaster.error("请填写担保人姓名");
            return false;
        };
        if(!$scope.selectedDraft.guarantorRelationship){
            toaster.error("请填写担保人与申请人关系");
            return false;
        };
        if(!$scope.selectedDraft.guarantorCertificateNumber){
            toaster.error("请填写担保人证件号码");
            return false;
        };
        if(!$scope.selectedDraft.guarantorMobileNumber || !isPhone.test($scope.selectedDraft.guarantorMobileNumber)){
            toaster.error("请填写担保人手机号码");
            return false;
        };
        if(!$scope.selectedDraft.guarantorRealEstateOwnType){
            toaster.error("请填写担保人房产属权");
            return false;
        };
        if(!$scope.selectedDraft.guarantorIncomePerMonth){
            toaster.error("请填写担保人月收入");
            return false;
        };
        if(!$scope.selectedDraft.applicantFirstEmergencyContact){
            toaster.error("请填写紧急联系人姓名");
            return false;
        };
        if(!$scope.selectedDraft.applicantFirstEmergencyContactRelationship){
            toaster.error("请填写紧急联系人与申请人关系");
            return false;
        };
        if(!$scope.selectedDraft.applicantFirstEmergencyContactMobileNumber || !isPhone.test($scope.selectedDraft.applicantFirstEmergencyContactMobileNumber)){
            toaster.error("请填写紧急联系人手机号码");
            return false;
        };
        if(!$scope.selectedDraft.applicantFirstEmergencyContactAddress){
            toaster.error("请填写紧急联系人先居住地址");
            return false;
        };


        httpService.updateLoandraft($scope.selectedDraft.id, {}, 3).then(function (res) {//3表示初审审批通过
            console.log(res);
            $state.go("main.loanpreliminary");
        }, function (err) {
            console.log(err);
        });

    };
    $scope.isNumber = function (val) {
        val = val.replace(/[^0-9]/ig,"");
        return val;

    }

    $scope.save = function () {
        var loanDraft = {};
        switch ($scope.currentPage) {
            case 0:
                if (!$scope.form1.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 2:
                if (!$scope.form2.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 6:
                if (!$scope.form3.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 10:
                if (!$scope.form4.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 14:
            case 15:
            case 16:
                if (!$scope.form5.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 17:
                if (!$scope.form6.$dirty) {
                    toaster.info("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
        }
        ;
        if(!getLoanBean(loanDraft)){
            return;
        };
        httpService.updateLoandraft($scope.selectedDraft.id, loanDraft, 1).then(function (res) {
            toaster.success("保存成功");
        }, function (err) {
            toaster.error(err);
        });

    };

    $scope.returnAndUpdate = function () {
        $scope.errMsgs = [];
        for (var i = 0; i < $scope.picArrays.length; i++) {
            if ($scope.picArrays[i].msg) {
                $scope.errMsgs.push($scope.picTypes[$scope.picArrays[i].id].name + $scope.picArrays[i].msg);
            }

        };
        $scope.showReturnDialog = true;
    };

    $scope.doReturn = function () {
        var loanApply = {
            reviewRemark: $scope.errMsg + $scope.errMsgOther
        };
        httpService.updateLoandraft($scope.selectedDraft.id, loanApply, 4).then(function (res) {//4表示退回修改
            console.log(res);
            $state.go("main.loanpreliminary");
        }, function (err) {
            console.log(err);
        });
    };
    $scope.doRefuse = function () {
        var loanApply = {};
        httpService.updateLoandraft($scope.selectedDraft.id, loanApply, 5).then(function (res) {//5表示拒绝
            console.log(res);
            $state.go("main.loanpreliminary");
        }, function (err) {
            console.log(err);
        });
    }
    $scope.doCancel = function () {
        $scope.showReturnDialog = false;
    }

    $scope.changePostAddress = function (type) {
        if (type == 1) {
            $scope.selectedDraft.applicantPostAddress = $scope.selectedDraft.applicantEmployerAddress;
        } else if (type == 2) {
            $scope.selectedDraft.applicantPostAddress = $scope.selectedDraft.applicantAddress;
        } else if (type == 3) {
            $scope.selectedDraft.applicantPostAddress = "";
        }
    };


    $scope.move = function (j) {
        if (j < 0 || j > $scope.picArrays.length - 1) {
            return;
        }
        $scope.selectedType = $scope.picTypes[$scope.picArrays[j].id];
        $scope.currentPage = $scope.picArrays[j].id;

        $scope.selectedPicIndex = j;//当前显示的照片下标
        $scope.startIndex = j - 4;
        $scope.endIndex = j + 4;
        if (j < 4) {
            $scope.startIndex = 0;
        }
        if (j > $scope.picArrays.length - 4 - 1) {
            $scope.endIndex = $scope.picArrays.length - 1;
        }
        if ($scope.selectedPicIndex == 0) {
            $scope.leftIcon = '/resources/img/left-off.png';
        } else {
            $scope.leftIcon = '/resources/img/left-on.png';
        };
        if ($scope.selectedPicIndex ==$scope.picArrays.length-1) {
            $scope.rightIcon = '/resources/img/right-off.png';
        } else {
            $scope.rightIcon = '/resources/img/right-on.png';
        };
    };

    

    //修改图片类型
    $scope.changeType = function () {
        //将元素从之前的队列除去
        var preArray = $scope.picArrayTwo[$scope.currentPage];
        for (var i = 0; i < preArray.length; i++) {
            if ($scope.picArrays[$scope.selectedPicIndex].id == preArray[i].id && $scope.picArrays[$scope.selectedPicIndex].url == preArray[i].url) {
                $scope.picArrayTwo[$scope.currentPage].splice(i, 1);
                break;
            }
        }
        ;
        //修改id
        $scope.picArrays[$scope.selectedPicIndex].id = $scope.selectedType.id;
        $scope.picArrayTwo[$scope.selectedType.id].push($scope.picArrays[$scope.selectedPicIndex]);
        var preImageUrlArray = [];
        for (var i in $scope.picArrayTwo[$scope.currentPage]) {
            preImageUrlArray.push($scope.picArrayTwo[$scope.currentPage][i].url);
        }
        var postImageUrlArray = [];
        for (var i in $scope.picArrayTwo[$scope.selectedType.id]) {
            postImageUrlArray.push($scope.picArrayTwo[$scope.selectedType.id][i].url);
        }
        var preString = commonUtil.joinImages(preImageUrlArray, true);
        var postString = commonUtil.joinImages(postImageUrlArray, true);

        var loanObj = {};
        switch ($scope.currentPage) {
            case 0:
                loanObj.applicantCertificateFileIds = preString;
                break;
            case 1:
                loanObj.applicantQualificationFileIds = preString;
                break;
            case 2:
                loanObj.applicantIncomeFileIds = preString;
                break;
            case 3:
                loanObj.applicantEstateFileIds = preString;
                break;
            case 4:
                loanObj.applicantVehicleFileIds = preString;
                break;
            case 5:
                loanObj.applicantOtherFileIds = preString;
                break;
            case 6:
                loanObj.coApplicantCertificateFileIds = preString;
                break;
            case 7:
                loanObj.coApplicantIncomeFileIds = preString;
                break;
            case 8:
                loanObj.coApplicantEstateFileIds = preString;
                break;
            case 9:
                loanObj.coApplicantOtherFileIds = preString;
                break;
            case 10:
                loanObj.guarantorCertificateFileIds = preString;
                break;
            case 11:
                loanObj.guarantorIncomeFileIds = preString;
                break;
            case 12:
                loanObj.guarantorEstateFileIds = preString;
                break;
            case 13:
                loanObj.guarantorOtherFileIds = preString;
                break;
            case 14:
                loanObj.vehicleRegistrationCertificateFileIds = preString;
                break;
            case 15:
                loanObj.vehicleLicenseFileIds = preString;
                break;
            case 16:
                loanObj.vehicleFileIds = preString;
                break;
            case 17:
                loanObj.applicationPicUrl = preString;
                break;

        }
        ;
        switch ($scope.selectedType.id) {
            case 0:
                loanObj.applicantCertificateFileIds = postString;
                break;
            case 1:
                loanObj.applicantQualificationFileIds = postString;
                break;
            case 2:
                loanObj.applicantIncomeFileIds = postString;
                break;
            case 3:
                loanObj.applicantEstateFileIds = postString;
                break;
            case 4:
                loanObj.applicantVehicleFileIds = postString;
                break;
            case 5:
                loanObj.applicantOtherFileIds = postString;
                break;
            case 6:
                loanObj.coApplicantCertificateFileIds = postString;
                break;
            case 7:
                loanObj.coApplicantIncomeFileIds = postString;
                break;
            case 8:
                loanObj.coApplicantEstateFileIds = postString;
                break;
            case 9:
                loanObj.coApplicantOtherFileIds = postString;
                break;
            case 10:
                loanObj.guarantorCertificateFileIds = postString;
                break;
            case 11:
                loanObj.guarantorIncomeFileIds = postString;
                break;
            case 12:
                loanObj.guarantorEstateFileIds = postString;
                break;
            case 13:
                loanObj.guarantorOtherFileIds = postString;
                break;
            case 14:
                loanObj.vehicleRegistrationCertificateFileIds = postString;
                break;
            case 15:
                loanObj.vehicleLicenseFileIds = postString;
                break;
            case 16:
                loanObj.vehicleFileIds = postString;
                break;
            case 17:
                loanObj.applicationPicUrl = postString;
                break;
        }
        ;
        if(!getLoanBean(loanObj)){
            return;
        };
        httpService.updateLoandraft($scope.selectedDraft.id, loanObj, 1).then(function (res) {
            $scope.currentPage = $scope.selectedType.id;
        }, function (err) {
            alert(err);
        })

    };

    $scope.markError = function (errorType) {
        switch (errorType) {
            case 1:
                if (!$scope.picArrays[$scope.selectedPicIndex].notClear) {
                    $scope.picArrays[$scope.selectedPicIndex].msg = "图片不清晰";
                } else {
                    return;
                }
                ;
                $scope.picArrays[$scope.selectedPicIndex].notClear = true;
                $scope.picArrays[$scope.selectedPicIndex].imgError = false;
                $scope.picArrays[$scope.selectedPicIndex].otherErr = false;

                break;
            case 2:
                if (!$scope.picArrays[$scope.selectedPicIndex].imgError) {
                    $scope.picArrays[$scope.selectedPicIndex].msg = "图片错误";
                } else {
                    return;
                }
                ;
                $scope.picArrays[$scope.selectedPicIndex].notClear = false;
                $scope.picArrays[$scope.selectedPicIndex].imgError = true;
                $scope.picArrays[$scope.selectedPicIndex].otherErr = false;

                break;
            case 3:
                if ($scope.picArrays[$scope.selectedPicIndex].otherErr) {
                    return;
                } else {
                    $scope.picArrays[$scope.selectedPicIndex].msg = "";
                }
                ;
                $scope.picArrays[$scope.selectedPicIndex].notClear = false;
                $scope.picArrays[$scope.selectedPicIndex].imgError = false;
                $scope.picArrays[$scope.selectedPicIndex].otherErr = true;

                break;
        }
    }

});

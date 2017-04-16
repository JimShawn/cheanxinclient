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
    $scope.draft = true;//默认草稿箱页面
    $scope.goToDraft = function (i) {
        commonUtil.changeTab($scope, i);
    };
    $scope.add = function () {
        $state.go("main.loanapply", {items: null, type: 1});
    }

});

loanpreliminary.controller("loanapplyController", ['$filter', '$scope', '$http', '$location', '$rootScope', 'httpService', '$state', '$window', 'cityJson', '$stateParams', function ($filter, $scope, $http, $location, $rootScope, httpService, $state, $window, cityJson, $stateParams) {

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
            $scope.identityPhotos = selectedItem.applicantCertificateFileIds.split(",");
            $scope.applicantQualificationPhotos = selectedItem.applicantQualificationFileIds.split(",");
            $scope.applicantIncomePhotos = selectedItem.applicantIncomeFileIds.split(",");
            $scope.applicantEstatePhotos = selectedItem.applicantEstateFileIds.split(",");
            $scope.applicantVehiclePhotos = selectedItem.applicantVehicleFileIds.split(",");
            $scope.applicantOtherPhotos = selectedItem.applicantOtherFileIds.split(",");
            $scope.coIdentityPhotos = selectedItem.coApplicantCertificateFileIds.split(",");
            $scope.coApplicantIncomePhotos = selectedItem.coApplicantIncomeFileIds.split(",");
            $scope.coApplicantEstatePhotos = selectedItem.coApplicantEstateFileIds.split(",");
            $scope.coApplicantOtherPhotos = selectedItem.coApplicantOtherFileIds.split(",");
            $scope.guarantorIdentityPhotos = selectedItem.guarantorCertificateFileIds.split(",");
            $scope.guarantorIncomePhotos = selectedItem.guarantorIncomeFileIds.split(",");
            $scope.guarantorEstatePhotos = selectedItem.guarantorEstateFileIds.split(",");
            $scope.guarantorOtherPhotos = selectedItem.guarantorOtherFileIds.split(",");
            $scope.vehicleRegistrationCertificatePhotos = selectedItem.vehicleRegistrationCertificateFileIds.split(",");
            $scope.vehicleLicensePhotos = selectedItem.vehicleLicenseFileIds.split(",");
            $scope.vehiclePhotos = selectedItem.vehicleFileIds.split(",");
            $scope.applicationPicPhotos = selectedItem.applicationPicUrl.split(",");
        }


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
                $scope.selectedFactory = selectedItem.vehicleManufacturers;
                $scope.selectedBrand = selectedItem.vehicleBrand;
                $scope.selectedSeries = selectedItem.vehicleSeries;
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
    $scope.brands = [
        "奥迪", "奔驰", "宝马", "丰田", "本田", "铃木", "比亚迪", "吉利", "雪佛兰", "现代", "大众", "福特"
    ];
    $scope.factories = [
        "广汽", "上汽", "北汽", "一汽"
    ];
    $scope.series = ["福克斯", "科鲁兹", "yalris", "雷凌", "宋", "元"];
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
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeRate = function () {
        $scope.applicantLoanPrice = $scope.vehicleDealPrice * $scope.selectedRate / 10;
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = $scope.applicantLoanPrice / $scope.selectedTerm + $scope.applicantLoanPrice * $scope.selectedProduct.loanMonthlyInterestRate / 100;
    };
    $scope.commit = function (operateType) {
        //预先获取图片url
        var errorMsg = "";
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
        if (!applicantCertificateFileIds) {
            errorMsg += "请上传申请人身份证图片" + "\n";
        }
        ;
        if (!coApplicantCertificateFileIds) {
            errorMsg += "请上传共同申请人身份证图片" + "\n";
        }
        ;
        if (!guarantorCertificateFileIds) {
            errorMsg += "请上传担保人身份证图片" + "\n";
        }
        ;
        if (!applicantIncomeFileIds && !applicantEstateFileIds) {
            errorMsg += "申请人收入证明和房产证明必须传一个" + "\n";
        }
        ;
        if (!vehicleRegistrationCertificateFileIds) {
            errorMsg += "请上传车辆登记证书" + "\n";
        }
        ;
        if (!vehicleLicenseFileIds) {
            errorMsg += "请上传机动车行驶证" + "\n";
        }
        ;
        if (!vehicleFileIds) {
            errorMsg += "请上传车辆照片" + "\n";
        }
        ;
        if (!applicationPicUrl) {
            errorMsg += "请上传申请表" + "\n";
        }
        ;
        if (errorMsg != "") {
            alert(errorMsg);
            return;
        }
        var loanDraft = {
            vehicleDealPrice: $scope.vehicleDealPrice,
            productId: $scope.selectedProduct.id,
            applicantLoanRate: $scope.selectedRate,
            applicantLoanPrice: $scope.applicantLoanPrice,
            loanTerms: $scope.selectedTerm,
            remark: $scope.remark,
            sourceFinancialCommissioner: $scope.userInfo.data.realName,
            sourceReceiver: $scope.selectedCollector.realName,
            sourceCityId: $scope.sourceCity.Id,
            sourceChannel: $scope.selectedSource.id,
            sourcePersonName: $scope.sourcePersonName,
            sourcePersonTel: $scope.sourcePersonTel,
            applicantName: $scope.applicantName,
            applicantMarriage: $scope.selectedMarriages.id,
            applicantCertificateType: $scope.selectedIDType.id,
            applicantCertificateNumber: $scope.applicantCertificateNumber,
            applicantMobileNumber: $scope.applicantMobileNumber,
            applicantIncomePerMonth: $scope.applicantIncomePerMonth,
            vehicleVin: $scope.vehicleVin,
            vehicleManufacturers: $scope.selectedFactory,
            vehicleBrand: $scope.selectedBrand,
            vehicleSeries: $scope.selectedSeries,
            vehicleKilometers: $scope.vehicleKilometers,
            status: 1,
            creatorUsername: $scope.userInfo.data.username,
            applicantCertificateFileIds: applicantCertificateFileIds,
            applicantQualificationFileIds: applicantQualificationFileIds,
            applicantIncomeFileIds: applicantIncomeFileIds,
            applicantEstateFileIds: applicantEstateFileIds,
            applicantVehicleFileIds: applicantVehicleFileIds,
            applicantOtherFileIds: applicantOtherFileIds,
            coApplicantCertificateFileIds: coApplicantCertificateFileIds,
            coApplicantIncomeFileIds: coApplicantIncomeFileIds,
            coApplicantEstateFileIds: coApplicantEstateFileIds,
            coApplicantOtherFileIds: coApplicantOtherFileIds,
            guarantorCertificateFileIds: guarantorCertificateFileIds,
            guarantorIncomeFileIds: guarantorIncomeFileIds,
            guarantorEstateFileIds: guarantorEstateFileIds,
            guarantorOtherFileIds: guarantorOtherFileIds,
            vehicleRegistrationCertificateFileIds: vehicleRegistrationCertificateFileIds,
            vehicleLicenseFileIds: vehicleLicenseFileIds,
            vehicleFileIds: vehicleFileIds,
            applicationPicUrl: applicationPicUrl,
            productLoanMonthlyInterestRate:$scope.selectedProduct.loanMonthlyInterestRate

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

loanpreliminary.controller("editLoanapplyController", ['$scope', '$http', '$location', '$rootScope', 'httpService', '$state', '$window', 'cityJson', '$stateParams', 'commonUtil', function ($scope, $http, $location, $rootScope, httpService, $state, $window, cityJson, $stateParams, commonUtil) {


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
                var fileArray = $scope.selectedDraft.applicantCertificateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 0,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appId.push({
                        id: 0,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });

                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appId);

            if ($scope.selectedDraft.applicantQualificationFileIds) {
                var fileArray = $scope.selectedDraft.applicantQualificationFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 1,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appQua.push({
                        id: 1,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appQua);

            if ($scope.selectedDraft.applicantIncomeFileIds) {
                var fileArray = $scope.selectedDraft.applicantIncomeFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 2,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appInc.push({
                        id: 2,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appInc);

            if ($scope.selectedDraft.applicantEstateFileIds) {
                var fileArray = $scope.selectedDraft.applicantEstateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 3,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appEst.push({
                        id: 3,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appEst);

            if ($scope.selectedDraft.applicantVehicleFileIds) {
                var fileArray = $scope.selectedDraft.applicantVehicleFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 4,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appVeh.push({
                        id: 4,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appVeh);

            if ($scope.selectedDraft.applicantOtherFileIds) {
                var fileArray = $scope.selectedDraft.applicantOtherFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 5,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    appOth.push({
                        id: 5,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(appOth);

            if ($scope.selectedDraft.coApplicantCertificateFileIds) {
                var fileArray = $scope.selectedDraft.coApplicantCertificateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 6,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    coAppId.push({
                        id: 6,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppId);
            if ($scope.selectedDraft.coApplicantIncomeFileIds) {
                var fileArray = $scope.selectedDraft.coApplicantIncomeFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 7,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    coAppInc.push({
                        id: 7,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppInc);

            if ($scope.selectedDraft.coApplicantEstateFileIds) {
                var fileArray = $scope.selectedDraft.coApplicantEstateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 8,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    coAppEst.push({
                        id: 8,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppEst);

            if ($scope.selectedDraft.coApplicantOtherFileIds) {
                var fileArray = $scope.selectedDraft.coApplicantOtherFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 9,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    coAppOth.push({
                        id: 9,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(coAppOth);
            if ($scope.selectedDraft.guarantorCertificateFileIds) {
                var fileArray = $scope.selectedDraft.guarantorCertificateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 10,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    guaID.push({
                        id: 10,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaID);

            if ($scope.selectedDraft.guarantorIncomeFileIds) {
                var fileArray = $scope.selectedDraft.guarantorIncomeFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 11,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    guaInc.push({
                        id: 11,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaInc);

            if ($scope.selectedDraft.guarantorEstateFileIds) {
                var fileArray = $scope.selectedDraft.guarantorEstateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 12,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    guaEst.push({
                        id: 12,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaEst);

            if ($scope.selectedDraft.guarantorOtherFileIds) {
                var fileArray = $scope.selectedDraft.guarantorOtherFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 13,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    guaOth.push({
                        id: 13,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(guaOth);

            if ($scope.selectedDraft.vehicleRegistrationCertificateFileIds) {
                var fileArray = $scope.selectedDraft.vehicleRegistrationCertificateFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 14,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    vehReg.push({
                        id: 14,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehReg);
            if ($scope.selectedDraft.vehicleLicenseFileIds) {
                var fileArray = $scope.selectedDraft.vehicleLicenseFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 15,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    vehLic.push({
                        id: 15,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehLic);
            if ($scope.selectedDraft.vehicleFileIds) {
                var fileArray = $scope.selectedDraft.vehicleFileIds.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 16,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    vehPic.push({
                        id: 16,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                }
                ;

            }
            ;
            $scope.picArrayTwo.push(vehPic);
            if ($scope.selectedDraft.applicationPicUrl) {
                var fileArray = $scope.selectedDraft.applicationPicUrl.split(",");
                for (var i = 0; i < fileArray.length; i++) {
                    $scope.picArrays.push({
                        id: 17,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
                    });
                    applicationFile.push({
                        id: 17,
                        url: "http://172.16.1.14:8888/" + fileArray[i]
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
                }
                ;
                if (j > $scope.picArrays.length - 4 - 1) {
                    $scope.endIndex = $scope.picArrays.length - 1;
                }
            }
        }
        ;
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
        $scope.paybackPerMonth = $scope.applicantLoanPrice / $scope.selectedTerm +  $scope.applicantLoanPrice * $scope.selectedProduct.loanMonthlyInterestRate / 100;
    };

    var getLoanBean = function (loanDraft) {
        switch ($scope.currentPage) {
            case 0:
                loanDraft.applicantName = $scope.selectedDraft.applicantName;
                loanDraft.applicantCertificateType = $scope.selectedIDType.id;
                loanDraft.applicantCertificateNumber = $scope.selectedDraft.applicantCertificateNumber;
                loanDraft.applicantBirthYearMonth = $scope.selectedDraft.applicantBirthYearMonth;
                loanDraft.applicantGender = $scope.selectedDraft.applicantGender;
                loanDraft.applicantCensusCityId = $scope.selectedDraft.applicantCensusCityId;

                break;
            case 2:
                loanDraft.applicantEmployerName = $scope.selectedDraft.applicantEmployerName;
                loanDraft.applicantEmployerAddress = $scope.selectedDraft.applicantEmployerAddress;
                loanDraft.applicantEmployerTelephone = $scope.applicantEmployerTelephone;
                loanDraft.applicantWorkYears = $scope.selectedDraft.applicantWorkYears;
                loanDraft.applicantEmployerType = $scope.selectedDraft.applicantEmployerType;
                loanDraft.applicantEmployerIndustry = $scope.selectedDraft.applicantEmployerIndustry;
                loanDraft.applicantPosition = $scope.selectedDraft.applicantPosition;
                loanDraft.applicantJobTitle = $scope.selectedDraft.applicantJobTitle;
                loanDraft.applicantOccupation = $scope.selectedDraft.applicantOccupation;
                loanDraft.applicantPost = $scope.selectedDraft.applicantPost;
                break;
            case 6:
                loanDraft.coApplicantName = $scope.selectedDraft.coApplicantName;
                loanDraft.coApplicantCensusCityId = $scope.selectedDraft.coApplicantCensusCityId;
                loanDraft.coApplicantCertificateNumber = $scope.selectedDraft.coApplicantCertificateNumber;
                break;
            case 10:
                loanDraft.guarantorName = $scope.selectedDraft.guarantorName,
                    loanDraft.guarantorCensusCityId = $scope.selectedDraft.guarantorCensusCityId,
                    loanDraft.guarantorCertificateNumber = $scope.selectedDraft.guarantorCertificateNumber;
                break;
            case 14:
            case 15:
            case 16:
                loanDraft.vehicleVin = $scope.selectedDraft.vehicleVin;
                loanDraft.vehicleManufacturers = $scope.selectedDraft.vehicleManufacturers;
                loanDraft.vehicleBrand = $scope.selectedDraft.vehicleBrand;
                loanDraft.vehicleSeries = $scope.selectedDraft.vehicleSeries;
                loanDraft.vehicleProductionYearMonth = $scope.selectedDraft.vehicleProductionYearMonth;
                loanDraft.vehicleRegistrationYearMonth = $scope.selectedDraft.vehicleRegistrationYearMonth;
                loanDraft.vehicleKilometers = $scope.selectedDraft.vehicleKilometers;
                loanDraft.vehicleUtilityType = $scope.selectedDraft.vehicleUtilityType;
                loanDraft.vehicleEmission = $scope.selectedDraft.vehicleEmission;
                break;
            case 17:
                loanDraft.applicantQualification = $scope.selectedDraft.applicantQualification;
                loanDraft.applicantAddress = $scope.selectedDraft.applicantAddress;
                loanDraft.applicantTelephone = $scope.applicantTelephone;
                loanDraft.applicantPostAddress = $scope.selectedDraft.applicantPostAddress;
                loanDraft.applicantPostCode = $scope.selectedDraft.applicantPostCode;
                loanDraft.coApplicantName = $scope.selectedDraft.coApplicantName;
                loanDraft.coApplicantRelationship = $scope.selectedDraft.coApplicantRelationship;
                loanDraft.coApplicantCensusCityId = $scope.selectedDraft.coApplicantCensusCityId;
                loanDraft.coApplicantCertificateNumber = $scope.selectedDraft.coApplicantCertificateNumber;
                loanDraft.coApplicantMobileNumber = $scope.selectedDraft.coApplicantMobileNumber;
                loanDraft.coApplicantQualification = $scope.selectedDraft.coApplicantQualification;
                loanDraft.coApplicantIncomePerMonth = $scope.selectedDraft.coApplicantIncomePerMonth;
                loanDraft.guarantorName = $scope.selectedDraft.guarantorName;
                loanDraft.guarantorCensusCityId = $scope.selectedDraft.guarantorCensusCityId;
                loanDraft.guarantorRelationship = $scope.selectedDraft.guarantorRelationship;
                loanDraft.guarantorCertificateNumber = $scope.selectedDraft.guarantorCertificateNumber;
                loanDraft.guarantorMobileNumber = $scope.selectedDraft.guarantorMobileNumber;
                loanDraft.guarantorRealEstateOwnType = $scope.selectedDraft.guarantorRealEstateOwnType;
                loanDraft.guarantorIncomePerMonth = $scope.selectedDraft.guarantorIncomePerMonth;
                loanDraft.applicantFirstEmergencyContact = $scope.selectedDraft.applicantFirstEmergencyContact;
                loanDraft.applicantFirstEmergencyContactRelationship = $scope.selectedDraft.applicantFirstEmergencyContactRelationship;
                loanDraft.applicantFirstEmergencyContactMobileNumber = $scope.selectedDraft.applicantFirstEmergencyContactMobileNumber;
                loanDraft.applicantFirstEmergencyContactAddress = $scope.selectedDraft.applicantFirstEmergencyContactAddress;
                break;
        }
        ;

    };


    $scope.commit = function () {


        httpService.updateLoandraft($scope.selectedDraft.id, {}, 3).then(function (res) {//3表示初审审批通过
            console.log(res);
            $state.go("main.loanpreliminary");
        }, function (err) {
            console.log(err);
        });

    };

    $scope.save = function () {
        var loanDraft = {};
        switch ($scope.currentPage) {
            case 0:
                if (!$scope.form1.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 2:
                if (!$scope.form2.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 6:
                if (!$scope.form3.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 10:
                if (!$scope.form4.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 14:
            case 15:
            case 16:
                if (!$scope.form5.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
            case 17:
                if (!$scope.form6.$dirty) {
                    alert("没有做出任何改变，无需保存");
                    return;
                }
                ;
                break;
        }
        ;
        getLoanBean(loanDraft);
        httpService.updateLoandraft($scope.selectedDraft.id, loanDraft, 1).then(function (res) {
            alert("保存成功");
        }, function (err) {
            alert(err);
        });

    };

    $scope.returnAndUpdate = function () {
        $scope.errMsg = "";
        for (var i = 0; i < $scope.picArrays.length; i++) {
            if ($scope.picArrays[i].msg) {
                $scope.errMsg += $scope.picTypes[$scope.picArrays[i].id].name + $scope.picArrays[i].msg + "\n";
            }

        }
        ;
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
        ;
        $scope.selectedType = $scope.picTypes[$scope.picArrays[j].id];
        $scope.currentPage = $scope.picArrays[j].id;

        $scope.selectedPicIndex = j;//当前显示的照片下标
        $scope.startIndex = j - 4;
        $scope.endIndex = j + 4;
        if (j < 4) {
            $scope.startIndex = 0;
        }
        ;
        if (j > $scope.picArrays.length - 4 - 1) {
            $scope.endIndex = $scope.picArrays.length - 1;
        }

    };

    var getStringFromArray = function (picArray) {
        var picStr = "";
        for (var i = 0; i < picArray.length; i++) {
            if (i == 0) {
                picStr += picArray[i].url.replace("http://172.16.1.14:8888/", "");
            } else {
                picStr += "," + picArray[i].url.replace("http://172.16.1.14:8888/", "");
            }

        }
        ;
        return picStr;
    }

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
        var preString = getStringFromArray($scope.picArrayTwo[$scope.currentPage]);
        var postString = getStringFromArray($scope.picArrayTwo[$scope.selectedType.id]);

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
        getLoanBean(loanObj);
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

}]);

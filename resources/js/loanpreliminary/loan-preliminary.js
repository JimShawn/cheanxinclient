/**
 * Created by 向麒 on 2017/2/15.
 */
'use strict';
var loanpreliminary = angular.module('loanpreliminary',['httpservice']);
loanpreliminary.controller("loanpreliminaryListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','commonUtil','cityJson',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,commonUtil,cityJson) {
    $scope.QueryUserName = "";
    $scope.queryTel = "";
    $scope.sources = [
        {
            id:0,
            name:"门店"
        },
        {
            id:1,
            name:"车商"
        },
        {
            id:2,
            name:"273网站"
        },
        {
            id:3,
            name:"273业管"
        },
        {
            id:4,
            name:"其他"
        }
    ];
    $scope.queryCommitBeginDate = "";
    $scope.queryCommitEndDate = "";

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
    $scope.status = [{
        id:0,
        name:"可用"
    },{
        id:1,
        name:"不可用"
    }];

    $scope.commonUtil = commonUtil;
    $scope.cityJson = cityJson;

    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,1);

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
    $scope.edit = function (draft) {
        if ($scope.draft){
            $state.go("main.loanapply",{items:draft,type:2});
        }else if ($scope.waitingCheck){
            $state.go("main.eidtloanapply",{items:draft});
        }else if ($scope.returnWaitingUpdate){

        }else if ($scope.checkPass){

        }else if ($scope.checkRefuse){

        }


    };
    $scope.draft=true;//默认草稿箱页面
    $scope.goToDraft=function (pageType) {
        switch (pageType){
            case 1:
                $scope.draft=true;
                $scope.waitingCheck =$scope.returnWaitingUpdate=$scope.checkPass=$scope.checkRefuse=false;
                $scope.getList(0,10,1);
                break;
            case 2:
                $scope.waitingCheck=true;
                $scope.draft =$scope.returnWaitingUpdate=$scope.checkPass=$scope.checkRefuse=false;
                $scope.getList(0,10,2);
                break;
            case 3:
                $scope.returnWaitingUpdate=true;
                $scope.waitingCheck =$scope.draft=$scope.checkPass=$scope.checkRefuse=false;
                break;
            case 4:
                $scope.checkPass=true;
                $scope.waitingCheck =$scope.returnWaitingUpdate=$scope.draft=$scope.checkRefuse=false;
                break;
            case 5:
                $scope.checkRefuse=true;
                $scope.waitingCheck =$scope.returnWaitingUpdate=$scope.draft=$scope.checkPass=false;
                break;
        }
    };
    $scope.add=function () {
        $state.go("main.loanapply",{items:null,type:1});
    }

}]);
loanpreliminary.controller("loanapplyController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$window','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$window,cityJson,$stateParams) {

    $scope.init = function () {
        var userInfo = $window.sessionStorage['userInfo'];
        var userInfoObj = JSON.parse(userInfo);
        $scope.userInfo = userInfoObj;
        $scope.cityArray = [];
        for(var i=0;i<userInfoObj.data.cityIds.length;i++){
            $scope.cityArray.push(cityJson.Citys[userInfoObj.data.cityIds[i]-1]);
        };

        //获取当前城市的收单员
        httpService.getUserByCityAndPost(userInfoObj.data.deptId,5).then(function (result) {
            console.log(result);
            $scope.collectors = result.data;
            var selectedItem = $stateParams.items;

            $scope.type = $stateParams.type;
            if ($scope.type ==2){
                $scope.productId = selectedItem.productId;
                $scope.productLoanTerms = selectedItem.loanTerms;
                $scope.loanDraftId = selectedItem.id;
                $scope.cityJson = cityJson;
                $scope.commonUtil = commonUtil;
                $scope.sourceCity = cityJson.Citys[selectedItem.sourceCityId-1];
                for (var i=0;i<$scope.collectors.length;i++){
                    if ($scope.collectors[i].realName == selectedItem.sourceReceiver){
                        $scope.selectedCollector = $scope.collectors[i];
                    }
                };
                $scope.selectedSource = $scope.sources[selectedItem.sourceChannel];
                $scope.selectedMarriages= $scope.marriages[selectedItem.applicantMarriage];
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
                $scope.selectedRate = selectedItem.loanRate;
                $scope.firstPay = selectedItem.loanFirstPayment;

                $scope.getProductByCity();


            }
        },function (error) {
            console.log(error);
        });

    };


    $scope.sources = [
        {
            id:0,
            name:"门店"
        },
        {
            id:1,
            name:"车商"
        },
        {
            id:2,
            name:"273网站"
        },
        {
            id:3,
            name:"273业管"
        },
        {
            id:4,
            name:"其他"
        }
    ];
    $scope.IDTypes = [
        {
            id:0,
            name:"身份证"
        },
        {
            id:1,
            name:"护照"
        },
        {
            id:2,
            name:"户口本"
        }
    ];
    $scope.marriages = [
        {
            id:0,
            name:"已婚"
        },
        {
            id:1,
            name:"未婚"
        }
    ];
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
    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];
    $scope.init();

    $scope.getProductByCity = function(){
        console.log("hhaaa");
        httpService.getProductByCityId($scope.sourceCity.Id).then(function (res) {
            $scope.products = res.data;
            if($scope.type ==2){
                for (var j=0;j<$scope.products.length;j++){
                    if($scope.productId == $scope.products[j].id){
                        $scope.selectedProduct = $scope.products[j];
                        $scope.selectProduct();
                        $scope.selectedTerm =$scope.productLoanTerms+"";
                        $scope.changeTerms();


                    }
                }
            }
        },function (err) {
            
        })
    };
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeRate = function () {
        $scope.firstPay = $scope.vehicleDealPrice*(1-$scope.selectedRate/10);
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = ($scope.vehicleDealPrice-$scope.firstPay)/$scope.selectedTerm+($scope.vehicleDealPrice-$scope.firstPay)*$scope.selectedProduct.loanMonthlyInterestRate/100;
    };
    $scope.commit = function () {
        var loanDraft = {
            vehicleDealPrice:$scope.vehicleDealPrice,
            productId:$scope.selectedProduct.id,
            loanRate:$scope.selectedRate,
            loanFirstPayment:$scope.firstPay,
            loanTerms:$scope.selectedTerm,
            loanMonthlyInterestRate:$scope.selectedProduct.loanMonthlyInterestRate,
            remark:$scope.remark,
            sourceFinancialCommissioner:$scope.userInfo.data.realName,
            sourceReceiver:$scope.selectedCollector.realName,
            sourceCityId:$scope.sourceCity.Id,
            sourceChannel:$scope.selectedSource.id,
            sourcePersonName:$scope.sourcePersonName,
            sourcePersonTel:$scope.sourcePersonTel,
            applicantName:$scope.applicantName,
            applicantMarriage:$scope.selectedMarriages.id,
            applicantCertificateType:$scope.selectedIDType.id,
            applicantCertificateNumber:$scope.applicantCertificateNumber,
            applicantMobileNumber:$scope.applicantMobileNumber,
            applicantIncomePerMonth:$scope.applicantIncomePerMonth,
            vehicleVin:$scope.vehicleVin,
            vehicleManufacturers:$scope.selectedFactory,
            vehicleBrand:$scope.selectedBrand,
            vehicleSeries:$scope.selectedSeries,
            vehicleKilometers:$scope.vehicleKilometers,
            status:1,
            creatorUsername:$scope.userInfo.data.username
        };
        if($scope.type ==1){
            httpService.addLoandraft(loanDraft).then(function (res) {
                alert("保存成功");
                $state.go("main.loanpreliminary");

            },function (err) {

            })
        }else if($scope.type ==2){
            httpService.updateLoandraft($scope.loanDraftId,{},2).then(function (res) {//2表示提交审批
                console.log(res);
                $state.go("main.loanpreliminary");
            },function (err) {
                console.log(err);
            })
        };


    };
    $scope.cancel = function () {
        $state.go("main.loanpreliminary");
    }
}]);

loanpreliminary.controller("editLoanapplyController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$window','cityJson','$stateParams','commonUtil',function ($scope,$http,$location,$rootScope,httpService,$state,$window,cityJson,$stateParams,commonUtil) {


    $scope.sources = [
        {
            id:0,
            name:"门店"
        },
        {
            id:1,
            name:"车商"
        },
        {
            id:2,
            name:"273网站"
        },
        {
            id:3,
            name:"273业管"
        },
        {
            id:4,
            name:"其他"
        }
    ];
    $scope.IDTypes = [
        {
            id:0,
            name:"身份证"
        },
        {
            id:1,
            name:"护照"
        },
        {
            id:2,
            name:"户口本"
        }
    ];
    $scope.marriages = [
        {
            id:0,
            name:"已婚"
        },
        {
            id:1,
            name:"未婚"
        }
    ];
    $scope.otherAddress = false;
    $scope.brands = [
        "奥迪","奔驰","宝马","丰田","本田","铃木","比亚迪","吉利","雪佛兰","现代","大众","福特"
    ];
    $scope.factories = [
        "广汽","上汽","北汽","一汽"
    ];
    $scope.series = ["福克斯","科鲁兹","yalris","雷凌","宋","元"];
    $scope.produceYears = [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
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
    $scope.qualifications = ["大专","本科","高中","硕士","博士"];
    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];
    $scope.years = ["3年及以上","1到3年","半年到一年","半年以内"];

    $scope.companyTypes = ["党政机关","事业单位","军队","社会团体","内资企业","国有企业","集体企业","股份合作企业","联营企业","有限责任公司","股份有限公司","私营企业",
            "外商投资企业(含港、澳、台)","中外合资经营企业(含港、澳、台)","中外合作经营企业(含港、澳、台)","外资企业(含港、澳、台)","外商投资股份有限公司(含港、澳、台)","个体经营","其他","未知"];
    $scope.industries = ["农、林、牧、渔业","采矿业制造业电力、燃气及水的生产和供应业","建筑业","交通运输、仓储和邮政业","信息传输、计算机服务和软件业","批发和零售业","住宿和餐饮业","金融业",
        "租赁和商务服务业","科学研究、技术服务业和地质勘察业","水利、环境和公共设施管理业","居民服务和其他服务业","教育","卫生、社会保障和社会福利业","文化、体育和娱乐业","公共管理和社会组织","国际组织"];
    $scope.positiones = ["厅局级以上","处级科级","高级领导","中级领导","一般员工","机关事业单位-其他","企业单位-其他"];
    $scope.jobTitles = ["高级职称","中级职称","初级称职","无职称"];
    $scope.occupationes = ["文化艺术及广播电影电视业","卫生、体育、教育","金融、保险业","国家机关、党政机关、军队和社会团体","电力、煤气及水的生产和供应业","科学研究和综合技术服务业","电信、信息传输、计算机服务和软件业"
        ,"水利、环境和公共设施管理业","交通运输、仓储、邮政","批发和零售贸易","社会服务业","住宿和餐饮业","地质勘查业","租赁和商业服务","建筑业","采掘业","制造业","农、林、牧、渔业","其他"];
    $scope.posts = ["单位主管","部门主管","一般职员","个体经营者","自由职业者","下岗或失业"];
    $scope.emissiones = ["化油器","国1","国2","欧1","欧2","国3","国3带OBD","欧3","国4","欧4","国5","欧5","欧6","国4(京5)"];


    $scope.init = function () {
        $scope.selectedDraft = $stateParams.items;
        $scope.cityJson = cityJson;
        $scope.commonUtil = commonUtil;
        $scope.selectedSource = $scope.sources[$scope.selectedDraft.sourceChannel];
        $scope.selectedMarriages= $scope.marriages[$scope.selectedDraft.applicantMarriage];
        $scope.selectedIDType = $scope.IDTypes[$scope.selectedDraft.applicantCertificateType];
        httpService.getProductByID($scope.selectedDraft.productId).then(function (res) {
            console.log(res);
            $scope.draftProduct = res.data;
        },function (err) {

        })

    };
    $scope.init();

    $scope.getProductByCity = function(){
        httpService.getProductByCityId($scope.sourceCity.Id).then(function (res) {
            $scope.products = res.data;
        },function (err) {

        })
    };
    $scope.selectProduct = function () {
        var termsStr = $scope.selectedProduct.availableTerms;
        $scope.availableTerms = termsStr.split(",");
    };
    $scope.changeRate = function () {
        $scope.firstPay = $scope.vehicleDealPrice*(1-$scope.selectedRate/10);
    };
    $scope.changeTerms = function () {
        $scope.paybackPerMonth = ($scope.vehicleDealPrice-$scope.firstPay)/$scope.selectedTerm+($scope.vehicleDealPrice-$scope.firstPay)*$scope.selectedProduct.loanMonthlyInterestRate/100;
    };
    $scope.commit = function () {
        console.log($scope.selectedDraft.applicantCensus);
        var loanDraft = {
            vehicleDealPrice:$scope.selectedDraft.vehicleDealPrice,
            productId:$scope.draftProduct.productId,
            loanRate:$scope.selectedDraft.loanRate,
            loanFirstPayment:$scope.selectedDraft.loanFirstPayment,
            loanTerms:$scope.selectedDraft.loanTerms,
            loanMonthlyInterestRate:$scope.selectedDraft.loanMonthlyInterestRate,
            remark:$scope.remark,
            sourceFinancialCommissioner:$scope.selectedDraft.sourceFinancialCommissioner,
            sourceReceiver:$scope.selectedDraft.sourceReceiver,
            sourceCityId:$scope.selectedDraft.sourceCityId,
            sourceChannel:$scope.selectedSource.id,
            sourcePersonName:$scope.selectedDraft.sourcePersonName,
            sourcePersonTel:$scope.selectedDraft.sourcePersonTel,

            applicantName:$scope.selectedDraft.applicantName,
            applicantMarriage:$scope.selectedMarriages.id,
            applicantCertificateType:$scope.selectedIDType.id,
            applicantCertificateNumber:$scope.selectedDraft.applicantCertificateNumber,
            applicantBirthYearMonth:$scope.birth,
            applicantGender:$scope.selectedDraft.applicantGender,
            applicantMobileNumber:$scope.selectedDraft.applicantMobileNumber,
            applicantQualification:$scope.selectedDraft.applicantQualification,
            applicantCensusCityId:$scope.selectedDraft.applicantCensus==0?$scope.selectedDraft.sourceCityId:null,
            applicantIncomePerMonth:$scope.selectedDraft.applicantIncomePerMonth,
            applicantAddress:$scope.selectedDraft.applicantAddress,
            applicantTelephone:$scope.areaNumber+""+$scope.telephone,
            applicantEmployerName:$scope.selectedDraft.applicantEmployerName,
            applicantEmployerAddress:$scope.selectedDraft.applicantEmployerAddress,
            applicantEmployerTelephone:$scope.companyAreaNumber+""+$scope.companyTelephone,
            applicantWorkYears:$scope.selectedDraft.applicantWorkYears,
            applicantEmployerType:$scope.selectedDraft.applicantEmployerType,
            applicantEmployerIndustry:$scope.selectedDraft.applicantEmployerIndustry,
            applicantPosition:$scope.selectedDraft.applicantPosition,
            applicantJobTitle:$scope.selectedDraft.applicantJobTitle,
            applicantOccupation:$scope.selectedDraft.applicantOccupation,
            applicantPost:$scope.selectedDraft.applicantPost,
            applicantPostAddress:$scope.selectedDraft.applicantPostAddress,
            applicantPostCode:$scope.selectedDraft.areaCode,
            coApplicantName:$scope.selectedDraft.coApplicantName,
            coApplicantRelationship:$scope.selectedDraft.coApplicantRelationship,
            coApplicantCensusCityId:$scope.selectedDraft.coApplicantCensusCityId==0?$scope.selectedDraft.sourceCityId:null,
            coApplicantCertificateNumber:$scope.selectedDraft.coApplicantCertificateNumber,
            coApplicantMobileNumber:$scope.selectedDraft.coApplicantMobileNumber,
            coApplicantQualification:$scope.selectedDraft.coApplicantQualification,
            coApplicantIncomePerMonth:$scope.selectedDraft.coApplicantIncomePerMonth,
            guarantorName:$scope.selectedDraft.guarantorName,
            guarantorCensusCityId:$scope.selectedDraft.guarantorCensusCityId==0?$scope.selectedDraft.sourceCityId:null,
            guarantorRelationship:$scope.selectedDraft.guarantorRelationship,
            guarantorCertificateNumber:$scope.selectedDraft.guarantorCertificateNumber,
            guarantorMobileNumber:$scope.selectedDraft.guarantorMobileNumber,
            guarantorRealEstateOwnType:$scope.selectedDraft.guarantorRealEstateOwnType,
            guarantorIncomePerMonth:$scope.selectedDraft.guarantorIncomePerMonth,
            applicantFirstEmergencyContact:$scope.selectedDraft.applicantFirstEmergencyContact,
            applicantFirstEmergencyContactRelationship:$scope.selectedDraft.applicantFirstEmergencyContactRelationship,
            applicantFirstEmergencyContactMobileNumber:$scope.selectedDraft.applicantFirstEmergencyContactMobileNumber,
            applicantFirstEmergencyContactAddress:$scope.selectedDraft.applicantFirstEmergencyContactAddress,
            vehicleVin:$scope.selectedDraft.vehicleVin,
            vehicleManufacturers:$scope.selectedDraft.vehicleManufacturers,
            vehicleBrand:$scope.selectedDraft.vehicleBrand,
            vehicleSeries:$scope.selectedDraft.vehicleSeries,
            vehicleProductionYearMonth:$scope.selectedDraft.vehicleProductionYearMonth,
            vehicleRegistrationYearMonth:$scope.selectedDraft.vehicleRegistrationYearMonth,
            vehicleKilometers:$scope.selectedDraft.vehicleKilometers,
            vehicleUtilityType:$scope.selectedDraft.vehicleUtilityType,
            vehicleEmission:$scope.selectedDraft.vehicleEmission,
            status:3,//带定价
        };

        httpService.updateLoandraft($scope.selectedDraft.id,loanDraft,1).then(function (res) {//1表示修改
            console.log(res);
            httpService.updateLoandraft($scope.selectedDraft.id,{},3).then(function (res) {//3表示初审审批通过
                console.log(res);
                $state.go("main.loanpreliminary");
            },function (err) {
                console.log(err);
            });
        },function (err) {
            console.log(err);
        })

    };
    $scope.cancel = function () {
        $state.go("main.loanpreliminary");
    };
    $scope.changePostAddress = function (type) {
        if (type==1){
            $scope.selectedDraft.applicantPostAddress = $scope.selectedDraft.applicantEmployerAddress;
            $scope.otherAddress = false;
        }else if(type==2){
            $scope.selectedDraft.applicantPostAddress = $scope.selectedDraft.applicantAddress;
            $scope.otherAddress = false;
        }else if(type==3){
            $scope.otherAddress = true;
        }
    }
}]);

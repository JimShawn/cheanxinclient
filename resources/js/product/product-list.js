/**
 * Created by 向麒 on 2017/1/14.
 * 产品管理
 */
'use strict';
var product = angular.module('product',['httpservice']);
product.controller("productController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout) {
    $scope.QueryPositonName = "";
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


    $scope.getList = function (page,size) {
        httpService.getAllProduct(page,size,-1,0).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10);

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
    $scope.edit = function (product) {
        $state.go("main.addproductmanagement",{items:JSON.stringify(product)});
    }

}]);
product.controller("subProductController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson) {
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

    $scope.QueryPositonName = "";
    $scope.cities = cityJson;
    $scope.selectProvinces = {};
    $scope.selectCity = {};



    $scope.getList = function (page,size) {
        httpService.getAllProduct(page,size,0,-1).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10);

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
    $scope.add = function () {
        $state.go("main.addsubproduct");
    };
    $scope.edit = function (subproduct) {
        $state.go("main.editsubproduct",{items:subproduct});
    }

}]);
product.controller("addProductController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    var selectedItem = JSON.parse($stateParams.items);

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

    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];
    console.log(selectedItem);
    if (selectedItem ==null){
        $scope.name = "";
        $scope.selectedProductType = {};
        $scope.selectedPaybackType = {};
        $scope.minAvailableRate = 1;
        $scope.maxAvailableRate = 1;
        $scope.loanMonthlyInterestRate = "";
    }else {
        $scope.name = selectedItem.name;
        console.log($scope.productTypes);
        console.log(selectedItem.productType);
        $scope.selectedProductType = $scope.productTypes[selectedItem.productType];
        $scope.selectedPaybackType = $scope.paybackTypes[selectedItem.repaymentMethod];
        $scope.minAvailableRate = selectedItem.minAvailableRate;
        $scope.maxAvailableRate = selectedItem.maxAvailableRate;
        $scope.loanMonthlyInterestRate = selectedItem.loanMonthlyInterestRate;
        var availableTermsStr = selectedItem.availableTerms;
        var availableTermsArray = availableTermsStr.split(",");
        for(var i=0;i<availableTermsArray.length;i++){
            if(availableTermsArray[i]==6){
                $scope.sixTerms = true;
            };
            if(availableTermsArray[i]==12){
                $scope.tweTerms = true;
            };
            if(availableTermsArray[i]==18){
                $scope.eighteenTerms = true;
            };
            if(availableTermsArray[i]==24){
                $scope.twentyfourTerms = true;
            };
            if(availableTermsArray[i]==36){
                $scope.thirtysixTerms = true;
            };
        };
        if(selectedItem.loanPolicy==0){
            $scope.afterSign = true;
        };
        if(selectedItem.loanPolicy==1){
            $scope.afterMortgage = true;
        }

    }




    $scope.changeCheckedStatus = function (x) {
        console.log(x);
        console.log($scope.sixTerms);
    };
    $scope.commit = function () {
        var availableTerms = "";
        var loanPolicy = 0;
        if ($scope.sixTerms)  {availableTerms = "6"};
        if ($scope.tweTerms)  {availableTerms += ",12"};
        if ($scope.eighteenTerms)  {availableTerms += ",18"};
        if ($scope.twentyfourTerms)  {availableTerms = ",24"};
        if ($scope.thirtysixTerms)  {availableTerms = ",36"};

        if($scope.afterSign){ loanPolicy = 0};
        if($scope.afterMortgage){ loanPolicy = 1};

        $scope.product = {
            name:$scope.name,
            productType:$scope.selectedProductType.id,
            repaymentMethod:$scope.selectedPaybackType.id,
            minAvailableRate:$scope.minAvailableRate,
            maxAvailableRate:$scope.maxAvailableRate,
            availableTerms:availableTerms,
            loanPolicy:loanPolicy,
            loanMonthlyInterestRate:$scope.loanMonthlyInterestRate,
            cityId:0,
            productTemplateId:0,
            provinceId:0,
            status:0
        };
        console.log($scope.product);
        httpService.addProduct($scope.product).then(function (res) {
            alert("新增产品成功");
            $state.go("main.productmanagement");
        },function (err) {
            alert(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.productmanagement");
    }

}]);
product.controller("addSubProductController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson) {
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
    $scope.loanPolicy = [{
        id:0,
        name:"过户后放款"
    },{
        id:1,
        name:"抵押后放款"
    }];
    $scope.cities = cityJson;

    $scope.getList = function (page,size) {
        httpService.getAllProduct(page,size,-1,0).then(function (result) {
            console.log(result);
            $scope.data = result.data;

        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10);
    $scope.selectProduct = function () {
        console.log($scope.selectedProduct);
        var availableTermsStr = $scope.selectedProduct.availableTerms;
        var availableTermsArray = availableTermsStr.split(",");
        for(var i=0;i<availableTermsArray.length;i++){
            if(availableTermsArray[i]==6){
                $scope.sixTerms = true;
            };
            if(availableTermsArray[i]==12){
                $scope.tweTerms = true;
            };
            if(availableTermsArray[i]==18){
                $scope.eighteenTerms = true;
            };
            if(availableTermsArray[i]==24){
                $scope.twentyfourTerms = true;
            };
            if(availableTermsArray[i]==36){
                $scope.thirtysixTerms = true;
            };
        };
    }

    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];

    $scope.changeCheckedStatus = function (x) {
        console.log(x);
        console.log($scope.sixTerms);
    };
    $scope.commit = function () {
        var availableTerms = "";
        if ($scope.sixTerms)  {availableTerms = "6"};
        if ($scope.tweTerms)  {availableTerms += ",12"};
        if ($scope.eighteenTerms)  {availableTerms += ",18"};
        if ($scope.twentyfourTerms)  {availableTerms = ",24"};
        if ($scope.thirtysixTerms)  {availableTerms = ",36"};

        $scope.product = {
            name:$scope.selectedProduct.name,
            productType:$scope.selectedProduct.productType,
            repaymentMethod:$scope.selectedProduct.repaymentMethod,
            minAvailableRate:$scope.selectedProduct.minAvailableRate,
            maxAvailableRate:$scope.selectedProduct.maxAvailableRate,
            availableTerms:availableTerms,
            loanPolicy:$scope.selectedProduct.loanPolicy,
            loanMonthlyInterestRate:$scope.loanMonthlyInterestRate,
            cityId:$scope.selectCity.Id,
            productTemplateId:$scope.selectedProduct.id,
            provinceId:$scope.selectProvinces.Id,
            status:0
        };
        console.log($scope.product);
        httpService.addProduct($scope.product).then(function (res) {
            alert("新增子产品成功");
            $state.go("main.subproductmanagement");
        },function (err) {
            alert(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.subproductmanagement");
    }
}]);
product.controller("editSubProductController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams) {
    $scope.cities = cityJson;
    $scope.selectedProduct = $stateParams.items;
    console.log($scope.selectedProduct);
    var availableTermsStr = $scope.selectedProduct.availableTerms;
    var availableTermsArray = availableTermsStr.split(",");
    for(var i=0;i<availableTermsArray.length;i++){
        if(availableTermsArray[i]==6){
            $scope.sixTerms = true;
        };
        if(availableTermsArray[i]==12){
            $scope.tweTerms = true;
        };
        if(availableTermsArray[i]==18){
            $scope.eighteenTerms = true;
        };
        if(availableTermsArray[i]==24){
            $scope.twentyfourTerms = true;
        };
        if(availableTermsArray[i]==36){
            $scope.thirtysixTerms = true;
        };
    };
    $scope.selectProvinces = cityJson.provincesList[$scope.selectedProduct.provinceId-1];
    $scope.selectCity = cityJson.Citys[$scope.selectedProduct.cityId-1];



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
    $scope.loanPolicy = [{
        id:0,
        name:"过户后放款"
    },{
        id:1,
        name:"抵押后放款"
    }];


    $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];

    $scope.changeCheckedStatus = function (x) {
        console.log(x);
        console.log($scope.sixTerms);
    };

    $scope.commit = function () {
        var availableTerms = "";
        if ($scope.sixTerms)  {availableTerms = "6"};
        if ($scope.tweTerms)  {availableTerms += ",12"};
        if ($scope.eighteenTerms)  {availableTerms += ",18"};
        if ($scope.twentyfourTerms)  {availableTerms = ",24"};
        if ($scope.thirtysixTerms)  {availableTerms = ",36"};

        $scope.product = {
            id:$scope.selectedProduct.id,
            name:$scope.selectedProduct.name,
            productType:$scope.selectedProduct.productType,
            repaymentMethod:$scope.selectedProduct.repaymentMethod,
            minAvailableRate:$scope.selectedProduct.minAvailableRate,
            maxAvailableRate:$scope.selectedProduct.maxAvailableRate,
            availableTerms:availableTerms,
            loanPolicy:$scope.selectedProduct.loanPolicy,
            loanMonthlyInterestRate:$scope.selectedProduct.loanMonthlyInterestRate,
            cityId:$scope.selectCity.Id,
            productTemplateId:$scope.selectedProduct.id,
            provinceId:$scope.selectProvinces.Id,
            status:0
        };
        console.log($scope.product);
        httpService.editProduct($scope.product).then(function (res) {
            alert("修改子产品成功");
            $state.go("main.subproductmanagement");
        },function (err) {
            alert(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.subproductmanagement");
    }
}]);

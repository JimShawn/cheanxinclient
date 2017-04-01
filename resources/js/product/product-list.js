/**
 * Created by 向麒 on 2017/1/14.
 * 产品管理
 */
'use strict';
var product = angular.module('product',['httpservice']);

product.factory("productFactory", function () {
    var productFactoryApi = {};

    productFactoryApi.initScope = function ($scope, httpService) {
        $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];

        $scope.changeCheckedStatus = function (checkArr, x) {
            checkArr[x] = !checkArr[x];
        };

        $scope.changeRadioStatus = function (radioArr, x) {
            for (var key in radioArr) {
                if (key == x) {
                    radioArr[key] = true;
                } else {
                    radioArr[key] = false;
                }
            }
        }

        $scope.productTypes = [{
            id:0,
            name:"二手车贷款"
        }];

        $scope.paybackTypes = [{
            id:0,
            name:"等额本息"
        }];

        $scope.loanPolicies = {"afterSign":false, "afterMortgage":false};
        $scope.loanPolicyNames = {"afterSign":"过户后放款", "afterMortgage":"抵押后放款"}
        $scope.loanPolicyIds = {"afterSign":0, "afterMortgage":1}
s

        $scope.productStatus = [{
            id:0,
            name:"待审核",
            on:true
        },{
            id:1,
            name:"审核通过",
            on:false
        },{
            id:2,
            name:"审核拒绝",
            on:false
        }];

        $scope.init = function() {
            $scope.query = {};
            $scope.query.name = "";
            $scope.query.status = "-1";
            $scope.query.page = "0";
            $scope.query.size = "10";
            $scope.query.productTemplateId = "0";
        }
        $scope.init();

        $scope.getList = function (status) {
            if (status != undefined) {
                $scope.query.status = status;
            }
            if ($scope.selectCity) {
                $scope.query.cityId = $scope.selectCity.Id;
            } else {
                $scope.query.cityId = -1;
            }
            if (!$scope.query.cityId) {
                $scope.query.cityId = -1;
            }
            for (var i in $scope.productStatus) {
                if ($scope.productStatus[i].id == $scope.query.status) {
                    $scope.productStatus[i].on = true;
                } else {
                    $scope.productStatus[i].on = false;
                }
            }
            httpService.listProduct($scope.query).then(function (result) {
                console.log(result);
                $scope.data = result.data;
            },function (error) {
                console.error(error.data.errorMessage);
            });

        };

        $scope.changePageSizeFun = function (size) {
            $scope.query.page = $scope.data.number;
            $scope.query.size = size;
            $scope.getList();
        };

        $scope.gotoPageFun = function (x) {
            $scope.query.page = x;
            $scope.query.size = $scope.data.size;
            $scope.getList();
        };
        return $scope;
    }

    productFactoryApi.checkTerms = function(availableTerms) {
        var availableTermsArr = {"6":false, "12":false, "18":false, "24":false, "36":false, "48":false, "60":false}
        if (!availableTerms) {
            return availableTermsArr;
        }
        var availableTermsArray = availableTerms.split(",");
        for (var i = 0; i < availableTermsArray.length; i++) {
            availableTermsArr[availableTermsArray[i]] = true;
        };
        return availableTermsArr;
    };

    productFactoryApi.setTerms = function(availableTerms) {
        var availableTermsStr = "";
        for (var availableTerm in availableTerms) {
            if (!availableTerms[availableTerm]) {
                continue;
            }
            if (availableTermsStr.length == 0) {
                availableTermsStr = availableTerm;
            } else {
                availableTermsStr += "," + availableTerm;
            }
        }
        return availableTermsStr;
    };

    productFactoryApi.checkLoanPolicy = function (loanPolicies, loanPolicyIds, id) {
        for (var key in loanPolicies) {
            if (loanPolicyIds[key] == id) {
                loanPolicies[key] = true;
                return;
            }
        }
    }

    productFactoryApi.setLoanPolicy = function (loanPolicies, loanPolicyIds) {
        for (var key in loanPolicies) {
            if (loanPolicies[key] == true) {
                return loanPolicyIds[key];
            }
        }
    }

    return productFactoryApi;
});

product.controller("productController",function ($scope, $http, $location, $rootScope, $state, httpService, productFactory) {
    productFactory.initScope($scope, httpService);
    $scope.QueryPositonName = "";

    $scope.addProduct = function () {
        $state.go("main.addproductmanagement",{items:null});
    };
    $scope.edit = function (product) {
        $state.go("main.addproductmanagement",{items:JSON.stringify(product)});
    }
    $scope.getList();
});

product.controller("subProductController",function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson, productFactory) {
    productFactory.initScope($scope, httpService);

    $scope.QueryPositonName = "";
    $scope.cities = cityJson;
    $scope.selectProvinces = {};
    $scope.selectCity = {};

    $scope.init = function() {
        $scope.query = {};
        $scope.query.name = "";
        $scope.query.status = "0";
        $scope.query.page = "0";
        $scope.query.size = "10";
        $scope.query.productTemplateId = "-1";
    }
    $scope.init();

    $scope.getList(0);

    $scope.add = function () {
        $state.go("main.addsubproduct");
    };

    $scope.edit = function (subproduct) {
        $state.go("main.editsubproduct",{items:subproduct});
    }

});

product.controller("addProductController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams,productFactory) {
    productFactory.initScope($scope, httpService);

    var selectedItem = JSON.parse($stateParams.items);

    if (selectedItem == null) {
        $scope.name = "";
        $scope.selectedProductType = {};
        $scope.selectedPaybackType = {};
        $scope.minAvailableRate = 1;
        $scope.maxAvailableRate = 1;
        $scope.loanMonthlyInterestRate = "";
        $scope.availableTerms = productFactory.checkTerms();
    } else {
        $scope.id = selectedItem.id;
        $scope.name = selectedItem.name;
        $scope.selectedProductType = $scope.productTypes[selectedItem.productType];
        $scope.selectedPaybackType = $scope.paybackTypes[selectedItem.repaymentMethod];
        $scope.minAvailableRate = selectedItem.minAvailableRate;
        $scope.maxAvailableRate = selectedItem.maxAvailableRate;
        $scope.loanMonthlyInterestRate = selectedItem.loanMonthlyInterestRate;
        $scope.availableTerms = productFactory.checkTerms(selectedItem.availableTerms);
        productFactory.checkLoanPolicy($scope.loanPolicies, $scope.loanPolicyIds, selectedItem.loanPolicy);
    }

    $scope.commit = function () {
        $scope.product = {
            name:$scope.name,
            productType:$scope.selectedProductType.id,
            repaymentMethod:$scope.selectedPaybackType.id,
            minAvailableRate:$scope.minAvailableRate,
            maxAvailableRate:$scope.maxAvailableRate,
            availableTerms:productFactory.setTerms($scope.availableTerms),
            loanPolicy:productFactory.setLoanPolicy($scope.loanPolicies, $scope.loanPolicyIds),
            loanMonthlyInterestRate:$scope.loanMonthlyInterestRate,
            cityId:0,
            productTemplateId:0,
            status:1
        };
        var response;
        if (selectedItem) {
            $scope.product.id = selectedItem.id;
            response = httpService.editProduct($scope.product);
        } else {
            response = httpService.addProduct($scope.product);
        }
        response.then(function (res) {
            $state.go("main.productmanagement");
        },function (err) {
            console.error(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.productmanagement");
    }

});

product.controller("editSubProductController", function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,$stateParams, productFactory) {
    productFactory.initScope($scope, httpService);

    $scope.cities = cityJson;
    $scope.selectedProduct = $stateParams.items;
    $scope.availableTerms = productFactory.checkTerms($scope.selectedProduct.availableTerms);
    $scope.selectProvinces = cityJson.provincesList[$scope.selectedProduct.provinceId-1];
    $scope.selectCity = cityJson.Citys[$scope.selectedProduct.cityId-1];

    $scope.commit = function () {
        $scope.product = {
            id:$scope.selectedProduct.id,
            name:$scope.selectedProduct.name,
            productType:$scope.selectedProduct.productType,
            repaymentMethod:$scope.selectedProduct.repaymentMethod,
            minAvailableRate:$scope.selectedProduct.minAvailableRate,
            maxAvailableRate:$scope.selectedProduct.maxAvailableRate,
            availableTerms:productFactory.setTerms($scope.availableTerms),
            loanPolicy:$scope.selectedProduct.loanPolicy,
            loanMonthlyInterestRate:$scope.selectedProduct.loanMonthlyInterestRate,
            cityId:$scope.selectCity.Id,
            productTemplateId:$scope.selectedProduct.id,
            provinceId:$scope.selectProvinces.Id,
            status:0
        };
        httpService.editProduct($scope.product).then(function (res) {
            $state.go("main.subproductmanagement");
        },function (err) {
            alert(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.subproductmanagement");
    }
});

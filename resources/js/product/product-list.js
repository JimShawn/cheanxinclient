/**
 * Created by 向麒 on 2017/1/14.
 * 产品管理
 */
'use strict';
var product = angular.module('product',['httpservice']);

product.factory("productFactory", function (toaster, $window,$state) {
    var productFactoryApi = {};
    var curTab = null;
    var curTabIndex = 0;

    productFactoryApi.initScope = function ($scope, httpService) {
        $scope.AvailableRates = [1,2,3,4,5,6,7,8,9];
        $scope.minAvailableRate = $scope.AvailableRates[0];
        $scope.maxAvailableRate = $scope.AvailableRates[$scope.AvailableRates.length - 1];

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
        $scope.selectedProductType = $scope.productTypes[0];

        $scope.paybackTypes = [{
            id:0,
            name:"等额本息"
        }];
        $scope.selectedPaybackType = $scope.paybackTypes[0];

        $scope.loanPolicies = [{
            id:0,
            name:"过户后放款"
        },{
            id:1,
            name:"抵押后放款"
        }];
        $scope.loanPolicy = $scope.loanPolicies[0];

        $scope.productStatus = [{
            id:0,
            name:"待审核",
            on:false,
            review:false,
            edit:false,
            show:false,
            editRoles:["ROLE_ADMIN", "ROLE_PRODUCT_UPDATE"],
            reviewRoles:["ROLE_ADMIN", "ROLE_PRODUCT_REVIEW"],
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ"]
        },{
            id:1,
            name:"审核通过",
            on:false,
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ", "ROLE_PRODUCT_CITY_READ", "ROLE_FIRST_REVIEWER", "ROLE_SECOND_REVIEWER"]
        },{
            id:2,
            name:"审核拒绝",
            on:false,
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ"]
        }];

        var hasRoleAuthority = function (roles, postAuthorities) {
            if (!roles) {
                return false;
            }
            if (!postAuthorities) {
                return false;
            }
            for (var i in postAuthorities) {
                if (roles.indexOf(postAuthorities[i].authority) >= 0) {
                    return true;
                }
            }
            return false;
        }
        if(!$window.sessionStorage["userInfo"]){
            $state.go("login");//跳转到登录界面
            return;
        }
        var user = JSON.parse($window.sessionStorage["userInfo"]);
        for (var i = 0; i < $scope.productStatus.length; i++) {
            var hasTabShowAuthority = hasRoleAuthority($scope.productStatus[i].showRoles, user.data.postAuthorities);
            $scope.productStatus[i].show = hasTabShowAuthority;
            var hasTabEditAuthority = hasRoleAuthority($scope.productStatus[i].editRoles, user.data.postAuthorities);
            $scope.productStatus[i].edit = hasTabEditAuthority;
            var hasTabReviewAuthority = hasRoleAuthority($scope.productStatus[i].reviewRoles, user.data.postAuthorities);
            $scope.productStatus[i].review = hasTabReviewAuthority;
        }

        if (!curTab) {
            for (var i in $scope.productStatus) {
                if ($scope.productStatus[i].show) {
                    $scope.productStatus[i].on = true;
                    curTab = $scope.productStatus[i];
                    curTabIndex = i;
                    break;
                }
            }
        }
        $scope.curTab = curTab;

        $scope.init = function() {
            if (!$scope.query) {
                $scope.query = {};
            }
            $scope.query.name = "";
            $scope.query.page = "0";
            $scope.query.size = "10";
            $scope.selectProvince = {};
            $scope.selectCity = {};
        }
        $scope.init();

        $scope.getList = function (status, productTemplateId) {
            if (status != undefined) {
                $scope.query.status = status;
            }
            if (productTemplateId != undefined) {
                $scope.query.productTemplateId = productTemplateId;
            }
            if ($scope.selectCity && $scope.selectCity.Id) {
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
                    $scope.curTab = $scope.productStatus[i];
                } else {
                    $scope.productStatus[i].on = false;
                }
            }
            httpService.listProduct($scope.query).then(function (result) {
                $scope.data = result.data;
            },function (error) {
                toaster.error(error.data.errorMessage);
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

        $scope.initTemplate = function() {
            $scope.query = {};
            $scope.query.name = "";
            $scope.query.page = "0";
            $scope.query.size = "10";
        };
        $scope.queryByCondition= function () {
            $scope.query.page = 0;
            $scope.query.size = 10;
            $scope.getList();
        };
        $scope.initTemplate();
        $scope.queryTemplateByCondition= function () {
            $scope.query.page = 0;
            $scope.query.size = 10;
            $scope.getTemplateList();
        };

        $scope.getTemplateList = function () {
            $scope.showEdit = true;
            httpService.listProductTemplate($scope.query).then(function (result) {
                $scope.data = result.data;
            },function (error) {
                toaster.error(error.data.errorMessage);
            });
        };

        return $scope;
    };


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

    return productFactoryApi;
});

product.controller("productTemplateController", function($scope, $http, $location, $rootScope, $state, httpService, productFactory, $window) {
    productFactory.initScope($scope, httpService);
    $scope.QueryPositonName = "";

    var hasRoleAuthority = function (roles, postAuthorities) {
        if (!roles) {
            return false;
        }
        if (!postAuthorities) {
            return false;
        }
        for (var i in postAuthorities) {
            if (roles.indexOf(postAuthorities[i].authority) >= 0) {
                return true;
            }
        }
        return false;
    }
    var user = JSON.parse($window.sessionStorage["userInfo"]);
    $scope.canEdit = hasRoleAuthority(["ROLE_ADMIN", "ROLE_PRODUCT_UPDATE"], user.data.postAuthorities);


    $scope.addProduct = function () {
        $state.go("main.addproductmanagement",{items:null});
    };
    $scope.edit = function (product) {
        $state.go("main.addproductmanagement",{items:JSON.stringify(product)});
    };
    $scope.getTemplateList();
});

product.controller("subProductController",function ($scope, $http, $location, $rootScope,httpService, $state, $timeout,cityJson, productFactory, toaster) {
    productFactory.initScope($scope, httpService);

    $scope.QueryPositonName = "";
    $scope.cities = cityJson;

    $scope.getList($scope.curTab.id, -1);

    $scope.add = function () {
        $state.go("main.addsubproduct");
    };

    $scope.edit = function (subproduct) {
        $state.go("main.editsubproduct",{items:subproduct});
    };

    $scope.review = function (subproduct) {
        $state.go("main.reviewsubproduct",{items:subproduct});
    };
    
    $scope.enableOrDisable = function (subproduct) {
        httpService.enableOrDisableProduct(subproduct.id, !subproduct.enabled).then(function () {
            toaster.success("操作成功");
            $scope.getList(1, -1);
        },function (err) {
            toaster.error(err.data.errorMessage);
        })
    }
});

product.controller("addProductTemplateController", function ($scope, $http, $location, $rootScope,httpService, $state, $timeout,cityJson, $stateParams, productFactory, toaster) {

    productFactory.initScope($scope, httpService);

    var selectedItem = JSON.parse($stateParams.items);

    if (selectedItem == null) {
        $scope.name = "";
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
        $scope.loanPolicy = $scope.loanPolicies[selectedItem.loanPolicy];
        $scope.availableTerms = productFactory.checkTerms(selectedItem.availableTerms);
        $scope.maxAvailableVehicleYear =selectedItem.maxAvailableVehicleYear;
    }

    $scope.commit = function () {
        $scope.product = {
            name:$scope.name,
            productType:$scope.selectedProductType.id,
            repaymentMethod:$scope.selectedPaybackType.id,
            minAvailableRate:$scope.minAvailableRate,
            maxAvailableRate:$scope.maxAvailableRate,
            availableTerms:productFactory.setTerms($scope.availableTerms),
            loanPolicy:$scope.loanPolicy.id,
            loanMonthlyInterestRate:$scope.loanMonthlyInterestRate,
            maxAvailableVehicleYear:$scope.maxAvailableVehicleYear,
            enabled:true
        };
        var response;
        if (selectedItem) {
            $scope.product.id = selectedItem.id;
            response = httpService.editProductTemplate($scope.product);
        } else {
            response = httpService.addProductTemplate($scope.product);
        }
        response.then(function (res) {
            toaster.success("保存成功");
            $state.go("main.productmanagement");
        },function (err) {
            toaster.error(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.productmanagement");
    }

});

product.controller("addSubProductController",function ($scope, $http, $location, $rootScope, httpService, $state, productFactory, cityJson, toaster) {
    $scope.cities = cityJson;

    productFactory.initScope($scope, httpService);

    $scope.getTemplateList();

    $scope.selectProduct = function () {
        $scope.availableTerms = productFactory.checkTerms($scope.selectedProduct.availableTerms);
    }

    $scope.commit = function () {
        $scope.product = {
            name:$scope.selectedProduct.name,
            productType:$scope.selectedProduct.productType,
            repaymentMethod:$scope.selectedProduct.repaymentMethod,
            minAvailableRate:$scope.selectedProduct.minAvailableRate,
            maxAvailableRate:$scope.selectedProduct.maxAvailableRate,
            availableTerms:productFactory.setTerms($scope.availableTerms),
            loanPolicy:$scope.selectedProduct.loanPolicy,
            loanMonthlyInterestRate:$scope.loanMonthlyInterestRate,
            cityId:$scope.selectCity.Id,
            productTemplateId:$scope.selectedProduct.id,
            maxAvailableVehicleYear:$scope.selectedProduct.maxAvailableVehicleYear,
            enabled:true,
            status:0
        };
        httpService.addProduct($scope.product).then(function () {
            toaster.success("保存成功");
            $state.go("main.subproductmanagement");
        },function (err) {
            toaster.error(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.subproductmanagement");
    }
});


product.controller("editSubProductController", function ($scope, $http, $location, $rootScope, httpService, $state, $timeout, cityJson, $stateParams, productFactory, toaster) {
    productFactory.initScope($scope, httpService);

    $scope.cities = cityJson;
    $scope.selectedProduct = $stateParams.items;
    $scope.availableTerms = productFactory.checkTerms($scope.selectedProduct.availableTerms);
    $scope.selectCity = cityJson.Citys[$scope.selectedProduct.cityId-1];
    $scope.selectProvince = cityJson.provincesList[cityJson.Citys[$scope.selectedProduct.cityId-1].ProvinceId-1];

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
            maxAvailableVehicleYear:$scope.selectedProduct.maxAvailableVehicleYear,
            enabled:true,
            status:0
        };
        httpService.editProduct($scope.product).then(function () {
            toaster.success("保存成功");
            $state.go("main.subproductmanagement");
        },function (err) {
            toaster.error(err.data.errorMessage);
        })

    };
    $scope.cancel = function () {
        $state.go("main.subproductmanagement");
    }
});

product.controller("reviewSubProductController", function ($scope, $http, $location, $rootScope, httpService, $state, $timeout, cityJson, $stateParams, productFactory, toaster) {
    productFactory.initScope($scope, httpService);

    $scope.cities = cityJson;
    $scope.selectedProduct = $stateParams.items;

    $scope.reviewSubProduct = function (status) {
        if(status==2 && !$scope.remark){
            toaster.error("请填写备注");
            return;
        }
        var subProductStatus = {
            id: $scope.selectedProduct.id,
            status: status,
            remark: $scope.remark
        };
        httpService.patchProduct(subProductStatus).then(function () {
            toaster.success("审核成功");
            $state.go("main.subproductmanagement");
        },function (err) {
            toaster.error(err.data.errorMessage);
        })
    };
});
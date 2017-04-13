'use strict';

var app = angular.module('app', ['image-upload', 'ui.router','angularFileUpload','angularTreeview','city','login','main','man','footer','ngThumb','product','positon','dept',
    'lending','loanpreliminary','ADM-dateTimePicker','commonUtil','carpricing','loanrecheck','sign','toaster','mortgage']);

app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: '/pages/login.html',
        controller: 'LoginController'
    }).state("main",{
        url: "/main",
        templateUrl: '/pages/main.html'
        }

    ).state("main.mainpage",{
        url:"/mainpage",
        templateUrl:'/pages/index-content.html'
    }).state("main.manmanagement",{
        url:"/manmanagement",
        templateUrl:'/pages/man/man-management.html'
    }).state("main.manpassword",{
        url:"/manpassword",
        templateUrl:'/pages/man/man-password.html'
    }).state("main.addmanmanagement",{
        url:"/addmanmanagement",
        templateUrl:'/pages/man/man-add.html',
        params:{
            "items":null
        }
    }).state("main.productmanagement", {
        url:"/productmanagement",
        templateUrl:"/pages/product/product-manage.html"
        }
    ).state("main.subproductmanagement", {
            url:"/subproductmanagement",
            templateUrl:"/pages/product/sub-product.html"
        }
    ).state("main.addproductmanagement", {
            url:"/addproductmanagement",
            templateUrl:"/pages/product/product-add.html",
            params:{
                "items":null
            }
        }
    ).state("main.addsubproduct", {
            url:"/addsubproduct",
            templateUrl:"/pages/product/sub-product-add.html"
        }
    ).state("main.editsubproduct", {
            url:"/editsubproduct",
            templateUrl:"/pages/product/sub-product-edit.html",
            params:{
                "items":null
            }
        }
    ).state("main.reviewsubproduct", {
            url:"/reviewsubproduct",
            templateUrl:"/pages/product/sub-product-review.html",
            params:{
                "items":null
            }
        }
    ).state("main.positionmanagement", {
            url:"/positionmanagement",
            templateUrl:"/pages/position/position-management.html"
        }
    ).state("main.addpositionmanagement", {
            url:"/addpositionmanagement",
            templateUrl:"/pages/position/position-add.html",
            params:{
                "items":null
            }
        }
    ).state("main.deptmanagement", {
            url:"/deptmanagement",
            templateUrl:"/pages/dept/dept-management.html"
        }
    ).state("main.deptmanagement.edit", {
            url:"/deptmanagementedit",
            templateUrl:"/pages/dept/dept-edit.html"
        }
    ).state("main.deptmanagement.add", {
            url:"/deptmanagementadd",
            templateUrl:"/pages/dept/dept-add.html"
        }
    ).state("main.loanpreliminary",{
            url:"/loanpreliminary",
            templateUrl:"/pages/loanpreliminary/loanpreliminary-list.html"
        }
    ).state("main.loanapply",{
            url:"/loanapply",
            templateUrl:"/pages/loanpreliminary/loanapply.html",
            params:{
                "items":null,
                "type":null
            }
        }
    ).state("main.eidtloanapply",{
            url:"/eidtloanapply",
            templateUrl:"/pages/loanpreliminary/edit-loanapply.html",
            params:{
                "items":null
            }
        }
    ).state("main.carpricinglist",{
            url:"/carpricinglist",
            templateUrl:"/pages/carpricing/car-pricing-list.html"
        }
    ).state("main.setpricelist",{
            url:"/setpricelist",
            templateUrl:"/pages/carpricing/set-price.html",
        params:{
            "items":null
        }
        }
    ).state("main.loanrecheck",{
            url:"/loanrecheck",
            templateUrl:"/pages/loanrecheck/loan-recheck-list.html"
        }
    ).state("main.checkloan",{
            url:"/checkloan",
            templateUrl:"/pages/loanrecheck/check-loan.html",
            params:{
                "items":null
            }
        }
    ).state("main.reapplyloan",{
            url:"/reapplyloan",
            templateUrl:"/pages/loanrecheck/reapply-loan.html",
            params:{
                "items":null
            }
        }
    ).state("main.signmanagement",{
            url:"/signmanagement",
            templateUrl:"/pages/sign/sign-list.html"
        }
    ).state("main.eiditSign",{
            url:"/eiditSign",
            templateUrl:"/pages/sign/sign-edit.html",
            params:{
                "items":null
            }
        }
    ).state("main.giveuplist",{
            url:"/giveuplist",
            templateUrl:"/pages/sign/giveup-list.html"
        }
    ).state("main.eiditGiveup",{
            url:"/eiditGiveup",
            templateUrl:"/pages/sign/giveup-edit.html",
            params:{
                "items":null
            }
        }
    ).state("main.afterTransferLoanList",{
            url:"/afterTransferLoanList",
            templateUrl:"/pages/lending/transfer-list.html"
        }
    ).state("main.uploadTransferResult",{
            url:"/uploadTransferResult",
            templateUrl:"/pages/lending/transfer-edit.html",
            params:{
                "items":null
            }
        }
    ).state("main.checkTransferResult",{
            url:"/checkTransferResult",
            templateUrl:"/pages/lending/check-transfer.html",
            params:{
                "items":null
            }
        }
    ).state("main.afterMortgageLoanList",{
            url:"/afterMortgageLoanList",
            templateUrl:"/pages/lending/mortgage-list.html"
        }
    ).state("main.uploadMortgageResult",{
            url:"/uploadMortgageResult",
            templateUrl:"/pages/lending/mortgage-edit.html",
            params:{
                "items":null
            }
        }
    ).state("main.checkMortgageResult",{
            url:"/checkMortgageResult",
            templateUrl:"/pages/lending/check-mortgage.html",
            params:{
                "items":null
            }
        }
    );
    $urlRouterProvider.otherwise('/login');

});

// app.controller('NavController', ['$scope', '$rootScope', '$route', function ($scope, $rootScope, $route) {
//     $rootScope.route = $route;
//     $rootScope.isLogin = false;
// }]);
//

app.factory('sessionInjector', function ($rootScope, $window, $q, $injector, toaster) {
    var sessionInjector = {
        // request: function(config){
        //     var userInfo = $window.sessionStorage['userInfo'];
        //     console.log(userInfo);
        //     console.log(config);
        //     if (!$rootScope.isLogin){
        //         return config;
        //     }
        //     var userInfoObj = JSON.parse(userInfo);
        //     if(userInfoObj.data.access_token){
        //         config.headers['token'] = userInfoObj.data.access_token;
        //     }
        //     return config;
        // },
        responseError: function(response) {
            // TODO: why response status is -1
            // if (response.status == 401 || response.status == -1) {
            if (response.status == 401) {
                var $state = $injector.get('$state');
                toaster.error("未登录授权");
                return $state.go('login');
            }
            return $q.reject(response);
        }
    };

    return sessionInjector;
});

app.config(['$httpProvider',function ($httpProvider) {
    console.log($httpProvider);
    $httpProvider.interceptors.push('sessionInjector');
}]);


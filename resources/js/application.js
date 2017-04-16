'use strict';

var app = angular.module('app', ['image-upload', 'ui.router','angularFileUpload','angularTreeview','city','login','main','man','footer','ngThumb','product','positon','dept',
    'lending','loanpreliminary','ADM-dateTimePicker','commonUtil','carpricing','loanrecheck','sign','toaster','mortgage','ncy-angular-breadcrumb']);

app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state("login", {
        url: "/login",
        templateUrl: '/pages/login.html',
        controller: 'LoginController'
    }).state("main",{
        url: "/main",
        templateUrl: '/pages/main.html',
        ncyBreadcrumb: {
            skip: true
        }
        }

    ).state("main.mainpage",{
        url:"/mainpage",
        templateUrl:'/pages/index-content.html',
        ncyBreadcrumb: {
            label: '主页'
        }
    }).state("main.manmanagement",{
        url:"/manmanagement",
        templateUrl:'/pages/man/man-management.html',
        ncyBreadcrumb: {
            label: '人员管理',
            parent:'main.mainpage'
        }
    }).state("main.manpassword",{
        url:"/manpassword",
        templateUrl:'/pages/man/man-password.html',
        ncyBreadcrumb: {
            label: '修改密码',
            parent:'main.mainpage'
        }
    }).state("main.addmanmanagement",{
        url:"/addmanmanagement",
        templateUrl:'/pages/man/man-add.html',
        params:{
            "items":null
        },
        ncyBreadcrumb: {
            label: '编辑人员',
            parent:'main.manmanagement'
        }
    }).state("main.productmanagement", {
        url:"/productmanagement",
        templateUrl:"/pages/product/product-manage.html" ,
        ncyBreadcrumb: {
            label: '产品管理',
            parent:'main.mainpage'
        }
        }
    ).state("main.subproductmanagement", {
            url:"/subproductmanagement",
            templateUrl:"/pages/product/sub-product.html",
            ncyBreadcrumb: {
                label: '产品地域策略管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.addproductmanagement", {
            url:"/addproductmanagement",
            templateUrl:"/pages/product/product-add.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '添加产品',
                parent:'main.productmanagement'
            }
        }
    ).state("main.addsubproduct", {
            url:"/addsubproduct",
            templateUrl:"/pages/product/sub-product-add.html",
            ncyBreadcrumb: {
                label: '添加产品地域策略',
                parent:'main.subproductmanagement'
            }
        }
    ).state("main.editsubproduct", {
            url:"/editsubproduct",
            templateUrl:"/pages/product/sub-product-edit.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '编辑产品地域策略',
                parent:'main.subproductmanagement'
            }
        }
    ).state("main.reviewsubproduct", {
            url:"/reviewsubproduct",
            templateUrl:"/pages/product/sub-product-review.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '查看产品地域策略',
                parent:'main.subproductmanagement'
            }
        }
    ).state("main.positionmanagement", {
            url:"/positionmanagement",
            templateUrl:"/pages/position/position-management.html",
            ncyBreadcrumb: {
                label: '岗位管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.addpositionmanagement", {
            url:"/addpositionmanagement",
            templateUrl:"/pages/position/position-add.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '添加岗位',
                parent:'main.positionmanagement'
            }
        }
    ).state("main.deptmanagement", {
            url:"/deptmanagement",
            templateUrl:"/pages/dept/dept-management.html",
            ncyBreadcrumb: {
                label: '部门管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.deptmanagement.edit", {
            url:"/deptmanagementedit",
            templateUrl:"/pages/dept/dept-edit.html",
            ncyBreadcrumb: {
                label: '编辑部门'
            }
        }
    ).state("main.deptmanagement.add", {
            url:"/deptmanagementadd",
            templateUrl:"/pages/dept/dept-add.html",
            ncyBreadcrumb: {
                label: '添加部门'
            }
        }
    ).state("main.loanpreliminary",{
            url:"/loanpreliminary",
            templateUrl:"/pages/loanpreliminary/loanpreliminary-list.html",
            params:{
                "subTabs":null
            },
            ncyBreadcrumb: {
                label: '预审',
                parent:'main.mainpage'
            }
        }
    ).state("main.loanapply",{
            url:"/loanapply",
            templateUrl:"/pages/loanpreliminary/loanapply.html",
            params:{
                "items":null,
                "type":null
            },
            ncyBreadcrumb: {
                label: '申请贷款',
                parent:'main.loanpreliminary'
            }
        }
    ).state("main.eidtloanapply",{
            url:"/eidtloanapply",
            templateUrl:"/pages/loanpreliminary/edit-loanapply.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '编辑贷款',
                parent:'main.loanpreliminary'
            }
        }
    ).state("main.carpricinglist",{
            url:"/carpricinglist",
            templateUrl:"/pages/carpricing/car-pricing-list.html",
            ncyBreadcrumb: {
                label: '定价列表',
                parent:'main.mainpage'
            }
        }
    ).state("main.setpricelist",{
            url:"/setpricelist",
            templateUrl:"/pages/carpricing/set-price.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '定价',
                parent:'main.carpricinglist'
            }
        }
    ).state("main.loanrecheck",{
            url:"/loanrecheck",
            templateUrl:"/pages/loanrecheck/loan-recheck-list.html",
            ncyBreadcrumb: {
                label: '复审',
                parent:'main.mainpage'
            }
        }
    ).state("main.checkloan",{
            url:"/checkloan",
            templateUrl:"/pages/loanrecheck/check-loan.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '审核',
                parent:'main.loanrecheck'
            }
        }
    ).state("main.reapplyloan",{
            url:"/reapplyloan",
            templateUrl:"/pages/loanrecheck/reapply-loan.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '重新申请',
                parent:'main.loanrecheck'
            }
        }
    ).state("main.signmanagement",{
            url:"/signmanagement",
            templateUrl:"/pages/sign/sign-list.html",
            ncyBreadcrumb: {
                label: '签约管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.eiditSign",{
            url:"/eiditSign",
            templateUrl:"/pages/sign/sign-edit.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '编辑签约',
                parent:'main.signmanagement'
            }
        }
    ).state("main.giveuplist",{
            url:"/giveuplist",
            templateUrl:"/pages/sign/giveup-list.html",
            ncyBreadcrumb: {
                label: '放弃签约',
                parent:'main.signmanagement'
            }
        }
    ).state("main.eiditGiveup",{
            url:"/eiditGiveup",
            templateUrl:"/pages/sign/giveup-edit.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '编辑放弃签约',
                parent:'main.giveuplist'
            }
        }
    ).state("main.afterTransferLoanList",{
            url:"/afterTransferLoanList",
            templateUrl:"/pages/lending/transfer-list.html",
            ncyBreadcrumb: {
                label: '过户后放款管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.uploadTransferResult",{
            url:"/uploadTransferResult",
            templateUrl:"/pages/lending/transfer-edit.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '上传过户材料',
                parent:'main.afterTransferLoanList'
            }
        }
    ).state("main.checkTransferResult",{
            url:"/checkTransferResult",
            templateUrl:"/pages/lending/check-transfer.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '过户详情',
                    parent:'main.afterTransferLoanList'
            }
        }
    ).state("main.afterMortgageLoanList",{
            url:"/afterMortgageLoanList",
            templateUrl:"/pages/lending/mortgage-list.html",
            ncyBreadcrumb: {
                label: '抵押后放款管理',
                parent:'main.mainpage'
            }
        }
    ).state("main.uploadMortgageResult",{
            url:"/uploadMortgageResult",
            templateUrl:"/pages/lending/mortgage-edit.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '上传抵押材料',
                parent:'main.afterMortgageLoanList'
            }
        }
    ).state("main.checkMortgageResult",{
            url:"/checkMortgageResult",
            templateUrl:"/pages/lending/check-mortgage.html",
            params:{
                "items":null
            },
            ncyBreadcrumb: {
                label: '抵押详情',
                parent:'main.afterMortgageLoanList'
            }
        }
    );
    $urlRouterProvider.otherwise('/login');

});
app.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<div class="bread"><a href="{{step.ncyBreadcrumbLink}}" ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</a>&gt;</div>'

    });
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


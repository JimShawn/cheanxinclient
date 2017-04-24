var authors = angular.module('main', []);

authors.controller('MainController', function($scope, $http, $location, $rootScope, $state, httpService, $window, $interval, toaster) {
    if (!window.sessionStorage.currentItemIndex) {
        window.sessionStorage.currentItemIndex = 0;
    }
    if (!window.sessionStorage.currentSubItemIndex) {
        window.sessionStorage.currentSubItemIndex = 0;
    }
    $scope.$watch('$viewContentLoaded', function() {
        var winWid=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var winHei=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var frameLeftWid=$('.frameLeft').width();
        var headerHei=$('.header').height();
        var breadHei=$('.bread').height();
        $('.frameRight').css({'width':(winWid-frameLeftWid)+'px'});
        $('.mainContent').css({'height':(winHei-headerHei)+'px'});
        $('.frameBox').css({'height':(winHei-headerHei-breadHei)+'px'});
    });
    var user = JSON.parse($window.sessionStorage["userInfo"]);
    $scope.userName = user.data.realName;
    $interval(function(){
        var now=new Date();
        var year=now.getFullYear();
        var month=now.getMonth()+1;
        var day=now.getDate();
        var hours=now.getHours();
        var minutes=now.getMinutes();
        var seconds=now.getSeconds();
        if(month<10){
            month = 0+""+month;
        }
        if(day<10){
            day = 0+""+day;
        }
        if(hours<10){
            hours = 0+""+hours;
        }
        if(minutes<10){
            minutes = 0+""+minutes;
        }
        if(seconds<10){
            seconds = 0+""+seconds;
        }
        $scope.nowTime = year+"-"+month+"-"+day+"   "+hours+":"+minutes+":"+seconds;
    },1000);

    var preliminaryTabs = [
        {
            name:"草稿箱",
            review:false,
            edit:false,
            show:false,
            highlight:true,
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_UPDATE"],
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_READ"],
            status:"1"
        },
        {
            name:"待审核",
            review:false,
            edit:false,
            show:false,
            highlight:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_REVIEW"],
            status:"2"
        },
        {
            name:"退回待修改",
            review:false,
            edit:false,
            show:false,
            highlight:false,
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_UPDATE"],
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_READ"],
            status:"9"
        },
        {
            name:"审核通过",
            review:false,
            edit:false,
            show:false,
            highlight:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_READ", "ROLE_FIRST_REVIEWER"],
            status:"3"
        },
        {
            name:"审核拒绝",
            review:false,
            edit:false,
            show:false,
            highlight:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_READ"],
            status:"0"
        }
    ];
    var priceTabs = [
        {
            name:"待定价",
            review:false,
            edit:false,
            show:false,
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_UPDATE"],
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ", "ROLE_APPRAISER"],
            status:"3"
        },
        {
            name:"已定价",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ", "ROLE_APPRAISER"],
            status:"4"
        }
    ];
    var recheckTabs = [
        {
            name:"待审核",
            review:false,
            edit:false,
            show:false,
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_REVIEW"],
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
            status:"4,10,12"
        },
        {
            name:"复审通过",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
            status:"6"
        },
        {
            name:"复审拒绝",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_UPDATE"],
            status:"5"
        },
        {
            name:"客户放弃",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
            status:"15"
        },
        {
            name:"复审未通过",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
            status:"11"
        },
    ];
    var signTabs = [
        {
            name:"待签约",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_READ"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_REVIEW"],
            status:"6"
        },
        // {
        //     name:"退回待修改",
        //     review:false,
        //     edit:false,
        //     show:false,
        //     showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_READ"],
        //     reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_REVIEW"],
        //     status:"1"
        // },
        {
            name:"待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_READ"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_REVIEW"],
            status:"37"
        },
        {
            name:"已审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_READ", "ROLE_FIRST_REVIEWER"],
            status:"8,25"
        }
    ];
    var giveupTabs = [
        {
            name:"待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_REVIEW"],
            status:"17"
        },
        {
            name:"已放弃",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
            status:"16"
        }
    ];
    var transferTabs = [
        {
            name:"待过户",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_UPDATE"],
            status:"8"
        },
        {
            name:"退回待修改",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_UPDATE"],
            status:"21"
        },
        {
            name:"过户待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_READ", "ROLE_FIRST_REVIEWER"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_REVIEW"],
            status:"22,32"
        },
        {
            name:"待放款",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_UPDATE_READ", "ROLE_FIRST_REVIEWER"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_UPDATE"],
            status:"23"
        },
        {
            name:"已放款",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ", "ROLE_FINANCE"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_UPDATE"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_UPDATE"],
            status:"24"
        },
        {
            name:"抵押待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_READ", "ROLE_FIRST_REVIEWER"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_REVIEW"],
            status:"38"
        },
        {
            name:"无法过户待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_ABORT_READ"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_ABORT_REVIEW"],
            status:"19"
        },
        {
            name:"无法过户已确认",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_ABORT_READ"],
            status:"20"
        },
        {
            name:"待还款",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_READ", "ROLE_FIRST_REVIEWER"],
            status:"31"
        }
    ];
    var mortgageTabs = [
        {
            name:"待办理",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_UPDATE"],
            status:"25"
        },
        {
            name:"退回待修改",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_UPDATE"],
            status:"28"
        },
        {
            name:"过户抵押待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW_READ", "ROLE_FIRST_REVIEWER"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW"],
            status:"29,33"
        },
        {
            name:"待放款",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ", "ROLE_FIRST_REVIEWER"],
            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_UPDATE"],
            status:"30"
        },
        {
            name:"已放款",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_READ", "ROLE_FINANCE"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_UPDATE"],
            status:"36"
        },
        {
            name:"无法办理待审核",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_ABORT_READ"],
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_ABORT_REVIEW"],
            status:"26"
        },
        {
            name:"无法办理已确认",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_ABORT_READ"],
            status:"27"
        }
    ];
    var productTabs = [
        {
            name:"待审核",
            review:false,
            edit:false,
            show:false,
            editRoles:["ROLE_ADMIN", "ROLE_PRODUCT_UPDATE"],
            reviewRoles:["ROLE_ADMIN", "ROLE_PRODUCT_REVIEW"],
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ"],
            status:"0"
        },
        {
            name:"审核通过",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ", "ROLE_PRODUCT_CITY_READ", "ROLE_FIRST_REVIEWER", "ROLE_SECOND_REVIEWER"],
            status:"1"
        },
        {
            name:"审核拒绝",
            review:false,
            edit:false,
            show:false,
            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ"],
            status:"2"
        }
    ];
    $scope.menuItems = [
        {
            name: "贷款申请",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"贷款申请",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_UPDATE"],
                    show:false,
                    highlight:false,
                    page:"main.loanapply",
                    subTabs:[
                        {
                            review:false,
                            edit:false,
                            show:false
                        }
                    ]
                }
            ]
        },
        {
            name: "贷前审批",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"贷款预审",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_DRAFT_READ", "ROLE_LOAN_FIRST_READ"],
                    show:false,
                    highlight:false,
                    page:"main.loanpreliminary",
                    subTabs: preliminaryTabs
                },
                {
                    name:"车辆定价",
                    show:false,
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ", "ROLE_APPRAISER"],
                    highlight:false,
                    page:"main.carpricinglist",
                    subTabs:priceTabs
                },
                {
                    name:"贷款复审",
                    show:false,
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                    highlight:false,
                    page:"main.loanrecheck",
                    subTabs:recheckTabs
                }
            ]
        },
        {
            name: "签约管理",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"签约管理",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_READ", "ROLE_LOAN_CONTRACT_ACCEPT_READ", "ROLE_LOAN_CONTRACT_READ", "ROLE_LOAN_CONTRACT_ACCEPT_READ", "ROLE_LOAN_CONTRACT_ABORT_READ"],
                    show:false,
                    highlight:false,
                    page:"main.signmanagement",
                    subTabs:signTabs
                },
                {
                    name:"客户放弃签约",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
                    show:false,
                    highlight:false,
                    page:"main.giveuplist",
                    subTabs:giveupTabs
                }
            ]
        },
        {
            name: "放款管理",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"过户后放款",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ", "ROLE_LOAN_RELEASE_READ", "ROLE_LOAN_TRANSFER_ABORT_READ", "ROLE_LOAN_RELEASE_UPDATE_READ", "ROLE_LOAN_RELEASE_MORTGAGE_READ", "ROLE_FIRST_REVIEWER"],
                    show:false,
                    highlight:false,
                    page:"main.afterTransferLoanList",
                    subTabs:transferTabs
                },
                {
                    name:"抵押后放款",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW_READ", "ROLE_LOAN_MORTGAGE_ABORT_READ", "ROLE_LOAN_MORTGAGE_RELEASE_READ", "ROLE_FIRST_REVIEWER"],
                    show:false,
                    highlight:false,
                    page:"main.afterMortgageLoanList",
                    subTabs:mortgageTabs
                }
            ]
        },
        {
            name: "系统管理",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"组织管理",
                    showRoles:["ROLE_ADMIN"],
                    show:false,
                    highlight:false,
                    page:"main.deptmanagement",
                    subTabs:[
                        {
                            review:false,
                            edit:false,
                            show:false,
                        }
                    ]
                },
                {
                    name:"岗位管理",
                    showRoles:["ROLE_ADMIN"],
                    show:false,
                    highlight:false,
                    page:"main.positionmanagement",
                    subTabs:[
                        {
                            review:false,
                            edit:false,
                            show:false,
                        }
                    ]
                },
                {
                    name:"人员管理",
                    showRoles:["ROLE_ADMIN"],
                    show:false,
                    highlight:false,
                    page:"main.manmanagement",
                    subTabs:[
                        {
                            review:false,
                            edit:false,
                            show:false,
                        }
                    ]
                }
            ]
        },
        {
            name: "产品管理",
            show:false,
            expand:false,
            subItems:[
                {
                    name:"产品模板管理",
                    showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_TEMPLATE_READ"],
                    show:false,
                    highlight:false,
                    page:"main.productmanagement",
                    subTabs:[
                        {
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_TEMPLATE_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_PRODUCT_TEMPLATE_UPDATE"]
                        }
                    ]
                },
                {
                    name:"产品地域策略",
                    show:false,
                    showRoles:["ROLE_PRODUCT_READ", "ROLE_ADMIN", "ROLE_PRODUCT_CITY_READ", "ROLE_FIRST_REVIEWER", "ROLE_SECOND_REVIEWER"],
                    highlight:false,
                    page:"main.subproductmanagement",
                    subTabs:productTabs
                }
            ]
        }
    ];

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

    for (var i = 0; i < $scope.menuItems.length; i++) {
        for (var j = 0; j < $scope.menuItems[i].subItems.length; j++) {
            var hasSubItemShowAuthority = hasRoleAuthority($scope.menuItems[i].subItems[j].showRoles, user.data.postAuthorities);
            $scope.menuItems[i].subItems[j].show = hasSubItemShowAuthority;
            if (!$scope.menuItems[i].show && hasSubItemShowAuthority) {
                $scope.menuItems[i].show = true;
            }
            for (var k = 0; k < $scope.menuItems[i].subItems[j].subTabs.length; k++) {
                var hasTabShowAuthority = hasRoleAuthority($scope.menuItems[i].subItems[j].subTabs[k].showRoles, user.data.postAuthorities);
                $scope.menuItems[i].subItems[j].subTabs[k].show = hasTabShowAuthority;
                var hasTabEditAuthority = hasRoleAuthority($scope.menuItems[i].subItems[j].subTabs[k].editRoles, user.data.postAuthorities);
                $scope.menuItems[i].subItems[j].subTabs[k].edit = hasTabEditAuthority;
                var hasTabReviewAuthority = hasRoleAuthority($scope.menuItems[i].subItems[j].subTabs[k].reviewRoles, user.data.postAuthorities);
                $scope.menuItems[i].subItems[j].subTabs[k].review = hasTabReviewAuthority;
            }
        }
    }

    $scope.changeItem = function (i, j) {
        for(var k = 0; k < $scope.menuItems.length; k++) {
            for (var l = 0; l < $scope.menuItems[k].subItems.length; l++) {
                if (i == k && l == j) {
                    $window.sessionStorage.currentItemIndex = k;
                    $window.sessionStorage.currentSubItemIndex = l;
                    $scope.subItem = $scope.menuItems[k].subItems[l];
                    $scope.menuItems[k].subItems[l].highlight = true;
                    $state.go($scope.subItem.page, {subTabs:$scope.subItem.subTabs});
                } else {
                    $scope.menuItems[k].subItems[l].highlight = false;
                }
            }
        }
    }

    for(var k = 0; k < $scope.menuItems.length; k++) {
        for (var l = 0; l < $scope.menuItems[k].subItems.length; l++) {
            $scope.menuItems[k].subItems[l].highlight = false;
        }
    }
    $scope.subItem = $scope.menuItems[$window.sessionStorage.currentItemIndex].subItems[$window.sessionStorage.currentSubItemIndex];
    $scope.subItem.highlight = true;
    $state.go($scope.subItem.page, {subTabs:$scope.subItem.subTabs});

    $window.sessionStorage['preliminaryTabs'] = JSON.stringify(preliminaryTabs);
    $window.sessionStorage['priceTabs'] = JSON.stringify(priceTabs);
    $window.sessionStorage['recheckTabs'] = JSON.stringify(recheckTabs);
    $window.sessionStorage['signTabs'] = JSON.stringify(signTabs);
    $window.sessionStorage['giveupTabs'] = JSON.stringify(giveupTabs);
    $window.sessionStorage['transferTabs'] = JSON.stringify(transferTabs);
    $window.sessionStorage['mortgageTabs'] = JSON.stringify(mortgageTabs);
    $window.sessionStorage['productTabs'] = JSON.stringify(productTabs);

    $scope.logout = function () {
        httpService.logout().then(function () {
            toaster.success("您已安全退出");
            $state.go("login");
        },function (err) {
            toaster.error(err.data.errorMessage);
        });
    };
});
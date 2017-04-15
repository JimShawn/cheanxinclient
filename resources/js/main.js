var authors = angular.module('main', []);

authors.controller('MainController', function($scope, $http, $location, $rootScope, $state, httpService, $window, $interval, toaster) {
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
            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_REVIEW"],
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
            showRoles:["ROLE_ADMIN", "ROLE_LOAN_FIRST_READ"],
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
    $window.sessionStorage['preliminaryTabs'] = JSON.stringify(preliminaryTabs);
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

    // $scope.menuItems = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];
    // $scope.changeItem = function (i) {
    //     for (var j=0;j<$scope.menuItems.length;j++){
    //         if(i==j){
    //             $scope.menuItems[j] = true;
    //         }else{
    //             $scope.menuItems[j] = false;
    //         }
    //     }
    // }

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
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ"],
                    highlight:false,
                    page:"main.carpricinglist",
                    subTabs:[
                        {
                            name:"待定价",
                            review:false,
                            edit:false,
                            show:false,
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_UPDATE"],
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ"],
                            status:"0"
                        },
                        {
                            name:"已定价",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_PRICE_READ"],
                            status:"1"
                        }
                    ]
                },
                {
                    name:"贷款复审",
                    show:false,
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                    highlight:false,
                    page:"main.loanrecheck",
                    subTabs:[
                        {
                            name:"待审核",
                            review:false,
                            edit:false,
                            show:false,
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_REVIEW"],
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                            status:"0"
                        },
                        {
                            name:"复审通过",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                            status:"1"
                        },
                        {
                            name:"复审拒绝",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                            status:"1"
                        },
                        {
                            name:"客户放弃",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_SECOND_READ"],
                            status:"1"
                        }
                    ]
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
                    subTabs:[
                        {
                            name:"待签约",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"退回待修改",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"待审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"已审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ACCEPT_READ"],
                            status:"1"
                        }
                    ]
                },
                {
                    name:"客户放弃签约",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
                    show:false,
                    highlight:false,
                    page:"main.giveuplist",
                    subTabs:[
                        ,
                        {
                            name:"待审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"已放弃",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_CONTRACT_ABORT_READ"],
                            status:"1"
                        }
                    ]
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
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ", "ROLE_LOAN_RELEASE_READ", "ROLE_LOAN_TRANSFER_ABORT_READ", "ROLE_LOAN_RELEASE_UPDATE_READ", "ROLE_LOAN_RELEASE_MORTGAGE_READ"],
                    show:false,
                    highlight:false,
                    page:"main.afterTransferLoanList",
                    subTabs:[
                        {
                            name:"待过户",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"退回待修改",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"待审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"待放款",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_UPDATE_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"已放款",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"抵押材料待审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_RELEASE_MORTGAGE_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"无法过户",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_ABORT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_TRANSFER_ABORT_REVIEW"],
                            status:"1"
                        }
                    ]
                },
                {
                    name:"抵押后放款",
                    showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW_READ", "ROLE_LOAN_MORTGAGE_ABORT_READ", "ROLE_LOAN_MORTGAGE_RELEASE_READ"],
                    show:false,
                    highlight:false,
                    page:"main.afterMortgageLoanList",
                    subTabs:[
                        {
                            name:"待办理",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"退回待修改",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"待审核",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_REVIEW"],
                            status:"1"
                        },
                        {
                            name:"待放款",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_READ"],
                            editRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_RELEASE_UPDATE"],
                            status:"1"
                        },
                        {
                            name:"已放款",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_READ"],
                            status:"1"
                        },
                        {
                            name:"无法办理",
                            review:false,
                            edit:false,
                            show:false,
                            showRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_ABORT_READ"],
                            reviewRoles:["ROLE_ADMIN", "ROLE_LOAN_MORTGAGE_ABORT_REVIEW"],
                            status:"1"
                        }
                    ]
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
                    showRoles:["ROLE_PRODUCT_READ", "ROLE_ADMIN"],
                    highlight:false,
                    page:"main.subproductmanagement",
                    subTabs:[
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
                            showRoles:["ROLE_ADMIN", "ROLE_PRODUCT_READ"],
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
                    ]
                }
            ]
        }
    ];

    for (var i = 0; i < $scope.menuItems.length; i++) {
        for (var j = 0; j < $scope.menuItems[i].subItems.length; j++) {
            var showRoles = $scope.menuItems[i].subItems[j].showRoles;
            if (!showRoles) {
                continue;
            }
            if (!user.data.postAuthorities) {
                continue;
            }
            for (var k in user.data.postAuthorities) {
                if (showRoles.indexOf(user.data.postAuthorities[k].authority) >= 0) {
                    $scope.menuItems[i].subItems[j].show = true;
                    $scope.menuItems[i].show = true;
                    continue;
                }
            }
        }
    }

    $scope.changeItem = function (i, j) {
        for(var k = 0; k < $scope.menuItems.length; k++) {
            for (var l = 0; l < $scope.menuItems[k].subItems.length; l++) {
                if (i == k && l == j) {
                    $scope.subItem = $scope.menuItems[k].subItems[l];
                    $scope.subItem.highlight = true;
                    $state.go($scope.subItem.page, {subTabs:$scope.subItem.subTabs});
                } else {
                    $scope.menuItems[k].subItems[l].highlight = false;
                }
            }
        }
    }

    // $scope.manManagement = function () {//切换到人员管理页面
    //     $state.go("main.manmanagement");
    // };
    // $scope.productManagement =function () {
    //     $state.go("main.productmanagement");
    // };
    // $scope.subProductManagement =function () {
    //     $state.go("main.subproductmanagement");
    // };
    // $scope.positionManagement =function () {
    //     $state.go("main.positionmanagement");
    // };
    // $scope.deptManagement = function () {
    //     $state.go("main.deptmanagement");
    // };
    // $scope.LoanPreliminary = function () {
    //     $state.go("main.loanpreliminary");
    // };
    // $scope.setPricing = function () {
    //     $state.go("main.carpricinglist");
    // };
    // $scope.loanRecheck = function () {
    //     $state.go("main.loanrecheck");
    // };
    // $scope.signManagement = function () {
    //     $state.go("main.signmanagement");
    // };
    // $scope.giveupList = function () {
    //     $state.go("main.giveuplist");
    // };
    // $scope.afterTransfer = function () {
    //     $state.go("main.afterTransferLoanList");
    // };
    // $scope.afterMortgage = function () {
    //     $state.go("main.afterMortgageLoanList");
    // };


    $scope.logout = function () {
        httpService.logout().then(function () {
            toaster.success("您已安全退出");
            $state.go("login");
        },function (err) {
            toaster.error(err.data.errorMessage);
        });
    };
});
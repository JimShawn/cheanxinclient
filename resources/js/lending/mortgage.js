/**
 * Created by 向麒 on 2017/4/12.
 * 抵押放款管理
 */
'use strict';
var mortgage = angular.module('mortgage',['httpservice']);
mortgage.controller("afterMortgageListController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','cityJson','commonUtil',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,cityJson,commonUtil) {

    $scope.cityJson = cityJson;
    $scope.commonUtil = commonUtil;
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
        }
    ];
    $scope.getList = function (page,size,status) {
        httpService.getLoanPreliminary(page,size,status).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10,25);//抵押后放款
    $scope.tab = 8;
    $scope.goToTab = function (tabNo) {
        $scope.tab = tabNo;
        $scope.getList(0,10,tabNo);
    }

    $scope.changePageSizeFun = function (size) {
        $scope.query.page = $scope.data.number;
        $scope.query.size = size;
        $scope.getList($scope.data.number,size,$scope.tab);
    };

    $scope.gotoPageFun = function (x) {
        $scope.query.page = x;
        $scope.query.size = $scope.data.size;
        $scope.getList(x,$scope.data.size,$scope.tab);
    };
    $scope.uploadLendingResult = function (loan) {

        $state.go("main.uploadTransferResult",{items:loan});
    };
    $scope.check = function (loan) {
        $state.go("main.checkTransferResult",{items:loan});
    };
    $scope.lending = function (loan) {
        $state.go("main.checkTransferResult",{items:loan});
    };
    $scope.uploadMortgageResult = function (loan) {
        $state.go("main.checkTransferResult",{items:loan});
    };
    $scope.checkCantTransfer = function (loan) {
        $state.go("main.checkTransferResult",{items:loan});
    }

}]);
/**
 * Created by 向麒 on 2017/1/14.
 * 岗位管理
 */
'use strict';
var positon = angular.module('positon',['httpservice']);
positon.controller("positionController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout) {
    $scope.QueryProductName = "";
    $scope.QueryPositionStatus = [{
        id:1,
        str:"启用"
    },{
        id:0,
        str:"禁用"
    }];

    $scope.init = function() {
        $scope.query = {}
        $scope.query.page = 0;
        $scope.query.size = 10;
        $scope.query.name = "";
        $scope.query.enabled = "";
        $scope.selectPositionStatus = undefined;
    }

    $scope.init();

    $scope.getList = function () {
        if ($scope.selectPositionStatus) {
            $scope.query.enabled = $scope.selectPositionStatus.id;
        }
        httpService.getAllPosition($scope.query).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList();

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
    $scope.addPost = function () {
        $state.go("main.addpositionmanagement",{items:null});
    };
    $scope.edit = function (position) {
        console.log(JSON.stringify(position));

        $state.go("main.addpositionmanagement",{items:JSON.stringify(position)});
    };
    $scope.disable = function (position) {
        var post = {
            name:position.name,
            postTypeId:position.postTypeId,
            enabled:false
        };
        httpService.updatePosition(post,position.id).then(function (result) {
            $scope.getList();
            console.log(result);
        },function (error) {
            console.log(error);
        })
    }

}]);
positon.controller("addPositionController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$stateParams) {
    $scope.selectedDeptType = {};
    $scope.getPostTypeList = function () {
        httpService.getAllPositionType().then(function (result) {
            console.log(result);
            $scope.data = result.data;
            if($stateParams.items!=null){
                var selectedItem = JSON.parse($stateParams.items);
                $scope.postName = selectedItem.name;
                for(var i in $scope.data){
                    if (selectedItem.postTypeId ==$scope.data[i].id){
                        $scope.selectedDeptType = $scope.data[i];
                    }
                }
            }
        },function (error) {
            console.log(error);
        });

    };
    $scope.getPostTypeList();

    $scope.addPosition = function () {
        var post = {
            name:$scope.postName,
            postTypeId:$scope.selectedDeptType.id,
            enabled:true
        };
        if($stateParams.items!=null){
            var selectedItem = JSON.parse($stateParams.items);
            httpService.updatePosition(post,selectedItem.id).then(function (result) {
                $state.go("main.positionmanagement");
                console.log(result);
            },function (error) {
                console.log(error);
            })
        }else {
            httpService.addPosition(post).then(function (result) {
                $state.go("main.positionmanagement");
                console.log(result);
            },function (error) {
                console.log(error);
            })
        }

    };
    $scope.cancelAdd = function () {
        $state.go("main.positionmanagement");
    }


}]);

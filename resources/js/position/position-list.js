/**
 * Created by 向麒 on 2017/1/14.
 * 岗位管理
 */
'use strict';
var positon = angular.module('positon',['httpservice']);
positon.controller("positionController", function ($scope, $http, $location, $rootScope, httpService, $state, toaster) {
    $scope.QueryProductName = "";
    $scope.QueryPositionStatus = [{
        id:0,
        str:"禁用"
    },{
        id:1,
        str:"启用"
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
        } else {
            $scope.query.enabled = -1;
        }
        httpService.getAllPosition($scope.query).then(function (result) {
            $scope.data = result.data;
        },function (error) {
            toaster.error(error.data.errorMessage);
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
        $state.go("main.addpositionmanagement",{items:JSON.stringify(position)});
    };
    $scope.disableOrEnabled = function (position) {
        var post = {
            enabled:1 - position.enabled
        };
        httpService.patchPosition(post,position.id).then(function (result) {
            toaster.success("操作成功");
            $scope.getList();
        },function (error) {
            toaster.error(error.data.errorMessage);
        })
    }

});
positon.controller("addPositionController", function ($scope, $http, $location, $rootScope,httpService, $state, $stateParams, toaster) {
    $scope.selectedDeptType = {};
    $scope.getPostTypeList = function () {
        httpService.getAllPositionType().then(function (result) {
            $scope.data = result.data;
            if($stateParams.items!=null){
                var selectedItem = JSON.parse($stateParams.items);
                $scope.postName = selectedItem.name;
                for(var i in $scope.data){
                    if (selectedItem.postTypeId ==$scope.data[i].id){
                        $scope.selectedDeptType = $scope.data[i];
                    }
                }
            } else {
                $scope.selectedDeptType = $scope.data[$scope.data.length - 1];
            }
        },function (error) {
            toaster.error(error.data.errorMessage);
        });

    };
    $scope.getPostTypeList();

    $scope.addPosition = function () {
        var post = {
            name:$scope.postName,
            postTypeId:$scope.selectedDeptType.id,
            enabled:true,
            editable:true
        };
        if($stateParams.items!=null){
            var selectedItem = JSON.parse($stateParams.items);
            httpService.updatePosition(post,selectedItem.id).then(function (result) {
                toaster.success("保存成功");
                $state.go("main.positionmanagement");
            },function (error) {
                toaster.error(error.data.errorMessage);
            })
        }else {
            httpService.addPosition(post).then(function (result) {
                toaster.success("保存成功");
                $state.go("main.positionmanagement");
            },function (error) {
                toaster.error(error.data.errorMessage);
            })
        }

    };
    $scope.cancelAdd = function () {
        $state.go("main.positionmanagement");
    }
});

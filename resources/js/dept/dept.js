/**
 * Created by 向麒 on 2017/1/14.
 * 组织管理
 */
'use strict';
var dept = angular.module('dept',['httpservice']);
dept.controller("deptController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout) {

    $scope.getAllDept = function () {
        httpService.getAllDept().then(function (result) {
            console.log(result.data);
            var list = result.data;
            for (var i in list){
                if(list[i].enabled){
                    list[i].status = "有效";
                }else {
                    list[i].status = "无效";
                }
            };
            for(var item in list){
                list[item].children = [];
                for (var item2 in list){

                    if(list[item].id == list[item2].parentDeptId){
                        list[item2].parentName = list[item].name;
                        list[item].children.push(list[item2]);
                    }
                }
            };
            $scope.data = [];
            $scope.data.push(list[0]);
            if (!$scope.selectedItem){
                $scope.selectedItem = list[0];
            }

            console.log($scope.data);



        },function (error) {
            console.log(error);
        });

    };
    $scope.getAllDept();

    $scope.$watch( 'xiangqitree.currentNode', function( newObj, oldObj ) {
        if( $scope.xiangqitree && angular.isObject($scope.xiangqitree.currentNode) ) {
            $scope.selectedItem = $scope.xiangqitree.currentNode;
            $state.go("main.deptmanagement.edit");
        }
    }, false);

    $state.go("main.deptmanagement.edit");
    
    $scope.addChildrenDept = function () {
        $scope.newItem = {};
        $scope.newItem.name = "";
        $scope.newItem.parentName = $scope.selectedItem.name;
        $scope.newItem.status = "有效";
        $state.go("main.deptmanagement.add");
    };
    $scope.cancelAddDept = function () {
        $scope.newItem = {};
        $state.go("main.deptmanagement.edit");
    };
    $scope.disabledDept = function () {
        var deptItem = {
            deptCode:$scope.selectedItem.deptCode,
            name:$scope.selectedItem.name,
            parentDeptId:$scope.selectedItem.parentDeptId,
            level:$scope.selectedItem.level,
            enabled:false
        };
        httpService.updateDept(deptItem,$scope.selectedItem.id).then(function (result) {
            console.log(result);
            alert("禁用成功");
            $scope.selectedItem = undefined;
            $scope.getAllDept();
            $state.go("main.deptmanagement.edit");
        },function (err) {
            console.log(err);
        });
    };
    $scope.saveDept = function () {
        var deptItem = {
            name:$scope.selectedItem.name,
            parentDeptId:$scope.selectedItem.parentDeptId,
            level:$scope.selectedItem.level,
            enabled:true
        };
        httpService.updateDept(deptItem,$scope.selectedItem.id).then(function (result) {
            console.log(result);
            alert("修改成功");
        },function (err) {
            console.log(err);
        });
    }
    $scope.addDept = function () {
        $scope.newItem.parentDeptId = $scope.selectedItem.id;
        $scope.newItem.level = $scope.selectedItem.level+1;
        $scope.newItem.enabled = true;
        var deptItem = {
            name:$scope.newItem.name,
            parentDeptId:$scope.selectedItem.id,
            level:$scope.selectedItem.level+1,
            enabled:true
        };
        httpService.addDept(deptItem).then(function (result) {
            console.log(result);
            $scope.selectedItem = $scope.newItem;
            $scope.getAllDept();
            $state.go("main.deptmanagement.edit");
        },function (error) {
            console.log(error);
        })

    };





}]);

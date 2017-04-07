/**
 * Created by 向麒 on 2017/1/14.
 * 组织管理
 */
'use strict';
var dept = angular.module('dept',['httpservice']);
dept.controller("deptController", function ($scope, $http, $location, $rootScope, httpService, $state,cityJson) {
    $scope.showDeptDetail = false;
    $scope.cities = cityJson;
    $scope.selectProvince = $scope.cities.provincesList[27];
    $scope.selectedCityIds = [];
    $scope.selectedCities = [];

    $scope.updateSelection = function($event, city) {
        var checked = $event.target.checked;
        var index = $scope.selectedCityIds.indexOf(city.Id);
        if (checked && index == -1){
            $scope.selectedCityIds.push(city.Id);
            $scope.selectedCities.push(city)
        } else if (!checked && index != -1){
            $scope.selectedCityIds.splice(index, 1);
            $scope.selectedCities.splice(index, 1)
        }
    }

    $scope.isSelected = function(id) {
        return $scope.selectedCityIds.indexOf(id) >= 0;
    }

    $scope.getAllDept = function () {
        httpService.getAllDept().then(function (result) {
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
        },function (error) {
            console.error(error);
        });

    };
    $scope.getAllDept();

    $scope.$watch( 'xiangqitree.currentNode', function( newObj, oldObj ) {
        if( $scope.xiangqitree && angular.isObject($scope.xiangqitree.currentNode) ) {
            $scope.selectedItem = $scope.xiangqitree.currentNode;
            httpService.getDept($scope.selectedItem.id).then(function (result) {
                $scope.selectedCityIds = result.data.cityIds;
                $scope.selectedCities = [];
                angular.forEach($scope.selectedCityIds, function(value){
                    $scope.selectedCities.push($scope.cities.Citys[value-1]);
                });
                $scope.showDeptDetail = true;
                $state.go("main.deptmanagement.edit");
            },function (err) {
                console.error(err);
            });
        }
    }, false);
    
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
            $scope.selectedItem = undefined;
            $scope.getAllDept();
            $state.go("main.deptmanagement.edit");
        },function (err) {
            console.error(err);
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
            var deptCities = {
                deptId: $scope.selectedItem.id,
                cityIds: $scope.selectedCityIds
            }
            httpService.updateDeptCity(deptCities).then(function (result) {
                alert("保存成功");
            }, function (err) {
                console.error(err);
            })
        },function (err) {
            console.error(err);
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
            $scope.newItem.id = result.data.id;
            $scope.selectedItem = $scope.newItem;
            var deptCities = {
                deptId: $scope.selectedItem.id,
                cityIds: $scope.selectedCityIds
            }
            httpService.updateDeptCity(deptCities).then(function (result) {
                $scope.getAllDept();
                $state.go("main.deptmanagement.edit");
            }, function (err) {
                console.error(err);
            })
        },function (error) {
            console.error(error);
        })

    };
});

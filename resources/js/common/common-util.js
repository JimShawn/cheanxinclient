/**
 * Created by 向麒 on 2017/2/16.
 */
'use strict';
var commonUtil = angular.module('commonUtil',['city']);
commonUtil.factory("commonUtil",function (cityJson) {
    var factory = {};
    factory.getDateFromInt=function(timeInt){
        var time = new Date(timeInt);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        return y+"-"+m+"-"+d;
    };
    factory.getCityNameById=function (id) {
        for (var i in cityJson.provincesList){
            for(var j in cityJson.provincesList[i].Citys){
                if(cityJson.provincesList[i].Citys[j].Id == id){
                    return cityJson.provincesList[i].Name+"-"+cityJson.provincesList[i].Citys[j].Name;
                }
            }
        }
    };

    factory.encodePassword = function(password) {
        for (var i = 0; i < 273; i++) {
            password = hex_md5(password + "cheanxin");
        }
        return password;
    }

    factory.initTab = function($scope, $stateParams, $window, name, httpService) {
        $scope.subTabs = $stateParams.subTabs;
        if (!$scope.subTabs) {
            $scope.subTabs = JSON.parse($window.sessionStorage[name]);
        }
        for (var i in $scope.subTabs) {
            if ($scope.subTabs[i].show) {
                $scope.subTab = $scope.subTabs[i];
                $scope.subTab.highlight = true;
                break;
            }
        }

        $scope.getList = function (page, size, status) {
            httpService.getLoanPreliminary(page, size, status).then(function (result) {
                $scope.data = result.data;
            }, function (error) {
                console.error(error);
            });

        };

        $scope.getList(0, 10, $scope.subTab.status);

        $scope.changePageSizeFun = function (size) {
            $scope.getList($scope.data.number, size, $scope.subTab.status);
        };

        $scope.gotoPageFun = function (x) {
            $scope.getList(x, $scope.data.size, $scope.subTab.status);
        };
    }

    factory.changeTab = function($scope, i) {
        for (var key in $scope.subTabs) {
            if (key == i) {
                $scope.subTabs[key].highlight = true;
                $scope.subTab = $scope.subTabs[key];
                $scope.getList(0, 10, $scope.subTabs[key].status)
            } else {
                $scope.subTabs[key].highlight = false;
            }
        }
    }

    return factory;
});
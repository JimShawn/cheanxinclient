/**
 * Created by 向麒 on 2017/2/16.
 */
'use strict';
var commonUtil = angular.module('commonUtil',['city']);
commonUtil.factory("commonUtil",function (cityJson) {
    var factory = {};
    var currentTab = {};
    var currentTabIndex = {};
    var currentItem = "";

    var imageHost = "http://139.224.135.179:80/";
    var serverHost = "http://localhost:8081/cheanxin/";

    factory.getServerHost = function () {
        return serverHost;
    }

    factory.getImageHost = function () {
        return imageHost;
    }

    factory.reassembleImages = function (imageIds, withHost) {
        if (!imageIds) {
            return [];
        }
        var tmpArr = imageIds.split(",");
        if (!withHost) {
            return tmpArr;
        }
        var result = new Array(tmpArr.length);
        for (var i in tmpArr) {
            result[i] = imageHost + tmpArr[i];
        }
        return result;
    }

    factory.joinImages = function (picArray, filterHost) {
        var emptyString = "";
        if (!picArray || picArray.length == 0) {
            return emptyString;
        }
        if (!filterHost) {
            return picArray.join(",");
        }
        var resultArray = [];
        if (filterHost) {
            for (var i = 0; i < picArray.length; i++) {
                if (!picArray[i]) {
                    continue;
                }
                picArray[i] = picArray[i].replace(imageHost, emptyString);
                if (picArray[i].length == 0) {
                    continue;
                }
                resultArray.push(picArray[i]);
            }
        }
        return resultArray.join(",");
    }

    factory.getDateFromInt = function(timeInt){
        var time = new Date(timeInt * 1000);
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
        currentItem = name;
        $scope.subTabs = $stateParams.subTabs;
        if (!$scope.subTabs) {
            $scope.subTabs = JSON.parse($window.sessionStorage[name]);
        }
        if (!currentTab[name]) {
            for (var i in $scope.subTabs) {
                if ($scope.subTabs[i].show) {
                    currentTab[name] = $scope.subTabs[i];
                    currentTabIndex[name] = i;
                    break;
                }
            }
        }
        $scope.subTab = currentTab[name];

        for (var i in $scope.subTabs) {
            $scope.subTabs[i].highlight = false;
        }
        $scope.subTabs[currentTabIndex[name]].highlight = true;

        $scope.initQuery = function() {
            if (!$scope.query) {
                $scope.query = {};
            }
            $scope.query.page = 0;
            $scope.query.size = 10;
            $scope.query.status = $scope.subTab.status;
            $scope.query.releaseStatus = $scope.subTab.releaseStatus;
            $scope.query.createdTimeFrom = 0;
            $scope.query.createdTimeTo = 0;
            $scope.query.applicantName = "";
            $scope.query.applicantMobileNumber = "";
            $scope.query.sourceChannel = 0;
            $scope.createdTimeFrom = 0;
            $scope.createdTimeTo = 0;
            $scope.sourceChannel = 0;
        }
        $scope.initQuery();
        $scope.queryByCondition= function () {
            $scope.query.page = 0;
            $scope.query.size = 10;
            $scope.getList();
        };

        $scope.getList = function () {
            if (typeof($scope.createdTimeFrom) == "string" && $scope.createdTimeFrom.length > 0) {
                $scope.query.createdTimeFrom = new Date($scope.createdTimeFrom).getTime() / 1000;
            }
            if (typeof($scope.createdTimeTo) == "string" && $scope.createdTimeTo.length > 0) {
                $scope.query.createdTimeTo = new Date($scope.createdTimeTo).getTime() / 1000;
            }
            if ($scope.sourceChannel) {
                $scope.query.sourceChannel = $scope.sourceChannel.id;
            }
            httpService.getLoanPreliminary($scope.query).then(function (result) {
                $scope.data = result.data;
            }, function (error) {
                console.error(error);
            });
        };
        $scope.getList();

        $scope.changePageSizeFun = function (size) {
            $scope.query.page = $scope.data.number;
            $scope.query.size = size;
            $scope.query.status = $scope.subTab.status;
            $scope.query.releaseStatus = $scope.subTab.releaseStatus;
            $scope.getList();
        };

        $scope.gotoPageFun = function (x) {
            $scope.query.page = x;
            $scope.query.size = $scope.data.size;
            $scope.query.status = $scope.subTab.status;
            $scope.query.releaseStatus = $scope.subTab.releaseStatus;
            $scope.getList();
        };

        $scope.changeTab = function(i) {
            for (var key in $scope.subTabs) {
                if (key == i) {
                    $scope.subTabs[key].highlight = true;
                    $scope.subTab = $scope.subTabs[key];
                    $scope.query.status = $scope.subTabs[key].status;
                    $scope.query.releaseStatus = $scope.subTab.releaseStatus;
                    $scope.getList();
                    currentTab[currentItem] = $scope.subTab;
                    currentTabIndex[currentItem] = i;
                } else {
                    $scope.subTabs[key].highlight = false;
                }
            }
        }

        $scope.sources = [
            {
                id: 0,
                name: "门店"
            },
            {
                id: 1,
                name: "车商"
            },
            {
                id: 2,
                name: "273网站"
            },
            {
                id: 3,
                name: "273业管"
            },
            {
                id: 4,
                name: "其他"
            }
        ];

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
                name:"复审未通过",
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
                name:"放弃签约待审核"
            },{
                id:18,
                name:"待审核"
            },{
                id:19,
                name:"无法过户待确认"
            },{
                id:20,
                name:"放弃贷款"
            },{
                id:21,
                name:"材料待补充"
            },{
                id:22,
                name:"过户待审核"
            },{
                id:23,
                name:"待放款"
            },{
                id:24,
                name:"待抵押"
            },{
                id:25,
                name:"待过户抵押"
            },{
                id:26,
                name:"无法过户抵押待确认"
            },{
                id:27,
                name:"放弃贷款"
            },{
                id:28,
                name:"材料待补充"
            },{
                id:29,
                name:"过户抵押待审核"
            },{
                id:30,
                name:"待放款"
            },{
                id:31,
                name:"已过户抵押"
            },{
                id:32,
                name:"过户待审核"
            },{
                id:33,
                name:"过户抵押待审核"
            },{
                id:34,
                name:"审核不通过"
            },{
                id:35,
                name:"审核不通过"
            },{
                id:36,
                name:"已过户抵押"
            },{
                id:37,
                name:"签约待审核"
            },{
                id:38,
                name:"抵押待审核"
            }
        ];

    };

    factory.getArrayFromString = function (oriStr,separator) {
        if(!oriStr)return;
        return oriStr.split(separator);
    };

    factory.parseQueryArrayToString = function (query) {
        var queryParams = "";
        for (var key in query) {
            if (query[key] == undefined || query[key] == null) {
                continue;
            }
            queryParams += "&" + key + "=" + query[key];
        }
        return queryParams;
    };

    return factory;
});
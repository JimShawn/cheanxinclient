/**
 * Created by 向麒 on 2017/1/14.
 * 人员管理
 */
'use strict';
var man = angular.module('man',['httpservice']);
man.controller("manController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout) {
    $scope.queryName = "";
    $scope.queryTel = "";
    $scope.queryPost = "";
    $scope.queryEmail = "";
    $scope.selectedStatus = {};
    $scope.queryStatuses = [{
        status:1,
        value:"激活"
    },{
        status:2,
        value:"弃用"
    }
    ];


    $scope.getList = function (page,size) {
        httpService.getAllUser(page,size).then(function (result) {
            console.log(result);
            $scope.data = result.data;

            for (var i in $scope.data.content){
                $scope.data.content[i].postName = "";
                for (var j in $scope.data.content[i].posts){
                    $scope.data.content[i].postName += "  "+$scope.data.content[i].posts[j].name;
                }
                if ($scope.data.content[i].enabled){
                    $scope.data.content[i].ststus = "有效";
                }else {
                    $scope.data.content[i].ststus = "无效";
                }
            }
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10);

    $scope.changePageSizeFun = function (size) {
        console.log(size);
        console.log($scope.data.number);
        $scope.getList($scope.data.number,size);
    };

    $scope.gotoPageFun = function (x) {
        console.log("gotoPageFun");

        console.log($scope.data.size);
        console.log(x);
        $scope.getList(x,$scope.data.size);
    };

    $scope.add = function () {
        $state.go("main.addmanmanagement",{items:null});
    };
    $scope.edit = function (man) {
        $state.go("main.addmanmanagement",{items:JSON.stringify(man)})
    }

}]);
man.controller("addManController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','$stateParams',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,$stateParams) {

    if ($stateParams.items!=null){
        var selectedItem = JSON.parse($stateParams.items);
        $scope.name = selectedItem.realName;
        $scope.dept = selectedItem.deptId;
        $scope.account = selectedItem.username;
        $scope.tel = selectedItem.mobileNumber;
        $scope.email = selectedItem.email;
        $scope.idNum = selectedItem.identityNumber;
        $scope.address = selectedItem.address;
        $scope.password1 = "";
        $scope.password2 = "";
        $scope.emergencyContact = selectedItem.emergencyContact;
        $scope.emergencyContactTel = selectedItem.emergencyContactMobileNumber;
        $scope.positonCeo = false;
        $scope.positonCfo = false;
        $scope.positonCoo = false;
        $scope.positonCoo = false;
        $scope.positonCaiwuM = false;
        $scope.positonFengkongM = false;
        $scope.positonXinshenM = false;
        $scope.positonFushenM = false;
        $scope.positonFinancial = false;
        $scope.positonCount = false;
        $scope.positonIncome = false;
        $scope.positonXinshenyuan = false;
        $scope.positonFushenyuan = false;
        $scope.positonJinron = false;
        $scope.positonFengkong = false;
        $scope.positonZichan = false;
        $scope.positonCuishou = false;
        $scope.positonFawu = false;
        $scope.positonZhijian = false;
        $scope.positonXingzheng = false;
    }else {
        $scope.name = "";
        $scope.dept = "";
        $scope.account = "";
        $scope.tel = "";
        $scope.email = "";
        $scope.idNum = "";
        $scope.address = "";
        $scope.password1 = "";
        $scope.password2 = "";
        $scope.emergencyContact = "";
        $scope.emergencyContactTel = "";
        $scope.positonCeo = false;
        $scope.positonCfo = false;
        $scope.positonCoo = false;
        $scope.positonCoo = false;
        $scope.positonCaiwuM = false;
        $scope.positonFengkongM = false;
        $scope.positonXinshenM = false;
        $scope.positonFushenM = false;
        $scope.positonFinancial = false;
        $scope.positonCount = false;
        $scope.positonIncome = false;
        $scope.positonXinshenyuan = false;
        $scope.positonFushenyuan = false;
        $scope.positonJinron = false;
        $scope.positonFengkong = false;
        $scope.positonZichan = false;
        $scope.positonCuishou = false;
        $scope.positonFawu = false;
        $scope.positonZhijian = false;
        $scope.positonXingzheng = false;
    }


    $scope.commit = function () {
        var pwdEncode = $scope.password1;
        for (var i=0;i<128;i++){
            pwdEncode = hex_md5(pwdEncode+"financial");
        }

        //岗位还有相应的内容，所以先不处理
        $scope.user = {
            realName:$scope.name,
            deptId:1,
            username:$scope.account,
            mobileNumber:$scope.tel,
            email:$scope.email,
            identityNumber:$scope.idNum,
            identityPhoto:"www.cheanxin.com/2.jpg",
            photo:"www.cheanxin.com/1.jpg",
            region:"华南",
            address:$scope.address,
            emergencyContact:$scope.emergencyContact,
            emergencyContactMobileNumber:$scope.emergencyContactTel,
            password:pwdEncode,

        }
        httpService.addUser($scope.user).then(function (res) {
            alert(res);
            $state.go("main.manmanagement");
        },function (err) {
            alert(err);
        })

    }







    $scope.getList = function (page,size) {
        httpService.getAllUser(page,size).then(function (result) {
            console.log(result);
            $scope.data = result.data;
        },function (error) {
            console.log(error);
        });

    };
    $scope.getList(0,10);

    $scope.changePageSizeFun = function (size) {
        console.log(size);
        console.log($scope.data.number);
        $scope.getList($scope.data.number,size);
    };

    $scope.gotoPageFun = function (x) {
        console.log("gotoPageFun");

        console.log($scope.data.size);
        console.log(x);
        $scope.getList(x,$scope.data.size);
    };

}])

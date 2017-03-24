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
        },function (err) {
            console.error(err.data.errorMessage);
        });

    };
    $scope.getList(0,10);

    $scope.changePageSizeFun = function (size) {
        $scope.getList($scope.data.number,size);
    };

    $scope.gotoPageFun = function (x) {
        $scope.getList(x,$scope.data.size);
    };

    $scope.add = function () {
        $state.go("main.addmanmanagement",{items:null});
    };
    $scope.edit = function (man) {
        $state.go("main.addmanmanagement",{items:JSON.stringify(man)})
    }

}]);
man.controller("addManController",['$filter', '$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','$stateParams','FileUploader','$window',function ($filter, $scope,$http,$location,$rootScope,httpService,$state,$timeout,$stateParams,FileUploader,$window) {
    if ($stateParams.items != null) {
        var selectedItem = JSON.parse($stateParams.items);
    }
    httpService.getAllDept().then(function (result) {
        $scope.depts = result.data;
        if (selectedItem) {
            $scope.dept = $scope.depts[selectedItem.deptId];
        }
    },function (err) {
        console.error(err.data.errorMessage);
    });
    httpService.getAllPositionType().then(function (result) {
        $scope.positionTypes = result.data;
    },function (err) {
        console.error(err.data.errorMessage);
    });
    
    $scope.showPasswordInput = true;
    if (selectedItem) {
        $scope.name = selectedItem.realName;
        $scope.account = selectedItem.username;
        $scope.tel = selectedItem.mobileNumber;
        $scope.email = selectedItem.email;
        $scope.idNum = selectedItem.identityNumber;
        $scope.address = selectedItem.address;
        $scope.showPasswordInput = false;
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
        var identification = $filter('filter')($scope.identification, '').join(",");
        var avatar = $filter('filter')($scope.avatar, '').join(",");
        var pwdEncode = $scope.password1;
        var errorMsg = false;
        if ($scope.showPasswordInput) {
            if (!pwdEncode) {
                errorMsg = "密码不能为空";
            }
            if (!$scope.password2) {
                errorMsg = "请重复输入密码";
            }
            if (pwdEncode != $scope.password2) {
                errorMsg = "两次输入密码不一致";
            }
        }
        if (!identification) {
            errorMsg = "请上传身份证图片";
        }
        if (!avatar) {
            errorMsg = "请上传头像照片";
        }
        if (errorMsg) {
            alert(errorMsg);
            return;
        }
        // for (var i=0; i<128; i++){
        //     pwdEncode = hex_md5(pwdEncode + "0f6a57a94327340f9712ee79b0a8dfb" + i);
        // }

        //岗位还有相应的内容，所以先不处理
        $scope.user = {
            realName:$scope.name,
            deptId:$scope.dept.id,
            username:$scope.account,
            mobileNumber:$scope.tel,
            email:$scope.email,
            identityNumber:$scope.idNum,
            identityPhoto:identification,
            photo: avatar,
            region:"华南",
            address:$scope.address,
            emergencyContact:$scope.emergencyContact,
            emergencyContactMobileNumber:$scope.emergencyContactTel,
            password:pwdEncode,
            enabled:true
        }
        httpService.addUser($scope.user).then(function (res) {
            $state.go("main.manmanagement");
        },function (err) {
            console.error(err.data.errorMessage);
        })

    }
}])

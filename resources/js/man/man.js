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
        if (!selectedItem) {
            return;
        }
        for (var i = 0; i < $scope.depts.length; i++) {
            if ($scope.depts[i].id == selectedItem.deptId) {
                $scope.dept = $scope.depts[i];
                break;
            }
        }
    },function (err) {
        console.error(err.data.errorMessage);
    });
    httpService.getAllPositionType().then(function (result) {
        $scope.positionTypes = result.data;
    },function (err) {
        console.error(err.data.errorMessage);
    });

    $scope.isEdit = false;
    if (selectedItem) {
        $scope.isEdit = true;
        $scope.id = selectedItem.id;
        $scope.name = selectedItem.realName;
        $scope.account = selectedItem.username;
        $scope.tel = selectedItem.mobileNumber;
        $scope.email = selectedItem.email;
        $scope.idNum = selectedItem.identityNumber;
        $scope.address = selectedItem.address;
        $scope.emergencyContact = selectedItem.emergencyContact;
        $scope.emergencyContactTel = selectedItem.emergencyContactMobileNumber;
        $scope.photo = selectedItem.photo;
        var identityPhotoArr = selectedItem.identityPhoto.split(",");
        $scope.identityPhotos = new Array(identityPhotoArr.length);
        for (var i = 0; i < identityPhotoArr.length; i++) {
            $scope.identityPhotos[i] = identityPhotoArr[i];
        }
    }else {
        $scope.name = "";
        $scope.dept = "";
        $scope.account = "";
        $scope.tel = "";
        $scope.email = "";
        $scope.idNum = "";
        $scope.address = "";
        $scope.emergencyContact = "";
        $scope.emergencyContactTel = "";
    }


    $scope.commit = function () {
        var errorMsg = false;
        var identification = $filter('filter')($scope.identification, '').join(",");
        if (!identification) {
            errorMsg = "请上传身份证图片";
        }
        var avatar = $filter('filter')($scope.avatar, '').join(",");
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
            id:$scope.id,
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
            enabled:true
        }

        var response;
        if (selectedItem) {
            response = httpService.updateUser($scope.user, $scope.id);
        } else {
            response = httpService.addUser($scope.user);
        }

        response.then(function (res) {
            $state.go("main.manmanagement");
        },function (err) {
            console.error(err.data.errorMessage);
        })

    }
}])

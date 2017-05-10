/**
 * Created by 向麒 on 2017/1/14.
 * 人员管理
 */
'use strict';
var man = angular.module('man',['httpservice']);
man.factory('deptService', function (httpService, toaster) {
    var deptServiceApi = {}
    deptServiceApi.listDepts = function($scope, selectedItem) {
        httpService.getAllDept().then(function (result) {
            $scope.depts = result.data;
            if (!selectedItem) {
                // $scope.dept = $scope.depts[0];
                return;
            }
            for (var i = 0; i < $scope.depts.length; i++) {
                if ($scope.depts[i].id == selectedItem.deptId) {
                    $scope.dept = $scope.depts[i];
                    break;
                }
            }
        },function (err) {
            toaster.error(err.data.errorMessage);
        });
    }
    return deptServiceApi;
})
man.controller("manController", function ($scope, $http, $location, $rootScope,httpService, $state, $timeout, $window, deptService, toaster) {
    deptService.listDepts($scope);
    $scope.queryStatuses = [{
        status:1,
        value:"已激活"
    },{
        status:0,
        value:"已冻结"
    }
    ];
    
    $scope.init = function() {
        $scope.query = {};
        $scope.query.realName = "";
        $scope.query.mobileNumber = "";
        $scope.query.deptId = "";
        $scope.query.email = "";
        $scope.query.status = "-1";
        $scope.query.page = "0";
        $scope.query.size = "10";
        $scope.statusObject = undefined;
        $scope.dept = undefined;
    }
    $scope.init();


    $scope.getList = function () {
        if ($scope.statusObject) {
            $scope.query.status = $scope.statusObject.status;
        } else {
            $scope.query.status = -1;
        }
        if ($scope.dept) {
            $scope.query.deptId = $scope.dept.id;
        } else {
            $scope.query.deptId = "";
        }
        httpService.listUsers($scope.query).then(function (result) {
            $scope.data = result.data;

            for (var i in $scope.data.content){
                $scope.data.content[i].postName = "";
                for (var j in $scope.data.content[i].posts){
                    $scope.data.content[i].postName += "  "+$scope.data.content[i].posts[j].name;
                }
                if ($scope.data.content[i].enabled){
                    $scope.data.content[i].status = "已激活";
                    $scope.data.content[i].toStatus = "冻结";
                }else {
                    $scope.data.content[i].status = "已冻结";
                    $scope.data.content[i].toStatus = "激活";
                }
                $scope.data.content[i].toEnabled = !$scope.data.content[i].enabled;
            }
        },function (err) {
            toaster.error(err.data.errorMessage);
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

    $scope.add = function () {
        $state.go("main.addmanmanagement",{items:null});
    };

    $scope.edit = function (man) {
        $state.go("main.addmanmanagement",{items:JSON.stringify(man)})
    }

    $scope.disableOrEnableUser = function (id, enabled) {
        var user = {
            enabled:enabled
        }
        httpService.patchUser(user, id);
        $window.location.reload();
    }
});

man.controller("addManController", function ($filter, $scope , $http, $location, $rootScope, httpService, $state, $timeout, $stateParams, FileUploader, $window, deptService, toaster) {
    if ($stateParams.items != null) {
        var selectedItem = JSON.parse($stateParams.items);
    }
    deptService.listDepts($scope, selectedItem);
    $scope.displayPosts = {};
    httpService.listAllPosts().then(function (result) {
        var posts = result.data;
        for (var i = 0; i < posts.length; i++) {
            var postTypeId = posts[i].postTypeId;
            var postTypeKey = postTypeId + "";
            if (!(postTypeKey in $scope.displayPosts)) {
                $scope.displayPosts[postTypeKey] = {};
                $scope.displayPosts[postTypeKey].value = new Array();
                $scope.displayPosts[postTypeKey].key = posts[i].postType;
            }
            $scope.displayPosts[postTypeKey].value.push(posts[i]);
        }
    },function (err) {
        toaster.error(err.data.errorMessage);
    });

    $scope.selectedPosts = [];

    var updateSelected = function(action,id) {
        if (action == 'add' && $scope.selectedPosts.indexOf(id) == -1){
            $scope.selectedPosts.push(id);
        }
        if (action == 'remove' && $scope.selectedPosts.indexOf(id) != -1){
            var idx = $scope.selectedPosts.indexOf(id);
            $scope.selectedPosts.splice(idx,1);
        }
    }

    $scope.updateSelection = function($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action,id);
    }

    $scope.isSelected = function(id) {
        return $scope.selectedPosts.indexOf(id) >= 0;
    }

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
        for (var i in selectedItem.posts) {
            $scope.selectedPosts.push(selectedItem.posts[i].id);
        }
    } else {
        $scope.name = "";
        $scope.account = "";
        $scope.tel = "";
        $scope.email = "";
        $scope.idNum = "";
        $scope.address = "";
        $scope.emergencyContact = "";
        $scope.emergencyContactTel = "";
    }

    $scope.cancelSaveMan = function () {
        $state.go("main.manmanagement");
    };

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
            toaster.error(errorMsg);
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

        httpService.updateUserPost($scope.user, $scope.selectedPosts);

        response.then(function (res) {
            toaster.success("保存成功");
            $state.go("main.manmanagement");
        },function (err) {
            toaster.error(err.data.errorMessage);
        })

    }
});

man.controller("manPasswordController", function ($scope, httpService, $state, commonUtil, toaster) {
    $scope.commit = function () {
        if ($scope.oldPassword == $scope.newPassword1) {
            toaster.error("新旧密码不能相同");
        }
        if ($scope.newPassword1 != $scope.newPassword2) {
            toaster.error("两次输入密码不一致");
        }
        $scope.passwordMap = {
            oldPassword: commonUtil.encodePassword($scope.oldPassword),
            newPassword1: commonUtil.encodePassword($scope.newPassword1),
            newPassword2: commonUtil.encodePassword($scope.newPassword2)
        }
        httpService.patchUserPassword($scope.passwordMap).then(function (res) {
            toaster.success("密码修改成功");
            $scope.logout();
        },function (err) {
            toaster.error(err.data.errorMessage);
        })
    }

    $scope.cancelPassword = function () {
        $state.go("main.mainpage");
    }
});

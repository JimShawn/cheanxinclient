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
man.controller("addManController",['$scope', '$http','$location','$rootScope', 'httpService','$state','$timeout','$stateParams','FileUploader','$window',function ($scope,$http,$location,$rootScope,httpService,$state,$timeout,$stateParams,FileUploader,$window) {

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
            photo:$scope.photo,
            region:"华南",
            address:$scope.address,
            emergencyContact:$scope.emergencyContact,
            emergencyContactMobileNumber:$scope.emergencyContactTel,
            password:pwdEncode,
            enabled:true

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

    // 上传图片
    var photoUploader = $scope.photoUploader = new FileUploader({
        url: "http://localhost:8081/cheanxin/image/upload?access_token="+$window.sessionStorage["access_token"],
        queueLimit: 1, //文件个数
        removeAfterUpload: false //上传后不删除文件
    });
    $scope.uploadImageText = "上传图片";
    $scope.clearPhotoItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
        photoUploader.clearQueue();
    };
    // a sync filter
    photoUploader.filters.push({
        name: 'syncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length <= 1;
        }
    });

    // an async filter
    photoUploader.filters.push({
        name: 'asyncFilter',
        fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
            setTimeout(deferred.resolve, 1e3);
        }
    });
    photoUploader.onAfterAddingFile = function(fileItem) {
        $scope.fileItem = fileItem._file; //添加文件之后，把文件信息赋给scope
        uploader.uploadAll();
        console.log(uploader);
    };
    photoUploader.onSuccessItem = function(fileItem, response, status, headers) {
        $scope.uploadStatus = true; //上传成功则把状态改为true
        $scope.photo = response;
        $scope.uploadImageText = "修改图片";
    };
    photoUploader.onErrorItem = function(fileItem, response, status, headers) {
        $scope.uploadStatus = false; //上传成功则把状态改为true
        $scope.uploadImageText = "上传失败";
    };
}])

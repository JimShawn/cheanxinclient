/**
 * Created by 向麒 on 2017/1/14.
 * 图片上传指令
 */
'use strict';
var imageUpload = angular.module('image-upload',[]);
imageUpload.directive('upload',[function () {
    
    return {
        restrict: 'C',
        scope: {
            desc: '@',
            uploader: '@'
        },
        templateUrl:'/pages/directive/image-upload.html',
        controller: function ($scope, FileUploader, $window) {
            $scope.imageUrl = "/resources/img/add.png";
            $scope.imageSize = "auto";
            if (!$scope.desc) {
                $scope.desc = "上传图片";
            }
            var imageUploader = $scope.imageUploader = new FileUploader({
                url: "http://localhost:8081/cheanxin/image/upload?access_token="+$window.sessionStorage["access_token"],
                queueLimit: 1, //文件个数
                removeAfterUpload: false //上传后不删除文件
            });

            $scope.clearPhotoItems = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
                imageUploader.clearQueue();
            };

            // a sync filter
            imageUploader.filters.push({
                name: 'syncFilter',
                fn: function(item /*{File|FileLikeObject}*/, options) {
                    return this.queue.length <= 1;
                }
            });

            // an async filter
            // imageUploader.filters.push({
            //     name: 'asyncFilter',
            //     fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
            //         setTimeout(deferred.resolve, 1e3);
            //     }
            // });
            imageUploader.onAfterAddingFile = function(fileItem) {
                $scope.fileItem = fileItem._file; //添加文件之后，把文件信息赋给scope
                imageUploader.uploadAll();
                console.log(imageUploader);
            };
            imageUploader.onSuccessItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = true; //上传成功则把状态改为true
                $scope.image = response;
                $scope.imageUrl = "http://172.16.1.14:8888/" + $scope.image;
                $scope.imageSize = "cover";
                $scope.desc = fileItem.file.name;
            };
            imageUploader.onErrorItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = false; //上传成功则把状态改为true
            };
        }
    }
}]);
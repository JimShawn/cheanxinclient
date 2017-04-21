/**
 * 图片上传指令
 */
'use strict';
var imageUpload = angular.module('image-upload',[]);
imageUpload.directive('upload',[function () {
    return {
        restrict: 'AC',
        scope: {
            desc: '@',
            uploader: '@',
            index:'@',
            uploadedUrls: '=',
            imageUrl:'@'
        },
        templateUrl:'/pages/directive/image-upload.html',
        controller: function ($scope, FileUploader, $window, commonUtil) {
            if ($scope.index > 9) {
                console.error("index error.");
                return;
            }
            $scope.uploadedUrls = new Array(10);
            if (!$scope.imageUrl) {
                $scope.backUrl = "/resources/img/add.png";
                $scope.imageSize = "auto";
            } else {
                $scope.uploadedUrls[$scope.index] = $scope.imageUrl;
                $scope.imageSize = "cover";
                $scope.backUrl = commonUtil.getImageHost() + $scope.imageUrl;
            }
            if (!$scope.desc) {
                $scope.desc = "上传图片";
            }
            var imageUploader = $scope.imageUploader = new FileUploader({
                url: commonUtil.getServerHost() + "image/upload?access_token=" + $window.sessionStorage["access_token"],
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
            };
            imageUploader.onSuccessItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = true; //上传成功则把状态改为true
                $scope.backUrl = commonUtil.getImageHost() + response;
                $scope.imageSize = "cover";
                $scope.desc = fileItem.file.name;
                $scope.uploadedUrls[$scope.index] = response;
            };
            imageUploader.onErrorItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = false; //上传成功则把状态改为true
            };
        }
    }
}]);
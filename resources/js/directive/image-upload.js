/**
 * 图片上传指令
 */
'use strict';
var imageUpload = angular.module('image-upload',[]);
imageUpload.directive('upload',[function () {
    var addImage = "/resources/img/add.png";
    var initDesc = "上传图片";
    return {
        restrict: 'AC',
        scope: {
            desc: '@',
            uploader: '@',
            index:'@',
            readOnly:'@',
            uploadedUrls: '=',
            outputUrl:'=',
            imageUrl:'@'
        },
        templateUrl:'/pages/directive/image-upload.html',
        controller: function ($scope, FileUploader, $window, commonUtil) {
            if ($scope.index > 9) {
                console.error("index error.");
                return;
            }
            if (!$scope.uploadedUrls){
                $scope.uploadedUrls =[];
            }

            $scope.uploadStatus = false;
            if (!$scope.imageUrl) {
                $scope.uploadStatus = false;
                $scope.backUrl = addImage;
            } else {
                $scope.uploadStatus = true;
                $scope.uploadedUrls[$scope.index] = $scope.imageUrl;
                $scope.backUrl = commonUtil.getImageHost() + $scope.imageUrl;
            }
            var oldDesc = initDesc;
            if (!$scope.desc) {
                $scope.desc = oldDesc;
            } else {
                oldDesc = $scope.desc;
            }
            var imageUploader = $scope.imageUploader = new FileUploader({
                url: commonUtil.getServerHost() + "image/upload?access_token=" + $window.sessionStorage["access_token"],
                queueLimit: 1, //文件个数
                removeAfterUpload: true
            });

            $scope.init = function(){ //重新选择文件时，清空队列，达到覆盖文件的效果
                $scope.uploadStatus = false;
                $scope.backUrl = addImage;
                $scope.desc = oldDesc;
                $scope.isZoom = false;
                $scope.uploadedUrls[$scope.index] = undefined;
                $scope.uploadedUrls.clean(undefined);
            };

            $scope.zoom = false;
            $scope.zoom = function (isZoom) {
                $scope.isZoom = isZoom;
                $scope.zIndex = 99 * isZoom;
            }
            
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
                imageUploader.uploadItem(fileItem);
            };
            imageUploader.onSuccessItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = true; //上传成功则把状态改为true
                $scope.backUrl = commonUtil.getImageHost() + response;
                $scope.desc = fileItem.file.name;
                $scope.uploadedUrls[$scope.index] = response;
            };
            imageUploader.onErrorItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = false;
            };
        }
    }
}]);
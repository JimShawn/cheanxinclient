/**
 * Created by 向麒 on 2017/1/5.
 */
'use strict';
var httpservice = angular.module('httpservice', []);
httpservice.factory('httpService',function ($http,$q,$window,$rootScope) {
    var api = {};
    api.login = function (name,password) {
        var deferd = $q.defer();
        var url = "http://localhost:8081/cheanxin/oauth/token?grant_type=password&username="+name+"&password="+password;
        $http.post(url,{},{
            headers : {'Authorization' : 'Basic Y2hlYW54aW5fY2xpZW50OmFtcG52YVVRcm1RajdyOWE2Zjk0bHRqQ3V6cVk3amN2WA=='}
        }).then(function (result) {

            $window.sessionStorage["token_info"] = JSON.stringify(result);
            $window.sessionStorage["access_token"] = result.data.access_token;
            var allMeUrl = "http://localhost:8081/cheanxin/users/me?access_token="+$window.sessionStorage["access_token"];
            $http.get(allMeUrl).then(function (res) {
                $window.sessionStorage["userInfo"] = JSON.stringify(res);
                deferd.resolve(res);
            },function (error) {
                deferd.reject(error);
            });

        },function(error){
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getAllUser = function (page,size) {
        var deferd = $q.defer();
        var allUserUrl = "http://localhost:8081/cheanxin/users?access_token="+$window.sessionStorage["access_token"]+"&size="+size+"&page="+page;
        $http.get(allUserUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addUser = function (user) {
        var deferd = $q.defer();
        var addUserUrl = "http://localhost:8081/cheanxin/users?access_token="+$window.sessionStorage["access_token"];
        $http.post(addUserUrl,user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getAllProduct = function (page,size,status,productTemplateId) {
        var deferd = $q.defer();
        var allProductUrl = "http://localhost:8081/cheanxin/products?access_token="+$window.sessionStorage["access_token"]+"&size="+size+"&page="+page+"&&productTemplateId="+productTemplateId;
        if(status!=-1){
            allProductUrl = allProductUrl+ "&status="+status;
        }

        $http.get(allProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getProductByCityId = function (cityId) {
        var deferd = $q.defer();
        var productUrl = "http://localhost:8081/cheanxin/products/all?access_token="+$window.sessionStorage["access_token"]+"&cityId="+cityId;
        $http.get(productUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.addProduct = function (product) {
        var deferd = $q.defer();
        var addProductUrl = "http://localhost:8081/cheanxin/products?access_token="+$window.sessionStorage["access_token"];

        $http.post(addProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.editProduct = function (product) {
        var deferd = $q.defer();
        var editProductUrl = "http://localhost:8081/cheanxin/products/"+product.id+"?access_token="+$window.sessionStorage["access_token"];

        $http.put(editProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getAllPosition = function (page,size) {
        var deferd = $q.defer();
        var allProductUrl = "http://localhost:8081/cheanxin/posts?access_token="+$window.sessionStorage["access_token"]+"&size="+size+"&page="+page;
        $http.get(allProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addPosition = function (post) {
        var deferd = $q.defer();
        var addPostUrl = "http://localhost:8081/cheanxin/posts?access_token="+$window.sessionStorage["access_token"];
        $http.post(addPostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updatePosition = function (post,id) {
        var deferd = $q.defer();
        var updatePostUrl = "http://localhost:8081/cheanxin/posts/"+id+"?access_token="+$window.sessionStorage["access_token"];
        $http.put(updatePostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllPositionType = function () {
        var deferd = $q.defer();
        var allProductUrl = "http://localhost:8081/cheanxin/post_types?access_token="+$window.sessionStorage["access_token"];
        $http.get(allProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllDept = function () {
        var deferd = $q.defer();
        var allDeptUrl = "http://localhost:8081/cheanxin/depts/all?access_token="+$window.sessionStorage["access_token"];
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addDept = function (dept) {
        var deferd = $q.defer();
        var addDeptUrl = "http://localhost:8081/cheanxin/depts?access_token="+$window.sessionStorage["access_token"];
        $http.post(addDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateDept = function (dept,id) {
        var deferd = $q.defer();
        var updateDeptUrl = "http://localhost:8081/cheanxin/depts/"+id+"?access_token="+$window.sessionStorage["access_token"];
        $http.put(updateDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getLoanPreliminary = function(page,size,status){
        var deferd = $q.defer();
        var allDeptUrl = "http://localhost:8081/cheanxin/loans?access_token="+$window.sessionStorage["access_token"]+"&page="+page+"&size="+size+"&status="+status;
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getUserByCityAndPost = function (dept,post) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = "http://localhost:8081/cheanxin/users/all?access_token="+$window.sessionStorage["access_token"]+"&deptId="+dept+"&postId="+post;
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addLoandraft = function (loandraft) {
        var deferd = $q.defer();
        var addLoandraftUrl = "http://localhost:8081/cheanxin/loans?access_token="+$window.sessionStorage["access_token"];
        $http.post(addLoandraftUrl,loandraft).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateLoandraft = function (id,loan,loanOperate) {
        var deferd = $q.defer();
        var updateLoandraftUrl = "http://localhost:8081/cheanxin/loans/"+id+"?access_token="+$window.sessionStorage["access_token"]+"&loanOperate="+loanOperate;
        $http.patch(updateLoandraftUrl,loan).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getProductByID = function (id) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = "http://localhost:8081/cheanxin/products/"+id+"?access_token="+$window.sessionStorage["access_token"];
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getChekuangbaoDetailTest = function () {
        var deferd = $q.defer();
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;

        var secretKey = hex_md5("0f6a57a943273460f9712ee79b0a8dfb"+timestamp);
        var url = "https://192.168.5.31/1.0/auth.getAccessToken?jsonp=JSON_CALLBACK&_api_time="+timestamp+"&_api_key=fa1f58046f169f08d3ebf086a11399e4&_api_secret="+secretKey;
        // $http.jsonp(url).success(function (result) {
        //     deferd.resolve(result);
        // });
        $http.jsonp(url).success(function(data){ console.log(data) });
        return deferd.promise;
    }
    return api;
});

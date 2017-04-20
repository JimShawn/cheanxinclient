/**
 * Created by 向麒 on 2017/1/5.
 */
'use strict';
var httpservice = angular.module('httpservice', []);
httpservice.factory('httpService',function ($http, $q, $window, $rootScope, $injector) {
    var serverHost = "http://localhost:8081/cheanxin/";
    var api = {};
    api.login = function (name,password) {
        var deferd = $q.defer();
        var url = serverHost + "oauth/token?grant_type=password&username="+name+"&password="+password;
        $http.post(url,{},{
            headers : {'Authorization' : 'Basic Y2hlYW54aW5fY2xpZW50OmFtcG52YVVRcm1RajdyOWE2Zjk0bHRqQ3V6cVk3amN2WA=='}
        }).then(function (result) {

            $window.sessionStorage["token_info"] = JSON.stringify(result);
            $window.sessionStorage["access_token"] = result.data.access_token;
            var allMeUrl = serverHost + "users/me?access_token=" + $window.sessionStorage["access_token"];
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

    api.logout = function () {
        var deferd = $q.defer();
        var logoutUrl = serverHost + "users/logout?access_token=" + $window.sessionStorage["access_token"];
        $http.delete(logoutUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    }

    api.listUsers = function (query) {
        var queryParams = "";
        for (var key in query) {
            queryParams += "&" + key + "=" + query[key];
        }
        var deferd = $q.defer();
        var listUsersUrl = serverHost + "users?access_token=" + $window.sessionStorage["access_token"]+queryParams;
        $http.get(listUsersUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addUser = function (user) {
        var deferd = $q.defer();
        var addUserUrl = serverHost + "users?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addUserUrl,user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateUser = function (user, id) {
        var deferd = $q.defer();
        var updateUserUrl = serverHost + "users/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateUserUrl, user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchUser = function (user, id) {
        var deferd = $q.defer();
        var patchUserUrl = serverHost + "users/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchUserUrl, user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchUserPassword = function (userPasswordMap) {
        var deferd = $q.defer();
        var patchUserPasswordUrl = serverHost + "users/password?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchUserPasswordUrl, userPasswordMap).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    }

    api.updateUserPost = function (user, postIds) {
        var deferd = $q.defer();
        var updateUserPostUrl = serverHost + "user_posts/users/" + user.username + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateUserPostUrl, postIds).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.listProduct = function (query) {
        var queryParams = "";
        for (var key in query) {
            queryParams += "&" + key + "=" + query[key];
        }
        var deferd = $q.defer();
        var listProductUrl = serverHost + "products?access_token=" + $window.sessionStorage["access_token"] + queryParams;
        $http.get(listProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.listProductTemplate = function (query) {
        var queryParams = "";
        for (var key in query) {
            queryParams += "&" + key + "=" + query[key];
        }
        var deferd = $q.defer();
        var listProductTemplateUrl = serverHost + "product_templates?access_token=" + $window.sessionStorage["access_token"] + queryParams;
        $http.get(listProductTemplateUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getProductByCityId = function (cityId) {
        var deferd = $q.defer();
        var productUrl = serverHost + "products/all?access_token=" + $window.sessionStorage["access_token"] + "&cityId="+cityId;
        $http.get(productUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addProductTemplate = function (product) {
        var deferd = $q.defer();
        var addProductTemplateUrl = serverHost + "product_templates?access_token=" + $window.sessionStorage["access_token"];

        $http.post(addProductTemplateUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.editProductTemplate = function (product) {
        var deferd = $q.defer();
        var editProductTemplateUrl = serverHost + "product_templates/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.patch(editProductTemplateUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addProduct = function (product) {
        var deferd = $q.defer();
        var addProductUrl = serverHost + "products?access_token=" + $window.sessionStorage["access_token"];

        $http.post(addProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.editProduct = function (product) {
        var deferd = $q.defer();
        var editProductUrl = serverHost + "products/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.put(editProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchProduct = function (product) {
        var deferd = $q.defer();
        var patchProductUrl = serverHost + "products/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.patch(patchProductUrl, product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getAllPosition = function (query) {
        var queryParams = "";
        for (var key in query) {
            queryParams += "&" + key + "=" + query[key];
        }
        var deferd = $q.defer();
        var allPostsUrl = serverHost + "posts?access_token=" + $window.sessionStorage["access_token"] + queryParams;
        $http.get(allPostsUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.listAllPosts = function() {
        var deferd = $q.defer();
        var allPostsUrl = serverHost + "posts/all?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allPostsUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    }

    api.addPosition = function (post) {
        var deferd = $q.defer();
        var addPostUrl = serverHost + "posts?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addPostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updatePosition = function (post,id) {
        var deferd = $q.defer();
        var updatePostUrl = serverHost + "posts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updatePostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchPosition = function (post,id) {
        var deferd = $q.defer();
        var patchPostUrl = serverHost + "posts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchPostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllPositionType = function () {
        var deferd = $q.defer();
        var allProductUrl = serverHost + "post_types?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllDept = function () {
        var deferd = $q.defer();
        var allDeptUrl = serverHost + "depts/all?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getDept = function (id) {
        var deferd = $q.defer();
        var getDeptUrl = serverHost + "depts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addDept = function (dept) {
        var deferd = $q.defer();
        var addDeptUrl = serverHost + "depts?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateDept = function (dept,id) {
        var deferd = $q.defer();
        var updateDeptUrl = serverHost + "depts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateDeptCity = function (deptCity) {
        var deferd = $q.defer();
        var updateDeptCityUrl = serverHost + "dept_cities?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateDeptCityUrl,deptCity).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getLoanPreliminary = function(page,size,status){
        var deferd = $q.defer();
        var allDeptUrl = serverHost + "loans?access_token=" + $window.sessionStorage["access_token"] + "&page=" + page + "&size=" + size + "&status=" + status;
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getUserByCityAndPost = function (dept,post) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = serverHost + "users/all?access_token=" + $window.sessionStorage["access_token"] + "&deptId=" + dept + "&postId=" + post;
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addLoandraft = function (loandraft) {
        var deferd = $q.defer();
        var addLoandraftUrl = serverHost + "loans?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addLoandraftUrl,loandraft).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateLoandraft = function (id,loan,loanOperate) {
        var deferd = $q.defer();
        var updateLoandraftUrl = serverHost + "loans/" + id + "?access_token=" + $window.sessionStorage["access_token"] + "&loanOperate=" + loanOperate;
        $http.patch(updateLoandraftUrl,loan).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getProductByID = function (id) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = serverHost + "products/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getOperateLog = function (id,from,to) {
        var deferd = $q.defer();
        var getOperateLogUrl = serverHost + "loan_logs?access_token=" + $window.sessionStorage["access_token"] + "&loanId=" + id + "&fromStatus=" + from + "&toStatus=" + to;
        $http.get(getOperateLogUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarBrand = function () {
        var deferd = $q.defer();
        var getCarBrandUrl = serverHost + "273data/brand?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getCarBrandUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarSeriesByBrand = function (brandId) {
        var deferd = $q.defer();
        var getCarSeriesByBrandUrl = serverHost + "273data/series?access_token=" + $window.sessionStorage["access_token"]+"&brandId="+brandId;
        $http.get(getCarSeriesByBrandUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarTypeBySerie = function (serieId) {
        var deferd = $q.defer();
        var getCarTypeBySerieUrl = serverHost + "273data/types?access_token=" + $window.sessionStorage["access_token"]+"&seriesId="+serieId;
        $http.get(getCarTypeBySerieUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    return api;
});

/**
 * Created by 向麒 on 2017/1/5.
 */
'use strict';
var httpservice = angular.module('httpservice', []);
httpservice.factory('httpService',function ($http, $q, $window, commonUtil) {
    var api = {};
    api.login = function (name,password) {
        var deferd = $q.defer();
        var url = commonUtil.getServerHost() + "oauth/token?grant_type=password&username="+name+"&password="+password;
        $http.post(url,{},{
            headers : {'Authorization' : 'Basic Y2hlYW54aW5fY2xpZW50OmFtcG52YVVRcm1RajdyOWE2Zjk0bHRqQ3V6cVk3amN2WA=='}
        }).then(function (result) {

            $window.sessionStorage["token_info"] = JSON.stringify(result);
            $window.sessionStorage["access_token"] = result.data.access_token;
            var allMeUrl = commonUtil.getServerHost() + "users/me?access_token=" + $window.sessionStorage["access_token"];
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
        var logoutUrl = commonUtil.getServerHost() + "users/logout?access_token=" + $window.sessionStorage["access_token"];
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
        var listUsersUrl = commonUtil.getServerHost() + "users?access_token=" + $window.sessionStorage["access_token"]+queryParams;
        $http.get(listUsersUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addUser = function (user) {
        var deferd = $q.defer();
        var addUserUrl = commonUtil.getServerHost() + "users?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addUserUrl,user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateUser = function (user, id) {
        var deferd = $q.defer();
        var updateUserUrl = commonUtil.getServerHost() + "users/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateUserUrl, user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchUser = function (user, id) {
        var deferd = $q.defer();
        var patchUserUrl = commonUtil.getServerHost() + "users/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchUserUrl, user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchUserPassword = function (userPasswordMap) {
        var deferd = $q.defer();
        var patchUserPasswordUrl = commonUtil.getServerHost() + "users/password?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchUserPasswordUrl, userPasswordMap).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    }

    api.updateUserPost = function (user, postIds) {
        var deferd = $q.defer();
        var updateUserPostUrl = commonUtil.getServerHost() + "user_posts/users/" + user.username + "?access_token=" + $window.sessionStorage["access_token"];
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
        var listProductUrl = commonUtil.getServerHost() + "products?access_token=" + $window.sessionStorage["access_token"] + queryParams;
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
        var listProductTemplateUrl = commonUtil.getServerHost() + "product_templates?access_token=" + $window.sessionStorage["access_token"] + queryParams;
        $http.get(listProductTemplateUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.getProductByCityId = function (cityId) {
        var deferd = $q.defer();
        var productUrl = commonUtil.getServerHost() + "products/all?access_token=" + $window.sessionStorage["access_token"] + "&cityId="+cityId;
        $http.get(productUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addProductTemplate = function (product) {
        var deferd = $q.defer();
        var addProductTemplateUrl = commonUtil.getServerHost() + "product_templates?access_token=" + $window.sessionStorage["access_token"];

        $http.post(addProductTemplateUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.editProductTemplate = function (product) {
        var deferd = $q.defer();
        var editProductTemplateUrl = commonUtil.getServerHost() + "product_templates/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.patch(editProductTemplateUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addProduct = function (product) {
        var deferd = $q.defer();
        var addProductUrl = commonUtil.getServerHost() + "products?access_token=" + $window.sessionStorage["access_token"];

        $http.post(addProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.editProduct = function (product) {
        var deferd = $q.defer();
        var editProductUrl = commonUtil.getServerHost() + "products/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.put(editProductUrl,product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchProduct = function (product) {
        var deferd = $q.defer();
        var patchProductUrl = commonUtil.getServerHost() + "products/" + product.id + "?access_token=" + $window.sessionStorage["access_token"];

        $http.patch(patchProductUrl, product).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.enableOrDisableProduct = function (id, enabled) {
        var deferd = $q.defer();
        var operate = "enable";
        if (!enabled) {
            operate = "disable";
        }
        var enableProductUrl = commonUtil.getServerHost() + "products/" + id + "/" + operate + "?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(enableProductUrl, product).then(function (result) {
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
        var allPostsUrl = commonUtil.getServerHost() + "posts?access_token=" + $window.sessionStorage["access_token"] + queryParams;
        $http.get(allPostsUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.listAllPosts = function() {
        var deferd = $q.defer();
        var allPostsUrl = commonUtil.getServerHost() + "posts/all?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allPostsUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    }

    api.addPosition = function (post) {
        var deferd = $q.defer();
        var addPostUrl = commonUtil.getServerHost() + "posts?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addPostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updatePosition = function (post,id) {
        var deferd = $q.defer();
        var updatePostUrl = commonUtil.getServerHost() + "posts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updatePostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.patchPosition = function (post,id) {
        var deferd = $q.defer();
        var patchPostUrl = commonUtil.getServerHost() + "posts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.patch(patchPostUrl,post).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllPositionType = function () {
        var deferd = $q.defer();
        var allProductUrl = commonUtil.getServerHost() + "post_types?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allProductUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAllDept = function () {
        var deferd = $q.defer();
        var allDeptUrl = commonUtil.getServerHost() + "depts/all?access_token=" + $window.sessionStorage["access_token"];
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getDept = function (id) {
        var deferd = $q.defer();
        var getDeptUrl = commonUtil.getServerHost() + "depts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addDept = function (dept) {
        var deferd = $q.defer();
        var addDeptUrl = commonUtil.getServerHost() + "depts?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateDept = function (dept,id) {
        var deferd = $q.defer();
        var updateDeptUrl = commonUtil.getServerHost() + "depts/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateDeptUrl,dept).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateDeptCity = function (deptCity) {
        var deferd = $q.defer();
        var updateDeptCityUrl = commonUtil.getServerHost() + "dept_cities?access_token=" + $window.sessionStorage["access_token"];
        $http.put(updateDeptCityUrl,deptCity).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getLoanPreliminary = function(page,size,status){
        var deferd = $q.defer();
        var allDeptUrl = commonUtil.getServerHost() + "loans?access_token=" + $window.sessionStorage["access_token"] + "&page=" + page + "&size=" + size + "&status=" + status;
        $http.get(allDeptUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getUserByCityAndPost = function (dept,post) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = commonUtil.getServerHost() + "users/all?access_token=" + $window.sessionStorage["access_token"] + "&deptId=" + dept + "&postId=" + post;
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.addLoandraft = function (loandraft) {
        var deferd = $q.defer();
        var addLoandraftUrl = commonUtil.getServerHost() + "loans?access_token=" + $window.sessionStorage["access_token"];
        $http.post(addLoandraftUrl,loandraft).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.updateLoandraft = function (id,loan,loanOperate) {
        var deferd = $q.defer();
        var updateLoandraftUrl = commonUtil.getServerHost() + "loans/" + id + "?access_token=" + $window.sessionStorage["access_token"] + "&loanOperate=" + loanOperate;
        $http.patch(updateLoandraftUrl,loan).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getProductByID = function (id) {
        var deferd = $q.defer();
        var getUserByCityAndPostUrl = commonUtil.getServerHost() + "products/" + id + "?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getUserByCityAndPostUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getOperateLog = function (id,from,to) {
        var deferd = $q.defer();
        var getOperateLogUrl = commonUtil.getServerHost() + "loan_logs?access_token=" + $window.sessionStorage["access_token"] + "&loanId=" + id + "&fromStatus=" + from + "&toStatus=" + to;
        $http.get(getOperateLogUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarBrand = function () {
        var deferd = $q.defer();
        var getCarBrandUrl = commonUtil.getServerHost() + "273data/brand?access_token=" + $window.sessionStorage["access_token"];
        $http.get(getCarBrandUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarSeriesByBrand = function (brandId) {
        var deferd = $q.defer();
        var getCarSeriesByBrandUrl = commonUtil.getServerHost() + "273data/series?access_token=" + $window.sessionStorage["access_token"]+"&brandId="+brandId;
        $http.get(getCarSeriesByBrandUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getCarTypeBySerie = function (serieId) {
        var deferd = $q.defer();
        var getCarTypeBySerieUrl = commonUtil.getServerHost() + "273data/types?access_token=" + $window.sessionStorage["access_token"]+"&seriesId="+serieId;
        $http.get(getCarTypeBySerieUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    return api;
});

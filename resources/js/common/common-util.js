/**
 * Created by 向麒 on 2017/2/16.
 */
'use strict';
var commonUtil = angular.module('commonUtil',['city']);
commonUtil.factory("commonUtil",function (cityJson) {
    var factory = {};
    factory.getDateFromInt=function(timeInt){
        var time = new Date(timeInt*1000);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        return y+"-"+m+"-"+d;
    };
    factory.getCityNameById=function (id) {
        for (var i in cityJson.provincesList){
            for(var j in cityJson.provincesList[i].Citys){
                if(cityJson.provincesList[i].Citys[j].Id == id){
                    return cityJson.provincesList[i].Name+"-"+cityJson.provincesList[i].Citys[j].Name;
                }
            }
        }
    };

    factory.encodePassword = function(password) {
        for (var i = 0; i < 273; i++) {
            password = hex_md5(password + "cheanxin");
        }
        return password;
    }

    return factory;
});
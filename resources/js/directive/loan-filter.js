'use strict';
var loanFilter = angular.module('loan-filter',[]);

loanFilter.directive('loanFilter', function () {
    return {
        templateUrl:'/pages/directive/loan-filter.html',
    }
});

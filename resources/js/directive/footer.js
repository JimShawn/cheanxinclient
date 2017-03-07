/**
 * Created by 向麒 on 2017/1/14.
 * 尾部页码指令
 */
'use strict';
var man = angular.module('footer',[]);
man.directive('tFooter',[function () {
        return {
            restrict: 'E',
            scope: {
                pageSize: '=',
                pageNum: '=',
                totalPage: '=',
                totalNum: '=',
                changePageSizeFun: '&',
                gotoPageFun:'&'
            },
            templateUrl:'/pages/directive/t-footer.html',
            controller: function ($scope) {
                $scope.pageSizes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
                console.log(typeof $scope.pageSize);

                $scope.changePageSize = function (size) {
                    $scope.changePageSizeFun({size:size});

                }

                $scope.goto = function (page) {
                    $scope.gotoPageFun({page:page});
                }


            }


        }
}]);

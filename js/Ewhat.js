/**
 * Created by Administrator on 2016/4/11.
 */
angular.module("KFLM",['ng','ngRoute','ngAnimate']).config(["$routeProvider",function($routeProcider){
    $routeProcider.
        when("/start",{templateUrl:"tpl/start.html",controller:"startCtr"}).
        when("/main",{templateUrl:"tpl/main.html",controller:"mainCtr"}).
        when("/creatOrder/:did",{templateUrl:"tpl/creatOrder.html",controller:"creatOrderCtr"}).
        when("/myOrder",{templateUrl:"tpl/myOrder.html",controller:"myOrderCtr"}).
        when("/detail/:dishID",{templateUrl:"tpl/detail.html",controller:"detailCtr"}).
        when("/signIn",{templateUrl:"tpl/signIn.html",controller:"signInCtr"}).
        when("/landing",{templateUrl:"tpl/landing.html",controller:"landingCtr"}).
        when("/aboutwsh",{templateUrl:"tpl/aboutwsh.html",controller:"aboutwshCtr"}).
        otherwise({redirectTo:"/start"})
}])
    .controller("parentCtr",function($scope,$location){
        $scope.jump=function(url){
            $location.path(url);
        }
    })
    .controller("startCtr",function(){})
    .controller("signInCtr",function($scope,$http,$routeParams){
        $scope.isSignIn=false;
        $scope.erroSign=true;
        $scope.sign={};
        $scope.submitSign=function(){
            var str=jQuery.param($scope.sign);
            $http.get("php/user_signIn.php?"+str).success(function(data){
                console.log(data);
                if(data[0].msg=="succ"){

                    $scope.succMsg="注册成功！用户名为："+data[0].id;
                    $scope.isSignIn=true;
                }else{
                    $scope.erroMsg="注册失败！";
                    $scope.erroSign=false;
                }
            });
        }
    })
    .controller("landingCtr",function($scope,$http,$rootScope,$location){
        $scope.islanding=true;
        $rootScope.isViewId=false;
        $scope.landing=function() {
            var json = "user=" + $scope.user + "&psw=" + $scope.psw;
            $http.get("php/user_landing.php?" + json).success(
                function (data) {
                    console.log(data);
                    $rootScope.backId = data;
                    console.log($rootScope.backId);
                    if(data.length>0){
                       $location.path('/main');
                        $rootScope.isViewId=true;
                    }else{
                        $scope.islanding=false;
                    }
                }
            );
        }
    })
    .controller("mainCtr",function($scope,$http){
        $scope.isHasMore=true;
        $http.get("php/dish_getbypage.php?start=0").success(function(data){
            $scope.dishArr=data;
        });
        $scope.loadMore=function(){
            $http.get("php/dish_getbypage.php?start="+$scope.dishArr.length).success(function(data){
                $scope.dishArr=$scope.dishArr.concat(data);
                if(data.length<5){
                    $scope.isHasMore=false;
                }
            });
        }
        $scope.$watch("Kw",function(){
            if($scope.Kw){
                $http.get("php/dish_getbykw.php?kw="+$scope.Kw).success(function(data){
                    $scope.dishArr=data;
                });
            }
        });
    })
    .controller("creatOrderCtr",function($scope,$http,$routeParams,$rootScope){
        $rootScope.success=false;
        $scope.erro=true;
        $scope.order={did:$routeParams.did};
        $scope.submitOrder=function(){
            var str=jQuery.param($scope.order);
            $http.get("php/order_add.php?"+str).success(function(data){
                console.log(data);
                if(data[0].msg=="succ"){
                    $scope.succMsg="下单成功！"+data[0].did;
                    $rootScope.phone=$scope.order.phone;
                    $rootScope.success=true;
                }else{
                    $scope.erroMsg="下单失败！";
                    $scope.erro=false;
                }
            });
        }
    })
    .controller("myOrderCtr",function($scope,$http,$rootScope){
        $http.get("php/order_getbyphone.php?phone="+$rootScope.phone).success(
            function(data){
                $scope.backData=data;
            }
        );
    })
    .controller("detailCtr",function($scope,$http,$routeParams){
        var v=$routeParams.dishID;
        $http.get("php/dish_getDishById.php?id="+v).success(function(data){
            $scope.dish=data[0];
        });
    });


/*
 $http.get("php/user_landing.php?user=123456 & psw=13683675299").success(
 function(data){
 console.log(data);
 }
 );
 */
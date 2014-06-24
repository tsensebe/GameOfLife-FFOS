var LIVE = 1;
var DEAD = 0;

    function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    }

angular.module('myApp', ['golService']);

angular.module('myApp').controller('GolCtrl', ['$scope', 'display', function($scope,display) {

    $scope.tickTime = 200;

    $scope.earth = {"name":"blinker", "pattern":[["0","0","0","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","0","0","0"]]};
    display.drawn($scope.earth.pattern);

    // $scope.patterns = patterns.patterns;



    // function tickAndDrawn() {
    //     $scope.earth.pattern = golService.tick($scope.earth.pattern);
    //     golService.drawn($scope.earth.pattern);
    // };
    
    // runLife = function() {
    //     tickAndDrawn();
    //     window.setTimeout("runLife()", $scope.tickTime);
    // };
    
    // window.setTimeout("runLife()", $scope.tickTime);
}]);



angular.module('golService', []);

angular.module('golService').service('display',[function(){
    
    this.drawn = function(earth) {

        var scaleX = 320 / window.innerWidth;
        var width = 320*scaleX;
        

        var scaleY = 480 / window.innerHeight;
        var height = 480*scaleY-100;

        var canvas = document.getElementById("myCanvas");
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");

        var x = width / 32;
        var y = height / 38;

        for (var i=0;i<38;i++) {
            for (var j=0;j<32;j++) {
                ctx.fillStyle="#EEEEEE";
                ctx.fillRect(j*x,i*y,x-1,y-1);
            }
        }

        for (var i=0;i<earth.length;i++) {
            for (var j=0;j<earth[i].length;j++) {
                if(isAlive(earth[i][j])) {
                    ctx.fillStyle="#FF0000";
                    ctx.fillRect(j*x,i*y,x-1,y-1);
                }
            }
        }
    };

}])

angular.module('golService').service('engine', [function () {
    

    this.isAlive = function(dot) {
        return dot == LIVE;
    };

    this.initNewEarth = function(earth) {
        var newEarth = new Array();
        for(var i=0;i < earth.length; i++){
            newEarth[i] = new Array();
            for(var j=0;j < earth[i].length; j++)
                newEarth[i][j] = earth[i][j];
        }
        return newEarth;
    };

    this.nextNeighbor= function (earth,n,xOrY) {
        if(xOrY == "x") 
            return n==earth.length-1 ? 0 : n+1;
        else
            return n==earth[0].length-1 ? 0 : n+1;
    };

    this.prevNeighbor = function(eprevNeighborarth,n,xOrY) {
        if(xOrY == "x") 
            return n==0 ? earth.length-1 : n-1;
        else
            return n==0 ? earth[0].length-1 : n-1;
    };

    this.nbNeighbour = function(earth,x,y){
        var result = 0;
        if (isAlive(earth[prevNeighbor(earth,x, "x")][prevNeighbor(earth,y, "y")]))
            result += 1;
        if (isAlive(earth[prevNeighbor(earth,x, "x")][y]))
            result += 1;
        if (isAlive(earth[prevNeighbor(earth,x, "x")][nextNeighbor(earth,y, "y")]))
            result += 1;
        if (isAlive(earth[x][prevNeighbor(earth,y, "y")]))
            result += 1;
        if (isAlive(earth[x][nextNeighbor(earth,y, "y")]))
            result += 1;
        if (isAlive(earth[nextNeighbor(earth,x, "x")][prevNeighbor(earth,y, "y")]))
            result += 1;
        if (isAlive(earth[nextNeighbor(earth,x, "x")][y]))
            result += 1;
        if (isAlive(earth[nextNeighbor(earth,x, "x")][nextNeighbor(earth,y, "y")]))
            result += 1;
        return result;
    };

    this.tick = function(earth) {
        var futureEarth = initNewEarth(earth);
        for (var i = 0; i < earth.length; i++) {
            for (var j = 0; j < earth[0].length; j++) {
                var neighbour = nbNeighbour(earth,i,j);
                if(isAlive(earth[i][j])) {
                    if(neighbour != 2 && neighbour != 3) 
                        futureEarth[i][j] = 0;
                }  
                else {
                     if(neighbour == 3) 
                        futureEarth[i][j] = 1;
                }
            }
        }
        return futureEarth;
    };





}])



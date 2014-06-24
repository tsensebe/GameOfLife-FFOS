angular.module('golService').service('engine',[function(){

    function isAlive(dot) {
        return dot == 1;
    };

    function initNewEarth(earth) {
        var newEarth = new Array();
        for(var i=0;i < earth.length; i++){
            newEarth[i] = new Array();
            for(var j=0;j < earth[i].length; j++)
                newEarth[i][j] = earth[i][j];
        }
        return newEarth;
    };

    function nextNeighbor(earth,n,xOrY) {
        if(xOrY == "x") 
            return n==earth.length-1 ? 0 : n+1;
        else
            return n==earth[0].length-1 ? 0 : n+1;
    };

    function prevNeighbor(earth,n,xOrY) {
        if(xOrY == "x") 
            return n==0 ? earth.length-1 : n-1;
        else
            return n==0 ? earth[0].length-1 : n-1;
    };

    function nbNeighbour(earth,x,y){
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

}]);
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

function isAlive(dot) {
    return dot == LIVE;
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

function tick(earth) {
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



function drawn(earth) {
    var width = window.innerWidth;
    var height = 420;

	var ctx=document.getElementById("myCanvas").getContext("2d");
	ctx.canvas.width  = width
    ctx.canvas.height = height;
	ctx.clearRect (0, 0, window.innerWidth, 420);


    for (var i=0;i<40;i++) {
        for (var j=0;j<32;j++) {
            ctx.fillStyle="#EEEEEE";
            ctx.fillRect(j*10,i*10,9,9);
        }
    }

	for (var i=0;i<earth.length;i++) {
		for (var j=0;j<earth[i].length;j++) {
			if(isAlive(earth[i][j])) {
                ctx.fillStyle="#FF0000";
				ctx.fillRect(j*10,i*10,9,9);
			}
		}
	}
};
var run = true;

var myApp = angular.module('myApp', []);
myApp.controller('GolCtrl', function($scope,$http) {

    $scope.tickTime = 200;

    $scope.earth = {"name":"blinker", "pattern":[["0","0","0","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","0","0","0"]]};
    drawn($scope.earth.pattern);

    $scope.patterns = patterns.patterns;

    function tickAndDrawn() {
        $scope.earth.pattern = tick($scope.earth.pattern);
        drawn($scope.earth.pattern);
    };
    
    runLife = function() {
        tickAndDrawn();
        window.setTimeout("runLife()", $scope.tickTime);
    };
    
    window.setTimeout("runLife()", $scope.tickTime);
});

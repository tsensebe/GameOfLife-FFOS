angular.module('myApp', ['golService']);
angular.module('myApp').controller('GolCtrl', ['$scope', 'display', 'engine', function($scope,display,engine) {

    $scope.patterns = patterns.patterns;
    $scope.tickTime = 200;
    $scope.earth = {"name":"blinker", "pattern":[["0","0","0","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","1","0","0"],
                                                 ["0","0","0","0","0"]]};
    display.drawn($scope.earth.pattern);
    

    function tickAndDrawn() {
        $scope.earth.pattern = engine.tick($scope.earth.pattern);
        display.drawn($scope.earth.pattern);
    };
    
    runLife = function() {
        tickAndDrawn();
        window.setTimeout("runLife()", $scope.tickTime);
    };
    
    window.setTimeout("runLife()", $scope.tickTime);
}]);
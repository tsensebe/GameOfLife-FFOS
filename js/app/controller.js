angular.module('myApp', ['golService']);
angular.module('myApp').controller('GolCtrl', ['$scope', 'display', 'engine', function($scope,display,engine) {

    $scope.patterns = patterns.patterns;
    $scope.tickTime = 200;
    $scope.earth = {"name":"blinker", "population":{"x16y17":{x:16,y:17},"x16y18":{x:16,y:18},"x16y19":{x:16,y:19}}};
    display.drawn($scope.earth.population);

    
    function tickAndDrawn() {
        $scope.earth.population = engine.tick($scope.earth.population);
        display.drawn($scope.earth.population);
    };
    
    runLife = function() {
        tickAndDrawn();
        window.setTimeout("runLife()", $scope.tickTime);
    };
    
    window.setTimeout("runLife()", $scope.tickTime);
}]);
angular.module('golService').service('engine',[function(){

    var maxX = 31;
    var maxY = 37;

    function createDot(x,y) {
        return {"x":x,"y":y};
    }

    function dotKey(x,y) {
        return "x" + x + "y" + y;
    }
    
    function next(max,xOrY) {
        return xOrY == max ? 0 : xOrY+1;
    };

    function prev(max,xOrY) {
        return xOrY == 0 ? max : xOrY-1;
    };
    
    function exist(x, y, population) {
        return (dotKey(x,y) in population);
    }
    
    function getNeighbors(person) {
        var neighbors = new Object();
        neighbors[dotKey(prev(maxX, person.x), prev(maxY, person.y))] = createDot(prev(maxX, person.x), prev(maxY, person.y));
        neighbors[dotKey(prev(maxX, person.x), person.y)]             = createDot(prev(maxX, person.x), person.y);
        neighbors[dotKey(prev(maxX, person.x), next(maxY, person.y))] = createDot(prev(maxX, person.x), next(maxY, person.y));
        neighbors[dotKey(person.x, prev(maxY, person.y))]             = createDot(person.x, prev(maxY, person.y));
        neighbors[dotKey(person.x, next(maxY, person.y))]             = createDot(person.x, next(maxY, person.y));
        neighbors[dotKey(next(maxX, person.x), prev(maxY, person.y))] = createDot(next(maxX, person.x), prev(maxY, person.y));
        neighbors[dotKey(next(maxX, person.x), person.y)]             = createDot(next(maxX, person.x), person.y);
        neighbors[dotKey(next(maxX, person.x), next(maxY, person.y))] = createDot(next(maxX, person.x), next(maxY, person.y));
        return neighbors;
    }
    
    this.tick = function(population) {
        var newPopulation = new Object();
        var candidates = new Object();
        
        angular.forEach(population, function(person) {
            var nbAliveNeighbor = 0;
            var neighbors = getNeighbors(person);
            angular.forEach(neighbors, function(neighbor){
                if(exist(neighbor.x, neighbor.y, population)) 
                    nbAliveNeighbor++;
                else 
                    candidates[dotKey(neighbor.x, neighbor.y)] = neighbor;
            });
            

            if(nbAliveNeighbor == 2 || nbAliveNeighbor == 3)
                newPopulation[dotKey(person.x,person.y)] = person;
        });
        
        angular.forEach(candidates, function(person) {
            var nbAliveNeighbor = 0;
            var neighbors = getNeighbors(person);
            angular.forEach(neighbors, function(neighbor){
                if(exist(neighbor.x, neighbor.y, population)) 
                    nbAliveNeighbor++;
            });
            
            if(nbAliveNeighbor == 3)
                newPopulation[dotKey(person.x,person.y)] = person;
        });
        return newPopulation;
    }
    

}]);
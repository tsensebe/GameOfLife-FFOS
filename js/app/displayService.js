angular.module('golService', []);

angular.module('golService').service('display',[function(){
    
    var X_SIZE = 32;
    var Y_SIZE = 38;

    this.drawn = function(population) {

        var scaleX = 320 / window.innerWidth;
        var width = 320*scaleX;        

        var scaleY = 480 / window.innerHeight;
        var height = 480*scaleY-100;

        // var width = 320;
        // var height = 480;
        var canvas = document.getElementById("myCanvas");
        canvas.width = width;
        canvas.height = height;

        var xSize = width / X_SIZE;
        var ySize = height / Y_SIZE;

        var ctx = canvas.getContext("2d");

        for (var i=0;i<Y_SIZE;i++) {
            for (var j=0;j<X_SIZE;j++) {
                ctx.fillStyle="#EEEEEE";
                ctx.fillRect(j*xSize, i*ySize, xSize-1, ySize-1);
            }
        }

        angular.forEach(population, function(person) {
            ctx.fillStyle="#FF0000";
            ctx.fillRect(person.x*xSize, person.y*ySize, xSize-1, ySize-1);
        });
    };

}])
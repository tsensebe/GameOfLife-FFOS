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
                if(earth[i][j] == 1) {
                    ctx.fillStyle="#FF0000";
                    ctx.fillRect(j*x,i*y,x-1,y-1);
                }
            }
        }
    };

}])
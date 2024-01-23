$(document).ready(function() {
 
    $("#video-container").mousemove(function(e) {
        var mouseX = e.pageX - $(this).offset().left;
        var mouseY = e.pageY - $(this).offset().top;

         var horizontalLine = $("#horizontal-line");
        if (!horizontalLine.length) {
            horizontalLine = $("<div id='horizontal-line' class='mouse-line horizontal-line'></div>").appendTo("#video-container");
        }
        horizontalLine.css("top", mouseY);

        var verticalLine = $("#vertical-line");
        if (!verticalLine.length) {
            verticalLine = $("<div id='vertical-line' class='mouse-line vertical-line'></div>").appendTo("#video-container");
        }
        verticalLine.css("left", mouseX);
        verticalLine.css("top", 0);

        document.getElementById("position").innerHTML =  "Mouse X: " + mouseX + ", Mouse Y: " + mouseY;
        document.getElementById("time").innerHTML = "Time: " + currentTime.toFixed(1);
    });
    let clicked = false;
    let mouseX;
    let mouseY;
    $("#video-container").mousedown(function(e) {

        if (event.which == 2){
            if (!clicked){
                mouseX = e.pageX - $(this).offset().left;
                mouseY = e.pageY - $(this).offset().top;
                document.getElementById("widthAndHeight").innerHTML =  "Saved first Corner";
                clicked = true;
            } else {
                let mouseX2 = e.pageX - $(this).offset().left;
                let mouseY2 = e.pageY - $(this).offset().top;
            
                let json = "{\"time\": " + currentTime.toFixed(1) + ", \"x\": " + mouseX + ", \"y\": " + mouseY +
                ", \"width\" :" + (mouseX2 - mouseX) + ", \"height\": " + (mouseY2 - mouseY) + "},";

                document.getElementById("widthAndHeight").innerHTML =  json;

                //Copy to clipoard function
                var textArea = $("<textarea>")
                    .val(json)
                    .css({ position: "absolute", left: "-1000px", top: "-1000px" })
                    .appendTo("body");

                textArea.select();
                document.execCommand('copy');

                textArea.remove();
              
                clicked = false;
            }
        }
    });
});
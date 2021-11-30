import { RangeSlider, SetFunctions } from "./rangeslider.js";

$(document).ready(function() {
    var x = new RangeSlider({});

    x.test({
        element: "container",
        color: "#ecedef",

    });

    // x.testfunction();
    // SetFunctions();
    var startDrag = x.dragStart.bind(x);
    var endDrag = x.dragEnd.bind(x);
    var mouseDrag = x.drag.bind(x);
    container.addEventListener("touchstart", startDrag);
    container.addEventListener("touchend", endDrag);
    container.addEventListener("touchmove", mouseDrag);

    container.addEventListener("mousedown", startDrag);
    container.addEventListener("mouseup", endDrag);
    container.addEventListener("mousemove", mouseDrag);


    // container.addEventListener('click', boundFn);












})
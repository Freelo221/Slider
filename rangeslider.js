export class RangeSlider {




    constructor(element, color, ...test) {
        // this.elem = element;
        // this.color = color;
        this.dragItem = "";
        this.container = "";

        this.min = 0;
        this.max = 0;
        this.step = 0;


        this.dragItemHeight = 0;
        this.dragItemWidth = 0;
        this.currentPos = 0;
        this.active = false;
        this.currentX = 0;
        this.currentY = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.xOffset = 0;
        this.yOffset = 0;
        this.pointWidth = 0;
        this.posAll = [];
        this.valuesall = [];
    }

    dragStart(e) {
        console.log("object");
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }
        // alert(e.target);
        // alert(this.dragItem);
        if (e.target === this.dragItem) {
            alert();
            this.active = true;
        }
    }


    dragEnd(e) {


        if (this.currentX <= 0) {
            this.currentX = 0;
        }
        // console.log(currentX);
        // if (currentX >= 400) {
        //     currentX = container.offsetWidth - 30;
        // }
        // this.SnapToGrid(this.currentX);
        // setTranslate(currentX, 0, dragItem);
        this.active = false;
    }



    drag(e) {
        if (this.active) {

            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
                // console.log(currentX);
                // currentY = e.touches[0].clientY - initialY;
            } else {
                this.currentX = e.clientX - initialX;
                console.log(this.currentX);
                // currentY = e.clientY - initialY;
            }


            // yOffset = currentY;
            $(".track").css("width", (this.container.offsetWidth - (Math.abs(this.currentX - this.container.offsetWidth)) + (this.dragItemWidth / 2)));
            this.setTranslate(this.currentX, 0, this.dragItem);
        }
    }


    setTranslate(xPos, yPos, el) {
        // initialX = xPos
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        $(".track").css("width", (this.container.offsetWidth - (Math.abs(xPos - this.container.offsetWidth)) + (this.dragItemWidth / 2)));
        console.log(parseInt(this.valuesall[this.currentPos]) + parseInt(this.min));
        $("#SliderValueOutput").text(this.valuesall[this.currentPos] + parseInt(this.min));
    }

    SnapToGrid(posX) {

        var finalPos = 0;
        alert(this.posAll);
        this.posAll.forEach((elem, i) => {
            let curPoint = this.container.offsetWidth * (elem / 100);
            if (posX > curPoint) {
                if (i != this.posAll.length) {
                    let offsetPrevPoint = posX - ((this.posAll[i] / 100) * container.offsetWidth);
                    console.log("offset1: " + offsetPrevPoint);
                    let offsetNextPoint = ((this.posAll[i + 1] / 100) * container.offsetWidth) - posX;
                    console.log("offset2: " + offsetNextPoint);
                    if (offsetNextPoint > offsetPrevPoint) {
                        if (i == 0) {
                            finalPos = ((0 - (dragItemWidth / 2)) + 0) + 1
                            this.currentPos = 0;
                            this.xOffset = finalPos;
                        } else {
                            finalPos = (this.posAll[i] / 100) * container.offsetWidth - this.dragItemWidth / 2 + 1;
                            this.currentPos = i;
                            this.xOffset = finalPos;
                        }

                    } else {
                        finalPos = (this.posAll[i + 1] / 100) * this.container.offsetWidth - this.dragItemWidth / 2 + 1;
                        this.currentPos = i + 1;
                        this.xOffset = finalPos + 0;
                        if ((this.posAll[i + 1] / 100) * container.offsetWidth == 500) {
                            // finalPos = ((posAll[i + 1] / 100) * container.offsetWidth - (this.dragItemWidth / 2) - pointWidth + 0 + 1);
                            finalPos = ((this.posAll[i + 1] / 100) * this.container.offsetWidth - (this.dragItemWidth / 2) + 0 + 1);
                            this.currentPos = i + 1;
                            xOffset = finalPos + 0;
                        }
                    }

                }


            } else {
                if (i == 0) {
                    finalPos = ((0 - (this.dragItemWidth / 2)) + 0 + 1)
                    globalThis.currentPos = 0;
                    alert(self.currentPos);
                    globalThis.xOffset = finalPos;
                    console.log("asdasd");
                }
            }

        });
        // $(this.posAll).each(function(i, elem) {

        // })

        // setTranslate(finalPos, 0, this.dragItem);
        // this.initialX = finalPos;
    }

    testfunction() {
        alert(this.dragItem);
    }

    test(base, breakpoints) {
        const baseElement = document.querySelector("#" + base.element);
        const track = '<div class="track"></div>';
        const sliderFront = '<div class="sliderFront"></div>';
        const sliderBack = '<div class="sliderBack"></div>';
        const handle = '<div class="item" id="item"></div>';
        baseElement.innerHTML = track;
        baseElement.innerHTML = sliderFront;
        baseElement.innerHTML = sliderBack;
        baseElement.innerHTML = handle;


        this.dragItem = document.querySelector("#item");
        alert(this.dragItem)
        this.container = baseElement;

        this.dragItemHeight = this.dragItem.offsetHeight;
        this.dragItemWidth = this.dragItem.offsetWidth;

        this.currentPos = 0;
        this.active = false;
        // var currentX;
        // var currentY;
        // var initialX;
        // var initialY;
        this.xOffset = 0;
        this.yOffset = 0;

        // var pointWidth;





        // min = $("#container").attr("min");
        let min = 5000;
        this.min = min;
        // max = $("#container").attr("max");
        let max = 8000;
        this.max = max;
        // step = $("#container").attr("step");
        let step = 1000;
        this.step = step;
        let count = (max - min) / step;

        for (var i = 0; i <= count; i++) {

            var pos = (100 / ((max - min) / step)) * i;
            this.posAll.push(pos);
            this.valuesall.push(i * step);
            if (i == 0) {
                console.log(i + ": first");
                baseElement.innerHTML += "<div style='left: calc(" + pos + "%') class='sliderBreak'></div>";
            } else if (i == count) {
                console.log(i + ": last");
                baseElement.innerHTML += "<div style='left: calc(" + pos + "% - 0px') class='sliderBreak'></div>";
            } else {
                console.log(i + ": mid");
                baseElement.innerHTML += "<div style='left: calc(" + pos + "% - 0px') class='sliderBreak'></div>";
            }
        }
        // this.testa();
        this.testfunction();
        this.pointWidth = $(".sliderBreak")[0].getBoundingClientRect().height;
        this.SnapToGrid(this.container.offsetWidth / 3);
        console.log(globalThis.posAll);
        // baseElement.insertAdjacentHTML(track)
        document.getElementById(base.element).style.backgroundColor = base.color;
    }


}

export function SetFunctions() {

}



function printMousePos(e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    // SnapToGrid(x, 0, dragItem);
    console.log("Left? : " + x + " ; Top? : " + y + ".");
}
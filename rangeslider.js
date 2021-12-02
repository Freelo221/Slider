class RangeSlider {

    constructor(base) {
        this.base = base;
        const baseElement = document.querySelector("#" + base.element);
        const outputElement = document.querySelector("#" + base.output);

        base.min ? this.min = base.min : this.min = 0;
        base.max ? this.max = base.max : this.max = 5;
        base.step ? this.step = base.step : this.step = 1;
        base.start ? this.startPos = base.start : this.startPos = 2;

        base.unit ? this.unit = base.unit : this.unit = "";

        base.highlightColor ? this.highlightColor = base.highlightColor : this.highlightColor = "red";
        base.highlight ? this.highlight = base.highlight : this.highlight = false;
        if (base.SliderDots) {
            base.SliderDots.color ? this.DotColor = base.SliderDots.color : this.DotColor = "#ccc";
        }

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
        this.dotList = [];


        //Slider Container
        base.color ? baseElement.style.backgroundColor = base.color : baseElement.style.backgroundColor = "#ecedef"
        base.width ? baseElement.style.width = base.width : baseElement.style.width = "500px";
        base.height ? baseElement.style.height = base.height : baseElement.style.height = "30px";




        //Slider Track Element
        let sliderTrack = document.createElement('div');
        sliderTrack.classList.add("track");
        if (base.SliderTrack) {
            sliderTrack.style.height = base.SliderTrack.height;
            sliderTrack.style.background = base.SliderTrack.background;
        }
        baseElement.appendChild(sliderTrack);



        //Slider Front Element
        let sliderFront = document.createElement('div');
        sliderFront.classList.add("sliderFront");
        if (base.FrontItem) {
            if (!base.FrontItem.show) {
                sliderFront.style.display = "none";
            } else {
                sliderFront.style.width = base.FrontItem.width;
                sliderFront.style.left = base.FrontItem.offset;
                sliderFront.style.background = base.FrontItem.color;
            }
        }

        baseElement.appendChild(sliderFront);


        //Slider Back Element
        let sliderBack = document.createElement('div');
        sliderBack.classList.add("sliderBack");
        if (base.BackItem) {
            if (!base.BackItem.show) {
                sliderBack.style.display = "none";
            } else {
                sliderBack.style.width = base.BackItem.width;
                sliderBack.style.right = base.BackItem.offset;
                sliderBack.style.background = base.BackItem.color;
            }
        }

        baseElement.appendChild(sliderBack);

        //Slider Drag Element
        let sliderHandle = document.createElement('div');
        sliderHandle.classList.add("SliderHandle");
        sliderHandle.setAttribute("id", "item");
        if (base.SliderHandle) {
            sliderHandle.style.height = base.SliderHandle.dragItemHeight;
            sliderHandle.style.width = base.SliderHandle.dragItemWidth;
            sliderHandle.style.border = base.SliderHandle.borderWidth + " solid " + base.SliderHandle.borderColor;
        }

        baseElement.appendChild(sliderHandle);


        this.container = baseElement;
        this.output = outputElement;
        this.dragItem = sliderHandle;

        this.trackItem = sliderTrack;
        this.frontItem = sliderFront;
        this.backItem = sliderBack;

        this.dragItemHeight = this.dragItem.offsetHeight;
        this.dragItemWidth = this.dragItem.offsetWidth;

        this.currentPos = 0;
        this.active = false;
        this.xOffset = 0;
        this.yOffset = 0;

        let count = (this.max - this.min) / this.step;

        for (var i = 0; i <= count; i++) {

            var pos = (100 / ((this.max - this.min) / this.step)) * i;
            this.posAll.push(pos);
            this.valuesall.push(i * this.step);
            if (i == 0) {
                let elem = document.createElement('div');
                elem.classList.add('sliderBreak');
                elem.setAttribute('style', 'left: calc(' + pos + '%'); //mb add some offset
                if (base.SliderDots) {
                    elem.style.scale = base.SliderDots.scale;
                    elem.style.background = base.SliderDots.color;
                    if (base.SliderDots.form == "square") {
                        elem.style.borderRadius = "0%";
                    } else {

                    }
                }
                baseElement.appendChild(elem);
                this.dotList.push(elem);
            } else if (i == count) {
                let elem = document.createElement('div');
                elem.classList.add('sliderBreak');
                elem.setAttribute('style', 'left: calc(' + pos + '%'); //mb add some offset
                if (base.SliderDots) {
                    elem.style.scale = base.SliderDots.scale;
                    elem.style.background = base.SliderDots.color;
                    if (base.SliderDots.form == "square") {
                        elem.style.borderRadius = "0%";
                    } else {

                    }
                }
                baseElement.appendChild(elem);
                this.dotList.push(elem);
            } else {
                let elem = document.createElement('div');
                elem.classList.add('sliderBreak');
                elem.setAttribute('style', 'left: calc(' + pos + '%'); //mb add some offset
                if (base.SliderDots) {
                    elem.style.scale = base.SliderDots.scale;
                    elem.style.background = base.SliderDots.color;
                    if (base.SliderDots.form == "square") {
                        elem.style.borderRadius = "0%";
                    } else {

                    }
                }
                baseElement.appendChild(elem);
                this.dotList.push(elem);
            }
        }
        this.pointWidth = document.querySelector("#" + base.element + " .sliderBreak").getBoundingClientRect().width;
        this.SnapToGrid(this.container.offsetWidth * this.posAll[this.startPos] / 100);

        var startDrag = this.dragStart.bind(this);
        var endDrag = this.dragEnd.bind(this);
        var mouseDrag = this.drag.bind(this);
        var printMousePos = this.printMousePos.bind(this);
        baseElement.addEventListener('click', printMousePos);

        baseElement.addEventListener("touchstart", startDrag);
        baseElement.addEventListener("touchend", endDrag);
        baseElement.addEventListener("touchmove", mouseDrag);

        baseElement.addEventListener("mousedown", startDrag);
        baseElement.addEventListener("mouseup", endDrag);
        baseElement.addEventListener("mousemove", mouseDrag);

    }

    printMousePos(e) {
        console.log(this.active)
        if (!this.isDrag) {
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            this.SnapToGrid(x, 0, this.dragItem);
        } else {
            this.isDrag = false;
        }
    }

    dragStart(e) {
        if (e.type === "touchstart") {
            this.initialX = e.touches[0].clientX - this.xOffset;
            this.initialY = e.touches[0].clientY - this.yOffset;
        } else {
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
        }

        if (e.target === this.dragItem) {
            this.active = true;
        }

    }

    dragEnd(e) {
        if (this.currentX <= 0) {
            this.currentX = 0;
        }
        this.SnapToGrid(this.currentX);
        this.active = false;
    }

    drag(e) {
        if (this.active) {
            this.isDrag = true;
            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX - this.initialX;
            } else {
                this.currentX = e.clientX - this.initialX;
            }
            this.trackItem.style.width = this.container.offsetWidth - (Math.abs(this.currentX - this.container.offsetWidth)) + (this.dragItemWidth / 2) + "px";
            this.setTranslate(this.currentX, 0, this.dragItem);
        }
    }


    setTranslate(xPos, yPos, el) {
        this.dragItem.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        this.trackItem.style.width = this.container.offsetWidth - (Math.abs(xPos - this.container.offsetWidth)) + (this.dragItemWidth / 2) + "px";
        this.output.innerHTML = (this.valuesall[this.currentPos] + parseInt(this.min) + this.unit);
        this.HighlightDot();
    }

    SnapToGrid(posX) {

        var finalPos = 0;
        this.posAll.forEach((elem, i) => {
            let curPoint = this.container.offsetWidth * (elem / 100);
            if (posX > curPoint) {
                if (i != this.posAll.length) {
                    let offsetPrevPoint = posX - ((this.posAll[i] / 100) * this.container.offsetWidth);
                    let offsetNextPoint = ((this.posAll[i + 1] / 100) * this.container.offsetWidth) - posX;

                    if (offsetNextPoint > offsetPrevPoint) {
                        if (i == 0) {
                            finalPos = ((0 - (this.dragItemWidth / 2)) + 0) + 1
                            this.currentPos = 0;
                            this.xOffset = finalPos;

                        } else {
                            finalPos = (this.posAll[i] / 100) * this.container.offsetWidth - this.dragItemWidth / 2 + 1;
                            this.currentPos = i;
                            this.xOffset = finalPos;
                        }

                    } else {
                        finalPos = (this.posAll[i + 1] / 100) * this.container.offsetWidth - this.dragItemWidth / 2 + 1;
                        this.currentPos = i + 1;
                        this.xOffset = finalPos + 0;
                        if ((this.posAll[i + 1] / 100) * this.container.offsetWidth == 500) {
                            finalPos = ((this.posAll[i + 1] / 100) * this.container.offsetWidth - (this.dragItemWidth / 2) + 0 + 1);
                            this.currentPos = i + 1;
                            this.xOffset = finalPos + 0;
                        }
                    }

                }


            } else {
                if (i == 0) {
                    finalPos = ((0 - (this.dragItemWidth / 2)) + 0 + 1)
                    this.currentPos = 0;
                    this.xOffset = finalPos;
                }
            }

        });
        this.initialX = finalPos;
        this.setTranslate(finalPos, 0, this.dragItem);
    }

    HighlightDot() {
        this.dotList.forEach((elem, i) => {
            if (this.highlight) {
                elem.style.background = this.DotColor;
            }
            elem.classList.remove("active");

            // 


        })

        if (this.highlight) {
            this.dotList[this.currentPos].style.background = this.highlightColor;
        }
        this.dotList[this.currentPos].classList.add("active");



    }
}
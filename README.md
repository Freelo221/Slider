            const x = new RangeSlider({
                element: "container",
                output: "SliderValueOutput",
            });

            const y = new RangeSlider({
                element: "container2", //container element id*
                output: "SliderValueOutput2", //output element id*/ background 
                min: 5000, //min slider value
                max: 8000, //max slider value
                step: 1000, //step slider value
                start: 1, //Preselected Dot (0-X)
                color: "#000", // background color
                width: "500px", //element width as string - unit*
                height: "30px", // element height as string - unit*
                unit: " mm", // output + unit ---  3000 mm
                highlightColor: "#ccc", //current dot highlight color
                highlight: true, //highlight current dot
                SliderHandle: { //optional
                    dragItemHeight: "50px", //sliderhandler height as string unit*
                    dragItemWidth: "50px", //sliderhandler width as string unit*
                    borderWidth: "5px", //sliderhandler border width as string unit*
                    borderColor: "red" //sliderhandler border color as string unit*
                },
                SliderTrack: { //optional
                    height: "20%", //slidertrack height as string unit*
                    background: "#fff" //slidertrack background
                },
                SliderDots: { //optional
                    scale: 10, //sliderdots scale (height = scale / 2)
                    color: "#fff", //sliderdots color
                    form: "square" //sliderdots form - square 
                },
                FrontItem: { //optional 
                    show: true,
                    width: "30px", //frontitem width as string unit*
                    offset: "-30px", //frontitem offset as string unit*
                    color: "#001", //frontitem color 
                },
                BackItem: {
                    show: true,
                    width: "30px", //backitem width as string unit*
                    offset: "-30px", //backitem offset as string unit*
                    color: "#001", //backitem color 
                }
            });
        })
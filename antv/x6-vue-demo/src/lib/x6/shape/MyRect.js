import { Shape } from "@antv/x6";

export default (X6) => {
    
    try {
        Shape.Rect.define({
            shape: "my-rect",
            width: 180,
            height: 80,
            ports: {
                groups: {
                    LEFT: {
                        position: "left",
                        attrs: {
                            circle: {
                                r: 6,
                                magnet: true,
                                stroke: "#31d0c6",
                                strokeWidth: 2,
                                fill: "#fff",
                            },
                        },
                    },
                    RIGHT: {
                        position: "right",
                        attrs: {
                            circle: {
                                r: 6,
                                magnet: true,
                                stroke: "#31d0c6",
                                strokeWidth: 2,
                                fill: "#fff",
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        console.log(error)
    }

}
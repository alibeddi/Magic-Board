import React, { useState, useEffect, MouseEvent } from "react";

import Swatch from "./components/swatch";
import rough from "roughjs/bundled/rough.esm";

const gen = rough.generator();
function createElement(id: number, x1: number, y1: number, x2: number, y2: number) {
    const roughEle = gen.line(x1, y1, x2, y2);
    return { id, x1, y1, x2, y2, roughEle };
}

const midPointBtw = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
    return {
        x: p1.x + (p2.x - p1.x) / 2,
        y: p1.y + (p2.y - p1.y) / 2,
    };
};

export const adjustElementCoordinates = (element: {
    type: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}) => {
    const { type, x1, y1, x2, y2 } = element;
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
        return { x1, y1, x2, y2 };
    } else {
        return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
};

type Element = {
    id: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    type: string; // Add the 'type' property
    strokeWidth: number; // Add the 'strokeWidth' property (adjust the type accordingly)
    roughEle: any; // You may want to specify a more specific type for roughEle
};


type Point = {
    clientX: number;
    clientY: number;
    transparency: string;
};

function App() {
    const [elements, setElements] = useState<Element[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);

    const [points, setPoints] = useState<Point[]>([]);
    const [path, setPath] = useState<Point[][]>([]);

    const [action, setAction] = useState("none");
    const [toolType, setToolType] = useState("pencil");
    const [selectedElement, setSelectedElement] = useState<Element | null>(null);

    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        context.lineCap = "round";
        context.lineJoin = "round";

        context.save();

        const drawpath = () => {
            path.forEach((stroke, index) => {
                context.beginPath();

                stroke.forEach((point, i) => {
                    var midPoint = midPointBtw({ x: point.clientX, y: point.clientY }, { x: point.clientX, y: point.clientY });

                    context.quadraticCurveTo(
                        point.clientX,
                        point.clientY,
                        midPoint.x,
                        midPoint.y
                    );
                    context.lineTo(point.clientX, point.clientY);
                    context.stroke();
                });
                context.closePath();
                context.save();
            });
        };

        const roughCanvas = rough.canvas(canvas);

        if (path !== undefined) drawpath();

        elements.forEach(({ roughEle }) => {
            context.globalAlpha = 1;
            roughCanvas.draw(roughEle);
        });

        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements, path]);

    const updateElement = (index: number, x1: number, y1: number, x2: number, y2: number, toolType: string) => {
        const updatedElement = {
            id: index,
            x1,
            y1,
            x2,
            y2,
            type: toolType,
            strokeWidth: 5,
            roughEle: gen.line(x1, y1, x2, y2),
        }
        const elementsCopy = [...elements];
        elementsCopy[index] = updatedElement;
        setElements(elementsCopy);
    };

    const handleMouseDown = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        const id = elements.length;
        if (toolType === "pencil") {
            setAction("sketching");
            setIsDrawing(true);

            const transparency = "1.0";
            const newEle = {
                clientX,
                clientY,
                transparency,
            };
            setPoints((state) => [...state, newEle]);

            context.lineCap = "round";
            context.moveTo(clientX, clientY);
            context.beginPath();
        } else {
            const element = createElement(id, clientX, clientY, clientX, clientY);


            const updatedElement = {
                ...element,
                type: toolType,
                strokeWidth: 5,
            };

            setElements((prevState) => [...prevState, updatedElement]);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;
        const { clientX, clientY } = e;

        if (action === "sketching") {
            if (!isDrawing) return;

            const transparency = points[points.length - 1].transparency;
            const newEle = { clientX, clientY, transparency };

            setPoints((state) => [...state, newEle]);
            var midPoint = midPointBtw({ x: clientX, y: clientY }, { x: clientX, y: clientY });

            context.quadraticCurveTo(clientX, clientY, midPoint.x, midPoint.y);
            context.lineTo(clientX, clientY);
            context.stroke();
        } else if (action === "drawing") {
            const index = elements.length - 1;
            const { x1, y1 } = elements[index];

            updateElement(index, x1, y1, clientX, clientY, toolType);
        }
    };

    const handleMouseUp = () => {
        if (action === "drawing") {
            const index = selectedElement?.id;
            if (index !== undefined) {
                const { id, type, strokeWidth } = elements[index];
                const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
                updateElement(id, x1, y1, x2, y2, type);
            }
        } else if (action === "sketching") {
            const canvas = document.getElementById("canvas") as HTMLCanvasElement;
            const context = canvas.getContext("2d") as CanvasRenderingContext2D;
            context.closePath();
            const element = points;
            setPoints([]);
            setPath((prevState) => [...prevState, element]);
            setIsDrawing(false);
        }
        setAction("none");
    };

    return (
        <div>
            <div>
                <Swatch setToolType={setToolType} />
            </div>
            <canvas
                id="canvas"
                className="App"
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                Canvas
            </canvas>
        </div>
    );
}

export default App;

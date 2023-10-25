import React, { useLayoutEffect, useState, MouseEvent } from "react";
import rough from "roughjs/bundled/rough.esm";

const gen = rough.generator();

function createElement(x1: number, y1: number, x2: number, y2: number) {
  const roughEle = gen.line(x1, y1, x2, y2);
  return { x1, y1, x2, y2, roughEle };
}

const DrawingTool = () => {
  const [elements, setElements] = useState<Array<{ x1: number; y1: number; x2: number; y2: number; roughEle: any }>>([]);
  const [drawing, setDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rc = rough.canvas(canvas);

      elements.forEach((ele) => rc.draw(ele.roughEle));
    }
  }, [elements]);

  const startDrawing = (event: MouseEvent) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    const newEle = createElement(clientX, clientY, clientX, clientY);
    setElements((state) => [...state, newEle]);
  };

  const finishDrawing = () => {
    setDrawing(false);
  };

  const draw = (event: MouseEvent) => {
    if (!drawing) return;

    const { clientX, clientY } = event;
    const index = elements.length - 1;

    if (index >= 0) {
      const { x1, y1 } = elements[index];
      const updatedEle = createElement(x1, y1, clientX, clientY);

      const copyElement = [...elements];
      copyElement[index] = updatedEle;
      setElements(copyElement);
    }
  };

  return (
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerWidth}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    >
      Canvas
    </canvas>
  );
};

export default DrawingTool;

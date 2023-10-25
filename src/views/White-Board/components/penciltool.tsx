import React, { useLayoutEffect, useState, useRef, MouseEvent } from "react";

interface Point {
  x: number;
  y: number;
}

const Pentool = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [drawing, setDrawing] = useState(false);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pos: Point = { x: 0, y: 0 };
  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineCap = "round";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      contextRef.current = ctx;

      points.forEach((ele) => {
        if (contextRef.current) {
          contextRef.current.lineTo(ele.x, ele.y);
          contextRef.current.stroke();
        }
      });
    }
  }, [points]);

  const startDrawing = (event: MouseEvent) => {
    setDrawing(true);
    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };

  const finishDrawing = () => {
    setDrawing(false);
  };

  const draw = (event: MouseEvent) => {
    if (!drawing) return;

    setPoints((state) => [...state, { x: pos.x, y: pos.y }]);
    if (contextRef.current) {
      contextRef.current.moveTo(pos.x, pos.y);
    }

    const { clientX, clientY } = event;
    pos.x = clientX;
    pos.y = clientY;
  };

  return (
    <div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight} // Changed from window.innerWidth
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Pentool;

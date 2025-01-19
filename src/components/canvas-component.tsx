'use client';

import { Stage, Layer } from 'react-konva';

const CanvasComponent = () => {
  return (
    <Stage
      width={800}
      height={600}
      className="border rounded-md shadow-sm bg-white"
    >
      <Layer>{/* 도형자리 */}</Layer>
    </Stage>
  );
};

export default CanvasComponent;

'use client';

import { Ellipse } from 'react-konva';

import { EllipseShape } from '@/types/types';

const DrawEllipse = ({ shape }: { shape: EllipseShape }) => {
  return (
    <Ellipse
      x={shape.x}
      y={shape.y}
      radiusX={shape.radiusX}
      radiusY={shape.radiusY}
      fill={shape.color}
      stroke="black"
      strokeWidth={shape.thickness}
    />
  );
};

export default DrawEllipse;

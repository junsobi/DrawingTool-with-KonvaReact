'use client';

import { Line } from 'react-konva';

import { ShapeProps } from '@/types/types';

const DrawLine = ({ shape }: ShapeProps) => {
  if (shape.type === 'line' || shape.type === 'free-draw') {
    return (
      <Line
        points={shape.points}
        stroke={shape.color}
        strokeWidth={shape.thickness}
        tension={shape.type === 'free-draw' ? 0.5 : 0}
        lineCap="round"
        lineJoin="round"
      />
    );
  }
  return null;
};

export default DrawLine;

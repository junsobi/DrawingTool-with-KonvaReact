'use client';

import { Rect } from 'react-konva';

import { RectShape } from '@/types/types';

const DrawRect = ({ shape }: { shape: RectShape }) => {
  return (
    <Rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.color}
      stroke="black"
      strokeWidth={shape.thickness}
    />
  );
};

export default DrawRect;

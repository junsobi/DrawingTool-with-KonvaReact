'use client';

import { Line } from 'react-konva';

import { FreeDrawProps } from '@/types/types';

const DrawLine = ({ shape }: FreeDrawProps) => {
  return (
    <Line
      points={shape.points || []}
      stroke={shape.color}
      strokeWidth={shape.thickness}
      tension={shape.type === 'free-draw' ? 0.5 : 0}
      lineCap="round"
      lineJoin="round"
    />
  );
};

export default DrawLine;

'use client';

import { Line } from 'react-konva';

import { FreeDrawProps } from '@/types/types';

const FreeDraw = ({ shape }: FreeDrawProps) => {
  return (
    <Line
      points={shape.points || []}
      stroke={shape.color}
      strokeWidth={shape.thickness}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
    />
  );
};

FreeDraw.defaultProps = {
  shape: {
    points: [],
    color: '#000000',
    thickness: 5,
  },
};

export default FreeDraw;

'use client';

import { useMemo } from 'react';
import { Line } from 'react-konva';

import { ShapeProps } from '@/types/types';

const DrawLine = ({ shape }: ShapeProps) => {
  const lineProps = useMemo(() => {
    switch (shape.type) {
      case 'line':
      case 'free-draw':
        return {
          points: shape.points,
          stroke: shape.color,
          strokeWidth: shape.thickness,
          tension: shape.type === 'free-draw' ? 0.5 : 0,
          lineCap: 'round' as const,
          lineJoin: 'round' as const,
        };
      default:
        return null;
    }
  }, [shape]);

  return lineProps ? <Line {...lineProps} /> : null;
};

export default DrawLine;

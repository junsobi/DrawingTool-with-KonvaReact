'use client';

import { useMemo } from 'react';
import { Rect } from 'react-konva';

import { RectShape } from '@/types/types';

interface DrawProps<T> {
  shape: T;
}

const DrawRect = ({ shape }: DrawProps<RectShape>) => {
  const rectProps = useMemo(
    () => ({
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      fill: shape.color,
      stroke: 'black',
      strokeWidth: shape.thickness,
    }),
    [shape]
  );

  return <Rect {...rectProps} />;
};

export default DrawRect;

'use client';

import { useMemo } from 'react';
import { Ellipse } from 'react-konva';

import { EllipseShape } from '@/types/types';

interface DrawProps<T> {
  shape: T;
}

const DrawEllipse = ({ shape }: DrawProps<EllipseShape>) => {
  const ellipseProps = useMemo(
    () => ({
      x: shape.x,
      y: shape.y,
      radiusX: shape.radiusX,
      radiusY: shape.radiusY,
      fill: shape.color,
      stroke: 'black',
      strokeWidth: shape.thickness,
    }),
    [shape]
  );

  return <Ellipse {...ellipseProps} />;
};

export default DrawEllipse;

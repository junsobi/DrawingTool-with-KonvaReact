import Konva from 'konva';
import { useState } from 'react';
import { Group, Line, Circle } from 'react-konva';

import { PolygonShape } from '@/types/types';

const DrawPolygon = ({ shape }: { shape: PolygonShape }) => {
  const [isStartHovered, setIsStartHovered] = useState(false);

  if (!shape.points || shape.points.length === 0) {
    return null;
  }

  const flattenedPoints = shape.points.flat();
  const firstPoint = shape.points[0];

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    const pointerPos = stage?.getPointerPosition();
    if (!pointerPos) return;

    const distance = Math.hypot(
      firstPoint[0] - pointerPos.x,
      firstPoint[1] - pointerPos.y
    );

    setIsStartHovered(distance < 10);
  };

  return (
    <Group onMouseMove={handleMouseMove}>
      <Line
        points={flattenedPoints}
        fill={shape.closed ? shape.color : 'transparent'}
        stroke={shape.closed ? 'black' : 'gray'}
        strokeWidth={shape.thickness}
        closed={shape.closed}
        dash={shape.closed ? [] : [10, 5]}
      />

      {!shape.closed &&
        shape.points.map((point, index) => (
          <Circle
            key={index}
            x={point[0]}
            y={point[1]}
            radius={index === 0 && isStartHovered ? 8 : 5}
            fill={index === 0 ? 'red' : 'blue'}
            stroke="black"
            strokeWidth={1}
          />
        ))}
    </Group>
  );
};

export default DrawPolygon;

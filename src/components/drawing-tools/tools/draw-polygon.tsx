import Konva from 'konva';
import { Group, Line, Circle } from 'react-konva';

import { PolygonShape } from '@/types/types';

interface DrawPolygonProps {
  shape: PolygonShape;
  isStartHovered: boolean;
  onMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}

const DrawPolygon = ({
  shape,
  isStartHovered,
  onMouseMove,
}: DrawPolygonProps) => {
  if (!shape.points?.length) return null;

  return (
    <Group onMouseMove={onMouseMove}>
      <Line
        points={shape.points.flat()}
        fill={shape.closed ? shape.color : 'transparent'}
        stroke={shape.closed ? 'black' : 'gray'}
        strokeWidth={shape.thickness}
        closed={shape.closed}
        dash={shape.closed ? [] : [10, 5]}
      />
      {!shape.closed &&
        shape.points.map(([x, y], index) => (
          <Circle
            key={index}
            x={x}
            y={y}
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

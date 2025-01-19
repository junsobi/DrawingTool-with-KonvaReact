'use client';

import dynamic from 'next/dynamic';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ControlPanel from '@/layouts/control-panel';
import { useDrawingStore } from '@/store/drawing-store';

const SketchPicker = dynamic(
  () => import('react-color').then((mod) => mod.SketchPicker),
  { ssr: false }
);

const ColorPicker = () => {
  const { color, setColor } = useDrawingStore();

  return (
    <ControlPanel label="색상 선택">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="size-8 border rounded-md cursor-pointer"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full h-full">
          <SketchPicker
            color={color}
            onChangeComplete={(color) => setColor(color.hex)}
            width="200px"
          />
        </PopoverContent>
      </Popover>
    </ControlPanel>
  );
};

export default ColorPicker;

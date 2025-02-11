'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

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
  const [selectedColor, setSelectedColor] = useState(color);
  const [isDragging, setIsDragging] = useState(false);

  // Zustand의 color가 변경되었을 때만 selectedColor 업데이트 (드래그 중에는 변경 X)
  useEffect(() => {
    if (!isDragging) {
      setSelectedColor(color);
    }
  }, [color, isDragging]);

  return (
    <ControlPanel label="색상 선택">
      <Popover>
        <PopoverTrigger asChild>
          <div
            className="size-8 border rounded-md cursor-pointer"
            style={{ backgroundColor: selectedColor }}
          />
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full h-full">
          <SketchPicker
            color={selectedColor}
            onChange={(color) => {
              setSelectedColor(color.hex);
              setIsDragging(true);
            }}
            onChangeComplete={(color) => {
              setIsDragging(false);
              setColor(color.hex);
            }}
            width="200px"
          />
        </PopoverContent>
      </Popover>
    </ControlPanel>
  );
};

export default ColorPicker;

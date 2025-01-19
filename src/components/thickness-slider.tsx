'use client';

import { useDrawingStore } from '@/store/drawing-store';
import { Slider } from '@/components/ui/slider';
import ControlPanel from '@/layouts/control-panel';

const ThicknessSlider = () => {
  const { thickness, setThickness } = useDrawingStore();

  return (
    <ControlPanel label={`선 두께 (${thickness}px)`} className="flex-1">
      <Slider
        defaultValue={[thickness]}
        min={5}
        max={50}
        step={1}
        onValueChange={(value) => setThickness(value[0])}
        className="flex-grow"
      />
    </ControlPanel>
  );
};

export default ThicknessSlider;

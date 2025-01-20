'use client';

import ColorPicker from '../drawing-tools/color-picker';
import ThicknessSlider from '../drawing-tools/thickness-slider';
import ToolSelector from '../drawing-tools/tool-selector';

const ToolPanel = () => {
  return (
    <div className="flex border rounded-3xl shadow-sm p-4 bg-slate-50 justify-between gap-4 w-full">
      <ToolSelector />
      <ThicknessSlider />
      <ColorPicker />
    </div>
  );
};

export default ToolPanel;

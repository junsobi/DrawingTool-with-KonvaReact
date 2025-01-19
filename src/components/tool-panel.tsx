'use client';

import { useDrawingStore } from '@/store/drawing-store';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TOOLS } from '@/constants/constants';
import { ToolItem } from '@/types/types';
import ThicknessSlider from './thickness-slider';
import ColorPicker from './color-picker';

const ToolPanel = () => {
  const { tool, setTool } = useDrawingStore();

  const toggleGroupProps = {
    type: 'single' as const,
    value: tool,
    onValueChange: (value: string | null) =>
      value && setTool(value as ToolItem['id']),
    className:
      'flex gap-2 border p-4 rounded-md shadow-sm bg-white items-center',
  };

  return (
    <div className="flex  border rounded-3xl shadow-sm p-4 bg-slate-50 justify-between gap-4 w-full ">
      <ToggleGroup {...toggleGroupProps}>
        {TOOLS.map((tool) => (
          <ToolButton key={tool.id} {...tool} />
        ))}
      </ToggleGroup>
      <ThicknessSlider />
      <ColorPicker />
    </div>
  );
};

const ToolButton = ({ id, label, icon: Icon }: ToolItem) => {
  return (
    <ToggleGroupItem value={id} className="flex items-center gap-2 px-4 py-2">
      <Icon size={20} />
      <span>{label}</span>
    </ToggleGroupItem>
  );
};

export default ToolPanel;

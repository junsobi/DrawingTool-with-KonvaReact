'use client';

import { useDrawingStore } from '@/store/drawing-store';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { TOOLS } from '@/constants/constants';
import { ToolItem } from '@/types/types';

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
    <ToggleGroup {...toggleGroupProps}>
      {TOOLS.map((tool) => (
        <ToolButton key={tool.id} {...tool} />
      ))}
    </ToggleGroup>
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

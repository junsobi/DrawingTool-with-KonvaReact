'use client';

import React from 'react';
import { ControlPanelProps } from '@/types/types';

const ControlPanel = ({ label, children, className }: ControlPanelProps) => {
  return (
    <div
      className={`flex flex-col gap-2 items-center justify-start  ${className}`}
    >
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
};

export default ControlPanel;

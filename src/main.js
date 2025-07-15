
import './index.css';
import { createGridHoverEffect } from './gridHover.js';
import { createSettingsDialog } from './settingsDialog.js';

let collapsedFlexValue = 2;
const updateFlex = createGridHoverEffect({ collapsedFlexValue });

createSettingsDialog({
  onFlexChange: (val) => {
    collapsedFlexValue = val;
    updateFlex(val);
  }
});
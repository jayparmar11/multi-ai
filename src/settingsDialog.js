import { clamp } from './helpers.js';

export function createSettingsDialog({
  settingsBtnId = 'settings-btn',
  settingsDialogId = 'settings-dialog',
  settingsIconId = 'settings-icon',
  collapsedFlexInputId = 'collapsedFlexInput',
  settingsRootId = 'settings-root',
  onFlexChange
} = {}) {
  const settingsBtn = document.getElementById(settingsBtnId);
  const settingsDialog = document.getElementById(settingsDialogId);
  const settingsIcon = document.getElementById(settingsIconId);
  const collapsedFlexInput = document.getElementById(collapsedFlexInputId);
  const settingsRoot = document.getElementById(settingsRootId);
  let dialogOpen = false;
  function openDialog() {
    settingsDialog.classList.remove('hidden');
    settingsIcon.style.transition = 'transform 0.3s';
    settingsIcon.style.transform = 'rotate(90deg)';
    dialogOpen = true;
  }
  function closeDialog() {
    settingsDialog.classList.add('hidden');
    settingsIcon.style.transform = 'rotate(0deg)';
    dialogOpen = false;
  }
  settingsBtn.addEventListener('mouseenter', openDialog);
  settingsRoot.addEventListener('mouseleave', closeDialog);
  collapsedFlexInput.addEventListener('input', e => {
    let val = parseFloat(e.target.value);
    val = clamp(val, 2, 10);
    e.target.value = val;
    if (onFlexChange) onFlexChange(val);
  });
}

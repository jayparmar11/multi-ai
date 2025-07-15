
import './index.css'


const expandedFlex = '1 0 auto';
let collapsedFlexValue = 2;

function setFlex(idx, children) {
  children.forEach((child, i) => {
    child.style.flex = i === idx ? expandedFlex : `0 0 ${collapsedFlexValue}rem`;
  });
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function createGridHoverEffect() {
  const container = document.getElementById('grid-container');
  if (!container) throw new Error('Grid container not found');
  const children = Array.from(container.children);
  let activeIndex = 0;
  setFlex(activeIndex, children);
  children.forEach((child, idx) => {
    child.addEventListener('mouseenter', () => {
      if (activeIndex !== idx) {
        activeIndex = idx;
        setFlex(activeIndex, children);
      }
    });
  });
  // Expose for settings
  return () => setFlex(activeIndex, children);
}

const updateFlex = createGridHoverEffect();

// Settings dialog logic
const settingsBtn = document.getElementById('settings-btn');
const settingsDialog = document.getElementById('settings-dialog');
const settingsIcon = document.getElementById('settings-icon');
const collapsedFlexInput = document.getElementById('collapsedFlexInput');
const settingsRoot = document.getElementById('settings-root');

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
  collapsedFlexValue = val;
  e.target.value = val;
  updateFlex();
});
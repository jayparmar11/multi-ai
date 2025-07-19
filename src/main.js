



import './index.css';
import { clamp } from './helpers.js';
import { gsap } from 'gsap';

const COLORS = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
];

const container = document.getElementById('grid-container');
const settingsBtn = document.getElementById('settings-btn');
const settingsDialog = document.getElementById('settings-dialog');
const collapsedFlexInput = document.getElementById('collapsedFlexInput');
const settingsRoot = document.getElementById('settings-root');

let collapsedFlexValue = 2;
let minChildren = 1;
let maxChildren = 6;
let activeIdx = 0;
let childrenIds = [];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function createGridChild(id) {
  const color = getRandomColor();
  const div = document.createElement('div');
  div.id = `web-${id}`;
  div.className = `relative ${color} outline-2 outline-black outline`;
  div.style.height = '100%';

  // Add buttons
  const btnAddLeft = document.createElement('button');
  btnAddLeft.id = `web-${id}-btn-add-left`;
  btnAddLeft.className = 'web-grid-btn absolute left-2 bottom-2';
  btnAddLeft.textContent = '+';

  const btnAddRight = document.createElement('button');
  btnAddRight.id = `web-${id}-btn-add-right`;
  btnAddRight.className = 'web-grid-btn absolute right-2 bottom-2';
  btnAddRight.textContent = '+';

  const btnRemove = document.createElement('button');
  btnRemove.id = `web-${id}-btn-remove`;
  btnRemove.className = 'web-grid-btn absolute left-1/2 -translate-x-1/2 bottom-2';
  btnRemove.textContent = '–';

  div.appendChild(btnAddLeft);
  div.appendChild(btnAddRight);
  div.appendChild(btnRemove);

  // Show id in box for debug
  const idLabel = document.createElement('span');
  idLabel.className = 'absolute top-10 rotate-90 left-1/2 -translate-x-1/2 bg-white/80 text-xs px-2 py-1 rounded font-mono z-10';
  idLabel.textContent = id;
  div.appendChild(idLabel);

  return div;
}


function getChildren() {
  return Array.from(container.children);
}


function setActive(idx) {
  const children = getChildren();
  children.forEach((child, i) => {
    if (i === idx) {
      child.classList.add('active');
    } else {
      child.classList.remove('active');
    }
    // Remove button visibility
    const btnRemove = child.querySelector(`[id$='-btn-remove']`);
    if (children.length === 1) {
      btnRemove.style.display = 'none';
    } else {
      btnRemove.style.display = '';
    }
  });
  activeIdx = idx;
  setWidths(idx, collapsedFlexValue);
}


function renderChildren(count, ids = null) {
  container.innerHTML = '';
  childrenIds = ids || Array(count).fill().map(() => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 10000));
  childrenIds.forEach((id) => {
    container.appendChild(createGridChild(id));
  });
  attachButtonHandlers();
  setActive(activeIdx >= count ? count - 1 : activeIdx);
}


function attachButtonHandlers() {
  const children = getChildren();
  children.forEach((child, idx) => {
    const id = child.id.replace('web-', '');
    // Add left
    child.querySelector(`#web-${id}-btn-add-left`).onclick = (e) => {
      e.stopPropagation();
      if (children.length < maxChildren) {
        const newId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 10000);
        let ids = children.map(c => c.id.replace('web-', ''));
        ids.splice(idx, 0, newId.toString());
        renderChildren(ids.length, ids);
        // setActive(activeIdx); // keep previous active
      }
    };
    // Add right
    child.querySelector(`#web-${id}-btn-add-right`).onclick = (e) => {
      e.stopPropagation();
      if (children.length < maxChildren) {
        const newId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 10000);
        let ids = children.map(c => c.id.replace('web-', ''));
        ids.splice(idx + 1, 0, newId.toString());
        renderChildren(ids.length, ids);
        // setActive(activeIdx); // keep previous active
      }
    };
    // Remove
    child.querySelector(`#web-${id}-btn-remove`).onclick = (e) => {
      e.stopPropagation();
      if (children.length > minChildren) {
        let ids = children.map(c => c.id.replace('web-', ''));
        ids.splice(idx, 1);
        // If activeIdx is removed, fallback to previous
        let newActive = activeIdx;
        if (activeIdx === idx) newActive = idx > 0 ? idx - 1 : 0;
        else if (activeIdx > idx) newActive = activeIdx - 1;
        renderChildren(ids.length, ids);
        setActive(newActive);
      }
    };
    // Set active on click
    child.onclick = () => {
      setActive(idx);
    };
  });
}


function setWidths(idx, collapsedVal = collapsedFlexValue) {
  const children = getChildren();
  const totalWidth = container.clientWidth;
  const collapsedPx = collapsedVal * 16;
  const numChildren = children.length;
  const activeWidth = Math.max(totalWidth - (numChildren - 1) * collapsedPx, collapsedPx);

  // FLIP: record first widths
  const firstWidths = children.map(child => child.getBoundingClientRect().width);

  children.forEach((child, i) => {
    let targetWidth = i === idx ? activeWidth : collapsedPx;
    child.style.width = `${firstWidths[i]}px`;
  });

  requestAnimationFrame(() => {
    children.forEach((child, i) => {
      let targetWidth = i === idx ? activeWidth : collapsedPx;
      child.style.transition = 'width 0.4s cubic-bezier(0.4,0,0.2,1)';
      child.style.width = `${targetWidth}px`;
    });
  });
}


// Settings dialog logic
let settingsIcon = settingsBtn.querySelector('svg');
function openDialog() {
  settingsDialog.classList.remove('hidden');
  settingsIcon.style.transition = 'transform 0.3s';
  settingsIcon.style.transform = 'rotate(90deg)';
}
function closeDialog() {
  settingsDialog.classList.add('hidden');
  settingsIcon.style.transform = 'rotate(0deg)';
}
settingsBtn.addEventListener('mouseenter', openDialog);
settingsRoot.addEventListener('mouseleave', closeDialog);
collapsedFlexInput.addEventListener('input', e => {
  let val = parseFloat(e.target.value);
  val = clamp(val, 2, 10);
  e.target.value = val;
  collapsedFlexValue = val;
  setWidths(activeIdx, collapsedFlexValue);
});

// Mutation observer for dynamic children
const observer = new MutationObserver(() => {
  setWidths(activeIdx, collapsedFlexValue);
});
observer.observe(container, { childList: true });

// Initial render
childrenIds = Array(minChildren).fill().map(() => Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 10000));
renderChildren(childrenIds.length, childrenIds);
setActive(0);
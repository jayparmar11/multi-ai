const COLORS = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500'
];

function createGridChild(idx, total) {
  const div = document.createElement('div');
  div.id = `web-${idx + 1}`;
  div.className = `relative ${COLORS[idx % COLORS.length]}`;
  div.style.height = '100%';

  // Add buttons
  const btnAddLeft = document.createElement('button');
  btnAddLeft.id = `web-${idx + 1}-btn-add-left`;
  btnAddLeft.className = 'web-grid-btn absolute left-2 bottom-2';
  btnAddLeft.textContent = '+';

  const btnAddRight = document.createElement('button');
  btnAddRight.id = `web-${idx + 1}-btn-add-right`;
  btnAddRight.className = 'web-grid-btn absolute right-2 bottom-2';
  btnAddRight.textContent = '+';

  const btnRemove = document.createElement('button');
  btnRemove.id = `web-${idx + 1}-btn-remove`;
  btnRemove.className = 'web-grid-btn absolute left-1/2 -translate-x-1/2 bottom-2';
  btnRemove.textContent = '–';

  div.appendChild(btnAddLeft);
  div.appendChild(btnAddRight);
  div.appendChild(btnRemove);

  return div;
}

export function setupGridChildren({
  containerId = 'grid-container',
  minChildren = 1,
  maxChildren = 6
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Grid container not found');

  let activeIdx = 0;

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
    });
    activeIdx = idx;
  }

  function renderChildren(count) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      container.appendChild(createGridChild(i, count));
    }
    attachButtonHandlers();
    setActive(activeIdx >= count ? count - 1 : activeIdx);
  }

  function attachButtonHandlers() {
    const children = getChildren();
    children.forEach((child, idx) => {
      // Add left
      child.querySelector(`#web-${idx + 1}-btn-add-left`).onclick = (e) => {
        e.stopPropagation();
        if (children.length < maxChildren) {
          container.insertBefore(createGridChild(idx, children.length + 1), child);
          renderChildren(getChildren().length);
          setActive(idx);
        }
      };
      // Add right
      child.querySelector(`#web-${idx + 1}-btn-add-right`).onclick = (e) => {
        e.stopPropagation();
        if (children.length < maxChildren) {
          container.insertBefore(createGridChild(idx + 1, children.length + 1), child.nextSibling);
          renderChildren(getChildren().length);
          setActive(idx + 1);
        }
      };
      // Remove
      child.querySelector(`#web-${idx + 1}-btn-remove`).onclick = (e) => {
        e.stopPropagation();
        if (children.length > minChildren) {
          child.remove();
          renderChildren(getChildren().length);
          setActive(idx > 0 ? idx - 1 : 0);
        }
      };
      // Set active on click
      child.onclick = () => {
        setActive(idx);
      };
    });
  }

  // Initial render
  renderChildren(minChildren);
  setActive(0);
}

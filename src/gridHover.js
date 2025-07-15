function setGridHoverEffectFlex(idx, children, expandedFlex = '1 0 auto', collapsedFlexValue = 2) {
  children.forEach((child, i) => {
    child.style.flex = i === idx ? expandedFlex : `0 0 ${collapsedFlexValue}rem`;
  });
}

export function createGridHoverEffect({
  containerId = 'grid-container',
  expandedFlex = '1 0 auto',
  collapsedFlexValue = 2
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Grid container not found');
  const children = Array.from(container.children);
  let activeIndex = 0;
  setGridHoverEffectFlex(activeIndex, children, expandedFlex, collapsedFlexValue);
  children.forEach((child, idx) => {
    child.addEventListener('mouseenter', () => {
      if (activeIndex !== idx) {
        activeIndex = idx;
        setGridHoverEffectFlex(activeIndex, children, expandedFlex, collapsedFlexValue);
      }
    });
  });
  return (newCollapsedFlexValue) => {
    setGridHoverEffectFlex(activeIndex, children, expandedFlex, newCollapsedFlexValue ?? collapsedFlexValue);
  };
}

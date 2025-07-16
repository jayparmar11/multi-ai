import gsap, { Linear } from 'gsap';


function getExpandedFlexBasis(childrenCount, collapsedFlexValue = 2) {
  if (childrenCount <= 1) return '100%';
  // n = number of collapsed children
  const n = childrenCount - 1;
  // Use string interpolation for calc so CSS can handle math, not JS
  return `calc(100% - ${collapsedFlexValue}rem * ${n})`;
}


function setGridHoverEffectGSAP(idx, children, collapsedFlexValue = 2, duration = 0.5) {
  const expandedFlexBasis = getExpandedFlexBasis(children.length, collapsedFlexValue);
  children.forEach((child, i) => {
    const targetBasis = i === idx ? expandedFlexBasis : `${collapsedFlexValue}rem`;
    gsap.to(child, {
      flexBasis: targetBasis,
      duration,
      ease: Linear.easeNone,
      overwrite: 'auto',
    });
  });
}

export function createGridHoverEffect({
  containerId = 'grid-container',
  collapsedFlexValue = 2,
  duration = 0.3
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Grid container not found');
  const children = Array.from(container.children);
  let activeIndex = 0;
  const expandedFlexBasis = getExpandedFlexBasis(children.length, collapsedFlexValue);
  children.forEach((child, i) => {
    child.style.flex = '0 0 auto';
    child.style.flexBasis = i === activeIndex ? expandedFlexBasis : `${collapsedFlexValue}rem`;
  });
  children.forEach((child, idx) => {
    child.addEventListener('mouseenter', () => {
      if (activeIndex !== idx) {
        activeIndex = idx;
        setGridHoverEffectGSAP(activeIndex, children, collapsedFlexValue, duration);
      }
    });
  });
  return (newCollapsedFlexValue) => {
    setGridHoverEffectGSAP(activeIndex, children, newCollapsedFlexValue ?? collapsedFlexValue, duration);
  };
}

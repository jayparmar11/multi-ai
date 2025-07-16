
import { gsap } from 'gsap';

function setGridHoverEffectGSAP(idx, children, collapsedFlexValue = 2) {
  const container = children[0]?.parentElement;
  if (!container) return;
  const totalWidth = container.clientWidth;
  const collapsedPx = collapsedFlexValue * 16; // 1rem = 16px
  const numChildren = children.length;
  const activeWidth = Math.max(totalWidth - (numChildren - 1) * collapsedPx, collapsedPx);
  children.forEach((child, i) => {
    let targetWidth = i === idx ? activeWidth : collapsedPx;
    gsap.to(child, {
      width: targetWidth,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  });
}

export function createGridHoverEffect({
  containerId = 'grid-container',
  collapsedFlexValue = 2
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) throw new Error('Grid container not found');
  let children = Array.from(container.children);
  let activeIndex = 0;

  // Set initial widths
  children.forEach((child, i) => {
    child.style.width = i === activeIndex ? `calc(100% - ${(children.length - 1) * collapsedFlexValue}rem)` : `${collapsedFlexValue}rem`;
    child.style.flex = 'none';
  });

  function updateChildren() {
    children = Array.from(container.children);
  }

  function setWidths(idx, collapsedVal = collapsedFlexValue) {
    updateChildren();
    setGridHoverEffectGSAP(idx, children, collapsedVal);
  }

  children.forEach((child, idx) => {
    child.addEventListener('mouseenter', () => {
      if (activeIndex !== idx) {
        activeIndex = idx;
        setWidths(activeIndex);
      }
    });
  });

  // For dynamic children, observe mutations
  const observer = new MutationObserver(() => {
    updateChildren();
    setWidths(activeIndex);
  });
  observer.observe(container, { childList: true });

  setWidths(activeIndex);

  return (newCollapsedFlexValue) => {
    setWidths(activeIndex, newCollapsedFlexValue ?? collapsedFlexValue);
  };
}

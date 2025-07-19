
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

  function removeListeners() {
    children.forEach((child) => {
      child._mouseenterHandler && child.removeEventListener('mouseenter', child._mouseenterHandler);
      child._mouseenterHandler = null;
    });
  }

  function addListeners() {
    children.forEach((child, idx) => {
      const handler = () => {
        if (activeIndex !== idx) {
          activeIndex = idx;
          setWidths(activeIndex);
        }
      };
      child.addEventListener('mouseenter', handler);
      child._mouseenterHandler = handler;
    });
  }

  function updateChildren() {
    removeListeners();
    children = Array.from(container.children);
    addListeners();
  }


  function setActiveClass(idx) {
    children.forEach((child, i) => {
      if (i === idx) {
        child.classList.add('active');
      } else {
        child.classList.remove('active');
      }
    });
  }

  function setWidths(idx, collapsedVal = collapsedFlexValue) {
    updateChildren();
    setActiveClass(idx);
    setGridHoverEffectGSAP(idx, children, collapsedVal);
  }

  // Initial setup
  updateChildren();
  setWidths(activeIndex);

  // For dynamic children, observe mutations
  const observer = new MutationObserver(() => {
    updateChildren();
    setWidths(activeIndex);
  });
  observer.observe(container, { childList: true });

  return (newCollapsedFlexValue) => {
    setWidths(activeIndex, newCollapsedFlexValue ?? collapsedFlexValue);
  };
}

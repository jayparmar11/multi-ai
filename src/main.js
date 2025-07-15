
import './index.css'

(function createGridHoverEffect() {
  const expandedFlex = '1 0 auto', collapsedFlex = '0 0 2rem'
  const container = document.getElementById('grid-container');
  if (!container) throw new Error('Grid container not found');
  const children = Array.from(container.children);
  let activeIndex = 0;

  const setFlex = idx => {
    children.forEach((child, i) => {
      child.style.flex = i === idx ? expandedFlex : collapsedFlex;
    });
  };

  setFlex(activeIndex);
  children.forEach((child, idx) => {
    child.addEventListener('mouseenter', () => {
      if (activeIndex !== idx) {
        activeIndex = idx;
        setFlex(activeIndex);
      }
    });
  });
})()
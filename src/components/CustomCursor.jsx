import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animate);
    };

    const onMouseDown = () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    };

    const onMouseUp = () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    };

    const onHover = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        dot.style.width = '14px';
        dot.style.height = '14px';
        ring.style.width = '52px';
        ring.style.height = '52px';
        ring.style.borderColor = '#00ff94cc';
      } else {
        dot.style.width = '';
        dot.style.height = '';
        ring.style.width = '';
        ring.style.height = '';
        ring.style.borderColor = '';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', onHover);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', onHover);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}

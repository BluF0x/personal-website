import React, { useMemo } from 'react';

// Utility function to generate a random integer between min and max
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Memoized Star Component
const Star = React.memo(({ windowDimentions }) => {
  const min = -45;
  const max = 45;

  // Use useMemo to optimize position and rotation calculations
  const { posX, posY, rotationDeg, starSize } = useMemo(() => {
    const posX = getRandomInteger(0, windowDimentions.height);
    const posY = getRandomInteger(0, windowDimentions.width);
    const rotationDeg = {
      rotationX: getRandomInteger(min, max),
      rotationY: getRandomInteger(min, max),
    };
    const starSize = {
      width: getRandomInteger(1, 5), 
      height: getRandomInteger(1, 5),
    };

    return { posX, posY, rotationDeg, starSize };
  }, [windowDimentions]);

  const defaultStyle = {
    width: starSize.width,
    height: starSize.height,
    position: 'fixed',
    top: posX,
    left: posY,
    borderRadius: 3,
    zIndex: -1,
  };

  return (
    <span>
      <div style={{
        ...defaultStyle,
        backgroundColor: '#4f57c2',
        transform: `scale(1.1, 1.1) rotateX(${rotationDeg.rotationX}deg) rotateY(${rotationDeg.rotationY}deg)`,
        filter: 'blur(2px)',
      }}>
      </div>
      <div style={{
        ...defaultStyle,
        backgroundColor: '#61d3f2',
        transform: `rotateX(${rotationDeg.rotationX}deg) rotateY(${rotationDeg.rotationY}deg)`,
      }}>
      </div>
    </span>
  );
});


Star.displayName = 'Star'; // Adding display name

export default Star;

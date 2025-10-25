import React, { useEffect, useState } from 'react';

// Renamed component for clarity
const AnimatedConnectedWorldSVG = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    // Adding a short delay can sometimes help ensure styles are ready
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 100ms delay
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const svgClassName = isAnimated ? 'animated' : '';

  // Your provided CSS, wrapped in a template literal for the <style> tag
  const animationStyles = `
    svg#freepik_stories-connected-world:not(.animated) .animable {
      opacity: 0;
    }
    svg#freepik_stories-connected-world.animated #freepik--Icons--inject-85 {
      animation: 2.9s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn;
      animation-delay: 0s;
    }
    svg#freepik_stories-connected-world.animated #freepik--character-6--inject-85,
    svg#freepik_stories-connected-world.animated #freepik--character-5--inject-85,
    svg#freepik_stories-connected-world.animated #freepik--character-4--inject-85,
    svg#freepik_stories-connected-world.animated #freepik--character-3--inject-85,
    svg#freepik_stories-connected-world.animated #freepik--character-2--inject-85,
    svg#freepik_stories-connected-world.animated #freepik--character-1--inject-85 {
      animation: 1s 1 forwards cubic-bezier(.36,-0.01,.5,1.38) fadeIn, 6s Infinite linear wind;
      animation-delay: 0s, 1s; /* fadeIn delay, wind delay */
    }
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes wind {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(1deg); }
      75% { transform: rotate(-1deg); }
      100% { transform: rotate(0deg); } /* Added 100% for smoother loop */
    }
  `;

  return (
    // Added Tailwind classes for responsiveness
    <div className="w-full h-auto max-w-lg mx-auto">
      {/* Inject the animation CSS via a style tag */}
      <style>{animationStyles}</style>
      
      {/* Your SVG code below, with className added and JSX syntax adjustments */}
      <svg
        className={svgClassName} // Apply 'animated' class based on state
        id="freepik_stories-connected-world"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink" // Note: xmlns:xlink becomes xmlnsXlink
        xmlnsSvgjs="http://svgjs.com/svgjs" // Note: xmlns:svgjs becomes xmlnsSvgjs
      >
        {/* Copied SVG content starts here - Make sure all attributes like 'fill', 'style' are correct JSX */}
        <g id="freepik--Icons--inject-85" className="animable" style={{ transformOrigin: '250.205px 249.645px' }}>
            {/* ... Icon paths ... */}
             <path d="M45.82,152.84A17.13,17.13,0,1,1,63,135.71,17.14,17.14,0,0,1,45.82,152.84Zm0-33.51A16.38,16.38,0,1,0,62.2,135.71,16.39,16.39,0,0,0,45.82,119.33Z" style={{ fill: 'rgb(224, 224, 224)', transformOrigin: '45.87px 135.71px' }} id="elogx8ljx045" className="animable"></path>
             {/* Add ALL other icon paths here */}
        </g>
        <g id="freepik--Line--inject-85" className="animable" style={{ transformOrigin: '250.01px 250px' }}>
          <path d="M249.86,454.43a204.45,204.45,0,0,1-152-341.11c75.38-83.9,205-90.83,288.85-15.46A204.46,204.46,0,0,1,249.86,454.43Zm.26-407.85A203.26,203.26,0,1,0,386,98.62,203,203,0,0,0,250.12,46.58Z" style={{ fill: 'rgb(186, 104, 200)', transformOrigin: '250.01px 250px' }} id="elik4iw741zf9" className="animable"></path>
        </g>
        <g id="freepik--World--inject-85" className="animable" style={{ transformOrigin: '249.961px 250.006px' }}>
            {/* ... World paths ... */}
             <path d="M157.35,353.15a138.64,138.64,0,1,0-44.93-120.36A138.64,138.64,0,0,0,157.35,353.15Z" style={{ fill: 'rgb(186, 104, 200)', transformOrigin: '249.987px 250.003px' }} id="el51czr6xo9ft" className="animable"></path>
              {/* Add ALL other world paths here */}
        </g>
        {/* Character Groups (Make sure IDs match CSS selectors) */}
        <g id="freepik--character-6--inject-85" className="animable" style={{ transformOrigin: '372.635px 393.053px' }}>
            {/* ... Character 6 paths ... */}
             <path d="M405.6,446.93a38.4,38.4,0,1,1,38.4-38.4A38.44,38.44,0,0,1,405.6,446.93Z" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '405.6px 408.53px' }} id="elu742oln5ui9" className="animable"></path>
              {/* Add ALL other Character 6 paths here */}
        </g>
        <g id="freepik--character-5--inject-85" className="animable" style={{ transformOrigin: '123.951px 393.638px' }}>
            {/* ... Character 5 paths ... */}
             <path d="M91.66,449.48a38.41,38.41,0,1,1,38.4-38.41A38.45,38.45,0,0,1,91.66,449.48Z" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '91.65px 411.07px' }} id="elcrqhe3350n" className="animable"></path>
             {/* Add ALL other Character 5 paths here */}
        </g>
         {/* Add Character 4, 3, 2, 1 groups similarly */}
         <g id="freepik--character-4--inject-85" className="animable" style={{ transformOrigin: '395.683px 253.703px' }}>
            {/* ... Character 4 paths ... */}
             <circle cx="448.59" cy="256.97" r="38.4" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '448.59px 256.97px', transform: 'rotate(-80.78deg)' }} className="animable"></circle>
             {/* Add ALL other Character 4 paths here */}
         </g>
         <g id="freepik--character-3--inject-85" className="animable" style={{ transformOrigin: '77.095px 221.489px' }}>
             {/* ... Character 3 paths ... */}
              <circle cx="51.82" cy="227.59" r="38.4" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '51.82px 227.59px' }} id="el9w31qowuopk" className="animable"></circle>
              {/* Add ALL other Character 3 paths here */}
         </g>
         <g id="freepik--character-2--inject-85" className="animable" style={{ transformOrigin: '343.447px 96.658px' }}>
             {/* ... Character 2 paths ... */}
             <circle cx="361.55" cy="83.89" r="38.4" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '361.55px 83.89px' }} id="el6fxoh4k1twa" className="animable"></circle>
             {/* Add ALL other Character 2 paths here */}
         </g>
         <g id="freepik--character-1--inject-85" className="animable" style={{ transformOrigin: '140.832px 128.062px' }}>
             {/* ... Character 1 paths ... */}
             <circle cx="115.09" cy="83.89" r="38.4" style={{ fill: 'rgb(255, 255, 255)', transformOrigin: '115.09px 83.89px', transform: 'rotate(-45deg)' }} className="animable"></circle>
              {/* Add ALL other Character 1 paths here */}
         </g>

        {/* Ensure the <defs> tag with filters is included if needed, or remove if unused */}
        <defs>
            {/* ... filters ... */}
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedConnectedWorldSVG;
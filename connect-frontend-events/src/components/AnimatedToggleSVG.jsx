import React, { useEffect, useState } from 'react';

const AnimatedToggleSVG = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); 
    return () => clearTimeout(timer); 
  }, []);

  const svgClassName = isAnimated ? 'animated' : '';

  // Provided CSS for the toggle animation
  const animationStyles = `
    svg#freepik_stories-toggle:not(.animated) .animable {
      opacity: 0;
    }
    svg#freepik_stories-toggle.animated #freepik--Graphics--inject-62 {
      animation: 6s Infinite linear floating;
      animation-delay: 0s;
    }
    svg#freepik_stories-toggle.animated #freepik--button-2--inject-62,
    svg#freepik_stories-toggle.animated #freepik--button-1--inject-62 {
      animation: 3s Infinite linear wind;
      animation-delay: 0s;
    }
    @keyframes floating {
      0% { opacity: 1; transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { opacity: 1; transform: translateY(0px); }
    }
    @keyframes wind {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(1deg); }
      75% { transform: rotate(-1deg); }
      100% { transform: rotate(0deg); } /* Added 100% */
    }
  `;

  return (
    // Responsive container for the SVG
    <div className="w-full max-w-sm mx-auto my-8"> 
      <style>{animationStyles}</style>
      
      {/* Your SVG code below */}
      <svg
        className={svgClassName}
        id="freepik_stories-toggle"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 500"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlnsSvgjs="http://svgjs.com/svgjs"
      >
        {/* Paste the ENTIRE content of your SVG <svg>...</svg> here */}
        {/* Make sure to convert attributes like class="animable" to className="animable" */}
        {/* Example structure: */}
        <g id="freepik--background-simple--inject-62" className="animable" style={{ transformOrigin: '242.764px 246.262px' }}>
             <path d="M457.31,257.28C474,150.86,385.17,43.59,268.6,30.27c-1.45-.17-2.9-.32-4.36-.47-81.45-8.09-155.9,54.13-177.18,101.58s-77,92.6-56.35,180.56S107.45,446.75,239,460.62,394.77,436.88,429.69,354.7A420.16,420.16,0,0,0,457.31,257.28Z" style={{ fill: 'rgb(255, 110, 0)', transformOrigin: '242.764px 246.262px' }} id="elkw94wmdr51m" className="animable"></path>
             {/* ... include the rest of your SVG paths and groups ... */}
             <path d="M103.59,199.49l-5.78-5.78,5.78-5.78,5.78,5.78Zm-4.37-5.78,4.37,4.37,4.36-4.37-4.36-4.36Z" style={{fill: 'rgb(38, 50, 56)', transformOrigin: '103.59px 193.71px'}} id="elqtyr8t82k59" className="animable"></path>
            {/* ... ensure ALL paths/rects/polygons/etc. are included ... */}
        </g>
         <g id="freepik--Floor--inject-62" className="animable" style={{ transformOrigin: '258.425px 460.9px' }}>
          {/* ... Floor elements ... */}
         </g>
         <g id="freepik--Graphics--inject-62" className="animable" style={{ transformOrigin: '250.24px 249.785px' }}>
          {/* ... Graphics elements ... */}
         </g>
         <g id="freepik--Plants--inject-62" className="animable" style={{ transformOrigin: '222.261px 436.302px' }}>
          {/* ... Plants elements ... */}
         </g>
         <g id="freepik--button-2--inject-62" className="animable" style={{ transformOrigin: '241.85px 252.66px' }}>
            {/* ... Button 2 elements ... */}
         </g>
         <g id="freepik--button-1--inject-62" className="animable" style={{ transformOrigin: '244.305px 161.61px' }}>
             {/* ... Button 1 elements ... */}
         </g>
         <g id="freepik--menu-2--inject-62" className="animable" style={{ transformOrigin: '427.635px 109.245px' }}>
             {/* ... Menu 2 elements ... */}
         </g>
         <g id="freepik--menu-1--inject-62" className="animable" style={{ transformOrigin: '89.765px 357.83px' }}>
             {/* ... Menu 1 elements ... */}
         </g>
         <g id="freepik--Character--inject-62" className="animable" style={{ transformOrigin: '377.049px 322.189px' }}>
            {/* ... Character elements ... */}
         </g>
        <defs>
          {/* Include filters if they are part of your original SVG */}
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedToggleSVG;
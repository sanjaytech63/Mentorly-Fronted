import React from 'react';

interface LogoMarqueeProps {
  logos?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'light' | 'dark';
  direction?: 'left' | 'right';
  withFade?: boolean;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  logos = [
    "jdemy",
    "AMDZl",
    "米",
    "coursera",
    "米",
    "amazon",
    "米",
    "Gaacademy",
    "Cognizant",
    "AMDZI",
    "米",
    "amazon",
    "米",
    "coursera"
  ],
  speed = 'normal',
  variant = 'light',
  direction = 'left',
  withFade = true
}) => {
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee',
    fast: 'animate-marquee-fast'
  };

  const directionClasses = {
    left: '',
    right: 'animate-marquee-right'
  };

  const containerClasses = {
    light: 'bg-gradient-to-r from-gray-800 to-gray-900',
    dark: 'bg-gradient-to-r from-black to-gray-900'
  };

  const textClasses = {
    light: 'text-white',
    dark: 'text-gray-100'
  };

  const separatorClasses = {
    light: 'text-yellow-400',
    dark: 'text-yellow-300'
  };

  const fadeClasses = {
    light: 'from-gray-800 via-gray-800/80 to-transparent',
    dark: 'from-black via-black/80 to-transparent'
  };

  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className={`w-full py-6 relative ${containerClasses[variant]}`}>
      {withFade && (
        <div className={`absolute left-0 top-0 w-20 h-full bg-gradient-to-r ${fadeClasses[variant]} z-10 pointer-events-none`} />
      )}

      <div className="overflow-hidden">
        <div className={`flex animate-pulse whitespace-nowrap ${speedClasses[speed]} ${directionClasses[direction]}`}>
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center mx-4 md:mx-6 lg:mx-8 flex-shrink-0 group"
            >
              <span
                className={`
                  text-base md:text-lg lg:text-xl font-bold
                  ${logo === '米' ? separatorClasses[variant] : textClasses[variant]}
                  ${logo === '米' ? 'text-xl md:text-2xl lg:text-3xl' : ''}
                  transition-all duration-300 
                  group-hover:scale-110 group-hover:text-yellow-400
                  drop-shadow-md
                `}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {withFade && (
        <div className={`absolute right-0 top-0 w-20 h-full bg-gradient-to-l ${fadeClasses[variant]} z-10 pointer-events-none`} />
      )}
    </div>
  );
};

export default LogoMarquee;
import React from 'react';

interface LogoMarqueeProps {
  logos?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  variant?: 'light' | 'dark';
  direction?: 'left' | 'right';
  withFade?: boolean;
  className?: string;
}

const LogoMarquee: React.FC<LogoMarqueeProps> = ({
  logos = [
    'jdemy',
    'AMDZl',
    '米',
    'coursera',
    '米',
    'amazon',
    '米',
    'Gaacademy',
    'Cognizant',
    'AMDZI',
    '米',
    'amazon',
    '米',
    'coursera',
  ],
  speed = 'fast',
  variant = 'light',
  direction = 'left',
  withFade = true,
  className = '',
}) => {
  const speedClasses = {
    slow: 'animate-marquee-slow',
    normal: 'animate-marquee-normal',
    fast: 'animate-marquee-fast',
  };

  const directionClasses = {
    left: 'animate-marquee-left',
    right: 'animate-marquee-right',
  };

  const containerClasses = {
    light: 'bg-gradient-to-r from-gray-800 to-gray-900',
    dark: 'bg-gradient-to-r from-black to-gray-900',
  };

  const textClasses = {
    light: 'text-white',
    dark: 'text-gray-100',
  };

  const separatorClasses = {
    light: 'text-yellow-400',
    dark: 'text-yellow-300',
  };

  const fadeClasses = {
    light: 'from-gray-800 via-gray-800/80 to-transparent',
    dark: 'from-black via-black/80 to-transparent',
  };

  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className={`w-full py-6 relative overflow-hidden ${containerClasses[variant]} ${className}`}
    >
      {withFade && (
        <div
          className={`absolute left-0 top-0 w-20 h-full bg-gradient-to-r ${fadeClasses[variant]} z-10 pointer-events-none`}
        />
      )}

      <div className="overflow-hidden">
        <div
          className={`flex whitespace-nowrap ${speedClasses[speed]} ${directionClasses[direction]}`}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center mx-4 md:mx-6 lg:mx-8 flex-shrink-0 group transition-all duration-300 hover:scale-110"
            >
              <span
                className={`
                  font-bold drop-shadow-md transition-colors duration-300
                  ${
                    logo === '米'
                      ? `${separatorClasses[variant]} text-xl md:text-2xl lg:text-3xl`
                      : `${textClasses[variant]} text-base md:text-lg lg:text-xl group-hover:text-yellow-400`
                  }
                `}
              >
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {withFade && (
        <div
          className={`absolute right-0 top-0 w-20 h-full bg-gradient-to-l ${fadeClasses[variant]} z-10 pointer-events-none`}
        />
      )}

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        .animate-marquee-slow {
          animation: marquee-left 60s linear infinite;
        }
        
        .animate-marquee-normal {
          animation: marquee-left 40s linear infinite;
        }
        
        .animate-marquee-fast {
          animation: marquee-left 5s linear infinite;
        }
        
        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        
        /* Pause animation on hover */
        .group:hover .animate-marquee-slow,
        .group:hover .animate-marquee-normal,
        .group:hover .animate-marquee-fast,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LogoMarquee;

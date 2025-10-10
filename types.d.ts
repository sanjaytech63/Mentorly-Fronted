// types.d.ts
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Marquee-specific attributes
    behavior?: 'scroll' | 'slide' | 'alternate';
    bgcolor?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
    height?: string | number;
    hspace?: string | number;
    loop?: string | number;
    scrollAmount?: string | number;
    scrollDelay?: string | number;
    truespeed?: boolean;
    vspace?: string | number;
    width?: string | number;
  }
}

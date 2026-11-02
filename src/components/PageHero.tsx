import React from 'react';

export interface PageHeroProps {
  /** The exact name of the section / page / menu */
  title: string;
  /** High-clarity context-relevant banner image */
  imageSrc: string;
  /** Optional image alt description */
  imageAlt?: string;
  /** Optional additional wrapper CSS classes */
  className?: string;
  /** Standardized height (e.g. '400px') */
  height?: string;
  /** Optional object-fit override (defaults to 'cover' when height is set, otherwise 'contain') */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Optional overlay class */
  overlayClassName?: string;
  /** Optional title class */
  titleClassName?: string;
  /** Optional badge */
  badge?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional children / CTA elements */
  children?: React.ReactNode;
  /** Optional control for text overlay */
  showTextOverlay?: boolean;
  /** Optional backward compatibility flag */
  cleanTitleOnly?: boolean;
}

/**
 * Standardized Industrial PageHero Component
 * 
 * Supports:
 * - Standardized 400px fixed-height hero sections with centered image backgrounds,
 *   gradient overlays, titles, subtitles, and CTA elements.
 * - Fluid responsive banner-only display for graphic-heavy hubs.
 * - Zero GPU-blur memory overhead for maximum stability across mobile and desktop.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  title,
  imageSrc,
  imageAlt,
  className = '',
  height,
  objectFit,
  overlayClassName,
  titleClassName = '',
  badge,
  subtitle,
  children,
  showTextOverlay = false,
}) => {
  const is400px = height === '400px' || height === '400';
  const resolvedObjectFit = objectFit || (is400px ? 'cover' : 'contain');
  const hasCustomBg = className.includes('bg-');

  return (
    <section 
      className={`relative w-full m-0 p-0 overflow-hidden flex items-center justify-center select-none ${
        is400px ? 'h-[400px] min-h-[400px] max-h-[400px]' : ''
      } ${hasCustomBg ? '' : 'bg-[#070D1E]'} ${className}`}
      style={{
        width: '100%',
        margin: 0,
        padding: 0,
        ...(height ? { height, minHeight: height, maxHeight: height } : {}),
      }}
      aria-label={title}
    >
      {/* 1. Background Image */}
      <img
        src={imageSrc}
        alt={imageAlt || `${title} hero banner`}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        className={`w-full block ${
          is400px
            ? resolvedObjectFit === 'contain'
              ? 'w-full h-full object-contain object-center'
              : 'w-full h-full object-cover object-center'
            : 'h-auto object-contain'
        }`}
        style={{ 
          width: '100%', 
          height: is400px ? '100%' : (height || 'auto'),
          objectFit: resolvedObjectFit,
          objectPosition: 'center',
          display: 'block',
        }}
      />

      {/* 2. Standardized High-Contrast Overlay when text/CTAs are rendered */}
      {showTextOverlay && (
        <div 
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            overlayClassName || 'bg-gradient-to-t from-[#070D1E]/95 via-[#070D1E]/70 to-[#070D1E]/80'
          }`}
          aria-hidden="true"
        />
      )}

      {/* 3. Centered Content Container for Titles, Subtitles & CTAs */}
      {showTextOverlay ? (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center h-full my-auto py-6">
          {/* Top Context Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-2.5 rounded-sm bg-[#0F1B2D]/95 text-[#F5B800] text-[11px] sm:text-xs font-bold uppercase tracking-wider border border-slate-700/60 shadow-xs shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-pulse" />
              <span>{badge}</span>
            </div>
          )}

          {/* Main Title / Header */}
          <h1 
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] line-clamp-2 ${titleClassName}`}
          >
            {title}
          </h1>

          {/* Sleek Gold Divider Line */}
          <div className="w-14 sm:w-16 h-[2px] bg-[#F5B800] my-2 sm:my-3 mx-auto rounded-full shadow-xs shrink-0" />

          {/* Subtitle / Descriptive Paragraph */}
          {subtitle && (
            <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-sm line-clamp-2 sm:line-clamp-3">
              {subtitle}
            </p>
          )}

          {/* Centered CTA Elements / Buttons */}
          {children && (
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2.5 shrink-0">
              {children}
            </div>
          )}
        </div>
      ) : (
        /* Accessible Screen-Reader Heading for Banner-Only Display */
        <h1 className="sr-only">{title}</h1>
      )}
    </section>
  );
};

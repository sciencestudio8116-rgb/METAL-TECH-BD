import React from 'react';

export type IndustrialIconType =
  | 'metallurgy'
  | 'casting'
  | 'heat-treatment'
  | 'machining'
  | 'additive'
  | 'testing'
  | 'fabrication'
  | 'centrifugal'
  | 'sand-casting'
  | 'investment'
  | 'alloys'
  | 'power'
  | 'oil-gas'
  | 'marine'
  | 'navy-marine'
  | 'railway'
  | 'heavy-vehicles'
  | 'industry'
  | 'mining'
  | 'defense'
  | 'paper-steel'
  | 'quality'
  | 'traceability'
  | 'turnkey'
  | 'default';

interface IndustrialIconProps {
  name: IndustrialIconType | string;
  className?: string;
}

export const IndustrialIcon: React.FC<IndustrialIconProps> = ({ name, className = 'w-16 h-16' }) => {
  switch (name) {
    // 1. METALLURGY & ENGINEERING (Engineer Avatar with Yellow Hardhat - Exact match to Screenshot 1)
    case 'metallurgy':
    case 'engineer':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Hardhat Fill */}
          <path
            d="M26 34C26 23.5 32 15 40 15C48 15 54 23.5 54 34H26Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Hardhat Ridge & Ribs */}
          <path
            d="M40 15V34M33 19C33 24 33 29 33 34M47 19C47 24 47 29 47 34"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Hardhat Brim */}
          <path
            d="M21 34C21 32 23 32 26 32H54C57 32 59 32 59 34C59 36.5 57 37 54 37H26C23 37 21 36.5 21 34Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Face Contour */}
          <path
            d="M29 37V44C29 50 34 54 40 54C46 54 51 50 51 44V37"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Ears */}
          <path
            d="M29 41H26C24.5 41 24 42.5 24 44C24 45.5 24.5 47 26 47H29"
            stroke="#0F1B2D"
            strokeWidth="3"
          />
          <path
            d="M51 41H54C55.5 41 56 42.5 56 44C56 45.5 55.5 47 54 47H51"
            stroke="#0F1B2D"
            strokeWidth="3"
          />
          {/* Neck */}
          <path d="M35 53V59M45 53V59" stroke="#0F1B2D" strokeWidth="3" strokeLinecap="round" />
          {/* Shoulders & Work Vest */}
          <path
            d="M17 71C17 63 24 59 33 59H47C56 59 63 63 63 71"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Vest Straps */}
          <path d="M28 59.5V71M52 59.5V71" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Center Zipper */}
          <path d="M40 59V71" stroke="#0F1B2D" strokeWidth="2.5" strokeDasharray="3 2" />
        </svg>
      );

    // 2. METAL CASTING (Pouring Ladle with Molten Yellow Stream - Exact match to Screenshot 1)
    case 'casting':
    case 'metal-casting':
    case 'ladle':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ladle Body Tilted Diagonally */}
          <g transform="rotate(-30 40 40)">
            {/* Ladle Vessel */}
            <rect
              x="26"
              y="22"
              width="28"
              height="28"
              rx="4"
              fill="white"
              stroke="#0F1B2D"
              strokeWidth="3.5"
            />
            {/* Molten Metal Fill Inside */}
            <rect x="29" y="32" width="22" height="15" rx="2" fill="#F5B800" />
            {/* Ladle Lip / Spout */}
            <path
              d="M24 22H56"
              stroke="#0F1B2D"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Suspension / Bail Arms */}
            <path
              d="M19 12H61M40 12V22"
              stroke="#0F1B2D"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Side Pivot Trunnions */}
            <circle cx="23" cy="36" r="3" fill="#0F1B2D" />
            <circle cx="57" cy="36" r="3" fill="#0F1B2D" />
          </g>

          {/* Flowing Yellow Molten Stream Pouring Downwards */}
          <path
            d="M45 42C48 48 47 56 46 68C46 72 49 73 51 70C53 66 54 54 52 46"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Molten Droplets / Splashes */}
          <circle cx="57" cy="64" r="2.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1.5" />
          <circle cx="43" cy="67" r="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1" />
        </svg>
      );

    // 3. HEAT TREATMENT (Curved Triple Flame with Yellow Core - Exact match to Screenshot 2)
    case 'heat-treatment':
    case 'flame':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Outer Black Flame Contour */}
          <path
            d="M40 12C42 22 49 26 49 35C49 37 48 39 47 40C49 39 52 38 54 38C57 38 60 41 60 46C60 56 50 68 39 68C27 68 20 59 20 48C20 37 28 30 33 24C34 29 37 32 37 36C37 33 38 22 40 12Z"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="white"
          />
          {/* Inner Flame with Yellow Accent Fill */}
          <path
            d="M40 34C43 40 48 44 48 50C48 56 43 62 38 62C32 62 28 57 28 51C28 44 33 40 37 37C37.5 40 38.5 42 39 44C39 42 39.5 37 40 34Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Floating Spark Droplets */}
          <circle cx="26" cy="30" r="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1.5" />
          <circle cx="56" cy="32" r="2.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1.5" />
          <circle cx="21" cy="42" r="1.5" fill="#0F1B2D" />
          <circle cx="61" cy="54" r="1.5" fill="#0F1B2D" />
        </svg>
      );

    // 4. METAL MACHINING (Vertical CNC Cutter Tool with Sparks - Exact match to Screenshot 2)
    case 'machining':
    case 'metal-machining':
    case 'cutter':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Spindle / Machine Head */}
          <path
            d="M24 16H56V26H24V16Z"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="white"
          />
          {/* Center Vertical Tool Body */}
          <path
            d="M32 26H48V42H32V26Z"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            fill="white"
          />
          {/* Tool Flutes / Ridges */}
          <path d="M40 26V42M36 30V38M44 30V38" stroke="#0F1B2D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Cutting Insert Tip with Yellow Fill */}
          <path
            d="M32 42L40 56L48 42H32Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Workpiece Bed / Base Plate */}
          <path
            d="M16 63H64"
            stroke="#0F1B2D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Machined Notch / Slot */}
          <path
            d="M32 63V57H48V63"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Radiating Sparks / Chips flying from cutting bit */}
          <path
            d="M48 54L56 50M50 58L60 56M49 61L58 62"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="58" cy="48" r="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1" />
          <circle cx="62" cy="53" r="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="1" />
        </svg>
      );

    // 5. ADDITIVE MANUFACTURING (3D Printing Nozzle & Layer Deposition)
    case 'additive':
    case '3d-printing':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Extruder Nozzle Head */}
          <path
            d="M30 14H50V26L43 36H37L30 26V14Z"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="white"
          />
          {/* Nozzle Tip */}
          <path
            d="M38 36H42V41H38V36Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="2.5"
          />
          {/* Laser/Extrusion Arc */}
          <path
            d="M40 41V46"
            stroke="#F5B800"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Deposited 3D Layers */}
          <rect x="28" y="47" width="24" height="5" rx="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="24" y="53" width="32" height="5" rx="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="20" y="59" width="40" height="5" rx="1.5" fill="white" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Build Plate */}
          <path d="M14 66H66" stroke="#0F1B2D" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // 6. TESTING & ANALYSIS (Optical / Spectrometer / Precision Gauge)
    case 'testing':
    case 'inspection':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Inspection Gauge / Caliper Head */}
          <circle
            cx="40"
            cy="36"
            r="20"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
          />
          {/* Gauge Dial / Inner Yellow Indicator Ring */}
          <circle
            cx="40"
            cy="36"
            r="14"
            stroke="#0F1B2D"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          {/* Pointer Needle in Yellow */}
          <path
            d="M40 36L49 27"
            stroke="#F5B800"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="40" cy="36" r="3.5" fill="#0F1B2D" />
          {/* Base Stand / Mount */}
          <path
            d="M40 56V66M26 66H54"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Verification Badge */}
          <path
            d="M52 18L56 22L64 14"
            stroke="#F5B800"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 7. CENTRIFUGAL CASTING (Rotating Die Cylinder with Molten Liner)
    case 'centrifugal':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Outer Rotating Cylinder / Mold */}
          <ellipse cx="26" cy="40" rx="10" ry="20" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          <path
            d="M26 20H54C60 20 64 29 64 40C64 51 60 60 54 60H26"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            fill="white"
          />
          <ellipse cx="54" cy="40" rx="10" ry="20" stroke="#0F1B2D" strokeWidth="3.5" fill="#F5B800" />
          {/* Inner Bore Hole */}
          <ellipse cx="54" cy="40" rx="5" ry="11" fill="white" stroke="#0F1B2D" strokeWidth="3" />
          {/* Rotation Arrows */}
          <path
            d="M14 26C16 20 22 15 28 15"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M28 12L31 16L27 19" fill="#0F1B2D" />
        </svg>
      );

    // 8. SAND CASTING (Molding Flask & Core)
    case 'sand-casting':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Flask Box Outer */}
          <rect x="18" y="20" width="44" height="42" rx="3" stroke="#0F1B2D" strokeWidth="3.5" fill="white" />
          {/* Parting Line (Cope & Drag) */}
          <path d="M18 41H62" stroke="#0F1B2D" strokeWidth="3" />
          {/* Pouring Cup with Yellow Molten Pour */}
          <path
            d="M34 20H46L43 30H37L34 20Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="2.5"
          />
          {/* Internal Cavity / Casting Core */}
          <rect x="28" y="36" width="24" height="18" rx="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Sand texture dots */}
          <circle cx="23" cy="30" r="1" fill="#0F1B2D" />
          <circle cx="56" cy="32" r="1" fill="#0F1B2D" />
          <circle cx="24" cy="52" r="1" fill="#0F1B2D" />
          <circle cx="57" cy="50" r="1" fill="#0F1B2D" />
        </svg>
      );

    // 9. PRECISION INVESTMENT CASTING (Ceramic Tree & Clusters)
    case 'investment':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Pouring Basin */}
          <path d="M30 16H50L45 24H35L30 16Z" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3" strokeLinejoin="round" />
          {/* Central Runner Sprue */}
          <rect x="37" y="24" width="6" height="42" fill="white" stroke="#0F1B2D" strokeWidth="3" />
          {/* Branch Clusters with Yellow Castings */}
          <rect x="20" y="30" width="17" height="8" rx="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="43" y="30" width="17" height="8" rx="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="20" y="44" width="17" height="8" rx="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="43" y="44" width="17" height="8" rx="2" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Tree Base */}
          <path d="M30 66H50" stroke="#0F1B2D" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // 10. HIGH INTEGRITY ALLOYS & INGOTS
    case 'alloys':
    case 'ingot':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Stack of Metal Ingots */}
          {/* Top Ingot */}
          <path
            d="M30 22L36 17H50L44 22H30Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M30 22H44L41 33H27L30 22Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M44 22L50 17L47 28L41 33L44 22Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Bottom Left Ingot */}
          <path
            d="M17 44L23 38H39L33 44H17Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M17 44H33L29 57H13L17 44Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Bottom Right Ingot */}
          <path
            d="M41 44L47 38H63L57 44H41Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M41 44H57L53 57H37L41 44Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Base Foundation */}
          <path d="M10 64H70" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    // 11. FABRICATION & WELDING
    case 'fabrication':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Welding Torch Gun */}
          <path
            d="M18 20L34 36L44 26L28 10L18 20Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Torch Nozzle */}
          <path
            d="M34 36L42 44L47 39L39 31"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Welding Tip */}
          <path d="M42 44L48 50" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Arc Glow & Sparks */}
          <circle cx="51" cy="53" r="3" fill="#F5B800" />
          <path
            d="M54 48L61 45M55 56L63 58M48 57L46 64"
            stroke="#F5B800"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Welded Joint Base */}
          <path d="M30 63H66" stroke="#0F1B2D" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    // 12. POWER GENERATION (Turbine Runner Blade)
    case 'power':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <circle cx="40" cy="40" r="10" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3.5" />
          {/* 4 Curved Turbine Blades */}
          <path
            d="M40 30C40 18 50 14 56 16C52 24 48 28 40 30Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M50 40C62 40 66 50 64 56C56 52 52 48 50 40Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M40 50C40 62 30 66 24 64C28 56 32 52 40 50Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M30 40C18 40 14 30 16 24C24 28 28 32 30 40Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 13. CHEMICAL, OIL & GAS (Industrial Valve & Flange)
    case 'oil-gas':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Horizontal Pipeline Pipe */}
          <rect x="14" y="34" width="52" height="16" rx="2" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          {/* Flange Ends */}
          <path d="M14 28V56M66 28V56" stroke="#0F1B2D" strokeWidth="4" strokeLinecap="round" />
          {/* Center Valve Body */}
          <circle cx="40" cy="42" r="12" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3.5" />
          {/* Valve Stem & Handwheel */}
          <path d="M40 30V18M28 18H52" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    // 14. MARINE & SUBSEA (Propeller)
    case 'marine':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Propeller Hub */}
          <circle cx="40" cy="40" r="8" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3.5" />
          {/* 3 Propeller Blades */}
          <path
            d="M40 32C40 16 54 18 52 28C48 34 44 33 40 32Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M46 44C58 54 50 64 42 60C37 54 41 49 46 44Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M34 44C22 54 18 42 24 36C30 32 32 39 34 44Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Wave Lines Below */}
          <path
            d="M16 66C22 64 28 68 34 66C40 64 46 68 52 66C58 64 64 68 68 66"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    // 15. MINING & MINERAL (Heavy Crusher & Slurry Impeller)
    case 'mining':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Pickaxe Crossed */}
          <path
            d="M24 22C32 20 48 20 56 22"
            stroke="#0F1B2D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M40 21L40 64"
            stroke="#0F1B2D"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Heavy Ore Rock with Yellow Mineral Vein */}
          <path
            d="M22 50L32 40L44 44L48 58L34 64L22 50Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M32 40L36 50L48 58"
            stroke="#F5B800"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 16. DEFENSE & AEROSPACE (Armored Shield & Jet Profile)
    case 'defense':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Shield Outline */}
          <path
            d="M40 14L58 22V38C58 52 40 66 40 66C40 66 22 52 22 38V22L40 14Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Shield Center Crest in Yellow */}
          <path
            d="M40 22L50 28V38C50 48 40 57 40 57C40 57 30 48 30 38V28L40 22Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Center Star */}
          <path
            d="M40 31L42 36H47L43 39L44 44L40 41L36 44L37 39L33 36H38L40 31Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="1.5"
          />
        </svg>
      );

    // 17. PULP, PAPER & STEEL (Heavy Mill Rollers)
    case 'paper-steel':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Top Roller */}
          <rect x="20" y="18" width="40" height="18" rx="4" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          <path d="M20 27H60" stroke="#0F1B2D" strokeWidth="2.5" strokeDasharray="3 3" />
          {/* Steel Sheet passing through with Yellow accent */}
          <rect x="12" y="38" width="56" height="5" rx="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2" />
          {/* Bottom Roller */}
          <rect x="20" y="45" width="40" height="18" rx="4" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          <path d="M20 54H60" stroke="#0F1B2D" strokeWidth="2.5" strokeDasharray="3 3" />
        </svg>
      );

    // 18. QUALITY STANDARDS & CERTIFICATIONS (Ribbon Medallion)
    case 'quality':
    case 'certified':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ribbon Tails */}
          <path d="M32 50L24 70L36 64L40 70" stroke="#0F1B2D" strokeWidth="3" fill="white" />
          <path d="M48 50L56 70L44 64L40 70" stroke="#0F1B2D" strokeWidth="3" fill="white" />
          {/* Medal Circle */}
          <circle cx="40" cy="34" r="20" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          {/* Inner Golden Ring */}
          <circle cx="40" cy="34" r="14" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Quality Checkmark */}
          <path
            d="M33 34L38 39L47 30"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // 19. TRACEABILITY & MTC REPORT (Checklist Document)
    case 'traceability':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Document Sheet */}
          <path
            d="M24 16H46L56 26V64H24V16Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Folded Corner */}
          <path d="M46 16V26H56" stroke="#0F1B2D" strokeWidth="3.5" strokeLinejoin="round" />
          {/* Golden Seal Badge */}
          <circle cx="44" cy="52" r="7" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2" />
          {/* Text Lines */}
          <path d="M30 32H44M30 40H38M30 48H36" stroke="#0F1B2D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 20. TURNKEY FINISHING (Gears & Precision Assembly)
    case 'turnkey':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Main Gear */}
          <circle cx="34" cy="36" r="16" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          <circle cx="34" cy="36" r="6" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Gear Teeth */}
          <path d="M34 16V20M34 52V56M14 36H18M50 36H54M20 22L23 25M45 47L48 50M20 50L23 47M45 25L48 22" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
          {/* Secondary Interlocking Gear */}
          <circle cx="56" cy="54" r="11" fill="white" stroke="#0F1B2D" strokeWidth="3" />
          <circle cx="56" cy="54" r="4" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2" />
        </svg>
      );

    // 21. RAILWAY (Locomotives, Bogies & Train Wheels)
    case 'railway':
    case 'locomotives':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Locomotive Cab Outline */}
          <path
            d="M24 18C24 15 26 13 30 13H50C54 13 56 15 56 18V50H24V18Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Locomotive Windshields */}
          <rect x="29" y="19" width="9" height="10" rx="1.5" fill="#F3F4F6" stroke="#0F1B2D" strokeWidth="2.5" />
          <rect x="42" y="19" width="9" height="10" rx="1.5" fill="#F3F4F6" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Center Powerful Headlight with Yellow Beam */}
          <circle cx="40" cy="36" r="6" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3" />
          <circle cx="40" cy="36" r="2.5" fill="white" />
          {/* Bogie Radiator Grille */}
          <path d="M30 44H50M32 48H48" stroke="#0F1B2D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Heavy Cast Iron Buffer / Cowcatcher Frame */}
          <path
            d="M20 50H60V56L54 62H26L20 56V50Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Railway Tracks & Ballast */}
          <path d="M16 67H64" stroke="#0F1B2D" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 67L19 73M34 67L32 73M46 67L48 73M58 67L61 73" stroke="#0F1B2D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 22. NAVY AND MARINE (Ship, Vessel Components & Bronze Propeller)
    case 'navy-marine':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ship Vessel Hull */}
          <path
            d="M14 42L22 58C26 62 40 64 58 60L66 42H14Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Ship Bridge / Superstructure */}
          <path
            d="M28 42V28H48V42"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Observation Mast with Yellow Radar Flag */}
          <path d="M38 28V16M33 21H43" stroke="#0F1B2D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="16" r="3" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2" />
          {/* Waterline Accent Stripe */}
          <path d="M18 48H62" stroke="#F5B800" strokeWidth="3" />
          {/* Bronze Propeller Wheel */}
          <circle cx="58" cy="62" r="5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          <path d="M58 57V67M53 62H63" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" />
          {/* Ocean Waves */}
          <path
            d="M12 66C18 64 24 68 30 66C36 64 42 68 48 66C54 64 60 68 68 66"
            stroke="#0F1B2D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    // 23. HEAVY VEHICLES (Truck and Bus Brake Drums, Discs & Flywheels)
    case 'heavy-vehicles':
    case 'brakes':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Outer Cast Iron Brake Drum / Disc */}
          <circle
            cx="40"
            cy="40"
            r="26"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
          />
          {/* Ventilated Disc Friction Ring */}
          <circle
            cx="40"
            cy="40"
            r="19"
            stroke="#0F1B2D"
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />
          {/* Center Wheel Hub */}
          <circle cx="40" cy="40" r="10" fill="#0F1B2D" />
          <circle cx="40" cy="40" r="5" fill="white" />
          {/* Wheel Stud Lug Holes */}
          <circle cx="40" cy="27" r="1.5" fill="#0F1B2D" />
          <circle cx="40" cy="53" r="1.5" fill="#0F1B2D" />
          <circle cx="27" cy="40" r="1.5" fill="#0F1B2D" />
          <circle cx="53" cy="40" r="1.5" fill="#0F1B2D" />
          {/* Heavy Brake Caliper / Shoe Clamp in Yellow */}
          <path
            d="M17 22C21 16 30 14 36 14V28C32 28 24 29 20 34L17 22Z"
            fill="#F5B800"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="21" r="2.5" fill="white" stroke="#0F1B2D" strokeWidth="1.5" />
        </svg>
      );

    // 24. INDUSTRY (Pumps, Valves, Machine Parts & Gears)
    case 'industry':
    case 'pumps-valves':
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Industrial Centrifugal Pump Volute Casing */}
          <path
            d="M26 38C26 27 35 18 46 18C57 18 64 27 64 38C64 49 55 58 44 58H20V50C23 50 26 44 26 38Z"
            fill="white"
            stroke="#0F1B2D"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Pump Discharge Flange Neck */}
          <rect x="42" y="12" width="16" height="6" rx="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Suction Flange */}
          <rect x="14" y="47" width="6" height="14" rx="1.5" fill="#F5B800" stroke="#0F1B2D" strokeWidth="2.5" />
          {/* Internal Impeller / Machine Part */}
          <circle cx="45" cy="38" r="10" fill="#F5B800" stroke="#0F1B2D" strokeWidth="3" />
          {/* Impeller Vanes */}
          <path d="M45 32V44M39 38H51M41 34L49 42" stroke="#0F1B2D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Heavy Structural Base Foot */}
          <path d="M28 58V66M54 58V66M22 66H60" stroke="#0F1B2D" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          <rect x="20" y="20" width="40" height="40" rx="4" fill="white" stroke="#0F1B2D" strokeWidth="3.5" />
          <path d="M40 28V52M28 40H52" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
  }
};

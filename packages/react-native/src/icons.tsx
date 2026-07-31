import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

/**
 * Lucide/Feather-style icons for the Kanban cards (RN port of the web set).
 * `color` is required — RN has no `currentColor` equivalent, so there's no
 * safe default that wouldn't bypass the theme's alias tokens. Pass a value
 * from `useNemoTheme()` (e.g. `t.color.text.neutral.primary`).
 */
type Props = { size?: number; color: string };

const S = ({ size = 16, children }: { size?: number; children: React.ReactNode }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {children}
  </Svg>
);
const stroke = (color: string) => ({
  stroke: color,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const ClockIcon = ({ size, color }: Props) => (
  <S size={size}><Circle cx={12} cy={12} r={9} {...stroke(color)} /><Path d="M12 7v5l3 2" {...stroke(color)} /></S>
);
export const PinIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" {...stroke(color)} /><Circle cx={12} cy={10} r={2.5} {...stroke(color)} /></S>
);
export const CheckIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="M20 6 9 17l-5-5" {...stroke(color)} /></S>
);
export const PersonIcon = ({ size, color }: Props) => (
  <S size={size}><Circle cx={12} cy={8} r={4} {...stroke(color)} /><Path d="M4 21a8 8 0 0 1 16 0" {...stroke(color)} /></S>
);
export const DotsIcon = ({ size, color }: Props) => (
  <S size={size}><Circle cx={5} cy={12} r={1.6} fill={color} /><Circle cx={12} cy={12} r={1.6} fill={color} /><Circle cx={19} cy={12} r={1.6} fill={color} /></S>
);
export const ChevronUpIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="m6 15 6-6 6 6" {...stroke(color)} /></S>
);
export const ChevronDownIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="m6 9 6 6 6-6" {...stroke(color)} /></S>
);

/* -------- ProductCard icon set -------- */
export const PlusIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="M12 5v14M5 12h14" {...stroke(color)} /></S>
);
export const MinusIcon = ({ size, color }: Props) => (
  <S size={size}><Path d="M5 12h14" {...stroke(color)} /></S>
);
export const PackageIcon = ({ size, color }: Props) => (
  <S size={size}>
    <Path d="M3 7 12 3l9 4-9 4-9-4Z" {...stroke(color)} />
    <Path d="M3 7v10l9 4 9-4V7" {...stroke(color)} />
    <Path d="M12 11v10" {...stroke(color)} />
  </S>
);

/**
 * NavigationBar icon set — unlike the icons above (hand-drawn Lucide/Feather
 * equivalents), these are the *exact* path data exported from Figma
 * (`icons-DakiApp/Tabbar`, file "Daki App • Components — Design in
 * Progress"), same paths `packages/web/src/icons/tabbar.tsx` already uses —
 * downloaded and diffed against the real SVG, not approximated. Each
 * viewBox matches the source asset (they're not all 24×24); `fill={color}`
 * stands in for the web version's `currentColor` (RN has no equivalent).
 */
export const TabbarHomeIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={(size * 19.7573) / 20} viewBox="0 0 20 19.7573" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d="M10.3876 1.64325C10.1481 1.50353 9.85193 1.50353 9.61242 1.64324L1.9201 6.13042C1.68378 6.26827 1.53846 6.52127 1.53846 6.79486L1.53849 18.2189H6.15383V11.2958C6.15383 10.871 6.49823 10.5266 6.92306 10.5266H13.0769C13.5017 10.5266 13.8461 10.871 13.8461 11.2958V18.2189H18.4615L18.4615 6.79486C18.4615 6.52127 18.3162 6.26827 18.0799 6.13042L10.3876 1.64325ZM8.83724 0.314354C9.55577 -0.104786 10.4443 -0.104785 11.1628 0.314358L18.8551 4.80153C19.564 5.21509 20 5.97409 20 6.79486L20 18.9881C20 19.1921 19.919 19.3878 19.7747 19.532C19.6304 19.6763 19.4348 19.7573 19.2308 19.7573H13.0769C12.6521 19.7573 12.3077 19.413 12.3077 18.9881V12.0651H7.69229V18.9881C7.69229 19.413 7.3479 19.7573 6.92306 19.7573H0.769261C0.344428 19.7573 3.29201e-05 19.413 3.18197e-05 18.9881L0 6.79487C-2.10908e-06 5.9741 0.435948 5.21509 1.14491 4.80153L8.83724 0.314354Z"
    />
  </Svg>
);
export const TabbarCategoriesIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Path
      fill={color}
      d="M5.59375 10.4062C6.69827 10.4062 7.59367 11.3017 7.59375 12.4062V16C7.59375 17.1046 6.69832 18 5.59375 18H2L1.7959 17.9902C0.787187 17.888 0 17.0357 0 16V12.4062C7.57606e-05 11.3017 0.895477 10.4063 2 10.4062H5.59375ZM16 10.4062C17.1045 10.4062 17.9999 11.3017 18 12.4062V16C18 17.1046 17.1046 18 16 18H12.4062L12.2021 17.9902C11.1934 17.888 10.4062 17.0357 10.4062 16V12.4062C10.4063 11.3017 11.3017 10.4063 12.4062 10.4062H16ZM12.4062 11.9062C12.1302 11.9063 11.9063 12.1302 11.9062 12.4062V16C11.9062 16.2761 12.1301 16.5 12.4062 16.5H16C16.2761 16.5 16.5 16.2761 16.5 16V12.4062C16.4999 12.1302 16.2761 11.9062 16 11.9062H12.4062ZM2 11.9062C1.7239 11.9063 1.50008 12.1302 1.5 12.4062V16C1.5 16.2761 1.72386 16.5 2 16.5H5.59375C5.86989 16.5 6.09375 16.2761 6.09375 16V12.4062C6.09367 12.1302 5.86984 11.9062 5.59375 11.9062H2ZM5.59375 0C6.69832 0 7.59375 0.895431 7.59375 2V5.59375C7.59375 6.69832 6.69832 7.59375 5.59375 7.59375H2L1.7959 7.58398C0.787181 7.48176 0 6.62943 0 5.59375V2C0 0.895431 0.895431 7.07181e-08 2 0H5.59375ZM16 0C17.1046 0 18 0.895431 18 2V5.59375C18 6.69832 17.1046 7.59375 16 7.59375H12.4062L12.2021 7.58398C11.1934 7.48176 10.4062 6.62943 10.4062 5.59375V2C10.4062 0.895431 11.3017 7.07181e-08 12.4062 0H16ZM2 1.5C1.72386 1.5 1.5 1.72386 1.5 2V5.59375C1.5 5.86989 1.72386 6.09375 2 6.09375H5.59375C5.86989 6.09375 6.09375 5.86989 6.09375 5.59375V2C6.09375 1.72386 5.86989 1.5 5.59375 1.5H2ZM12.4062 1.5C12.1301 1.5 11.9062 1.72386 11.9062 2V5.59375C11.9062 5.86989 12.1301 6.09375 12.4062 6.09375H16C16.2761 6.09375 16.5 5.86989 16.5 5.59375V2C16.5 1.72386 16.2761 1.5 16 1.5H12.4062Z"
    />
  </Svg>
);
export const TabbarSearchIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fill={color}
      d="M10.1504 2C14.6504 2.00016 18.2979 5.64844 18.2979 10.1484C18.2978 12.1488 17.577 13.9804 16.3809 15.3984C16.46 15.4342 16.5345 15.4848 16.5996 15.5498L21.7852 20.7354C22.0744 21.0246 22.0744 21.4939 21.7852 21.7832C21.4959 22.0725 21.0266 22.0725 20.7373 21.7832L15.5518 16.5977C15.4868 16.5326 15.4361 16.4581 15.4004 16.3789C13.9824 17.575 12.1507 18.2958 10.1504 18.2959C5.65039 18.2959 2.00211 14.6484 2.00195 10.1484C2.00195 5.64834 5.65029 2 10.1504 2ZM10.1504 3.48145C6.46849 3.48145 3.4834 6.46654 3.4834 10.1484C3.48355 13.8302 6.46859 16.8145 10.1504 16.8145C13.8321 16.8143 16.8163 13.8301 16.8164 10.1484C16.8164 6.46664 13.8322 3.4816 10.1504 3.48145Z"
    />
  </Svg>
);
export const TabbarOrdersIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={(size * 20) / 17.001} viewBox="0 0 17.001 20" fill="none">
    <Path
      fill={color}
      d="M16.001 0C16.5529 0.000439553 17.001 0.447987 17.001 1V19C17.001 19.552 16.5529 19.9996 16.001 20H0C0.657143 19.9999 1 19 1 17.5C1 17.4944 1.00094 17.4889 1.00098 17.4834V1C1.00098 0.447715 1.44869 0 2.00098 0H16.001ZM2.50098 18.4297H15.501V1.42969H2.50098V18.4297ZM11.752 9C12.1662 9 12.5029 9.33579 12.5029 9.75C12.5029 10.1642 12.1662 10.5 11.752 10.5H6.75293C6.33872 10.5 6.00293 10.1642 6.00293 9.75C6.00293 9.33579 6.33872 9 6.75293 9H11.752ZM13.751 5C14.1652 5 14.502 5.33579 14.502 5.75C14.502 6.16421 14.1652 6.5 13.751 6.5H4.75195C4.33774 6.5 4.00195 6.16421 4.00195 5.75C4.00195 5.33579 4.33774 5 4.75195 5H13.751Z"
    />
  </Svg>
);
export const TabbarUserIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d="M7.57643 6.42308C7.57643 3.98028 9.55671 2 11.9995 2C14.4423 2 16.4226 3.98028 16.4226 6.42308V7.57692C16.4226 10.0197 14.4423 12 11.9995 12C9.55671 12 7.57643 10.0197 7.57643 7.57692V6.42308ZM11.9995 3.53846C10.4064 3.53846 9.1149 4.82995 9.1149 6.42308V7.57692C9.1149 9.17005 10.4064 10.4615 11.9995 10.4615C13.5926 10.4615 14.8841 9.17005 14.8841 7.57692V6.42308C14.8841 4.82995 13.5926 3.53846 11.9995 3.53846Z"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill={color}
      d="M1.99951 18.9231C1.99951 15.9492 4.41029 13.5385 7.38413 13.5385H16.6149C19.5887 13.5385 21.9995 15.9492 21.9995 18.9231V19.6923C21.9995 20.9668 20.9663 22 19.6918 22H4.3072C3.0327 22 1.99951 20.9668 1.99951 19.6923V18.9231ZM7.38413 15.0769C5.25996 15.0769 3.53797 16.7989 3.53797 18.9231V19.6923C3.53797 20.1171 3.88237 20.4615 4.3072 20.4615H19.6918C20.1167 20.4615 20.4611 20.1171 20.4611 19.6923V18.9231C20.4611 16.7989 18.7391 15.0769 16.6149 15.0769H7.38413Z"
    />
  </Svg>
);
export const TabbarBagIcon = ({ size = 24, color }: Props) => (
  <Svg width={size} height={(size * 25) / 26} viewBox="0 0 26 25" fill="none">
    <Path
      fill={color}
      d="M13.2099 1.5C15.7293 1.5 18.0251 3.47473 18.4257 7H19.5273C20.4466 7.00011 21.2087 7.71171 21.2724 8.62891L22.1747 21.6289C22.2449 22.6406 21.4428 23.5 20.4286 23.5H5.57121C4.55797 23.5 3.75637 22.6418 3.82511 21.6309L4.7089 8.63086C4.77154 7.71283 5.53481 7.00011 6.45499 7H7.99406C8.39469 3.47474 10.6904 1.50001 13.2099 1.5ZM6.45499 8.5C6.32361 8.50011 6.2149 8.60229 6.20597 8.7334L5.32218 21.7334C5.31256 21.8777 5.42657 22 5.57121 22H20.4286C20.5735 22 20.6887 21.877 20.6786 21.7324L19.7763 8.73242C19.767 8.6016 19.6584 8.50011 19.5273 8.5H15.6757C15.7229 8.65852 15.7489 8.82614 15.7489 9V10C15.7489 10.9665 14.9654 11.75 13.9989 11.75H11.9989C11.0327 11.7497 10.2489 10.9663 10.2489 10V9C10.2489 8.82613 10.2759 8.65853 10.3232 8.5H6.45499ZM11.9989 8.75C11.8611 8.75025 11.7489 8.86209 11.7489 9V10C11.7489 10.1379 11.8611 10.2497 11.9989 10.25H13.9989C14.137 10.25 14.2489 10.1381 14.2489 10V9C14.2489 8.86193 14.137 8.75 13.9989 8.75H11.9989ZM13.2099 3C11.6495 3.00001 9.87656 4.20064 9.50382 7H16.9159C16.5432 4.20063 14.7703 3.00001 13.2099 3Z"
    />
  </Svg>
);

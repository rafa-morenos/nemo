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

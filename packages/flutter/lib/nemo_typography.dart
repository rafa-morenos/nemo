import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// NemoTypography — Flutter port of the web `Text`/`textVariants` primitive
/// (`components/typography.tsx`, which despite the file name exports a single
/// `Text` component, not h1-h4 tags). Named `NemoTypography` (not `Text`,
/// which would collide with Flutter's own `Text` widget, and not `Typography`
/// — Material's `ThemeData.typography` is a same-named *theme class*, not a
/// widget, but close enough conceptually to prefix for clarity, per this
/// bucket's naming convention). `as`/`asChild` (DOM tag override, Radix
/// `Slot`) don't exist in Flutter — every variant renders as [Text].
///
///   NemoTypography('Título', variant: NemoTypographyVariant.h1)
///   NemoTypography('Descrição', tone: NemoTypographyTone.secondary)
enum NemoTypographyVariant { display, h1, h2, h3, body, bodySm, label, caption }

enum NemoTypographyTone { defaultTone, secondary, muted, brand, decorative, danger, success, onBrand }

class NemoTypography extends StatelessWidget {
  const NemoTypography(
    this.text, {
    super.key,
    this.variant = NemoTypographyVariant.body,
    this.tone = NemoTypographyTone.defaultTone,
    this.textAlign,
    this.maxLines,
    this.overflow,
  });

  final String text;
  final NemoTypographyVariant variant;
  final NemoTypographyTone tone;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
      style: _variantStyle(variant).copyWith(color: _toneColor(tone)),
    );
  }

  // Mirrors `textVariants` (cva) in the web component 1:1 — same size/weight/
  // leading pairing per variant, sourced from `NemoTokens.*` instead of
  // Tailwind classes. `fontFamily` uses `NemoFonts` (registered PostScript
  // names), not a raw token string, same substitution the RN port makes.
  // Owners Narrow only ships a Black (900) cut (see `nemo_fonts.dart`), so
  // `display` renders at weight 900 instead of the web's `font-bold` (700) —
  // documented gap, not a token mismatch. `tracking-tight` (display/h1/h2)
  // has no token; `letterSpacing` is approximated at -2% of the font size,
  // roughly the same ratio as Tailwind's `tracking-tight` (-0.025em).
  static TextStyle _variantStyle(NemoTypographyVariant variant) {
    switch (variant) {
      case NemoTypographyVariant.display:
        return const TextStyle(
          fontFamily: NemoFonts.display,
          fontSize: NemoTokens.fontSize10,
          fontWeight: FontWeight.w900,
          height: 1.25,
          letterSpacing: -NemoTokens.fontSize10 * 0.02,
        );
      case NemoTypographyVariant.h1:
        return const TextStyle(
          fontFamily: NemoFonts.heading,
          fontSize: NemoTokens.fontSize9,
          fontWeight: FontWeight.w500,
          height: 1.25,
          letterSpacing: -NemoTokens.fontSize9 * 0.02,
        );
      case NemoTypographyVariant.h2:
        return const TextStyle(
          fontFamily: NemoFonts.heading,
          fontSize: NemoTokens.fontSize7,
          fontWeight: FontWeight.w500,
          height: 1.25,
        );
      case NemoTypographyVariant.h3:
        return const TextStyle(
          fontFamily: NemoFonts.heading,
          fontSize: NemoTokens.fontSize6,
          fontWeight: FontWeight.w500,
          height: 1.5,
        );
      case NemoTypographyVariant.body:
        return const TextStyle(fontFamily: NemoFonts.sans, fontSize: NemoTokens.fontSize4, fontWeight: FontWeight.w400, height: 1.5);
      case NemoTypographyVariant.bodySm:
        return const TextStyle(fontFamily: NemoFonts.sans, fontSize: NemoTokens.fontSize3, fontWeight: FontWeight.w400, height: 1.5);
      case NemoTypographyVariant.label:
        return const TextStyle(fontFamily: NemoFonts.sans, fontSize: NemoTokens.fontSize3, fontWeight: FontWeight.w500, height: 1.5);
      case NemoTypographyVariant.caption:
        return const TextStyle(fontFamily: NemoFonts.sans, fontSize: NemoTokens.fontSize2, fontWeight: FontWeight.w400, height: 1.5);
    }
  }

  static Color _toneColor(NemoTypographyTone tone) {
    switch (tone) {
      case NemoTypographyTone.defaultTone:
        return NemoTokens.colorTextNeutralPrimary;
      case NemoTypographyTone.secondary:
      case NemoTypographyTone.muted:
        return NemoTokens.colorTextNeutralTertiary;
      case NemoTypographyTone.brand:
        return NemoTokens.colorInteractiveAccentPrimaryMain;
      case NemoTypographyTone.decorative:
        return NemoTokens.colorTextAccentPrimary;
      case NemoTypographyTone.danger:
        return NemoTokens.colorIconSemanticCritical;
      case NemoTypographyTone.success:
        return NemoTokens.colorIconSemanticSuccess;
      case NemoTypographyTone.onBrand:
        return NemoTokens.colorInteractiveAccentPrimaryInverted;
    }
  }
}

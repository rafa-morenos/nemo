import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

// Subtle card elevation — framework default (M3 uses tonal elevation, not
// box-shadow), matching web's Tailwind shadow-sm. Not a token. Same values
// `product_card.dart`'s `_nemoShadow` uses.
const List<BoxShadow> _nemoCardShadow = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

/// NemoCard — Flutter port of the web `Card`/`CardHeader`/`CardTitle`/
/// `CardDescription`/`CardContent`/`CardFooter` (shadcn structure, Nemo
/// tokens). Named `NemoCard` (not `Card`) because Flutter's Material library
/// already has a `Card` widget — every sibling widget in this file is
/// prefixed too, for consistency within the file (only the root class needs
/// to avoid the collision, but naming them all `NemoCard*` keeps the family
/// readable together), same convention `nemo_navigation_bar.dart` set for
/// `NemoNavigationBar`/`NemoNavigationBarItem`.
class NemoCard extends StatelessWidget {
  const NemoCard({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        border: Border.all(color: NemoTokens.colorBorderNeutralMain, width: NemoTokens.borderWidthSm),
        color: NemoTokens.colorSurfaceNeutralTertiary,
        boxShadow: _nemoCardShadow,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: children),
    );
  }
}

class NemoCardHeader extends StatelessWidget {
  const NemoCardHeader({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(NemoTokens.space150),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: _withGaps(children, NemoTokens.space25),
      ),
    );
  }
}

/// text-lg font-semibold leading-tight — no font-heading class on web, so
/// this inherits the base sans stack (Inter), not the Owners Text heading font.
class NemoCardTitle extends StatelessWidget {
  const NemoCardTitle(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize6,
        fontWeight: FontWeight.w600,
        height: 1.25,
        color: NemoTokens.colorTextNeutralPrimary,
      ),
    );
  }
}

class NemoCardDescription extends StatelessWidget {
  const NemoCardDescription(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        color: NemoTokens.colorTextNeutralTertiary,
      ),
    );
  }
}

class NemoCardContent extends StatelessWidget {
  const NemoCardContent({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(NemoTokens.space150, 0, NemoTokens.space150, NemoTokens.space150),
      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: children),
    );
  }
}

class NemoCardFooter extends StatelessWidget {
  const NemoCardFooter({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(NemoTokens.space150, 0, NemoTokens.space150, NemoTokens.space150),
      child: Row(mainAxisSize: MainAxisSize.min, children: children),
    );
  }
}

List<Widget> _withGaps(List<Widget> children, double gap) {
  if (children.isEmpty) return children;
  final result = <Widget>[];
  for (var i = 0; i < children.length; i++) {
    if (i > 0) result.add(SizedBox(height: gap));
    result.add(children[i]);
  }
  return result;
}

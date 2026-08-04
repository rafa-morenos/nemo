import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// Empty — Flutter port of the shadcn/ui Empty API (`Empty`, `EmptyHeader`,
/// `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`). Same
/// compound pattern as `product_card.dart`.
class Empty extends StatelessWidget {
  const Empty({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      // Web's `border-dashed` never actually renders (Tailwind's preflight
      // zeroes border-width, and Empty never adds an explicit `border` width
      // class) — so no border here either, same effective look.
      padding: const EdgeInsets.all(NemoTokens.space150),
      decoration: BoxDecoration(borderRadius: BorderRadius.circular(NemoTokens.radiusLg)),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: _withGaps(children, NemoTokens.space150),
      ),
    );
  }
}

class EmptyHeader extends StatelessWidget {
  const EmptyHeader({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      // max-w-sm (384px) isn't on the space scale — arbitrary Tailwind value on web too.
      constraints: const BoxConstraints(maxWidth: 384),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: _withGaps(children, NemoTokens.space50),
      ),
    );
  }
}

enum EmptyMediaVariant { defaultVariant, icon }

/// `variant: icon` gives the media slot a filled square backdrop. Web's
/// `text-foreground` on the wrapper (inherited by child SVG icons via
/// `currentColor`) has no Flutter equivalent — pass an already-colored
/// [Icon]/[Widget] as `child`.
class EmptyMedia extends StatelessWidget {
  const EmptyMedia({super.key, this.child, this.variant = EmptyMediaVariant.defaultVariant});
  final Widget? child;
  final EmptyMediaVariant variant;

  @override
  Widget build(BuildContext context) {
    final isIcon = variant == EmptyMediaVariant.icon;
    return Container(
      margin: const EdgeInsets.only(bottom: NemoTokens.space50),
      width: isIcon ? NemoTokens.space250 : null,
      height: isIcon ? NemoTokens.space250 : null,
      alignment: Alignment.center,
      decoration: isIcon
          ? BoxDecoration(
              borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
              color: NemoTokens.colorSurfaceNeutralSecondary,
            )
          : null,
      child: child,
    );
  }
}

/// text-lg font-medium tracking-tight — no font-heading class, base sans stack.
class EmptyTitle extends StatelessWidget {
  const EmptyTitle(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize6,
        fontWeight: FontWeight.w500,
        letterSpacing: -NemoTokens.fontSize6 * 0.02,
        color: NemoTokens.colorTextNeutralPrimary,
      ),
    );
  }
}

class EmptyDescription extends StatelessWidget {
  const EmptyDescription(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        color: NemoTokens.colorTextNeutralTertiary,
      ),
    );
  }
}

class EmptyContent extends StatelessWidget {
  const EmptyContent({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 384),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: _withGaps(children, NemoTokens.space50),
      ),
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

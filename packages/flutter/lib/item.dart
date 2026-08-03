import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// Item — Flutter port of the shadcn/ui Item API (`Item`, `ItemGroup`,
/// `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`,
/// `ItemHeader`, `ItemFooter`, `ItemSeparator`). A list-row primitive, same
/// compound pattern as `product_card.dart`. Web's `focus-visible:ring-2`
/// (keyboard focus ring) has no Flutter equivalent for a plain (non-tappable)
/// `Item` root — this is layout only, not an interactive control.
enum ItemVariant { defaultVariant, outline, muted }

enum ItemSize { defaultSize, sm }

class Item extends StatelessWidget {
  const Item({
    super.key,
    required this.children,
    this.variant = ItemVariant.defaultVariant,
    this.size = ItemSize.defaultSize,
  });

  final List<Widget> children;
  final ItemVariant variant;
  final ItemSize size;

  @override
  Widget build(BuildContext context) {
    final isSm = size == ItemSize.sm;
    // gap-2.5/p-2.5 (10px) aren't on the space scale — arbitrary Tailwind values on web too.
    final padding = isSm ? 10.0 : NemoTokens.space75;
    final gap = isSm ? 10.0 : NemoTokens.space75;

    Color background;
    Color borderColor;
    switch (variant) {
      case ItemVariant.outline:
        background = Colors.transparent;
        borderColor = NemoTokens.colorBorderNeutralMain;
      case ItemVariant.muted:
        background = NemoTokens.colorSurfaceNeutralSecondary;
        borderColor = Colors.transparent;
      case ItemVariant.defaultVariant:
        background = NemoTokens.colorSurfaceNeutralTertiary;
        borderColor = Colors.transparent;
    }

    return Container(
      padding: EdgeInsets.all(padding),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        border: Border.all(color: borderColor, width: NemoTokens.borderWidthSm),
        color: background,
      ),
      // Web is `flex flex-wrap items-center gap-3` — `Wrap` would be the
      // literal match, but `ItemContent` relies on `Expanded` to fill the
      // remaining row width, and `Expanded` only works inside a `Flex`
      // (`Row`/`Column`), not `Wrap`. `Row` wins here since "media + content
      // + actions in one line" is the common case; wrapping to a second line
      // on overflow (rare — actions usually stay put) is dropped.
      child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: _withGaps(children, gap)),
    );
  }
}

class ItemGroup extends StatelessWidget {
  const ItemGroup({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.stretch, children: children),
    );
  }
}

class ItemMedia extends StatelessWidget {
  const ItemMedia({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) => Center(widthFactor: 1, heightFactor: 1, child: child);
}

class ItemContent extends StatelessWidget {
  const ItemContent({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        // gap-0.5 (2px) isn't on the space scale — arbitrary Tailwind value on web too.
        children: _withGaps(children, 2),
      ),
    );
  }
}

/// `child` can be plain text or an icon+text `Row` you compose yourself.
class ItemTitle extends StatelessWidget {
  const ItemTitle({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DefaultTextStyle.merge(
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        fontWeight: FontWeight.w500,
        color: NemoTokens.colorTextNeutralPrimary,
      ),
      child: child,
    );
  }
}

class ItemDescription extends StatelessWidget {
  const ItemDescription(this.text, {super.key, this.maxLines = 2});
  final String text;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      maxLines: maxLines,
      overflow: TextOverflow.ellipsis,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        color: NemoTokens.colorTextNeutralTertiary,
      ),
    );
  }
}

/// Web pushes this to the row's end via `margin-left: auto`, which works
/// standalone. Flutter's `Row` has no auto-margin — this only lands at the
/// end because `ItemContent`'s `Expanded` (the common sibling) consumes the
/// rest of the row; if you use `ItemActions` without an `ItemContent`
/// sibling, wrap it in a `Spacer()` yourself to push it right.
class ItemActions extends StatelessWidget {
  const ItemActions({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: _withGaps(children, NemoTokens.space50),
    );
  }
}

class ItemHeader extends StatelessWidget {
  const ItemHeader({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: children);
  }
}

class ItemFooter extends StatelessWidget {
  const ItemFooter({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: children);
  }
}

class ItemSeparator extends StatelessWidget {
  const ItemSeparator({super.key});

  @override
  Widget build(BuildContext context) => Container(height: 1, color: NemoTokens.colorBorderNeutralMain);
}

List<Widget> _withGaps(List<Widget> children, double gap) {
  if (children.isEmpty) return children;
  final result = <Widget>[];
  for (var i = 0; i < children.length; i++) {
    if (i > 0) result.add(SizedBox(width: gap));
    result.add(children[i]);
  }
  return result;
}

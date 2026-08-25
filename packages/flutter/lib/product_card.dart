import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

// Subtle card elevation — framework default (M3 uses tonal elevation, not
// box-shadow), matching web's Tailwind shadow-sm. Not a token.
const List<BoxShadow> _nemoShadow = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

/// ProductCard — compound/slot-based product-card family, Flutter port of the web
/// `ProductCard` (same `Item`/`Field` compound idiom, not the older typed-props
/// technique `kanban_card.dart` uses — see
/// `packages/web/src/components/product-card/product-card.tsx` for the full rationale).
/// The root only owns the outer rounded/shadow/clip container; every other widget
/// ([ProductCardMedia], [ProductCardTitle], [ProductCardLocation], [ProductCardText],
/// [ProductCardTags], [ProductCardFooter], [ProductCardStepper]...) is pure layout —
/// none of them know about "order context" or "box info": compose whatever content you
/// need (a [NemoBadge], a [ProductCardPill], plain text) as children. Derived from the
/// HUBR "App • Product Card" Figma set (file MqJ2Kp2MG4YOlLrwi1XJUx).
///
/// As of Figma node 19188:22490, mirrors the same two changes the web port made:
/// [ProductCardCode] (hardcoded "Cód." prefix + value/highlight split) is replaced by
/// [ProductCardText] (`primary`/`secondary` widgets, no baked-in formatting — a caller
/// that still needs the old look nests styled [Text]/[TextSpan] inside `primary`), and
/// [ProductCardWithBadges] is a thin convenience wrapper matching that node's own toggle
/// shape. See the web file for the full rationale — this file mirrors it 1:1.

List<Widget> _withGaps(List<Widget> children, double gap) {
  if (children.isEmpty) return children;
  final result = <Widget>[];
  for (var i = 0; i < children.length; i++) {
    if (i > 0) result.add(SizedBox(height: gap));
    result.add(children[i]);
  }
  return result;
}

class ProductCard extends StatelessWidget {
  const ProductCard({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        boxShadow: _nemoShadow,
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(mainAxisSize: MainAxisSize.min, children: children),
    );
  }
}

/// Padded content region — used for the main body and, after a [ProductCardSeparator],
/// for secondary sections like a stepper.
class ProductCardBody extends StatelessWidget {
  const ProductCardBody({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(NemoTokens.space50),
      color: NemoTokens.colorSurfaceNeutralPrimary,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: _withGaps(children, NemoTokens.space100),
      ),
    );
  }
}

/// Media slot (defaults to a 160×160 box). Falls back to a placeholder icon when empty.
class ProductCardMedia extends StatelessWidget {
  const ProductCardMedia({super.key, this.child});
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 160,
      height: 160,
      child: child ??
          Container(
            decoration: BoxDecoration(
              color: NemoTokens.colorSurfaceNeutralSecondary,
              borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
            ),
            child: Icon(Icons.inventory_2_outlined, size: 32, color: NemoTokens.colorTextNeutralTertiary),
          ),
    );
  }
}

class ProductCardTitle extends StatelessWidget {
  const ProductCardTitle(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      textAlign: TextAlign.center,
      style: const TextStyle(fontSize: NemoTokens.fontSize6, fontWeight: FontWeight.w600, height: 1.4, color: NemoTokens.colorTextNeutralPrimary),
    );
  }
}

/// Figma: variant "Badge horizontal" (`row`, wraps) vs "Badge vertical" (`column`,
/// stacked) — purely a layout choice, same tags either way.
enum ProductCardTagsLayout { row, column }

/// Row (or column) of arbitrary pills/badges — reusable above or below the media.
class ProductCardTags extends StatelessWidget {
  const ProductCardTags({super.key, required this.children, this.layout = ProductCardTagsLayout.row});
  final List<Widget> children;
  final ProductCardTagsLayout layout;

  @override
  Widget build(BuildContext context) {
    if (layout == ProductCardTagsLayout.column) {
      return Column(mainAxisSize: MainAxisSize.min, children: _withGaps(children, NemoTokens.space50));
    }
    return Wrap(alignment: WrapAlignment.center, spacing: NemoTokens.space50, runSpacing: NemoTokens.space50, children: children);
  }
}

/// Neutral gray pill (`colorSurfaceNeutralSecondary`/`colorTextNeutralPrimary`) — same
/// look `kanban_card.dart`'s private `_Pill` uses. Kept scoped to the ProductCard family
/// rather than promoted to [NemoBadge], since `NemoBadgeColor.normal` is
/// intentionally the brand-strong fill, not a neutral chip. `icon`/`dot` mirror
/// [NemoBadge]'s own props/rendering so a neutral pill can still show the
/// icon-dot-label anatomy Figma's tags use.
class ProductCardPill extends StatelessWidget {
  const ProductCardPill({super.key, required this.child, this.icon, this.dot = false});
  final Widget child;

  /// Leading glyph, same slot convention as [NemoBadge]'s `icon`.
  final Widget? icon;

  /// Status dot before the label, same convention as [NemoBadge]'s `dot`.
  final bool dot;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space12),
      decoration: BoxDecoration(color: NemoTokens.colorSurfaceNeutralSecondary, borderRadius: BorderRadius.circular(NemoTokens.radiusPill)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) SizedBox(width: 12, height: 12, child: icon),
          if (icon != null || dot) SizedBox(width: NemoTokens.space25),
          if (dot)
            Container(
              width: 6,
              height: 6,
              decoration: const BoxDecoration(color: NemoTokens.colorTextNeutralPrimary, shape: BoxShape.circle),
            ),
          if (dot) SizedBox(width: NemoTokens.space25),
          child,
        ],
      ),
    );
  }
}

/// Divider-flanked pill — e.g. a location/slot badge. `label` is whatever text the
/// caller wants, already formatted (e.g. "A-A-1" or "Local: 5").
class ProductCardLocation extends StatelessWidget {
  const ProductCardLocation(this.label, {super.key});
  final String label;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Container(height: 1, color: NemoTokens.colorBorderNeutralMain)),
        const SizedBox(width: NemoTokens.space50),
        ProductCardPill(
          child: Text(label, style: const TextStyle(fontSize: NemoTokens.fontSize3, fontWeight: FontWeight.w600, color: NemoTokens.colorTextNeutralPrimary)),
        ),
        const SizedBox(width: NemoTokens.space50),
        Expanded(child: Container(height: 1, color: NemoTokens.colorBorderNeutralMain)),
      ],
    );
  }
}

/// Generic two-line, centered, muted text block ("Content"/"text-secondary" in Figma) —
/// no business meaning baked in. Replaces the old `ProductCardCode` (which hardcoded a
/// "Cód. `<value><highlight>`" format specific to HUBR's scanning flow): callers that
/// still need that exact look pass it as `primary`, e.g.
/// `primary: Text.rich(TextSpan(children: [TextSpan(text: 'Cód. '), TextSpan(text: value, style: TextStyle(fontWeight: FontWeight.w600))]))`.
class ProductCardText extends StatelessWidget {
  const ProductCardText({super.key, required this.primary, this.secondary});
  final Widget primary;
  final Widget? secondary;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: _withGaps(
        [
          DefaultTextStyle.merge(
            style: const TextStyle(fontSize: NemoTokens.fontSize4, height: 1.5, color: NemoTokens.colorTextNeutralTertiary),
            textAlign: TextAlign.center,
            child: primary,
          ),
          if (secondary != null)
            DefaultTextStyle.merge(
              style: const TextStyle(fontSize: NemoTokens.fontSize2, height: 1.3, color: NemoTokens.colorTextNeutralTertiary),
              textAlign: TextAlign.center,
              child: secondary!,
            ),
        ],
        NemoTokens.space25,
      ),
    );
  }
}

class ProductCardSeparator extends StatelessWidget {
  const ProductCardSeparator({super.key});

  @override
  Widget build(BuildContext context) => Container(height: 1, color: NemoTokens.colorBorderNeutralMain);
}

/// Colored-band footer (`colorSurfaceNeutralSecondary`) with a pill wrapping whatever
/// content is passed.
class ProductCardFooter extends StatelessWidget {
  const ProductCardFooter({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      alignment: Alignment.center,
      padding: const EdgeInsets.all(NemoTokens.space50),
      color: NemoTokens.colorSurfaceNeutralSecondary,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space25),
        decoration: BoxDecoration(color: NemoTokens.colorSurfaceNeutralPrimary, borderRadius: BorderRadius.circular(NemoTokens.radiusPill)),
        child: child,
      ),
    );
  }
}

/// Generic labeled +/- stepper — no assumption about what's being counted.
class ProductCardStepper extends StatelessWidget {
  const ProductCardStepper({super.key, required this.value, this.onDecrease, this.onIncrease, this.label});
  final int value;
  final VoidCallback? onDecrease;
  final VoidCallback? onIncrease;
  final String? label;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: _withGaps(
        [
          if (label != null)
            Text(label!, style: const TextStyle(fontSize: NemoTokens.fontSize6, fontWeight: FontWeight.w600, color: NemoTokens.colorTextNeutralPrimary)),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                onPressed: onDecrease,
                tooltip: 'Diminuir quantidade',
                icon: const Icon(Icons.remove, color: NemoTokens.colorTextNeutralPrimary),
              ),
              Container(
                width: NemoTokens.space300,
                height: NemoTokens.space300,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: NemoTokens.colorSurfaceNeutralPrimary,
                  borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
                  border: Border.all(color: NemoTokens.colorBorderNeutralMain),
                ),
                child: Text('$value', style: const TextStyle(fontSize: NemoTokens.fontSize6, color: NemoTokens.colorTextNeutralPrimary)),
              ),
              IconButton(
                onPressed: onIncrease,
                tooltip: 'Aumentar quantidade',
                icon: const Icon(Icons.add, color: NemoTokens.colorTextNeutralPrimary),
              ),
            ],
          ),
        ],
        NemoTokens.space50,
      ),
    );
  }
}

/// Figma: variant "Badge horizontal" | "Badge vertical" — layout of `topBadges` only.
enum ProductCardVariant { horizontal, vertical }

/// Thin convenience layer over the compound family, mirroring the toggle shape Figma
/// node 19188:22490 exposes (each field non-null/null = section shown/hidden, `variant`
/// = tags-row layout). Doesn't replace the primitives — it composes them — so flows this
/// shape can't express (e.g. the stepper-based "bipagem de conferência" recipe, which
/// isn't part of this Figma node) still build directly from [ProductCard]/[ProductCardBody]/etc.
class ProductCardWithBadges extends StatelessWidget {
  const ProductCardWithBadges({
    super.key,
    this.variant = ProductCardVariant.horizontal,
    this.topBadges,
    this.imageBadge,
    this.media,
    required this.title,
    this.location,
    this.content,
    this.bottomBadges,
    this.footer,
  });

  final ProductCardVariant variant;

  /// Figma: `bagdeSuperior` — tags above the media. Null to hide.
  final List<Widget>? topBadges;

  /// Figma: `ProductPicture`'s `imageBadge` — small pill above the media. Null to hide.
  final Widget? imageBadge;

  /// Passed straight to [ProductCardMedia]; null for the default placeholder icon.
  final Widget? media;

  final String title;

  /// Figma: "location" divider-pill row. Null to hide.
  final String? location;

  /// Figma: "scan"/`content` text block — typically a [ProductCardText]. Null to hide.
  final Widget? content;

  /// Figma: `badgeInferior` — tags below the content, non-wrapping. Null to hide.
  final List<Widget>? bottomBadges;

  /// Figma: `status` — footer band. Null to hide.
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    return ProductCard(
      children: [
        ProductCardBody(
          children: [
            if (topBadges != null)
              ProductCardTags(
                layout: variant == ProductCardVariant.horizontal ? ProductCardTagsLayout.row : ProductCardTagsLayout.column,
                children: topBadges!,
              ),
            if (imageBadge != null) imageBadge!,
            ProductCardMedia(child: media),
            ProductCardTitle(title),
            if (location != null) ProductCardLocation(location!),
            if (content != null) content!,
            if (bottomBadges != null) ProductCardTags(children: bottomBadges!),
          ],
        ),
        if (footer != null) ProductCardFooter(child: footer!),
      ],
    );
  }
}

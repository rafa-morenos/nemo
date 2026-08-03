import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// A single product thumbnail for [CollectionBanner]'s 2x2 grid.
class CollectionProduct {
  const CollectionProduct({required this.image, this.alt, this.fit = BoxFit.cover});
  final String image;
  final String? alt;

  /// Some product renders (cans/bottles) read better with [BoxFit.contain]
  /// than the default [BoxFit.cover] (mirrors web's `fit?: "cover" | "contain"`).
  final BoxFit fit;
}

/// CollectionBanner — Flutter port of the web `CollectionBanner`.
/// Interpretation, not a canonical shadcn component (matches Figma
/// "CollectionBanner", node 41674:10448): a brand tile (circular logo + name)
/// plus up to 4 product thumbnails in a 2x2 grid, for horizontal "shop by
/// brand" rows.
class CollectionBanner extends StatelessWidget {
  const CollectionBanner({super.key, required this.brandName, this.brandLogo, required this.products});

  final String brandName;

  /// Circular brand logo shown next to the name. Null for a text-only header.
  final String? brandLogo;

  /// Up to 4 product thumbnails, shown in a 2x2 grid.
  final List<CollectionProduct> products;

  @override
  Widget build(BuildContext context) {
    final shown = products.take(4).toList();
    return Container(
      // w-[164px] and rounded-2xl are both arbitrary/un-overridden Tailwind
      // values on web too; rounded-2xl (1rem/16px default) happens to equal
      // NemoTokens.radiusLg, so that part does map to a real token.
      width: 164,
      padding: const EdgeInsets.all(NemoTokens.space50),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        border: Border.all(color: NemoTokens.colorBorderNeutralMain, width: NemoTokens.borderWidthSm),
        color: NemoTokens.colorSurfaceNeutralPrimary,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              if (brandLogo != null) ...[
                ClipOval(
                  child: Image.network(
                    brandLogo!,
                    width: NemoTokens.space150,
                    height: NemoTokens.space150,
                    fit: BoxFit.cover,
                  ),
                ),
                const SizedBox(width: NemoTokens.space25),
              ],
              Expanded(
                child: Text(
                  brandName,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontFamily: NemoFonts.sans,
                    fontSize: NemoTokens.fontSize2,
                    fontWeight: FontWeight.w700,
                    color: NemoTokens.colorTextNeutralPrimary,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: NemoTokens.space50),
          Wrap(
            spacing: NemoTokens.space50,
            runSpacing: NemoTokens.space50,
            children: [
              for (final product in shown)
                Container(
                  // size-16 (64px) matches NemoTokens.space400 exactly.
                  width: NemoTokens.space400,
                  height: NemoTokens.space400,
                  padding: const EdgeInsets.all(NemoTokens.space25),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
                    color: NemoTokens.colorSurfaceNeutralTertiary,
                  ),
                  // Web additionally applies `mix-blend-darken` so product
                  // photography sits cleanly on the tile — Flutter's Image
                  // has no blend-mode equivalent, so thumbnails render flat
                  // here (visual-only gap, same as the RN port).
                  child: Image.network(product.image, fit: product.fit, semanticLabel: product.alt),
                ),
            ],
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'nemo_add_to_cart.dart';
import 'nemo_tokens.dart';

/// ProductTile — Flutter port of the web `ProductTile`
/// (`packages/web/src/components/product-tile/product-tile.tsx`, Figma
/// "Product Tile" set, node 38835:30351) and
/// `packages/react-native/src/ProductTile.tsx`: a shelf/grid card
/// (`ProductTileLayout.vertical`) and a list row (`.horizontal`), each with an
/// `unavailable` state, plus a read-only `ProductTileType.orderDetail` row for
/// order-history/refund screens. Reuses [NemoAddToCartButton]
/// (`nemo_add_to_cart.dart`) for the cart stepper — same widget, same
/// behavior as web/RN, not a re-implementation.
///
/// Internal pieces (`_FavoriteChip`, `_RemoveButton`, `_BackSoonTag`,
/// `_RefundBadge`, `_ProductImage`, `_Price`) mirror the web file's private
/// local functions — not exported here either.
///
/// `image` takes an [ImageProvider] rather than a raw URL string — same
/// convention `Avatar` already established in this package (Dart has no
/// implicit string→network-image coercion, and Flutter's own idiom is to let
/// the caller pick `NetworkImage`/`AssetImage`/`FileImage`).
enum ProductTileLayout { vertical, horizontal }

/// "orderDetail" is a read-only row used in order history/refund screens
/// (horizontal only). Named `defaultType` (not `default`) since `default` is
/// a Dart keyword.
enum ProductTileType { defaultType, orderDetail }

/// Figma: the floating "Reembolso • N un." badge on a horizontal
/// `ProductTileType.orderDetail` tile.
class ProductTileRefund {
  const ProductTileRefund({required this.count, this.unit = 'un.'});
  final int count;
  final String unit;
}

class ProductTile extends StatelessWidget {
  const ProductTile({
    super.key,
    this.layout = ProductTileLayout.vertical,
    this.type = ProductTileType.defaultType,
    this.unavailable = false,
    required this.image,
    this.imageSemanticLabel,
    required this.name,
    required this.size,
    this.originalPrice,
    required this.price,
    this.priceMultiplier,
    this.quantity = 0,
    this.onAdd,
    this.onIncrement,
    this.onDecrement,
    this.favorite,
    this.onToggleFavorite,
    this.onRemove,
    this.refund,
  });

  final ProductTileLayout layout;
  final ProductTileType type;

  /// Out of stock — fades the image/description and disables the cart button.
  final bool unavailable;

  final ImageProvider image;
  final String? imageSemanticLabel;
  final String name;

  /// Weight/size line, e.g. "115g".
  final String size;

  /// Struck-through price shown when the item is discounted.
  final String? originalPrice;
  final String price;

  /// Bold prefix before the price, e.g. "2x" (orderDetail quantity billed).
  final String? priceMultiplier;

  /// [NemoAddToCartButton] wiring — see `nemo_add_to_cart.dart`.
  final int quantity;
  final VoidCallback? onAdd;
  final VoidCallback? onIncrement;
  final VoidCallback? onDecrement;

  /// Vertical layout and horizontal `defaultType`: favorite heart toggle.
  /// Null hides the chip entirely (mirrors web's `favorite !== undefined`).
  final bool? favorite;
  final VoidCallback? onToggleFavorite;

  /// Horizontal `defaultType` only: the "x" remove-from-list button.
  final VoidCallback? onRemove;

  /// Horizontal `orderDetail` only: the floating refund badge.
  final ProductTileRefund? refund;

  bool get _isOrderDetail => type == ProductTileType.orderDetail;

  @override
  Widget build(BuildContext context) {
    if (layout == ProductTileLayout.horizontal) {
      final row = Container(
        decoration: BoxDecoration(
          border: Border.all(color: NemoTokens.colorBorderNeutralMain),
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        ),
        clipBehavior: Clip.antiAlias,
        padding: const EdgeInsets.only(right: NemoTokens.space50),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _ProductImage(
              image: image,
              semanticLabel: imageSemanticLabel,
              unavailable: unavailable,
              width: 105,
              height: 105,
              child: (!_isOrderDetail && !unavailable && favorite != null)
                  ? _FavoriteChip(active: favorite!, onToggle: onToggleFavorite)
                  : null,
            ),
            SizedBox(width: NemoTokens.space50),
            Expanded(
              child: Opacity(
                opacity: unavailable ? 0.5 : 1,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(name, maxLines: 1, overflow: TextOverflow.ellipsis, style: _nameStyle),
                              Text(size, maxLines: 1, overflow: TextOverflow.ellipsis, style: _sizeStyle),
                            ],
                          ),
                        ),
                        if (!_isOrderDetail && onRemove != null) _RemoveButton(onPressed: onRemove),
                      ],
                    ),
                    SizedBox(height: NemoTokens.space50),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Expanded(
                          child: _Price(originalPrice: originalPrice, price: price, priceMultiplier: priceMultiplier),
                        ),
                        NemoAddToCartButton(
                          quantity: _isOrderDetail ? 0 : quantity,
                          disabled: unavailable || _isOrderDetail,
                          onAdd: onAdd,
                          onIncrement: onIncrement,
                          onDecrement: onDecrement,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      );

      if (!_isOrderDetail) return row;

      return Stack(
        clipBehavior: Clip.none,
        children: [
          row,
          if (refund != null)
            Positioned(top: -NemoTokens.space50, right: NemoTokens.space50, child: _RefundBadge(refund: refund!)), // web: `-top-2 right-2` (-8px/8px)
        ],
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: NemoTokens.colorSurfaceNeutralPrimary,
        border: Border.all(color: NemoTokens.colorBorderNeutralMain),
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
      ),
      clipBehavior: Clip.antiAlias,
      padding: const EdgeInsets.only(bottom: NemoTokens.space50),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _ProductImage(
            image: image,
            semanticLabel: imageSemanticLabel,
            unavailable: unavailable,
            width: double.infinity,
            height: 105,
            child: favorite != null ? _FavoriteChip(active: favorite!, onToggle: onToggleFavorite) : null,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50),
            child: Opacity(
              opacity: unavailable ? 0.5 : 1,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: NemoTokens.space50),
                  Text(name, maxLines: 1, overflow: TextOverflow.ellipsis, style: _nameStyle),
                  Text(size, maxLines: 1, overflow: TextOverflow.ellipsis, style: _sizeStyle),
                  SizedBox(height: NemoTokens.space50),
                  _Price(originalPrice: originalPrice, price: price, priceMultiplier: priceMultiplier),
                  SizedBox(height: NemoTokens.space50),
                  SizedBox(
                    width: double.infinity,
                    child: NemoAddToCartButton(
                      quantity: quantity,
                      disabled: unavailable,
                      onAdd: onAdd,
                      onIncrement: onIncrement,
                      onDecrement: onDecrement,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

const _nameStyle = TextStyle(
  fontSize: NemoTokens.fontSize3,
  fontWeight: FontWeight.w500,
  color: NemoTokens.colorTextAccentPrimary,
);
const _sizeStyle = TextStyle(fontSize: NemoTokens.fontSize3, color: NemoTokens.colorTextNeutralTertiary);

class _FavoriteChip extends StatelessWidget {
  const _FavoriteChip({required this.active, this.onToggle});
  final bool active;
  final VoidCallback? onToggle;

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: NemoTokens.space25, // web: `right-1` (4px)
      top: NemoTokens.space25, // web: `top-1` (4px)
      child: Semantics(
        button: true,
        selected: active,
        label: active ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
        child: Material(
          color: NemoTokens.colorSurfaceNeutralTertiary,
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
          child: InkWell(
            onTap: onToggle,
            borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
            child: SizedBox(
              // 28px: web's `size-7` is unmapped default Tailwind spacing (not
              // on the Nemo scale, see tailwind.preset.js) — literal, same
              // precedent as NemoAddToCartButton's 34×127 pill.
              width: 28,
              height: 28,
              child: Icon(
                active ? Icons.favorite : Icons.favorite_border,
                size: 14,
                color: NemoTokens.colorTextNeutralPrimary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RemoveButton extends StatelessWidget {
  const _RemoveButton({this.onPressed});
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: 'Remover da lista',
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
          child: SizedBox(
            width: 28, // web: `size-7`, same literal precedent as _FavoriteChip above.
            height: 28,
            child: Icon(Icons.close, size: 14, color: NemoTokens.colorTextNeutralTertiary),
          ),
        ),
      ),
    );
  }
}

/// The "Volto logo" (back soon) tag pinned over an unavailable product's image.
class _BackSoonTag extends StatelessWidget {
  const _BackSoonTag();

  @override
  Widget build(BuildContext context) {
    return Positioned(
      bottom: NemoTokens.space25, // web: `bottom-1` (4px)
      right: NemoTokens.space25, // web: `right-1` (4px)
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space25),
        decoration: BoxDecoration(
          color: NemoTokens.colorSurfaceNeutralPrimary,
          borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
        ),
        child: const Text(
          'Volto logo',
          style: TextStyle(fontSize: NemoTokens.fontSize1, fontWeight: FontWeight.w500, color: NemoTokens.colorTextSemanticCritical),
        ),
      ),
    );
  }
}

class _RefundBadge extends StatelessWidget {
  const _RefundBadge({required this.refund});
  final ProductTileRefund refund;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space25),
      decoration: BoxDecoration(
        color: NemoTokens.colorSurfaceNeutralTertiary,
        borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
      ),
      child: Text(
        'Reembolso • ${refund.count} ${refund.unit}',
        style: const TextStyle(fontSize: NemoTokens.fontSize1, fontWeight: FontWeight.w500, color: NemoTokens.colorTextNeutralTertiary),
      ),
    );
  }
}

class _ProductImage extends StatelessWidget {
  const _ProductImage({
    required this.image,
    this.semanticLabel,
    required this.unavailable,
    required this.width,
    required this.height,
    this.child,
  });

  final ImageProvider image;
  final String? semanticLabel;
  final bool unavailable;
  final double width;
  final double height;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          Positioned.fill(
            child: Container(
              color: NemoTokens.colorSurfaceNeutralSecondary,
              child: Opacity(
                opacity: unavailable ? 0.5 : 1,
                child: Image(
                  image: image,
                  semanticLabel: semanticLabel,
                  fit: unavailable ? BoxFit.cover : BoxFit.contain,
                ),
              ),
            ),
          ),
          if (unavailable) const _BackSoonTag(),
          if (child != null) child!,
        ],
      ),
    );
  }
}

class _Price extends StatelessWidget {
  const _Price({this.originalPrice, required this.price, this.priceMultiplier});
  final String? originalPrice;
  final String price;
  final String? priceMultiplier;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (originalPrice != null)
          Text(
            originalPrice!,
            style: const TextStyle(
              fontSize: NemoTokens.fontSize3,
              color: NemoTokens.colorTextNeutralTertiary,
              decoration: TextDecoration.lineThrough,
            ),
          ),
        Text.rich(
          TextSpan(
            children: [
              if (priceMultiplier != null) TextSpan(text: '${priceMultiplier!} '),
              TextSpan(text: price),
            ],
          ),
          style: const TextStyle(
            fontSize: NemoTokens.fontSize4,
            fontWeight: FontWeight.w600,
            color: NemoTokens.colorTextAccentPrimary,
          ),
        ),
      ],
    );
  }
}

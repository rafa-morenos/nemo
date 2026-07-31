import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// NemoAddToCartButton / NemoCartCountBadge / NemoFavoriteButton — Flutter port
/// of the web `AddToCartButton`/`CartCountBadge`/`FavoriteButton`
/// (`packages/web/src/components/add-to-cart.tsx`, Figma "AddTo" component,
/// node 3872:52310) and `packages/react-native/src/AddToCart.tsx`. Prefixed
/// `Nemo` for consistency with `NemoBadge`/`NemoNavigationBar` in this
/// package, even though none of these names collide with a Material widget.
///
/// Icons: same tradeoff `KanbanCard`/`ProductCard`/`NemoNavigationBar` already
/// make in this package — no `flutter_svg` in `pubspec.yaml`, and no toolchain
/// here to visually verify hand-transcribed Bézier curves — so this uses
/// Material Icons approximations (`Icons.add`/`Icons.remove`/
/// `Icons.delete_outline`/`Icons.favorite`/`Icons.favorite_border`) instead of
/// the real Figma/lucide vectors (ported faithfully on web/RN).

/// AddToCartButton — controlled: the caller owns `quantity` and reacts to the
/// callbacks, same contract as web/RN. A "+" pill before anything's in the
/// cart, a spinner while adding, and a quantity stepper once `quantity > 0`
/// (trash instead of "−" at quantity 1, since decrementing further removes
/// the item).
///
/// `34×127` mirrors the web component's `h-[34px] w-[127px]` — an arbitrary
/// Tailwind value there too, not on the Nemo space scale (same precedent as
/// `ProductCard`'s 160×160 media box).
class NemoAddToCartButton extends StatefulWidget {
  const NemoAddToCartButton({
    super.key,
    required this.quantity,
    this.loading = false,
    this.disabled = false,
    this.onAdd,
    this.onIncrement,
    this.onDecrement,
  });

  /// 0 = not in the cart yet.
  final int quantity;

  /// Shows the spinner in place of the "+" pill; no interaction.
  final bool loading;
  final bool disabled;

  /// Tapped when quantity is 0.
  final VoidCallback? onAdd;

  /// Tapped "+" in the stepper.
  final VoidCallback? onIncrement;

  /// Tapped "−" (or the trash icon at quantity 1) in the stepper.
  final VoidCallback? onDecrement;

  @override
  State<NemoAddToCartButton> createState() => _NemoAddToCartButtonState();
}

class _NemoAddToCartButtonState extends State<NemoAddToCartButton> with SingleTickerProviderStateMixin {
  late final AnimationController _spinController;

  @override
  void initState() {
    super.initState();
    _spinController = AnimationController(vsync: this, duration: const Duration(milliseconds: 800));
    if (widget.loading) _spinController.repeat();
  }

  @override
  void didUpdateWidget(covariant NemoAddToCartButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.loading && !_spinController.isAnimating) {
      _spinController.repeat();
    } else if (!widget.loading && _spinController.isAnimating) {
      _spinController.stop();
    }
  }

  @override
  void dispose() {
    _spinController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.loading) {
      return Semantics(
        button: true,
        label: 'Adicionando ao carrinho',
        child: Container(
          height: 34,
          width: 127,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: NemoTokens.colorSurfaceNeutralTertiary,
            borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
          ),
          child: RotationTransition(
            turns: _spinController,
            // Fixed brand-blue, intentionally not a token — same reasoning as
            // web's `fill="#1759FF"`/RN's `LoadingSpinnerIcon`: used over a
            // neutral surface, not the brand-blue interactive surface, so it
            // doesn't need to track the theme.
            child: const Icon(Icons.autorenew, size: 16, color: Color(0xFF1759FF)),
          ),
        ),
      );
    }

    if (widget.quantity <= 0) {
      return Opacity(
        opacity: widget.disabled ? 0.5 : 1,
        child: Semantics(
          button: true,
          enabled: !widget.disabled,
          label: 'Adicionar ao carrinho',
          child: Material(
            color: NemoTokens.colorSurfaceNeutralTertiary,
            borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
            child: InkWell(
              onTap: widget.disabled ? null : widget.onAdd,
              borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
              child: const SizedBox(
                height: 34,
                width: 127,
                child: Icon(Icons.add, size: 16, color: NemoTokens.colorTextNeutralPrimary),
              ),
            ),
          ),
        ),
      );
    }

    const foreground = NemoTokens.colorInteractiveAccentPrimaryInverted;

    return Container(
      height: 34,
      width: 127,
      padding: const EdgeInsets.symmetric(horizontal: 10), // web: `p-2.5` (10px) — not on the Nemo space scale.
      decoration: BoxDecoration(
        color: NemoTokens.colorInteractiveAccentPrimaryMain,
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          IconButton(
            onPressed: widget.onDecrement,
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(minWidth: 24, minHeight: 24),
            tooltip: widget.quantity == 1 ? 'Remover do carrinho' : 'Diminuir quantidade',
            icon: Icon(
              widget.quantity == 1 ? Icons.delete_outline : Icons.remove,
              size: 16,
              color: foreground,
            ),
          ),
          Text(
            '${widget.quantity}',
            style: const TextStyle(fontSize: NemoTokens.fontSize3, fontWeight: FontWeight.bold, color: foreground),
          ),
          IconButton(
            onPressed: widget.onIncrement,
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(minWidth: 24, minHeight: 24),
            tooltip: 'Aumentar quantidade',
            icon: const Icon(Icons.add, size: 16, color: foreground),
          ),
        ],
      ),
    );
  }
}

/// CartCountBadge — the read-only "State=Count" variant: a plain quantity
/// label, no buttons.
class NemoCartCountBadge extends StatelessWidget {
  const NemoCartCountBadge({super.key, required this.count});
  final int count;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space100, vertical: 10), // web: `py-2.5` (10px), same arbitrary-value precedent as above.
      decoration: BoxDecoration(
        color: NemoTokens.colorSurfaceNeutralSecondary,
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
      ),
      child: Text(
        'X $count',
        style: const TextStyle(
          fontSize: NemoTokens.fontSize3,
          fontWeight: FontWeight.bold,
          color: NemoTokens.colorInteractiveAccentPrimaryMain,
        ),
      ),
    );
  }
}

/// FavoriteButton — the "AddTo / AddList" flow: a heart toggle (outline ↔
/// filled).
class NemoFavoriteButton extends StatelessWidget {
  const NemoFavoriteButton({super.key, required this.active, this.onToggle, this.disabled = false});
  final bool active;
  final VoidCallback? onToggle;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    final bg = active ? NemoTokens.colorInteractiveAccentPrimaryMain : NemoTokens.colorSurfaceNeutralTertiary;
    final fg = active ? NemoTokens.colorInteractiveAccentPrimaryInverted : NemoTokens.colorTextNeutralPrimary;
    return Opacity(
      opacity: disabled ? 0.5 : 1,
      child: Semantics(
        button: true,
        selected: active,
        enabled: !disabled,
        label: active ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
        child: Material(
          color: bg,
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
          child: InkWell(
            onTap: disabled ? null : onToggle,
            borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
            child: SizedBox(
              height: 34,
              width: 127,
              child: Icon(active ? Icons.favorite : Icons.favorite_border, size: 20, color: fg),
            ),
          ),
        ),
      ),
    );
  }
}

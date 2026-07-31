import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo NemoNavigationBar — the Daki App's bottom tab bar (Flutter port of
/// `packages/web/src/components/navigation-bar.tsx`, Figma node
/// `40366:141533`, "Daki App • Components — Design in Progress"). Named
/// `NemoNavigationBar` (not `NavigationBar`) to avoid colliding with the
/// built-in `package:flutter/material.dart` widget of the same name.
///
/// Same three-part shape as web/RN: [NemoNavigationBar] (the pill),
/// [NemoNavigationBarItem] (a controlled tab), [NemoNavigationBarBagItem]
/// (the cart CTA slot). See the web component for the full reasoning on
/// token choices — kept in sync here rather than repeated in full.
/// `NemoTokens.colorInteractiveAccentPrimaryActive` (blue-10, `#001848`)
/// stands in for Figma's unconfirmed `surface/decorative/
/// surface-decorative-600`, same choice web/RN make (same value in both
/// themes — Flutter here only has the light tree generated, see
/// CLAUDE.md's Paridade de plataforma).
///
/// Icons are Material Icon approximations, not exact ports of the Figma
/// vectors — same tradeoff `KanbanCard`/`ProductCard` already make in this
/// package (see their `Icons.*` usage). The real vector path data *is*
/// available (ported faithfully on web/RN, verified byte-for-byte against
/// the Figma export) if pixel-exact icons are needed later; that would mean
/// adding `flutter_svg` to embed it directly rather than hand-transcribing
/// bezier curves into `CustomPainter` with no way to visually verify the
/// result in this environment. No `Storybook` equivalent exists for
/// Flutter, so the closest per-tab match (there's no build/preview step to
/// demo this against, unlike web/RN):
///
/// ```dart
/// NemoNavigationBar(children: [
///   NemoNavigationBarItem(icon: Icons.home_outlined, label: 'Início'),
///   NemoNavigationBarItem(icon: Icons.grid_view, label: 'Categorias'),
///   NemoNavigationBarItem(icon: Icons.search, label: 'Busca'),
///   NemoNavigationBarItem(icon: Icons.receipt_long_outlined, label: 'Pedidos'),
///   NemoNavigationBarItem(icon: Icons.person_outline, label: 'Perfil'),
///   NemoNavigationBarBagItem(label: 'Sacola'), // icon defaults to Icons.shopping_bag_outlined
/// ])
/// ```
class NemoNavigationBar extends StatelessWidget {
  const NemoNavigationBar({super.key, required this.children});

  /// [NemoNavigationBarItem] / [NemoNavigationBarBagItem] instances — each
  /// gets wrapped in [Expanded] here, same as the web version's `flex-1`.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(
        color: NemoTokens.colorInteractiveAccentPrimaryMain,
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        // RN/web reasoning applies here too — Figma's two-layer soft
        // "Navbar" effect isn't a token; single-shadow approximation,
        // same "framework default" treatment as KanbanCard's _nemoShadow.
        boxShadow: const [
          BoxShadow(color: Color(0x2618274B), offset: Offset(0, 2), blurRadius: 6),
        ],
      ),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [for (final c in children) Expanded(child: c)],
        ),
      ),
    );
  }
}

/// Caps the same way `Badge`/`CartCountBadge`'s `count` prop does.
String _formatCount(int count) => count > 99 ? '99+' : '$count';

class NemoNavigationBarItem extends StatelessWidget {
  const NemoNavigationBarItem({
    super.key,
    required this.icon,
    required this.label,
    this.active = false,
    this.dot = false,
    this.onTap,
  });

  final IconData icon;
  final String label;
  final bool active;

  /// Small unread dot above the icon (e.g. "Pedidos" has new status updates).
  final bool dot;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final color = active
        ? NemoTokens.colorInteractiveAccentPrimaryActive
        : NemoTokens.colorInteractiveAccentPrimaryInverted;

    return Semantics(
      button: true,
      selected: active,
      label: dot ? '$label — novidade' : label,
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: onTap,
          child: ExcludeSemantics(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: NemoTokens.space50),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: NemoTokens.space100,
                    height: NemoTokens.space100,
                    child: Stack(
                      clipBehavior: Clip.none,
                      alignment: Alignment.center,
                      children: [
                        Icon(icon, size: NemoTokens.space100, color: color),
                        if (dot)
                          Positioned(
                            top: -2,
                            right: -2,
                            child: Container(
                              width: NemoTokens.space12 * 3,
                              height: NemoTokens.space12 * 3,
                              decoration: BoxDecoration(
                                color: NemoTokens.colorSurfaceNeutralPrimary,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: NemoTokens.fontSize1,
                      fontWeight: active ? FontWeight.w600 : FontWeight.w500,
                      color: color,
                      height: 1,
                    ),
                  ),
                  if (active) ...[
                    const SizedBox(height: 2),
                    Container(
                      width: NemoTokens.space25,
                      height: 1,
                      decoration: BoxDecoration(
                        color: NemoTokens.colorInteractiveAccentPrimaryActive,
                        borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Empty (no [count]) drops the fixed dark CTA background and looks like a
/// plain [NemoNavigationBarItem] instead — see the web component for why.
class NemoNavigationBarBagItem extends StatelessWidget {
  const NemoNavigationBarBagItem({
    super.key,
    this.icon = Icons.shopping_bag_outlined,
    required this.label,
    this.count,
    this.active = false,
    this.onTap,
  });

  final IconData icon;
  final String label;
  final int? count;

  /// Whether the cart screen is the current one. Figma's sample frame never
  /// showed this slot as "active" — see the web component's doc comment for
  /// why this darkens rather than guesses a new color.
  final bool active;
  final VoidCallback? onTap;

  bool get _isEmpty => count == null;

  Color get _bg {
    if (_isEmpty) return NemoTokens.colorInteractiveAccentPrimaryMain;
    final base = NemoTokens.colorInteractiveAccentPrimaryActive;
    if (!active) return base;
    // RN/web darken an active, non-empty bag a step further (brightness-90
    // equivalent) — same plain channel multiply, no new dependency.
    return Color.fromARGB(
      base.alpha,
      (base.red * 0.9).round(),
      (base.green * 0.9).round(),
      (base.blue * 0.9).round(),
    );
  }

  Color get _iconColor => _isEmpty
      ? (active ? NemoTokens.colorInteractiveAccentPrimaryActive : NemoTokens.colorInteractiveAccentPrimaryInverted)
      : NemoTokens.colorInteractiveAccentPrimaryMain;

  Color get _labelColor => _isEmpty && active
      ? NemoTokens.colorInteractiveAccentPrimaryActive
      : NemoTokens.colorInteractiveAccentPrimaryInverted;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      selected: active,
      label: count != null ? '$label — ${_formatCount(count!)} itens' : label,
      child: Material(
        color: _bg,
        child: InkWell(
          onTap: onTap,
          child: ExcludeSemantics(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: NemoTokens.space50),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: NemoTokens.space100,
                    height: NemoTokens.space100,
                    child: Stack(
                      clipBehavior: Clip.none,
                      alignment: Alignment.center,
                      children: [
                        Icon(icon, size: NemoTokens.space100, color: _iconColor),
                        if (count != null)
                          Positioned(
                            top: -6,
                            right: -10,
                            child: Container(
                              constraints: BoxConstraints(minWidth: NemoTokens.space100),
                              height: NemoTokens.space100,
                              padding: EdgeInsets.symmetric(horizontal: NemoTokens.space25),
                              decoration: BoxDecoration(
                                color: NemoTokens.colorSurfaceNeutralPrimary,
                                border: Border.all(
                                  color: NemoTokens.colorInteractiveAccentPrimaryActive,
                                  width: NemoTokens.borderWidthSm,
                                ),
                                borderRadius: BorderRadius.circular(NemoTokens.radiusSm),
                              ),
                              alignment: Alignment.center,
                              child: Text(
                                _formatCount(count!),
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w500,
                                  height: 1,
                                  color: NemoTokens.colorTextNeutralPrimary,
                                ),
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    label,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: NemoTokens.fontSize1,
                      fontWeight: _isEmpty && active ? FontWeight.w600 : FontWeight.w500,
                      color: _labelColor,
                      height: 1,
                    ),
                  ),
                  if (active) ...[
                    const SizedBox(height: 2),
                    Container(
                      width: NemoTokens.space25,
                      height: 1,
                      decoration: BoxDecoration(
                        color: _isEmpty ? NemoTokens.colorInteractiveAccentPrimaryActive : Colors.white,
                        borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

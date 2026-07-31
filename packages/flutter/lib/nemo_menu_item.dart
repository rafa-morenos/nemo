import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// NemoMenuItem / NemoMenuSection / NemoMenuList — Flutter port of
/// `packages/web/src/components/menu-item.tsx` (settings/menu list rows:
/// leading icon chip, label, optional badge + unread dot, trailing chevron,
/// grouped under section headings). Prefixed `Nemo*` (not `MenuItem`) to
/// avoid any confusion with Flutter Material's own menu widgets
/// (`PopupMenuItem`/`MenuItemButton`) even though none of them share this
/// exact name — same defensive-naming call `NemoNavigationBar` already
/// made in this package. See the web component for the full token
/// rationale; kept in sync here rather than repeated in full.
///
/// `asChild` (Radix `Slot`-only, web-specific) is not ported — a
/// [NemoMenuItem] is always tappable via `InkWell`/`onTap`, same reasoning
/// `NemoNavigationBarItem` already follows.
///
/// Token mapping (confirmed against `tailwind.preset.js` → `nemo_tokens.dart`,
/// not guessed):
/// - icon chip bg (web `bg-accent`) → `colorSurfaceAccentPrimary`
/// - icon chip icon color (web `text-accent-foreground`) → `colorTextAccentPrimary`
/// - section label (web `text-primary`) → `colorInteractiveAccentPrimaryMain`
/// - unread dot (web `bg-primary`) → same `colorInteractiveAccentPrimaryMain`
/// - trailing chevron (web `text-muted-foreground`) → `colorTextNeutralTertiary`
/// - label text (web `text-foreground`) → `colorTextNeutralPrimary`

class NemoMenuList extends StatelessWidget {
  const NemoMenuList({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: children,
    );
  }
}

/// Section heading, e.g. "Pagamentos". Omit [label] for an unlabeled group.
class NemoMenuSection extends StatelessWidget {
  const NemoMenuSection({super.key, this.label, required this.children});
  final String? label;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: NemoTokens.space50),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null)
            Semantics(
              header: true,
              child: Padding(
                padding: EdgeInsets.only(left: NemoTokens.space50, right: NemoTokens.space50, bottom: NemoTokens.space25),
                child: Text(
                  label!,
                  style: TextStyle(
                    fontSize: NemoTokens.fontSize6,
                    fontWeight: FontWeight.w700,
                    color: NemoTokens.colorInteractiveAccentPrimaryMain,
                  ),
                ),
              ),
            ),
          Column(mainAxisSize: MainAxisSize.min, children: children),
        ],
      ),
    );
  }
}

class NemoMenuItem extends StatelessWidget {
  const NemoMenuItem({
    super.key,
    this.icon,
    required this.label,
    this.badge,
    this.dot = false,
    this.trailing,
    this.showTrailing = true,
    this.onTap,
    this.enabled = true,
  });

  /// Leading glyph, rendered inside the circular chip.
  final Widget? icon;
  final String label;

  /// Inline badge after the label (e.g. a [NemoBadge]).
  final Widget? badge;

  /// Unread dot after the label.
  final bool dot;

  /// Trailing content; defaults to a chevron (see [showTrailing]).
  final Widget? trailing;

  /// Set to `false` to hide the trailing slot entirely (mirrors the web
  /// version's `trailing={null}`); `true` with `trailing == null` renders
  /// the default chevron, matching `trailing === undefined` on web.
  final bool showTrailing;

  final VoidCallback? onTap;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final buffer = StringBuffer(label);
    if (dot) buffer.write(' — novo');

    return Semantics(
      button: true,
      enabled: enabled,
      label: buffer.toString(),
      child: Opacity(
        opacity: enabled ? 1 : 0.5,
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
          child: InkWell(
            onTap: enabled ? onTap : null,
            borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
            child: ExcludeSemantics(
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: 10),
                child: Row(
                  children: [
                    if (icon != null) ...[
                      Container(
                        width: 44,
                        height: 44,
                        alignment: Alignment.center,
                        decoration: const BoxDecoration(
                          color: NemoTokens.colorSurfaceAccentPrimary,
                          shape: BoxShape.circle,
                        ),
                        child: icon,
                      ),
                      SizedBox(width: NemoTokens.space100),
                    ],
                    Expanded(
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Flexible(
                            child: Text(
                              label,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: NemoTokens.fontSize4,
                                fontWeight: FontWeight.w500,
                                color: NemoTokens.colorTextNeutralPrimary,
                              ),
                            ),
                          ),
                          if (badge != null) ...[SizedBox(width: NemoTokens.space50), badge!],
                          if (dot) ...[
                            SizedBox(width: NemoTokens.space50),
                            Container(
                              width: 8,
                              height: 8,
                              decoration: const BoxDecoration(
                                color: NemoTokens.colorInteractiveAccentPrimaryMain,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ],
                        ],
                      ),
                    ),
                    if (showTrailing) ...[
                      SizedBox(width: NemoTokens.space100),
                      trailing ??
                          Icon(Icons.chevron_right, size: 20, color: NemoTokens.colorTextNeutralTertiary),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

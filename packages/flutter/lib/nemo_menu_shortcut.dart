import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// NemoMenuShortcutItem / NemoMenuShortcutList — Flutter port of
/// `packages/web/src/components/menu-shortcut.tsx`: home-screen quick
/// actions ("Pedir novamente", "Favoritos") — a circular icon chip (bigger
/// than [NemoMenuItem]'s, 64px vs 44px) with a 2-line label below, several
/// side by side in a horizontal scroller. Same leading-icon-chip token
/// convention as [NemoMenuItem] (`colorSurfaceAccentPrimary` bg, icon color
/// supplied by the caller), vertical layout instead of a full-width row.
///
/// `asChild` (Radix `Slot`-only, web-specific) is not ported — always an
/// `InkWell`/`onTap`.

class NemoMenuShortcutList extends StatelessWidget {
  const NemoMenuShortcutList({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: EdgeInsets.only(bottom: NemoTokens.space25),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) SizedBox(width: NemoTokens.space100),
            children[i],
          ],
        ],
      ),
    );
  }
}

class NemoMenuShortcutItem extends StatelessWidget {
  const NemoMenuShortcutItem({
    super.key,
    required this.icon,
    required this.label,
    this.onTap,
    this.enabled = true,
  });

  /// Glyph rendered inside the circular chip.
  final Widget icon;
  final String label;
  final VoidCallback? onTap;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      enabled: enabled,
      label: label,
      child: Opacity(
        opacity: enabled ? 1 : 0.5,
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
          child: InkWell(
            onTap: enabled ? onTap : null,
            borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
            child: ExcludeSemantics(
              child: SizedBox(
                width: 80,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Container(
                      width: 64,
                      height: 64,
                      alignment: Alignment.center,
                      decoration: const BoxDecoration(
                        color: NemoTokens.colorSurfaceAccentPrimary,
                        shape: BoxShape.circle,
                      ),
                      child: icon,
                    ),
                    SizedBox(height: NemoTokens.space50),
                    Text(
                      label,
                      textAlign: TextAlign.center,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: NemoTokens.fontSize3,
                        fontWeight: FontWeight.w500,
                        height: 1.3,
                        color: NemoTokens.colorTextNeutralPrimary,
                      ),
                    ),
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

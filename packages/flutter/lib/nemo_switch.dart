import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo NemoSwitch — Flutter port of the web `Switch` (`switch.tsx`, Radix
/// `SwitchPrimitives` + shadcn classes). Named `NemoSwitch` (not `Switch`) to
/// avoid colliding with the built-in `package:flutter/material.dart` widget
/// of the same name — same reasoning as `NemoBadge`/`NemoCard`.
///
/// 100% controlled, same as every other component in this package — no
/// internal state, no "default checked".
///
/// On = `colorInteractiveAccentPrimaryMain` (web's `bg-primary`), off =
/// `colorSurfaceNeutralSecondary` (web's `bg-muted`). Thumb is
/// `colorSurfaceNeutralPrimary` (web's `bg-background`) with a light
/// `shadow-sm` approximation (framework-level `BoxShadow`, not a token — same
/// treatment `nemo_navigation_bar.dart`'s pill shadow already uses).
///
/// Sizing: track height (`h-6`=24) and thumb (`h-5 w-5`=20) match
/// `NemoTokens.space150`/`space125`; track width (`w-11`=44) has no matching
/// `NemoTokens.space*` step and stays a literal — same documented tradeoff
/// `NemoBadge` already uses for its non-token sizes.
class NemoSwitch extends StatelessWidget {
  const NemoSwitch({
    super.key,
    this.checked = false,
    this.onChanged,
    this.disabled = false,
    this.semanticLabel,
  });

  final bool checked;
  final ValueChanged<bool>? onChanged;
  final bool disabled;
  final String? semanticLabel;

  static const double _trackWidth = 44;
  static const Duration _duration = Duration(milliseconds: 150);

  @override
  Widget build(BuildContext context) {
    final trackColor =
        checked ? NemoTokens.colorInteractiveAccentPrimaryMain : NemoTokens.colorSurfaceNeutralSecondary;

    return Semantics(
      toggled: checked,
      enabled: !disabled,
      label: semanticLabel,
      child: GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(!checked),
        child: Opacity(
          opacity: disabled ? 0.5 : 1,
          child: AnimatedContainer(
            duration: _duration,
            width: _trackWidth,
            height: NemoTokens.space150,
            padding: EdgeInsets.all(NemoTokens.borderWidthMd),
            decoration: BoxDecoration(color: trackColor, borderRadius: BorderRadius.circular(NemoTokens.radiusPill)),
            child: AnimatedAlign(
              duration: _duration,
              curve: Curves.easeInOut,
              alignment: checked ? Alignment.centerRight : Alignment.centerLeft,
              child: Container(
                width: NemoTokens.space125,
                height: NemoTokens.space125,
                decoration: BoxDecoration(
                  color: NemoTokens.colorSurfaceNeutralPrimary,
                  shape: BoxShape.circle,
                  boxShadow: const [
                    BoxShadow(color: Color(0x140f1219), offset: Offset(0, 1), blurRadius: 2),
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

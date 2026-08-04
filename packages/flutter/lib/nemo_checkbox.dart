import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo NemoCheckbox — Flutter port of the web Checkbox
/// (`packages/web/src/components/checkbox.tsx`, Radix `CheckboxPrimitive` +
/// shadcn classes). Named `NemoCheckbox` (not `Checkbox`) to avoid colliding
/// with the built-in `package:flutter/material.dart` widget of the same
/// name — same reasoning as `NemoBadge`/`NemoNavigationBar`.
///
/// Unchecked border and checked background both come from
/// `border-primary`/`bg-primary` (`colorInteractiveAccentPrimaryMain`), the
/// check glyph is `text-primary-foreground`
/// (`colorInteractiveAccentPrimaryInverted`). `disabled` mirrors web's
/// `disabled:opacity-50` literally (a flat 50% opacity on the whole control,
/// not a swap to the semantic disabled tokens `NemoBadge` uses — that's what
/// the web source actually does here, no separate disabled palette).
///
/// Controlled only — no uncontrolled `defaultChecked` — same pattern as
/// every other Nemo Flutter widget: the caller owns `checked` and reacts to
/// `onChanged`.
///
/// Gotcha: web's `focus-visible:ring-1 ring-ring` has no touch equivalent —
/// there's no keyboard-only focus signal on a phone to hang a ring on (an
/// `InkWell` splash/highlight fires on every tap, not just external focus,
/// which means something different), so it was dropped rather than faked.
///
/// `rounded-sm` (2px) has no matching `NemoTokens.radius*` step — the
/// closest real token is `NemoTokens.radiusSm` (4px), used here instead of a
/// literal, same "closest existing token, not a new literal" call
/// `NemoBadge` already made for its own off-scale spacing.
class NemoCheckbox extends StatelessWidget {
  const NemoCheckbox({
    super.key,
    this.checked = false,
    this.onChanged,
    this.disabled = false,
  });

  final bool checked;
  final ValueChanged<bool>? onChanged;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    const size = NemoTokens.space100; // h-4 w-4 (16px)

    return Opacity(
      opacity: disabled ? 0.5 : 1,
      child: Semantics(
        checked: checked,
        enabled: !disabled,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            onTap: disabled ? null : () => onChanged?.call(!checked),
            child: ExcludeSemantics(
              child: Container(
                width: size,
                height: size,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: checked ? NemoTokens.colorInteractiveAccentPrimaryMain : Colors.transparent,
                  border: Border.all(
                    color: NemoTokens.colorInteractiveAccentPrimaryMain,
                    width: NemoTokens.borderWidthSm,
                  ),
                  borderRadius: BorderRadius.circular(NemoTokens.radiusSm),
                ),
                child: checked
                    ? Icon(
                        Icons.check,
                        size: size,
                        color: NemoTokens.colorInteractiveAccentPrimaryInverted,
                      )
                    : null,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

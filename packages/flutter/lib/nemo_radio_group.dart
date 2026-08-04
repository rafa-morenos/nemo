import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo NemoRadioGroup / NemoRadioGroupItem — Flutter port of the web
/// RadioGroup (`packages/web/src/components/radio-group.tsx`, Radix
/// `RadioGroupPrimitive` + shadcn classes). Named `NemoRadioGroup`/
/// `NemoRadioGroupItem` (not `RadioGroup`/`RadioGroupItem`) to avoid
/// colliding with the built-in `package:flutter/material.dart` `Radio`
/// family — same reasoning as `NemoBadge`/`NemoCheckbox`.
///
/// `NemoRadioGroup` shares `value`/`onValueChanged`/`disabled` down to its
/// `NemoRadioGroupItem` children via an `InheritedWidget` — the Flutter
/// equivalent of Radix propagating group state through its own React
/// context — and stacks them with web's `grid gap-2` (8px,
/// `NemoTokens.space50`) vertical gap; the row of dot+label per option is
/// the caller's own layout (see `radio-group.stories.tsx` on web), not
/// something this component renders.
///
/// `NemoRadioGroupItem`'s unchecked border and the checked dot both use
/// `border-primary`/`text-primary` (`colorInteractiveAccentPrimaryMain`) —
/// same blue for both, no background fill (unlike `NemoCheckbox`, which
/// fills with that color instead of just outlining it). `disabled` mirrors
/// web's `disabled:opacity-50` literally, same call as `NemoCheckbox`.
///
/// Controlled only — no uncontrolled `defaultValue`, per the design
/// system's Flutter convention (`NemoBadge`, `KanbanCard`, etc.).
///
/// Gotcha: same as `NemoCheckbox` — no touch equivalent for
/// `focus-visible:ring-2 ring-ring ring-offset-2` (no keyboard-only focus
/// signal to hang a ring on), so it was dropped rather than approximated
/// with a tap-driven `InkWell` highlight.
class NemoRadioGroup extends StatelessWidget {
  const NemoRadioGroup({
    super.key,
    this.value,
    this.onValueChanged,
    this.disabled = false,
    required this.children,
  });

  final String? value;
  final ValueChanged<String>? onValueChanged;
  final bool disabled;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return _NemoRadioGroupScope(
      value: value,
      onValueChanged: onValueChanged,
      disabled: disabled,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0) const SizedBox(height: NemoTokens.space50),
            children[i],
          ],
        ],
      ),
    );
  }
}

class _NemoRadioGroupScope extends InheritedWidget {
  const _NemoRadioGroupScope({
    required this.value,
    required this.onValueChanged,
    required this.disabled,
    required super.child,
  });

  final String? value;
  final ValueChanged<String>? onValueChanged;
  final bool disabled;

  static _NemoRadioGroupScope? maybeOf(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<_NemoRadioGroupScope>();
  }

  @override
  bool updateShouldNotify(_NemoRadioGroupScope oldWidget) {
    return value != oldWidget.value ||
        disabled != oldWidget.disabled ||
        onValueChanged != oldWidget.onValueChanged;
  }
}

class NemoRadioGroupItem extends StatelessWidget {
  const NemoRadioGroupItem({
    super.key,
    required this.value,
    this.disabled,
  });

  final String value;

  /// Overrides the parent `NemoRadioGroup.disabled` for this item only, if set.
  final bool? disabled;

  @override
  Widget build(BuildContext context) {
    final scope = _NemoRadioGroupScope.maybeOf(context);
    final checked = scope?.value == value;
    final isDisabled = disabled ?? scope?.disabled ?? false;
    const size = NemoTokens.space100; // aspect-square h-4 w-4 (16px)
    const dotSize = 10.0; // h-2.5 w-2.5 — no matching NemoTokens.space step, same as NemoBadge's off-scale literals

    return Opacity(
      opacity: isDisabled ? 0.5 : 1,
      child: Semantics(
        checked: checked,
        enabled: !isDisabled,
        child: Material(
          color: Colors.transparent,
          child: InkWell(
            customBorder: const CircleBorder(),
            onTap: isDisabled ? null : () => scope?.onValueChanged?.call(value),
            child: ExcludeSemantics(
              child: Container(
                width: size,
                height: size,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: NemoTokens.colorInteractiveAccentPrimaryMain,
                    width: NemoTokens.borderWidthSm,
                  ),
                ),
                child: checked
                    ? Container(
                        width: dotSize,
                        height: dotSize,
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: NemoTokens.colorInteractiveAccentPrimaryMain,
                        ),
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

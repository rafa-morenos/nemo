import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Label — Flutter port of the web Label (`@radix-ui/react-label`). No
/// collision with a built-in Flutter widget (Flutter has no top-level
/// `Label` class — form field labels are `InputDecoration.labelText`, not a
/// standalone widget).
///
/// Web's Radix Label associates with a control via `htmlFor` and reacts to a
/// sibling's `:disabled` state via the `peer-disabled` Tailwind variant;
/// Flutter has neither, so `disabled` is an explicit prop (pass the same
/// boolean given to the associated field) and `onTap` lets the label
/// imperatively focus/toggle its field instead of relying on automatic DOM
/// association.
class Label extends StatelessWidget {
  const Label(this.text, {super.key, this.disabled = false, this.onTap});

  final String text;
  final bool disabled;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final textWidget = Text(
      text,
      style: const TextStyle(
        fontSize: NemoTokens.fontSize3,
        fontWeight: FontWeight.w500,
        height: 1.0,
        color: NemoTokens.colorTextNeutralPrimary,
      ),
    );
    final content = Opacity(opacity: disabled ? 0.7 : 1, child: textWidget);
    return onTap != null && !disabled ? GestureDetector(onTap: onTap, child: content) : content;
  }
}

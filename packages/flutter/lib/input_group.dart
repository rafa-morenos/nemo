import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// InputGroup — Flutter port of the shadcn/ui Input Group API (`InputGroup`,
/// `InputGroupInput`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`).
/// Wraps a [TextField] with leading/trailing addons. Same compound pattern as
/// `product_card.dart`.
///
/// Web's `focus-within:ring-2` (the group highlights when its inner input is
/// focused) has no built-in Flutter equivalent without a shared
/// [FocusNode]/listener — out of scope for this layout-only port (no real
/// interactive behavior in this bucket).
class InputGroup extends StatelessWidget {
  const InputGroup({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        border: Border.all(color: NemoTokens.colorBorderNeutralHover, width: NemoTokens.borderWidthSm),
        color: NemoTokens.colorSurfaceNeutralPrimary,
      ),
      child: Row(crossAxisAlignment: CrossAxisAlignment.center, children: children),
    );
  }
}

class InputGroupInput extends StatelessWidget {
  const InputGroupInput({
    super.key,
    this.controller,
    this.placeholder,
    this.enabled = true,
    this.onChanged,
  });

  final TextEditingController? controller;
  final String? placeholder;
  final bool enabled;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      // h-10 (40px = space250), px-3 (space75), py-2 (space50).
      child: SizedBox(
        height: NemoTokens.space250,
        child: TextField(
          controller: controller,
          enabled: enabled,
          onChanged: onChanged,
          style: const TextStyle(
            fontFamily: NemoFonts.sans,
            fontSize: NemoTokens.fontSize3,
            color: NemoTokens.colorTextNeutralPrimary,
          ),
          decoration: InputDecoration(
            isDense: true,
            border: InputBorder.none,
            contentPadding: const EdgeInsets.symmetric(horizontal: NemoTokens.space75, vertical: NemoTokens.space50),
            hintText: placeholder,
            hintStyle: const TextStyle(
              fontFamily: NemoFonts.sans,
              fontSize: NemoTokens.fontSize3,
              color: NemoTokens.colorTextNeutralTertiary,
            ),
          ),
        ),
      ),
    );
  }
}

enum InputGroupAddonAlign { inlineStart, inlineEnd }

class InputGroupAddon extends StatelessWidget {
  const InputGroupAddon({super.key, required this.children, this.align = InputGroupAddonAlign.inlineStart});
  final List<Widget> children;
  final InputGroupAddonAlign align;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: align == InputGroupAddonAlign.inlineStart ? NemoTokens.space75 : 0,
        right: align == InputGroupAddonAlign.inlineEnd ? NemoTokens.space75 : 0,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: _withGaps(children, NemoTokens.space50),
      ),
    );
  }
}

class InputGroupButton extends StatelessWidget {
  const InputGroupButton({super.key, required this.child, this.onPressed, this.disabled = false});
  final Widget child;
  final VoidCallback? onPressed;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: disabled ? 0.5 : 1,
      child: TextButton(
        onPressed: disabled ? null : onPressed,
        style: TextButton.styleFrom(
          // h-7 (28px) isn't on the space scale — arbitrary Tailwind value on web too.
          minimumSize: const Size(0, 28),
          padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space50),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(NemoTokens.radiusSm)),
        ),
        child: DefaultTextStyle.merge(
          style: const TextStyle(
            fontFamily: NemoFonts.sans,
            fontSize: NemoTokens.fontSize3,
            fontWeight: FontWeight.w500,
            color: NemoTokens.colorTextNeutralPrimary,
          ),
          child: child,
        ),
      ),
    );
  }
}

class InputGroupText extends StatelessWidget {
  const InputGroupText({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return DefaultTextStyle.merge(
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        color: NemoTokens.colorTextNeutralTertiary,
      ),
      child: Row(mainAxisSize: MainAxisSize.min, children: _withGaps(children, NemoTokens.space50)),
    );
  }
}

List<Widget> _withGaps(List<Widget> children, double gap) {
  if (children.isEmpty) return children;
  final result = <Widget>[];
  for (var i = 0; i < children.length; i++) {
    if (i > 0) result.add(SizedBox(width: gap));
    result.add(children[i]);
  }
  return result;
}

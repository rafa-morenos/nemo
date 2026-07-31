import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Kbd / KbdGroup — Flutter port of the web Kbd
/// (`packages/web/src/components/kbd.tsx`). No collision with a built-in
/// Flutter widget.
class Kbd extends StatelessWidget {
  const Kbd(this.label, {super.key});
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minWidth: NemoTokens.space125),
      height: NemoTokens.space125,
      padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space25),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: NemoTokens.colorSurfaceNeutralSecondary,
        borderRadius: BorderRadius.circular(NemoTokens.radiusSm),
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontSize: NemoTokens.fontSize2,
          fontWeight: FontWeight.w500,
          color: NemoTokens.colorTextNeutralTertiary,
        ),
      ),
    );
  }
}

class KbdGroup extends StatelessWidget {
  const KbdGroup({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < children.length; i++) ...[
          if (i > 0) const SizedBox(width: NemoTokens.space25),
          children[i],
        ],
      ],
    );
  }
}

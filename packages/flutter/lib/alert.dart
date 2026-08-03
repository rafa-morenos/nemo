import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Alert / AlertTitle / AlertDescription — Flutter port of the web
/// Alert (`packages/web/src/components/alert.tsx`). No collision with a
/// built-in Flutter widget (there's `AlertDialog`, not `Alert`), so no
/// `Nemo` prefix needed.
///
/// Web positions the leading icon via CSS sibling selectors and relies on
/// CSS color inheritance so `AlertTitle`/`AlertDescription` pick up the
/// variant's text color automatically; here `Alert` lays the icon out in an
/// explicit `Row` and wraps its `child` in `DefaultTextStyle.merge` so any
/// `Text` inside (including `AlertTitle`/`AlertDescription`) inherits the
/// variant color without each widget needing to know the variant itself.
enum AlertVariant { defaultVariant, destructive }

class Alert extends StatelessWidget {
  const Alert({super.key, this.variant = AlertVariant.defaultVariant, this.icon, required this.child});

  final AlertVariant variant;
  final Widget? icon;
  final Widget child;

  bool get _destructive => variant == AlertVariant.destructive;

  // Web's `border-destructive/50` (Tailwind alpha modifier).
  Color get _borderColor =>
      _destructive ? NemoTokens.colorIconSemanticCritical.withOpacity(0.5) : NemoTokens.colorBorderNeutralMain;

  Color get _textColor => _destructive ? NemoTokens.colorIconSemanticCritical : NemoTokens.colorTextNeutralPrimary;

  @override
  Widget build(BuildContext context) {
    // Web's `role="alert"` — Semantics(liveRegion: true) is the closest
    // Flutter equivalent (announces content to assistive tech on change).
    return Semantics(
      liveRegion: true,
      child: Container(
        padding: const EdgeInsets.all(NemoTokens.space100),
        decoration: BoxDecoration(
          color: NemoTokens.colorSurfaceNeutralPrimary,
          border: Border.all(color: _borderColor, width: NemoTokens.borderWidthSm),
          borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (icon != null) ...[
              IconTheme(
                data: IconThemeData(color: _textColor, size: NemoTokens.space100),
                child: icon!,
              ),
              const SizedBox(width: NemoTokens.space75),
            ],
            Expanded(
              child: DefaultTextStyle.merge(
                style: TextStyle(color: _textColor),
                child: child,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AlertTitle extends StatelessWidget {
  const AlertTitle(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: NemoTokens.space12),
      child: Text(text, style: const TextStyle(fontWeight: FontWeight.w500)),
    );
  }
}

class AlertDescription extends StatelessWidget {
  const AlertDescription(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(text, style: const TextStyle(fontSize: NemoTokens.fontSize3, height: 1.4));
  }
}

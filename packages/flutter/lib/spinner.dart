import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Spinner — Flutter port of the web Spinner (a spinning `Loader2` from
/// `lucide-react`). Flutter's own vocabulary here is
/// `CircularProgressIndicator`/`LinearProgressIndicator`, not `Spinner`, so
/// no name collision. Rather than hand-drawing the Loader2 glyph (no pub
/// package added, no vector asset available), this wraps the built-in
/// indeterminate `CircularProgressIndicator` — same rotating-indicator
/// visual language, token-driven color, zero new dependency. (RN's port
/// hand-rolls a rotating ring instead, since RN's `ActivityIndicator` can't
/// be sized arbitrarily across platforms the way Flutter's can.)
class Spinner extends StatelessWidget {
  const Spinner({super.key, this.size = NemoTokens.space100, this.color});

  /// Diameter in px. Web defaults to `size-4` (16px).
  final double size;

  /// Defaults to `text-muted-foreground` (`colorTextNeutralTertiary`).
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CircularProgressIndicator(
        strokeWidth: (size / 8).clamp(2, 4),
        valueColor: AlwaysStoppedAnimation<Color>(color ?? NemoTokens.colorTextNeutralTertiary),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Progress — Flutter port of the web Progress
/// (`@radix-ui/react-progress`). Flutter's built-ins are
/// `ProgressIndicator`/`LinearProgressIndicator`/`CircularProgressIndicator`
/// — none literally named `Progress` — so kept as plain `Progress` (not
/// `NemoProgress`) rather than prefixing defensively for a name that isn't
/// actually taken.
class Progress extends StatelessWidget {
  const Progress({super.key, this.value = 0});

  /// 0–100, same range as the web prop.
  final double value;

  @override
  Widget build(BuildContext context) {
    final clamped = value.clamp(0, 100).toDouble();
    return ClipRRect(
      borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
      child: SizedBox(
        height: NemoTokens.space50,
        child: LinearProgressIndicator(
          value: clamped / 100,
          backgroundColor: NemoTokens.colorSurfaceNeutralSecondary,
          valueColor: const AlwaysStoppedAnimation<Color>(NemoTokens.colorInteractiveAccentPrimaryMain),
        ),
      ),
    );
  }
}

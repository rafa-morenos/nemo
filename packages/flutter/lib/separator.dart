import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Separator — Flutter port of the web Separator
/// (`@radix-ui/react-separator`). Flutter's built-in equivalent is `Divider`/
/// `VerticalDivider`, not `Separator`, so no name collision — kept as
/// `Separator` to match the web/RN component name 1:1.
enum SeparatorOrientation { horizontal, vertical }

class Separator extends StatelessWidget {
  const Separator({super.key, this.orientation = SeparatorOrientation.horizontal, this.decorative = true});

  final SeparatorOrientation orientation;

  /// Mirrors Radix's `decorative` prop — hides the divider from the
  /// accessibility tree when true (default, same as web).
  final bool decorative;

  @override
  Widget build(BuildContext context) {
    final line = Container(
      width: orientation == SeparatorOrientation.horizontal ? double.infinity : 1,
      height: orientation == SeparatorOrientation.horizontal ? 1 : double.infinity,
      color: NemoTokens.colorBorderNeutralMain,
    );
    return decorative ? ExcludeSemantics(child: line) : line;
  }
}

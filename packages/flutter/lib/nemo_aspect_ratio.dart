import 'package:flutter/widgets.dart';

/// Nemo NemoAspectRatio — Flutter port of the web AspectRatio (a passthrough
/// over `@radix-ui/react-aspect-ratio`'s `Root`). Prefixed `Nemo` (file
/// `nemo_aspect_ratio.dart`) because `package:flutter/widgets.dart` already
/// exports a built-in `AspectRatio` widget — same reason `NemoBadge`/
/// `NemoNavigationBar` are prefixed elsewhere in this package.
///
/// Just wraps the built-in `AspectRatio` + `ClipRect`, matching the
/// purely-layout nature of the Radix passthrough it ports.
class NemoAspectRatio extends StatelessWidget {
  const NemoAspectRatio({super.key, this.ratio = 1.0, required this.child});

  /// width / height. Defaults to 1 (square), same as Radix.
  final double ratio;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return AspectRatio(aspectRatio: ratio, child: ClipRect(child: child));
  }
}

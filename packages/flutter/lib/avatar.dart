import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Avatar — Flutter port of the web Avatar (`@radix-ui/react-avatar`).
/// No collision with a built-in Flutter widget.
///
/// Web splits this into three compound pieces (`Avatar`/`AvatarImage`/
/// `AvatarFallback`) driven by Radix's internal image-loading state machine.
/// Flutter doesn't have an idiomatic compound-slot convention for this (same
/// call made for `NemoBadge`, which folds icon/dot into one widget), so this
/// collapses to a single `StatefulWidget`: pass `imageProvider` for the photo
/// and `fallback` for what shows while there's no image or it failed to
/// load — same fallback behavior as Radix, simpler API surface.
class Avatar extends StatefulWidget {
  const Avatar({super.key, this.size = 40, this.imageProvider, this.fallback});

  /// Diameter in px. Web defaults to `h-10 w-10` (40px via the Nemo spacing scale).
  final double size;
  final ImageProvider? imageProvider;
  final Widget? fallback;

  @override
  State<Avatar> createState() => _AvatarState();
}

class _AvatarState extends State<Avatar> {
  bool _errored = false;

  @override
  void didUpdateWidget(covariant Avatar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.imageProvider != widget.imageProvider) _errored = false;
  }

  @override
  Widget build(BuildContext context) {
    final showFallback = widget.imageProvider == null || _errored;
    return ClipOval(
      child: Container(
        width: widget.size,
        height: widget.size,
        color: NemoTokens.colorSurfaceNeutralSecondary,
        child: showFallback
            ? Center(child: widget.fallback)
            : Image(
                image: widget.imageProvider!,
                width: widget.size,
                height: widget.size,
                fit: BoxFit.cover,
                errorBuilder: (_, __, ___) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    if (mounted && !_errored) setState(() => _errored = true);
                  });
                  return Center(child: widget.fallback);
                },
              ),
      ),
    );
  }
}

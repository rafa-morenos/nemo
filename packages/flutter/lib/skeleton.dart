import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Skeleton — Flutter port of the web Skeleton (`animate-pulse
/// rounded-md bg-muted`). No collision with a built-in Flutter widget. Web's
/// `animate-pulse` is a Tailwind keyframe (opacity 1 → .5 → 1 over 2s
/// ease-in-out); reproduced here with an `AnimationController` since Flutter
/// has no CSS keyframes.
class Skeleton extends StatefulWidget {
  const Skeleton({super.key, this.width, this.height, this.borderRadius = NemoTokens.radiusMd});

  final double? width;
  final double? height;
  final double borderRadius;

  @override
  State<Skeleton> createState() => _SkeletonState();
}

class _SkeletonState extends State<Skeleton> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1))..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: Tween<double>(begin: 1.0, end: 0.5).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut)),
      child: Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
          color: NemoTokens.colorSurfaceNeutralSecondary,
          borderRadius: BorderRadius.circular(widget.borderRadius),
        ),
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// ButtonGroup — Flutter port of the web `ButtonGroup`. Web achieves the
/// "only round the outer corners" look via CSS `[&>*]:first:rounded-*`/
/// `last:rounded-*` selectors, which don't exist in Flutter. This wraps each
/// child in a [ClipRRect] with the right corner radii for its position —
/// works regardless of what the child widget is (no `style` prop assumption
/// needed, unlike the RN port).
enum ButtonGroupOrientation { horizontal, vertical }

class ButtonGroup extends StatelessWidget {
  const ButtonGroup({super.key, required this.children, this.orientation = ButtonGroupOrientation.horizontal});

  final List<Widget> children;
  final ButtonGroupOrientation orientation;

  @override
  Widget build(BuildContext context) {
    final isHorizontal = orientation == ButtonGroupOrientation.horizontal;
    final items = <Widget>[];
    for (var i = 0; i < children.length; i++) {
      final isFirst = i == 0;
      final isLast = i == children.length - 1;
      final radius = Radius.circular(NemoTokens.radiusMd);
      final none = Radius.zero;
      final borderRadius = isHorizontal
          ? BorderRadius.only(
              topLeft: isFirst ? radius : none,
              bottomLeft: isFirst ? radius : none,
              topRight: isLast ? radius : none,
              bottomRight: isLast ? radius : none,
            )
          : BorderRadius.only(
              topLeft: isFirst ? radius : none,
              topRight: isFirst ? radius : none,
              bottomLeft: isLast ? radius : none,
              bottomRight: isLast ? radius : none,
            );
      if (i > 0) items.add(SizedBox(width: isHorizontal ? NemoTokens.space25 : 0, height: isHorizontal ? 0 : NemoTokens.space25));
      items.add(ClipRRect(borderRadius: borderRadius, child: children[i]));
    }

    return isHorizontal
        ? Row(mainAxisSize: MainAxisSize.min, children: items)
        : Column(mainAxisSize: MainAxisSize.min, children: items);
  }
}

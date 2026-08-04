import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// Bubble — Flutter port of the web `Bubble`. Interpretation, not a canonical
/// shadcn component (see the web file's own comment): a chat message bubble.
/// A user bubble aligns right with brand colors; an assistant bubble aligns
/// left with muted colors.
class Bubble extends StatelessWidget {
  const Bubble({super.key, this.role = BubbleRole.assistant, required this.child});

  final BubbleRole role;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final isUser = role == BubbleRole.user;
    return Row(
      mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
      children: [
        Container(
          // max-w-[80%] — arbitrary Tailwind value on web too, not a token.
          constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
          padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space100, vertical: NemoTokens.space50),
          decoration: BoxDecoration(
            // rounded-2xl: web's un-overridden Tailwind default (1rem/16px)
            // happens to equal NemoTokens.radiusLg, so this uses the real
            // token instead of a coincidental literal.
            borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
            color: isUser ? NemoTokens.colorInteractiveAccentPrimaryMain : NemoTokens.colorSurfaceNeutralSecondary,
          ),
          child: DefaultTextStyle.merge(
            style: TextStyle(
              fontFamily: NemoFonts.sans,
              fontSize: NemoTokens.fontSize3,
              color: isUser ? NemoTokens.colorInteractiveAccentPrimaryInverted : NemoTokens.colorTextNeutralPrimary,
            ),
            child: child,
          ),
        ),
      ],
    );
  }
}

enum BubbleRole { user, assistant }

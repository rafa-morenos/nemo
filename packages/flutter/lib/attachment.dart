import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// Attachment — Flutter port of the web `Attachment`. Interpretation, not a
/// canonical shadcn component: a token-driven chip representing a file
/// attachment (file icon, name, optional size, optional remove button).
///
/// Web uses lucide-react's `File`/`X` icons, which have no dedicated Daki
/// vector in this package — uses Material's `Icons.insert_drive_file_outlined`/
/// `Icons.close` as a stand-in, same "no real vector, use Material as
/// approximation" convention `product_card.dart`'s `ProductCardMedia`
/// placeholder and `nemo_navigation_bar.dart` already use.
class Attachment extends StatelessWidget {
  const Attachment({super.key, required this.name, this.size, this.onRemove});

  final String name;
  final String? size;
  final VoidCallback? onRemove;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space75, vertical: NemoTokens.space50),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        border: Border.all(color: NemoTokens.colorBorderNeutralMain, width: NemoTokens.borderWidthSm),
        color: NemoTokens.colorSurfaceSemanticInfo,
      ),
      child: Row(
        children: [
          const Icon(Icons.insert_drive_file_outlined, size: 16, color: NemoTokens.colorTextNeutralTertiary),
          const SizedBox(width: NemoTokens.space50),
          Expanded(
            child: Row(
              children: [
                Flexible(
                  child: Text(
                    name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontFamily: NemoFonts.sans,
                      fontSize: NemoTokens.fontSize3,
                      color: NemoTokens.colorTextNeutralPrimary,
                    ),
                  ),
                ),
                if (size != null) ...[
                  const SizedBox(width: NemoTokens.space50),
                  Text(
                    size!,
                    style: const TextStyle(
                      fontFamily: NemoFonts.sans,
                      fontSize: NemoTokens.fontSize3,
                      color: NemoTokens.colorTextNeutralTertiary,
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (onRemove != null) ...[
            const SizedBox(width: NemoTokens.space50),
            SizedBox(
              // h-6 w-6 (24px = space150).
              width: NemoTokens.space150,
              height: NemoTokens.space150,
              child: IconButton(
                padding: EdgeInsets.zero,
                iconSize: 16,
                tooltip: 'Remove attachment',
                icon: const Icon(Icons.close, color: NemoTokens.colorTextNeutralPrimary),
                onPressed: onRemove,
              ),
            ),
          ],
        ],
      ),
    );
  }
}

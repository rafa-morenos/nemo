import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo NemoBadge — the unified Tag/Chip (Flutter port of the web Badge).
/// Named `NemoBadge` (not `Badge`) to avoid colliding with the built-in
/// `package:flutter/material.dart` widget of the same name.
///
/// Same prop surface as `packages/web/src/components/badge.tsx`: `color` ×
/// `type` cover the Figma matrix (defaultColor/success/warning/critical/info/
/// disabled/inverted × filled/outline/ghost/solid), plus `size` (sm/md),
/// `shape` (pill/square) and `count` (numeric counter — counter-tag/
/// picking-amount).

enum NemoBadgeColor { defaultColor, success, warning, critical, info, disabled, inverted }

enum NemoBadgeType { filled, outline, ghost, solid }

enum NemoBadgeSize { sm, md }

enum NemoBadgeShape { pill, square }

class NemoBadge extends StatelessWidget {
  const NemoBadge({
    super.key,
    this.color = NemoBadgeColor.defaultColor,
    this.type = NemoBadgeType.filled,
    this.size,
    this.shape = NemoBadgeShape.pill,
    this.icon,
    this.dot = false,
    this.count,
    this.label,
  });

  final NemoBadgeColor color;
  final NemoBadgeType type;
  final NemoBadgeSize? size;
  final NemoBadgeShape shape;
  final IconData? icon;
  final bool dot;

  /// Numeric counter (counter-tag / picking-amount). Without `label`, the
  /// badge renders as a standalone counter (defaults to `size=sm`). With
  /// `label`, the count appears as a trailing value. Caps at "99+".
  final int? count;

  /// Text content. Required unless this is a standalone counter (`count`
  /// with no `label`) — Flutter has no "children as text" convention.
  final String? label;

  bool get _counterOnly => count != null && label == null;

  NemoBadgeSize get _effSize => size ?? (_counterOnly ? NemoBadgeSize.sm : NemoBadgeSize.md);

  bool get _solid => type == NemoBadgeType.solid;

  // "solid" backgrounds for success/warning/critical use the generated
  // NemoTokens.colorFixed* constants (from tokens/fixed.json) — same
  // "-fixed" pattern as web's destructive-fixed/primary-fixed, mirroring
  // what button.tsx already does for default/destructive.
  // NemoTokens.colorSurfaceSemantic*/colorIconSemantic* tonal-flip to a PALE
  // tone in dark mode, which white text can't read against; Figma's alias
  // set never promoted an "On <Hue>" role for these, so colorFixed* pins to
  // the light-mode primitive instead — a real generated token, matching what
  // web/RN reference too.
  Color get _bg {
    if (type == NemoBadgeType.outline || type == NemoBadgeType.ghost) return Colors.transparent;
    switch (color) {
      case NemoBadgeColor.defaultColor:
        return NemoTokens.colorInteractiveAccentPrimaryMain;
      case NemoBadgeColor.success:
        return _solid ? NemoTokens.colorFixedSuccess : NemoTokens.colorSurfaceSemanticSuccess;
      case NemoBadgeColor.warning:
        return _solid ? NemoTokens.colorFixedWarning : NemoTokens.colorSurfaceSemanticWarning;
      case NemoBadgeColor.critical:
        return _solid ? NemoTokens.colorFixedDestructive : NemoTokens.colorSurfaceSemanticCritical;
      case NemoBadgeColor.info:
        // No dedicated strong info tone (mirrors web: solid intentionally == filled).
        return NemoTokens.colorSurfaceSemanticInfo;
      case NemoBadgeColor.disabled:
        return NemoTokens.colorSurfaceNeutralDisabled;
      case NemoBadgeColor.inverted:
        return NemoTokens.colorSurfaceNeutralInverted;
    }
  }

  Color get _fg {
    final outlineOrGhost = type == NemoBadgeType.outline || type == NemoBadgeType.ghost;
    switch (color) {
      case NemoBadgeColor.defaultColor:
        return outlineOrGhost ? NemoTokens.colorTextAccentPrimary : NemoTokens.colorInteractiveAccentPrimaryInverted;
      case NemoBadgeColor.success:
        return _solid ? NemoTokens.colorFixedSuccessforeground : NemoTokens.colorTextSemanticSuccess;
      case NemoBadgeColor.warning:
        return _solid ? NemoTokens.colorFixedWarningforeground : NemoTokens.colorTextSemanticWarning;
      case NemoBadgeColor.critical:
        return _solid ? NemoTokens.colorFixedDestructiveforeground : NemoTokens.colorTextSemanticCritical;
      case NemoBadgeColor.info:
        return NemoTokens.colorTextSemanticInfo;
      case NemoBadgeColor.disabled:
        return NemoTokens.colorTextNeutralTertiary;
      case NemoBadgeColor.inverted:
        return NemoTokens.colorTextNeutralInverted;
    }
  }

  Color get _border {
    if (type != NemoBadgeType.outline) return Colors.transparent;
    switch (color) {
      case NemoBadgeColor.defaultColor:
        return NemoTokens.colorBorderAccentPrimary;
      case NemoBadgeColor.success:
        return NemoTokens.colorBorderSemanticSuccess;
      case NemoBadgeColor.warning:
        return NemoTokens.colorBorderSemanticWarning;
      case NemoBadgeColor.critical:
        return NemoTokens.colorBorderSemanticCritical;
      case NemoBadgeColor.info:
        return NemoTokens.colorBorderSemanticInfo;
      case NemoBadgeColor.disabled:
        return NemoTokens.colorBorderNeutralDisabled;
      case NemoBadgeColor.inverted:
        return NemoTokens.colorSurfaceNeutralInverted;
    }
  }

  static String _formatCount(int count) => count > 99 ? '99+' : '$count';

  @override
  Widget build(BuildContext context) {
    final sm = _effSize == NemoBadgeSize.sm;
    final fg = _fg;
    // font-size-1 (10) / font-size-2 (12) — the same tokens web's sm/md map to.
    final textStyle = TextStyle(
      fontSize: sm ? NemoTokens.fontSize1 : NemoTokens.fontSize2,
      fontWeight: FontWeight.w600,
      color: fg,
    );
    final iconSize = sm ? 10.0 : 12.0;
    final dotSize = sm ? 4.0 : 6.0;

    final children = <Widget>[
      if (icon != null && !_counterOnly) ...[Icon(icon, size: iconSize, color: fg), SizedBox(width: sm ? 2 : 4)],
      if (dot && !_counterOnly) ...[
        Container(width: dotSize, height: dotSize, decoration: BoxDecoration(color: fg, shape: BoxShape.circle)),
        SizedBox(width: sm ? 2 : 4),
      ],
      Text(_counterOnly ? _formatCount(count!) : (label ?? ''), style: textStyle, maxLines: 1, overflow: TextOverflow.ellipsis),
      if (count != null && !_counterOnly) ...[
        SizedBox(width: sm ? 2 : 4),
        Text(_formatCount(count!), style: textStyle.copyWith(fontWeight: FontWeight.w700)),
      ],
    ];

    return Container(
      constraints: _counterOnly ? const BoxConstraints(minWidth: 20) : null,
      padding: EdgeInsets.symmetric(horizontal: sm ? 8 : 10, vertical: 2),
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(shape == NemoBadgeShape.pill ? NemoTokens.radiusPill : NemoTokens.radiusMd),
        border: type == NemoBadgeType.outline ? Border.all(color: _border) : null,
      ),
      child: Row(mainAxisSize: MainAxisSize.min, mainAxisAlignment: MainAxisAlignment.center, children: children),
    );
  }
}

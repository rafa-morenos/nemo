/// Nemo Toggle / ToggleGroup / ToggleGroupItem — Flutter port of the web
/// `toggle.tsx` + `toggle-group.tsx` (Radix `TogglePrimitive`/
/// `ToggleGroupPrimitive` + shadcn `cva` variants).
///
/// **Naming**: kept as `Toggle`/`ToggleGroup`/`ToggleGroupItem`, no `Nemo`
/// prefix — `package:flutter/material.dart` has no widget with either exact
/// name (it has `ToggleButtons`, a different name), so there's no collision
/// to avoid. Contrast with `NemoSwitch` in `nemo_switch.dart`, which *does*
/// collide with Material's `Switch`.
///
/// 100% controlled — `pressed`/`onPressedChange` for [Toggle],
/// `value`/`onValueChange` for [ToggleGroup] — no internal state.
///
/// `ToggleVariant.defaultVariant`/`ToggleSize.defaultSize` are named that way
/// (not `default`) because `default` is a reserved word in Dart — same
/// workaround `NemoBadgeColor.defaultColor` already uses in `nemo_badge.dart`.
library toggle;

import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

enum ToggleVariant { defaultVariant, outline }

enum ToggleSize { defaultSize, sm, lg }

/// Sizes mirror the web `cva` (`h-10 px-3 min-w-10` / `h-9 px-2.5 min-w-9` /
/// `h-11 px-5 min-w-11`). Horizontal padding matches `NemoTokens.space*`
/// where the scale lines up (`defaultSize`→`space75`, `lg`→`space125`);
/// height, min-width and `sm`'s padding don't have a matching step and stay
/// literals — same documented tradeoff `NemoBadge` uses for its sizes.
class _ToggleSizing {
  final double height;
  final double minWidth;
  final double paddingHorizontal;
  const _ToggleSizing(this.height, this.minWidth, this.paddingHorizontal);
}

_ToggleSizing _sizingFor(ToggleSize size) {
  switch (size) {
    case ToggleSize.sm:
      return const _ToggleSizing(36, 36, 10);
    case ToggleSize.lg:
      return const _ToggleSizing(44, 44, NemoTokens.space125);
    case ToggleSize.defaultSize:
      return const _ToggleSizing(40, 40, NemoTokens.space75);
  }
}

/// A single pressable toggle button (bold/italic-style). Content is either
/// [icon], [label], or both (icon leading, label trailing) — same
/// icon/label convention `NemoBadge` uses, so callers don't need a full
/// arbitrary-child slot for the common cases.
class Toggle extends StatelessWidget {
  const Toggle({
    super.key,
    this.pressed = false,
    this.onPressedChange,
    this.disabled = false,
    this.variant = ToggleVariant.defaultVariant,
    this.size = ToggleSize.defaultSize,
    this.icon,
    this.label,
    this.semanticLabel,
  });

  final bool pressed;
  final ValueChanged<bool>? onPressedChange;
  final bool disabled;
  final ToggleVariant variant;
  final ToggleSize size;
  final IconData? icon;
  final String? label;
  final String? semanticLabel;

  bool get _outline => variant == ToggleVariant.outline;

  Color get _bg => pressed ? NemoTokens.colorSurfaceAccentPrimary : Colors.transparent;

  Color get _fg => pressed ? NemoTokens.colorTextAccentPrimary : NemoTokens.colorTextNeutralPrimary;

  Color get _borderColor =>
      _outline && !pressed ? NemoTokens.colorBorderNeutralHover : Colors.transparent;

  @override
  Widget build(BuildContext context) {
    final sizing = _sizingFor(size);
    final fg = _fg;

    final children = <Widget>[
      if (icon != null) ...[
        Icon(icon, size: 16, color: fg),
        if (label != null) const SizedBox(width: 8),
      ],
      if (label != null)
        Text(label!, style: TextStyle(fontSize: NemoTokens.fontSize3, fontWeight: FontWeight.w500, color: fg)),
    ];

    return Semantics(
      button: true,
      selected: pressed,
      enabled: !disabled,
      label: semanticLabel ?? label,
      child: Opacity(
        opacity: disabled ? 0.5 : 1,
        child: Material(
          color: Colors.transparent,
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
          child: InkWell(
            onTap: disabled ? null : () => onPressedChange?.call(!pressed),
            borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
            child: Container(
              height: sizing.height,
              constraints: BoxConstraints(minWidth: sizing.minWidth),
              padding: EdgeInsets.symmetric(horizontal: sizing.paddingHorizontal),
              decoration: BoxDecoration(
                color: _bg,
                borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
                border: _outline ? Border.all(color: _borderColor, width: NemoTokens.borderWidthSm) : null,
              ),
              child: Row(mainAxisSize: MainAxisSize.min, mainAxisAlignment: MainAxisAlignment.center, children: children),
            ),
          ),
        ),
      ),
    );
  }
}

/* ------------------------------------------------------------------------ */
/* ToggleGroup / ToggleGroupItem                                            */
/* ------------------------------------------------------------------------ */

enum ToggleGroupType { single, multiple }

/// A row of [ToggleGroupItem]s sharing selection state, `variant` and `size`.
/// No `InheritedWidget` — `variant`/`size`/`type`/`value`/`onValueChange` are
/// threaded to each item explicitly via constructor params (simpler than a
/// context type for a leaf-list widget like this one; the RN port uses
/// `React.Context` for the same purpose since that's the idiomatic
/// equivalent there — see `packages/react-native/src/Toggle.tsx`).
///
/// `value` holds a single `String` for `ToggleGroupType.single` or a
/// `List<String>` for `ToggleGroupType.multiple` — callers pick the matching
/// shape for `type` (unchecked at the type level, same tradeoff the web
/// version's `value: string | string[]` has).
class ToggleGroup extends StatelessWidget {
  const ToggleGroup({
    super.key,
    required this.type,
    this.value,
    this.onValueChange,
    this.variant = ToggleVariant.defaultVariant,
    this.size = ToggleSize.defaultSize,
    this.disabled = false,
    required this.children,
  });

  final ToggleGroupType type;
  final dynamic value;
  final ValueChanged<dynamic>? onValueChange;
  final ToggleVariant variant;
  final ToggleSize size;
  final bool disabled;

  /// [ToggleGroupItem]s — each is handed this group's `type`/`value`/
  /// `onValueChange`/`variant`/`size`/`disabled` via `ToggleGroupItem.value`
  /// matching. Build them with this group's `_itemFor` helper isn't exposed;
  /// instead pass fully-formed [ToggleGroupItem]s and this widget wires
  /// their shared state on build.
  final List<ToggleGroupItem> children;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        for (final item in children) ...[
          if (item != children.first) const SizedBox(width: NemoTokens.space25),
          _bind(item),
        ],
      ],
    );
  }

  Widget _bind(ToggleGroupItem item) {
    final selected = type == ToggleGroupType.multiple
        ? (value is List && (value as List).contains(item.value))
        : value == item.value;

    void handleChange() {
      if (type == ToggleGroupType.multiple) {
        final current = value is List<String> ? List<String>.from(value as List<String>) : <String>[];
        final next = selected ? (current..remove(item.value)) : (current..add(item.value));
        onValueChange?.call(next);
      } else {
        // Radix's single-mode ToggleGroup allows deselecting the active item.
        onValueChange?.call(selected ? '' : item.value);
      }
    }

    return Toggle(
      pressed: selected,
      onPressedChange: (disabled || item.disabled) ? null : (_) => handleChange(),
      disabled: disabled || item.disabled,
      variant: variant,
      size: size,
      icon: item.icon,
      label: item.label,
      semanticLabel: item.semanticLabel,
    );
  }
}

/// A single item inside a [ToggleGroup]. Not renderable on its own — a
/// [ToggleGroup] reads each item's `value`/`icon`/`label`/`disabled` and
/// renders the actual [Toggle], since selection state lives on the group.
class ToggleGroupItem {
  const ToggleGroupItem({
    required this.value,
    this.icon,
    this.label,
    this.disabled = false,
    this.semanticLabel,
  });

  final String value;
  final IconData? icon;
  final String? label;
  final bool disabled;
  final String? semanticLabel;
}

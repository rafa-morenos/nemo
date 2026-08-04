import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Accordion / AccordionItem / AccordionTrigger / AccordionContent —
/// Flutter port of `packages/web/src/components/accordion.tsx`
/// (`@radix-ui/react-accordion` + a `border-b` between items + a chevron
/// that rotates 180° when open + a height animation).
///
/// No Material widget is named `Accordion` (Flutter's closest built-ins are
/// `ExpansionTile`/`ExpansionPanel`, different names), so this keeps the
/// bare name — unlike `NemoBadge`/`NemoCard`, which are prefixed to dodge a
/// real collision.
///
/// Token mapping (same as web/RN):
/// - item divider (web `border-b`) → `NemoTokens.colorBorderNeutralMain`
/// - chevron (web `text-muted-foreground`) → `NemoTokens.colorTextNeutralTertiary`
/// - trigger label (web default foreground) → `NemoTokens.colorTextNeutralPrimary`
///
/// Chevron uses `Icons.expand_more` (Material) — same "no dedicated Daki
/// asset, use the Material equivalent" call already made for
/// `NavigationBar`/`ProductCard`.
///
/// 100% controlled, no internal state — `value`/`onValueChange` come from
/// the caller. `value` is `String?` when `type == AccordionType.single`,
/// `List<String>` when `type == AccordionType.multiple` — kept as one
/// loosely-typed `Object?` field (not a discriminated union / separate
/// widgets) to keep the surface simple; same trade-off the RN port makes.
///
/// `collapsible` (only meaningful for `type == AccordionType.single`)
/// mirrors web/Radix: whether pressing the open item again closes it
/// (default false — once open, an item can only be replaced, not closed to
/// none). Closing sets the value to `''`, same sentinel Radix itself uses.
///
/// Same animation approach as `collapsible.dart`: no manual height
/// measurement — `AnimatedSize` + `ClipRect` around a conditionally-mounted
/// child, `AnimatedRotation` for the chevron.

enum AccordionType { single, multiple }

class _AccordionScope extends InheritedWidget {
  const _AccordionScope({
    required this.type,
    required this.value,
    required this.onValueChange,
    required this.collapsible,
    required super.child,
  });

  final AccordionType type;
  final Object? value;
  final ValueChanged<Object>? onValueChange;
  final bool collapsible;

  static _AccordionScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<_AccordionScope>();
    assert(scope != null, 'AccordionItem must be used inside an Accordion.');
    return scope!;
  }

  @override
  bool updateShouldNotify(_AccordionScope oldWidget) =>
      type != oldWidget.type || value != oldWidget.value || collapsible != oldWidget.collapsible;
}

class Accordion extends StatelessWidget {
  const Accordion({
    super.key,
    this.type = AccordionType.single,
    this.value,
    this.onValueChange,
    this.collapsible = false,
    required this.children,
  });

  final AccordionType type;

  /// `String?` when `type == AccordionType.single`, `List<String>` when
  /// `type == AccordionType.multiple`.
  final Object? value;
  final ValueChanged<Object>? onValueChange;

  /// Only relevant for `type == AccordionType.single`.
  final bool collapsible;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return _AccordionScope(
      type: type,
      value: value,
      onValueChange: onValueChange,
      collapsible: collapsible,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: children,
      ),
    );
  }
}

class _AccordionItemScope extends InheritedWidget {
  const _AccordionItemScope({
    required this.value,
    required this.open,
    required this.disabled,
    required super.child,
  });

  final String value;
  final bool open;
  final bool disabled;

  static _AccordionItemScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<_AccordionItemScope>();
    assert(scope != null, 'AccordionTrigger/AccordionContent must be used inside an AccordionItem.');
    return scope!;
  }

  @override
  bool updateShouldNotify(_AccordionItemScope oldWidget) =>
      value != oldWidget.value || open != oldWidget.open || disabled != oldWidget.disabled;
}

class AccordionItem extends StatelessWidget {
  const AccordionItem({
    super.key,
    required this.value,
    this.disabled = false,
    required this.children,
  });

  final String value;
  final bool disabled;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    final accordionScope = _AccordionScope.of(context);
    final open = accordionScope.type == AccordionType.multiple
        ? (accordionScope.value is List<String> && (accordionScope.value as List<String>).contains(value))
        : accordionScope.value == value;

    return _AccordionItemScope(
      value: value,
      open: open,
      disabled: disabled,
      child: Container(
        decoration: const BoxDecoration(
          border: Border(bottom: BorderSide(color: NemoTokens.colorBorderNeutralMain, width: 1)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: children,
        ),
      ),
    );
  }
}

class AccordionTrigger extends StatelessWidget {
  const AccordionTrigger({super.key, required this.child});

  final Widget child;

  void _handleTap(_AccordionScope accordionScope, _AccordionItemScope itemScope) {
    if (itemScope.disabled) return;

    if (accordionScope.type == AccordionType.multiple) {
      final current = accordionScope.value is List<String>
          ? List<String>.from(accordionScope.value as List<String>)
          : <String>[];
      if (itemScope.open) {
        current.remove(itemScope.value);
      } else {
        current.add(itemScope.value);
      }
      accordionScope.onValueChange?.call(current);
    } else {
      final next =
          itemScope.open ? (accordionScope.collapsible ? '' : itemScope.value) : itemScope.value;
      accordionScope.onValueChange?.call(next);
    }
  }

  @override
  Widget build(BuildContext context) {
    final accordionScope = _AccordionScope.of(context);
    final itemScope = _AccordionItemScope.of(context);

    return Semantics(
      button: true,
      enabled: !itemScope.disabled,
      expanded: itemScope.open,
      child: InkWell(
        onTap: itemScope.disabled ? null : () => _handleTap(accordionScope, itemScope),
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: NemoTokens.space100),
          child: Row(
            children: [
              Expanded(
                child: child is Text
                    ? DefaultTextStyle.merge(
                        style: TextStyle(
                          fontSize: NemoTokens.fontSize3,
                          fontWeight: FontWeight.w500,
                          color: NemoTokens.colorTextNeutralPrimary,
                        ),
                        child: child,
                      )
                    : child,
              ),
              SizedBox(width: NemoTokens.space50),
              AnimatedRotation(
                turns: itemScope.open ? 0.5 : 0,
                duration: const Duration(milliseconds: 200),
                child: Icon(
                  Icons.expand_more,
                  size: NemoTokens.space100,
                  color: NemoTokens.colorTextNeutralTertiary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class AccordionContent extends StatelessWidget {
  const AccordionContent({super.key, required this.child, this.forceMount = false});

  final Widget child;

  /// Keep mounted (laid out at zero size, not painted/hit-testable) instead
  /// of unmounting when closed — mirrors Radix's `forceMount`, opt-in.
  final bool forceMount;

  @override
  Widget build(BuildContext context) {
    final open = _AccordionItemScope.of(context).open;

    return AnimatedSize(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      alignment: Alignment.topCenter,
      child: ClipRect(
        child: open
            ? Padding(padding: EdgeInsets.only(bottom: NemoTokens.space100), child: child)
            : (forceMount ? Offstage(child: child) : const SizedBox(width: double.infinity, height: 0)),
      ),
    );
  }
}

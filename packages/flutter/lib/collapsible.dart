import 'package:flutter/material.dart';

/// Collapsible / CollapsibleTrigger / CollapsibleContent — Flutter port of
/// `packages/web/src/components/collapsible.tsx` (itself just a thin
/// re-export of `@radix-ui/react-collapsible`, no styling of its own).
///
/// No Material widget is named `Collapsible` (Flutter has no direct
/// equivalent under that name), so this keeps the bare name — unlike
/// `NemoBadge`/`NemoCard`, which are prefixed to dodge a real collision.
///
/// 100% controlled, no internal state — `open`/`onOpenChange`, caller owns
/// the value, same convention as the rest of this package. Radix's web
/// version animates height via CSS (a measured custom property). Here,
/// `CollapsibleContent` wraps its conditionally-mounted child in
/// `AnimatedSize` (built-in) + `ClipRect` instead — no manual height
/// measurement needed.
class _CollapsibleScope extends InheritedWidget {
  const _CollapsibleScope({
    required this.open,
    required this.onOpenChange,
    required this.disabled,
    required super.child,
  });

  final bool open;
  final ValueChanged<bool>? onOpenChange;
  final bool disabled;

  static _CollapsibleScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<_CollapsibleScope>();
    assert(scope != null, 'CollapsibleTrigger/CollapsibleContent must be used inside a Collapsible.');
    return scope!;
  }

  @override
  bool updateShouldNotify(_CollapsibleScope oldWidget) =>
      open != oldWidget.open || disabled != oldWidget.disabled;
}

class Collapsible extends StatelessWidget {
  const Collapsible({
    super.key,
    required this.open,
    this.onOpenChange,
    this.disabled = false,
    required this.child,
  });

  final bool open;
  final ValueChanged<bool>? onOpenChange;
  final bool disabled;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return _CollapsibleScope(
      open: open,
      onOpenChange: onOpenChange,
      disabled: disabled,
      child: child,
    );
  }
}

class CollapsibleTrigger extends StatelessWidget {
  const CollapsibleTrigger({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final scope = _CollapsibleScope.of(context);
    return Semantics(
      button: true,
      enabled: !scope.disabled,
      expanded: scope.open,
      child: InkWell(
        onTap: scope.disabled ? null : () => scope.onOpenChange?.call(!scope.open),
        child: child,
      ),
    );
  }
}

class CollapsibleContent extends StatelessWidget {
  const CollapsibleContent({super.key, required this.child, this.forceMount = false});

  final Widget child;

  /// Keep mounted (laid out at zero size, not painted/hit-testable) instead
  /// of unmounting when closed — mirrors Radix's `forceMount`, opt-in.
  final bool forceMount;

  @override
  Widget build(BuildContext context) {
    final open = _CollapsibleScope.of(context).open;

    return AnimatedSize(
      duration: const Duration(milliseconds: 200),
      curve: Curves.easeInOut,
      alignment: Alignment.topCenter,
      child: ClipRect(
        child: open
            ? child
            : (forceMount ? Offstage(child: child) : const SizedBox(width: double.infinity, height: 0)),
      ),
    );
  }
}

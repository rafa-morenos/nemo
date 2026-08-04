import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Nemo Tabs — Flutter port of the web Tabs
/// (`packages/web/src/components/tabs.tsx`, Radix `@radix-ui/react-tabs` +
/// shadcn classes). No Radix equivalent in Flutter, so this is a
/// from-scratch implementation of the same visual/behavioral contract:
/// `TabsList` is a pill (`bg-muted`/`colorSurfaceNeutralSecondary`) holding
/// the triggers; the active `TabsTrigger` gets `bg-background`+`shadow-sm`
/// (`colorSurfaceNeutralPrimary` + a subtle elevation); `TabsContent`
/// renders only the panel matching the active value (no hidden-but-mounted
/// panels — there's no scroll/animation state worth keeping alive across
/// tabs in this scope).
///
/// Naming: no prefix needed. `Tabs`/`TabsList`/`TabsTrigger`/`TabsContent`
/// don't collide with `package:flutter/material.dart` — Material's widgets
/// for this pattern are named `Tab`/`TabBar`/`TabBarView`/`TabController`,
/// all distinct identifiers.
///
/// Fully controlled, same pattern as KanbanCard/ProductCard/AddToCartButton/
/// NavigationBar (see CLAUDE.md): `Tabs` takes `value`/`onValueChanged` and
/// shares them to descendants via an `InheritedWidget` (`_TabsScope`) — the
/// Flutter equivalent of the RN port's React Context — so `TabsTrigger` (a
/// child of `TabsList`) and `TabsContent` (`TabsList`'s sibling) can both
/// read the active value / notify a change without `Tabs` manually
/// threading props through every child. No internal state, no
/// uncontrolled/"initial value" mode (unlike Radix, which supports both).
///
/// Known, intentionally-replicated contrast gap (CLAUDE.md backlog item 9):
/// the inactive trigger's label (`colorTextNeutralTertiary` on
/// `colorSurfaceNeutralSecondary`, i.e. web's `text-muted-foreground` on
/// `bg-muted`) measures ~3.21:1 in light mode — below the WCAG 4.5:1 text
/// minimum. This is a pending design decision on web, not a port bug; fixing
/// it only here would create a cross-platform inconsistency, so it's
/// reproduced as-is.

// Subtle card elevation — the Figma tokens are Material-3 (tonal elevation,
// no box-shadow), matching web's Tailwind `shadow-sm`. Not a token. Same
// values `nemo_card.dart`'s `_nemoCardShadow` uses.
const List<BoxShadow> _nemoShadowSm = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

class _TabsScope extends InheritedWidget {
  const _TabsScope({required this.value, required this.onValueChanged, required super.child});

  final String value;
  final ValueChanged<String> onValueChanged;

  static _TabsScope of(BuildContext context) {
    final scope = context.dependOnInheritedWidgetOfExactType<_TabsScope>();
    assert(scope != null, 'TabsList/TabsTrigger/TabsContent must be used inside a Tabs widget.');
    return scope!;
  }

  @override
  bool updateShouldNotify(_TabsScope oldWidget) =>
      value != oldWidget.value || onValueChanged != oldWidget.onValueChanged;
}

class Tabs extends StatelessWidget {
  const Tabs({super.key, required this.value, required this.onValueChanged, required this.children});

  /// Currently active tab value. Controlled — no "initial value"/internal state.
  final String value;
  final ValueChanged<String> onValueChanged;

  /// Typically a `TabsList` followed by one `TabsContent` per tab.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return _TabsScope(
      value: value,
      onValueChanged: onValueChanged,
      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: children),
    );
  }
}

/// `inline-flex h-10 items-center justify-center rounded-md bg-muted p-1`.
class TabsList extends StatelessWidget {
  const TabsList({super.key, required this.children});

  /// `TabsTrigger`s.
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Semantics(
      container: true,
      child: Container(
        height: 40,
        padding: const EdgeInsets.all(NemoTokens.space25),
        decoration: BoxDecoration(
          color: NemoTokens.colorSurfaceNeutralSecondary,
          borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, mainAxisAlignment: MainAxisAlignment.center, children: children),
      ),
    );
  }
}

/// `inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm
/// font-medium ... data-[state=active]:bg-background
/// data-[state=active]:text-foreground data-[state=active]:shadow-sm`.
///
/// `py-1.5` (6px) has no matching `NemoTokens.space*` step (same non-token
/// literal treatment as `NemoBadge`'s `md` padding) — kept as a literal, not
/// a missed token. The active state's shadow reuses `_nemoShadowSm`, the
/// same framework-level (non-token) convention `NemoCard`/`KanbanCard` use.
class TabsTrigger extends StatelessWidget {
  const TabsTrigger({super.key, required this.value, required this.label, this.enabled = true});

  final String value;
  final String label;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    final scope = _TabsScope.of(context);
    final selected = scope.value == value;

    return Semantics(
      selected: selected,
      button: true,
      enabled: enabled,
      child: Opacity(
        opacity: enabled ? 1 : 0.5,
        child: GestureDetector(
          onTap: enabled ? () => scope.onValueChanged(value) : null,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space75, vertical: 6),
            decoration: BoxDecoration(
              color: selected ? NemoTokens.colorSurfaceNeutralPrimary : Colors.transparent,
              borderRadius: BorderRadius.circular(NemoTokens.radiusSm),
              boxShadow: selected ? _nemoShadowSm : null,
            ),
            child: Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontSize: NemoTokens.fontSize3,
                fontWeight: FontWeight.w500,
                color: selected ? NemoTokens.colorTextNeutralPrimary : NemoTokens.colorTextNeutralTertiary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// `mt-2` — only the panel matching the active value renders.
class TabsContent extends StatelessWidget {
  const TabsContent({super.key, required this.value, required this.child});

  final String value;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final scope = _TabsScope.of(context);
    if (scope.value != value) return const SizedBox.shrink();
    return Padding(padding: const EdgeInsets.only(top: NemoTokens.space50), child: child);
  }
}

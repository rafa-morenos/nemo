/// Nemo Toast — Flutter.
///
/// NOT a port of `packages/web/src/components/sonner.tsx` (which wraps the
/// `sonner` npm package — there is no Flutter equivalent). This is a new
/// implementation, built only from `dart:async` + Flutter's `Overlay`/
/// widgets core, that replicates sonner.tsx's *observable* API and behavior:
///   - [NemoToastDuration] levels (short/medium/long/persistent) — same
///     values as web's `TOAST_DURATION` and RN's `Toast.tsx`.
///   - `NemoToast.success/error/warning/info/loading/message(context, message,
///     {id, duration})`.
///   - string+type dedupe: two calls with the same message and no explicit
///     `id` update the same toast in place instead of stacking a duplicate
///     (same `${type}:${message}` key sonner.tsx derives, mirrored 1:1 in
///     `Toast.tsx`'s RN implementation).
///   - max 3 toasts visible at once (`visibleToasts={3}` on web).
///   - an always-visible manual close button (`Semantics(label: 'Fechar')`).
///   - "soft" semantic colors (surface.semantic.* bg + text.semantic.* fg +
///     border.semantic.* border) for success/warning/critical/info — same
///     triplet `NemoBadge`'s `type=filled` already uses (see
///     `nemo_badge.dart`'s `_bg`/`_fg`). `error` (sonner/web naming) maps to
///     Nemo's `critical` token family, matching the rest of the design
///     system.
///
/// Position: top of the screen, full-width — there is no meaningful "right
/// side" on a phone viewport (see the same note in `Toast.tsx`), so this is
/// a single top-anchored stack, newest toast closest to the top edge.
///
/// Out of scope for this pass (documented, not forgotten): swipe-to-dismiss.
/// Web gets it for free from sonner; a `Dismissible`/drag-based gesture here
/// is a meaningfully bigger chunk of work and was deliberately left for a
/// follow-up — closing is manual (X button) or automatic (duration) only.
///
/// No new pub package: everything below is `dart:async` + `package:flutter/
/// material.dart` (already a dependency for every other widget in this
/// package, e.g. `nemo_navigation_bar.dart`'s use of `Icons.*`).
///
/// Usage — no provider/host widget to mount (unlike RN, Flutter's `Overlay`
/// is already part of `MaterialApp`/`WidgetsApp`'s tree): call
/// `NemoToast.success(context, 'Pedido enviado!')` from anywhere with a
/// `BuildContext` under a `Navigator`/`Overlay`. The first call lazily
/// inserts a single `OverlayEntry` that lives for the app's lifetime and
/// renders the whole stacked queue; later calls just push data into it.
library nemo_toast;

import 'dart:async';
import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

/// Same vocabulary/values as `TOAST_DURATION` in `packages/web/src/components/
/// sonner.tsx` and `TOAST_DURATION` in `packages/react-native/src/Toast.tsx`.
///
/// `persistent` is represented as `null` (not a `Duration`) — the "never
/// auto-dismiss" case can't be a finite `Duration`, and `null` reads clearly
/// as "no timer" at every call site (`show`, the per-card `Timer?`), instead
/// of inventing a sentinel like `Duration.zero` or `Duration(days: 9999)`
/// that would need a comment to explain anyway.
abstract final class NemoToastDuration {
  static const Duration short = Duration(milliseconds: 3000);
  static const Duration medium = Duration(milliseconds: 5000);
  static const Duration long = Duration(milliseconds: 10000);
  static const Duration? persistent = null;
}

/// Max toasts rendered at once — matches web's `visibleToasts={3}` and RN's
/// `MAX_VISIBLE`.
const int _kMaxVisible = 3;

/// Same "framework default, not a token" elevation `kanban_card.dart` /
/// `product_card.dart` already use in this package (Material-3 tokens are
/// tonal elevation, no box-shadow primitive to alias here).
const List<BoxShadow> _nemoShadow = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

enum _NemoToastVariant { success, critical, warning, info, loading, message }

@immutable
class _NemoToastData {
  const _NemoToastData({
    required this.key,
    required this.variant,
    required this.message,
    required this.duration,
  });

  final String key;
  final _NemoToastVariant variant;
  final String message;
  final Duration? duration;
}

/// Internal singleton queue + overlay manager. Not exported — the public
/// surface is the `NemoToast` static API below, same shape as
/// `packages/react-native/src/Toast.tsx`'s `useToast()` but without needing
/// a React-context-equivalent provider (Flutter's `Overlay` already exists
/// on the tree).
class _NemoToastController extends ChangeNotifier {
  _NemoToastController._();
  static final _NemoToastController instance = _NemoToastController._();

  final List<_NemoToastData> _items = [];
  List<_NemoToastData> get items => List.unmodifiable(_items);

  OverlayEntry? _entry;

  String show(
    BuildContext context,
    _NemoToastVariant variant,
    String message, {
    String? id,
    Duration? duration,
  }) {
    _ensureOverlay(context);
    final key = id ?? '${variant.name}:$message';
    final effectiveDuration = duration ?? NemoToastDuration.short;
    final data = _NemoToastData(key: key, variant: variant, message: message, duration: effectiveDuration);

    final idx = _items.indexWhere((t) => t.key == key);
    if (idx != -1) {
      // Dedupe hit — replace in place (same position). `_ToastCard` below
      // is keyed by `key`, so Flutter reuses its State and resets the timer
      // via `didUpdateWidget`, mirroring the RN effect-deps reset.
      _items[idx] = data;
    } else {
      _items.add(data);
      if (_items.length > _kMaxVisible) {
        // Cap at _kMaxVisible: drop the oldest immediately (no exit
        // animation for this overflow case — same documented simplification
        // as Toast.tsx).
        _items.removeAt(0);
      }
    }
    notifyListeners();
    return key;
  }

  void dismiss(String key) {
    _items.removeWhere((t) => t.key == key);
    notifyListeners();
  }

  void _ensureOverlay(BuildContext context) {
    if (_entry != null) return;
    _entry = OverlayEntry(builder: (context) => _NemoToastHostView(controller: this));
    Overlay.of(context, rootOverlay: true).insert(_entry!);
  }
}

/// Renders the current queue, stacked at the top of the screen. Lazily
/// inserted once by `_NemoToastController._ensureOverlay` — nothing to mount
/// by hand (see the file-level doc comment for why this differs from RN's
/// `<NemoToastHost />`).
class _NemoToastHostView extends StatelessWidget {
  const _NemoToastHostView({required this.controller});
  final _NemoToastController controller;

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: (context, _) {
        final items = controller.items;
        if (items.isEmpty) return const SizedBox.shrink();
        final mq = MediaQuery.of(context);
        // Newest toast closest to the top edge (sonner's own stacking
        // direction for a top-anchored position) — same choice as
        // Toast.tsx's `[...toasts].reverse()`.
        final ordered = items.reversed.toList();
        return Positioned(
          top: mq.padding.top + NemoTokens.space50,
          left: NemoTokens.space100,
          right: NemoTokens.space100,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              for (final item in ordered)
                Padding(
                  key: ValueKey(item.key),
                  padding: const EdgeInsets.only(bottom: NemoTokens.space50),
                  child: _ToastCard(data: item),
                ),
            ],
          ),
        );
      },
    );
  }
}

({Color bg, Color fg, Color border}) _colorsFor(_NemoToastVariant variant) {
  switch (variant) {
    case _NemoToastVariant.success:
      return (
        bg: NemoTokens.colorSurfaceSemanticSuccess,
        fg: NemoTokens.colorTextSemanticSuccess,
        border: NemoTokens.colorBorderSemanticSuccess,
      );
    case _NemoToastVariant.warning:
      return (
        bg: NemoTokens.colorSurfaceSemanticWarning,
        fg: NemoTokens.colorTextSemanticWarning,
        border: NemoTokens.colorBorderSemanticWarning,
      );
    case _NemoToastVariant.critical:
      return (
        bg: NemoTokens.colorSurfaceSemanticCritical,
        fg: NemoTokens.colorTextSemanticCritical,
        border: NemoTokens.colorBorderSemanticCritical,
      );
    case _NemoToastVariant.info:
      return (
        bg: NemoTokens.colorSurfaceSemanticInfo,
        fg: NemoTokens.colorTextSemanticInfo,
        border: NemoTokens.colorBorderSemanticInfo,
      );
    case _NemoToastVariant.loading:
      // Not a semantic color (mirrors web/RN: `loading` reuses `muted`, not
      // a success/warning/critical/info tone). `muted` resolves to
      // surface.neutral.secondary / text.neutral.tertiary.
      return (
        bg: NemoTokens.colorSurfaceNeutralSecondary,
        fg: NemoTokens.colorTextNeutralTertiary,
        border: NemoTokens.colorBorderNeutralMain,
      );
    case _NemoToastVariant.message:
      // Plain/default toast — web reads this from --normal-bg/-border/-text,
      // set to surface.neutral.primary / border.neutral.main /
      // text.neutral.primary in styles.css.
      return (
        bg: NemoTokens.colorSurfaceNeutralPrimary,
        fg: NemoTokens.colorTextNeutralPrimary,
        border: NemoTokens.colorBorderNeutralMain,
      );
  }
}

class _ToastCard extends StatefulWidget {
  const _ToastCard({required this.data});
  final _NemoToastData data;

  @override
  State<_ToastCard> createState() => _ToastCardState();
}

class _ToastCardState extends State<_ToastCard> with SingleTickerProviderStateMixin {
  late final AnimationController _anim;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _anim = AnimationController(vsync: this, duration: const Duration(milliseconds: 200));
    _anim.forward();
    _armTimer(widget.data.duration);
  }

  @override
  void didUpdateWidget(covariant _ToastCard oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Same key (Flutter reused this State), but message/type/duration may
    // have changed via dedupe — reset the auto-dismiss timer, matching
    // Toast.tsx's effect on [item.id, item.duration, item.message].
    if (oldWidget.data.duration != widget.data.duration || oldWidget.data.message != widget.data.message) {
      _armTimer(widget.data.duration);
    }
  }

  void _armTimer(Duration? duration) {
    _timer?.cancel();
    if (duration == null) return; // persistent — never auto-dismiss
    _timer = Timer(duration, _handleClose);
  }

  void _handleClose() {
    _timer?.cancel();
    if (!mounted) return;
    _anim.reverse().whenComplete(() {
      if (mounted) _NemoToastController.instance.dismiss(widget.data.key);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    _anim.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colors = _colorsFor(widget.data.variant);
    return FadeTransition(
      opacity: _anim,
      child: SlideTransition(
        position: Tween<Offset>(begin: const Offset(0, -0.15), end: Offset.zero)
            .animate(CurvedAnimation(parent: _anim, curve: Curves.easeOut)),
        child: Material(
          color: Colors.transparent,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: NemoTokens.space75, vertical: NemoTokens.space75),
            decoration: BoxDecoration(
              color: colors.bg,
              border: Border.all(color: colors.border),
              borderRadius: BorderRadius.circular(NemoTokens.radiusMd),
              boxShadow: _nemoShadow,
            ),
            child: Row(
              children: [
                // Simple colored dot per variant (spec explicitly allows
                // this instead of a Lucide-equivalent icon set) — reuses
                // `colors.fg` so it lines up with each variant's semantic
                // text tone, same idea as `NemoBadge`'s `dot`.
                Container(
                  width: 8,
                  height: 8,
                  margin: const EdgeInsets.only(right: NemoTokens.space50),
                  decoration: BoxDecoration(color: colors.fg, shape: BoxShape.circle),
                ),
                Expanded(
                  child: Text(
                    widget.data.message,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(fontSize: NemoTokens.fontSize3, color: colors.fg),
                  ),
                ),
                const SizedBox(width: NemoTokens.space50),
                Semantics(
                  label: 'Fechar',
                  button: true,
                  child: GestureDetector(
                    onTap: _handleClose,
                    child: Container(
                      width: 20,
                      height: 20,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: NemoTokens.colorSurfaceNeutralPrimary,
                        shape: BoxShape.circle,
                        border: Border.all(color: NemoTokens.colorBorderNeutralMain),
                      ),
                      child: Text(
                        '×',
                        style: TextStyle(fontSize: 14, height: 1, color: NemoTokens.colorTextNeutralPrimary),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Public API — same call shape as sonner's `toast` object / `Toast.tsx`'s
/// `useToast().toast`, restricted to the 6 variants sonner.tsx itself wraps
/// with dedupe.
abstract final class NemoToast {
  static String success(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.success, message, id: id, duration: duration);

  // sonner/web calls this variant "error"; Nemo's token vocabulary calls it
  // "critical" everywhere else (NemoBadge, Button) — same rename Toast.tsx
  // (RN) makes.
  static String error(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.critical, message, id: id, duration: duration);

  static String warning(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.warning, message, id: id, duration: duration);

  static String info(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.info, message, id: id, duration: duration);

  static String loading(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.loading, message, id: id, duration: duration);

  static String message(BuildContext context, String message, {String? id, Duration? duration}) =>
      _NemoToastController.instance.show(context, _NemoToastVariant.message, message, id: id, duration: duration);

  static void dismiss(String id) => _NemoToastController.instance.dismiss(id);
}

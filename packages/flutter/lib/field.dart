import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

/// Field — Flutter port of the shadcn/ui Field API (`Field`, `FieldLabel`,
/// `FieldDescription`, `FieldError`, `FieldGroup`, `FieldSet`, `FieldLegend`,
/// `FieldSeparator`, `FieldContent`, `FieldTitle`). Form-field layout
/// primitives, same compound pattern as `product_card.dart`.
enum FieldOrientation {
  vertical,
  horizontal,

  /// Container-query flex-row above `@md` on web — no Flutter equivalent
  /// here (would need a `LayoutBuilder`), falls back to vertical.
  responsive,
}

class Field extends StatelessWidget {
  const Field({super.key, required this.children, this.orientation = FieldOrientation.vertical});

  final List<Widget> children;
  final FieldOrientation orientation;

  @override
  Widget build(BuildContext context) {
    final isHorizontal = orientation == FieldOrientation.horizontal;
    // Web's `data-[invalid=true]:text-destructive` (an attribute selector
    // cascading red text to every descendant) has no Flutter equivalent —
    // pass a color override to `FieldLabel`/`FieldDescription`/`FieldError`
    // directly instead of relying on a cascade.
    // Web's horizontal orientation also makes the label flex-auto
    // (`[&>[data-slot=field-label]]:flex-auto`) via a CSS attribute selector
    // with no Flutter equivalent — every child here just keeps its intrinsic
    // width in a `Row`; wrap a specific child in `Expanded` yourself if you
    // need it to grow.
    return isHorizontal
        ? Row(crossAxisAlignment: CrossAxisAlignment.center, children: _withGaps(children, NemoTokens.space50, horizontal: true))
        : Column(crossAxisAlignment: CrossAxisAlignment.start, children: _withGaps(children, NemoTokens.space50));
  }
}

class FieldGroup extends StatelessWidget {
  const FieldGroup({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      mainAxisSize: MainAxisSize.min,
      children: _withGaps(children, NemoTokens.space150),
    );
  }
}

class FieldSet extends StatelessWidget {
  const FieldSet({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: _withGaps(children, NemoTokens.space75),
    );
  }
}

class FieldLegend extends StatelessWidget {
  const FieldLegend(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: NemoTokens.space75),
      child: Text(
        text,
        style: const TextStyle(
          fontFamily: NemoFonts.sans,
          fontSize: NemoTokens.fontSize3,
          fontWeight: FontWeight.w500,
          color: NemoTokens.colorTextNeutralPrimary,
        ),
      ),
    );
  }
}

class FieldContent extends StatelessWidget {
  const FieldContent({super.key, required this.children});
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        // gap-1.5 (6px) isn't on the space scale — arbitrary Tailwind value on web too.
        children: _withGaps(children, 6),
      ),
    );
  }
}

/// Web's `label` element with `htmlFor` has no Flutter equivalent — pairing
/// with the control is purely visual (stack it next to/above the input
/// yourself). `child` can be plain text or an icon+text `Row` you compose.
class FieldLabel extends StatelessWidget {
  const FieldLabel({super.key, required this.child, this.disabled = false});
  final Widget child;
  final bool disabled;

  @override
  Widget build(BuildContext context) {
    return Opacity(
      opacity: disabled ? 0.5 : 1,
      child: DefaultTextStyle.merge(
        style: const TextStyle(
          fontFamily: NemoFonts.sans,
          fontSize: NemoTokens.fontSize3,
          fontWeight: FontWeight.w500,
          color: NemoTokens.colorTextNeutralPrimary,
        ),
        child: child,
      ),
    );
  }
}

class FieldTitle extends StatelessWidget {
  const FieldTitle({super.key, required this.child});
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return DefaultTextStyle.merge(
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        fontWeight: FontWeight.w500,
        color: NemoTokens.colorTextNeutralPrimary,
      ),
      child: child,
    );
  }
}

class FieldDescription extends StatelessWidget {
  const FieldDescription(this.text, {super.key});
  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        fontFamily: NemoFonts.sans,
        fontSize: NemoTokens.fontSize3,
        color: NemoTokens.colorTextNeutralTertiary,
      ),
    );
  }
}

/// Pass either `errors` (a list of `{message}`-shaped objects, mirroring
/// react-hook-form's `FieldError[]`) or `child` for custom content. Multiple
/// errors render as a bulleted list, same as web.
class FieldError extends StatelessWidget {
  const FieldError({super.key, this.child, this.errors});
  final Widget? child;
  final List<String?>? errors;

  @override
  Widget build(BuildContext context) {
    final messages = (errors ?? []).whereType<String>().toList();
    final Widget? content = child ??
        (messages.isEmpty
            ? null
            : messages.length == 1
                ? Text(messages.first, style: _style)
                : Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [for (final m in messages) Text('• $m', style: _style)],
                  ));

    if (content == null) return const SizedBox.shrink();
    return Semantics(liveRegion: true, child: content);
  }

  static const _style = TextStyle(
    fontFamily: NemoFonts.sans,
    fontSize: NemoTokens.fontSize3,
    color: NemoTokens.colorIconSemanticCritical,
  );
}

/// Divider with an optional centered label — same divider-flanked-pill
/// layout `ProductCardLocation` already uses in `product_card.dart`.
class FieldSeparator extends StatelessWidget {
  const FieldSeparator({super.key, this.child});
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        const Expanded(child: _Line()),
        if (child != null) ...[
          const SizedBox(width: NemoTokens.space50),
          DefaultTextStyle.merge(
            style: const TextStyle(
              fontFamily: NemoFonts.sans,
              fontSize: NemoTokens.fontSize3,
              color: NemoTokens.colorTextNeutralTertiary,
            ),
            child: child!,
          ),
          const SizedBox(width: NemoTokens.space50),
          const Expanded(child: _Line()),
        ],
      ],
    );
  }
}

class _Line extends StatelessWidget {
  const _Line();

  @override
  Widget build(BuildContext context) => Container(height: 1, color: NemoTokens.colorBorderNeutralMain);
}

List<Widget> _withGaps(List<Widget> children, double gap, {bool horizontal = false}) {
  if (children.isEmpty) return children;
  final result = <Widget>[];
  for (var i = 0; i < children.length; i++) {
    if (i > 0) result.add(horizontal ? SizedBox(width: gap) : SizedBox(height: gap));
    result.add(children[i]);
  }
  return result;
}

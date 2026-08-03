import 'package:flutter/material.dart';
import 'nemo_tokens.dart';

// Subtle card elevation — framework default (M3 uses tonal elevation, not
// box-shadow), matching web's Tailwind shadow-sm. Not a token.
const List<BoxShadow> _nemoShadow = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

/// Nemo KanbanCard (Order & Stacking) — Flutter port of the HUBR "Orders Card".
/// Colors/elevation come from the generated [NemoTokens]. Urgency drives the
/// accent + tint; mode `superDaki` uses the brand accent; `stacking` adds the
/// grouped-delivery footer.

enum KanbanVariant { order, stacking }

enum KanbanUrgency { normal, waning, critical }

enum KanbanMode { core, agendado, superDaki }

enum AssignTone { normal, warning, critical, brand, success }

class KanbanTimer {
  const KanbanTimer(this.label, {this.dot = false});
  final String label;
  final bool dot;
}

class KanbanAssignment {
  const KanbanAssignment({required this.label, required this.value, this.tone = AssignTone.normal});
  final String label;
  final String value;
  final AssignTone tone;
}

class KanbanCard extends StatelessWidget {
  const KanbanCard({
    super.key,
    this.variant = KanbanVariant.order,
    this.urgency = KanbanUrgency.normal,
    this.mode = KanbanMode.core,
    required this.orderId,
    this.timers = const [],
    this.scheduled,
    required this.clientName,
    this.clientBadge,
    required this.address,
    required this.neighborhood,
    required this.shopper,
    required this.rider,
    this.groupedLabel = 'Entrega agrupada',
    this.onGrouped,
  });

  final KanbanVariant variant;
  final KanbanUrgency urgency;
  final KanbanMode mode;
  final String orderId;
  final List<KanbanTimer> timers;
  final String? scheduled;
  final String clientName;
  final String? clientBadge;
  final String address;
  final String neighborhood;
  final KanbanAssignment shopper;
  final KanbanAssignment rider;
  final String groupedLabel;
  final VoidCallback? onGrouped;

  Color get _accent {
    switch (urgency) {
      case KanbanUrgency.critical:
        return NemoTokens.colorIconSemanticCritical;
      case KanbanUrgency.waning:
        return NemoTokens.colorIconSemanticWarning;
      case KanbanUrgency.normal:
        return mode == KanbanMode.superDaki
            ? NemoTokens.colorInteractiveAccentPrimaryMain
            : NemoTokens.colorTextNeutralSecondary;
    }
  }

  Color get _bg {
    switch (urgency) {
      case KanbanUrgency.critical:
        return NemoTokens.colorSurfaceSemanticCritical;
      case KanbanUrgency.waning:
        return NemoTokens.colorSurfaceSemanticWarning;
      case KanbanUrgency.normal:
        return mode == KanbanMode.superDaki
            ? NemoTokens.colorSurfaceAccentPrimary
            : NemoTokens.colorSurfaceNeutralPrimary;
    }
  }

  Color _toneColor(AssignTone tone) {
    switch (tone) {
      case AssignTone.warning:
        return NemoTokens.colorIconSemanticWarning;
      case AssignTone.critical:
        return NemoTokens.colorIconSemanticCritical;
      case AssignTone.brand:
        return NemoTokens.colorInteractiveAccentPrimaryMain;
      case AssignTone.success:
        return NemoTokens.colorIconSemanticSuccess;
      case AssignTone.normal:
        return NemoTokens.colorTextNeutralPrimary;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: _bg,
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        border: Border(left: BorderSide(color: _accent, width: NemoTokens.borderWidthLg)),
        boxShadow: _nemoShadow,
      ),
      padding: EdgeInsets.fromLTRB(NemoTokens.space100, NemoTokens.space50, NemoTokens.space50, NemoTokens.space50),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (scheduled != null) ...[
            _Pill(label: scheduled!, icon: Icons.access_time, full: true),
            SizedBox(height: NemoTokens.space50),
          ],
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(orderId, style: _t(NemoTokens.fontSize4, FontWeight.w600)),
              Row(
                children: [
                  for (final tm in timers) ...[
                    _Pill(label: tm.label, dot: tm.dot),
                    SizedBox(width: NemoTokens.space25),
                  ],
                ],
              ),
            ],
          ),
          SizedBox(height: NemoTokens.space50),
          Row(
            children: [
              Expanded(child: Text(clientName, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize4, FontWeight.w600))),
              if (clientBadge != null) ...[SizedBox(width: NemoTokens.space50), _Pill(label: clientBadge!)],
            ],
          ),
          SizedBox(height: NemoTokens.space25),
          Text(address, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize4, FontWeight.w500)),
          Text(neighborhood, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize4, FontWeight.w500, NemoTokens.colorTextNeutralSecondary)),
          SizedBox(height: NemoTokens.space50),
          const _Divider(),
          SizedBox(height: NemoTokens.space50),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _Assignment(a: shopper, color: _toneColor(shopper.tone))),
              SizedBox(width: NemoTokens.space100),
              Expanded(child: _Assignment(a: rider, color: _toneColor(rider.tone))),
            ],
          ),
          if (variant == KanbanVariant.stacking) ...[
            SizedBox(height: NemoTokens.space50),
            const _Divider(),
            SizedBox(height: NemoTokens.space50),
            _GroupedButton(label: groupedLabel, color: _accent, onTap: onGrouped),
          ],
        ],
      ),
    );
  }
}

TextStyle _t(double size, FontWeight weight, [Color? color]) =>
    TextStyle(fontSize: size, fontWeight: weight, height: 1.5, color: color ?? NemoTokens.colorTextNeutralPrimary);

class _Divider extends StatelessWidget {
  const _Divider();
  @override
  Widget build(BuildContext context) =>
      Container(height: 1, color: NemoTokens.colorBorderNeutralMain);
}

class _Pill extends StatelessWidget {
  const _Pill({required this.label, this.dot = false, this.icon, this.full = false});
  final String label;
  final bool dot;
  final IconData? icon;
  final bool full;
  @override
  Widget build(BuildContext context) {
    final content = Row(
      mainAxisSize: full ? MainAxisSize.max : MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (dot) ...[
          Container(width: NemoTokens.space50, height: NemoTokens.space50, decoration: BoxDecoration(color: NemoTokens.colorTextNeutralPrimary, shape: BoxShape.circle)),
          SizedBox(width: NemoTokens.space25),
        ],
        if (icon != null) ...[Icon(icon, size: NemoTokens.space100, color: NemoTokens.colorTextNeutralPrimary), SizedBox(width: NemoTokens.space25)],
        Flexible(child: Text(label, style: _t(NemoTokens.fontSize3, FontWeight.w600))),
      ],
    );
    return Container(
      padding: EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space12),
      decoration: BoxDecoration(color: NemoTokens.colorSurfaceNeutralSecondary, borderRadius: BorderRadius.circular(NemoTokens.radiusPill)),
      child: content,
    );
  }
}

class _Assignment extends StatelessWidget {
  const _Assignment({required this.a, required this.color});
  final KanbanAssignment a;
  final Color color;
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(a.label, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize4, FontWeight.w400)),
        SizedBox(height: NemoTokens.space25),
        Text(a.value, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize4, FontWeight.w600, color)),
      ],
    );
  }
}

class _GroupedButton extends StatelessWidget {
  const _GroupedButton({required this.label, required this.color, this.onTap});
  final String label;
  final Color color;
  final VoidCallback? onTap;
  @override
  Widget build(BuildContext context) {
    // web's grouped button is `rounded-full` — was 60, doesn't match any radius token.
    return Material(
      color: color,
      borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
      child: InkWell(
        borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
        onTap: onTap,
        child: Padding(
          padding: EdgeInsets.all(NemoTokens.space25),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.add_location_alt_outlined, size: NemoTokens.space150, color: NemoTokens.colorTextNeutralInverted),
              SizedBox(width: NemoTokens.space50),
              Text(label, style: TextStyle(fontSize: NemoTokens.fontSize4, fontWeight: FontWeight.w600, color: NemoTokens.colorTextNeutralInverted, height: 1.5)),
            ],
          ),
        ),
      ),
    );
  }
}

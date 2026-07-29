import 'package:flutter/material.dart';
import 'nemo_tokens.dart';
import 'nemo_fonts.dart';

// Subtle card elevation — framework default (not a token), matching web's shadow-sm.
const List<BoxShadow> _nemoShadow = [
  BoxShadow(color: Color(0x140F1219), offset: Offset(0, 1), blurRadius: 2),
];

/// Nemo KanbanTaskCard — Flutter port of the HUBR "Task" card.
enum TaskStatus { done, todo, canceled }

class TaskItem {
  const TaskItem({required this.title, this.description, required this.status, this.checked = false, this.disabled = false});
  final String title;
  final String? description;
  final TaskStatus status;
  final bool checked;
  final bool disabled;
}

class KanbanTaskCard extends StatelessWidget {
  const KanbanTaskCard({
    super.key,
    this.createdLabel = 'Criado há dois dias',
    required this.title,
    this.description,
    this.collapsed = false,
    this.tasksLabel,
    this.timeLeft,
    this.progressDone,
    this.progressTotal,
    this.tasks = const [],
    this.assignees = const [],
    this.updatedLabel,
  });

  final String createdLabel;
  final String title;
  final String? description;
  final bool collapsed;
  final String? tasksLabel;
  final String? timeLeft;
  final int? progressDone;
  final int? progressTotal;
  final List<TaskItem> tasks;
  final List<String> assignees;
  final String? updatedLabel;

  @override
  Widget build(BuildContext context) {
    const segments = 10;
    final filled = (progressTotal != null && progressTotal! > 0)
        ? ((progressDone ?? 0) / progressTotal! * segments).round()
        : 0;

    return Container(
      decoration: BoxDecoration(
        color: NemoTokens.colorSurfaceNeutralPrimary,
        borderRadius: BorderRadius.circular(NemoTokens.radiusLg),
        border: Border(left: BorderSide(color: NemoTokens.colorInteractiveAccentPrimaryMain, width: NemoTokens.borderWidthLg)),
        boxShadow: _nemoShadow,
      ),
      padding: EdgeInsets.fromLTRB(NemoTokens.space100, NemoTokens.space50, NemoTokens.space50, NemoTokens.space50),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(child: Text(createdLabel, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize3, FontWeight.w400))),
              Icon(collapsed ? Icons.keyboard_arrow_down : Icons.keyboard_arrow_up, size: NemoTokens.space100, color: NemoTokens.colorTextNeutralSecondary),
            ],
          ),
          SizedBox(height: NemoTokens.space50),
          // web's title is text-lg/font-medium (20/500) — was 18 here, drifted from web.
          Text(title, style: _t(NemoTokens.fontSize6, FontWeight.w500).copyWith(fontFamily: NemoFonts.heading)),
          if (description != null) ...[SizedBox(height: NemoTokens.space50), Text(description!, style: _t(NemoTokens.fontSize3, FontWeight.w600))],
          if (!collapsed) ...[
            SizedBox(height: NemoTokens.space50),
            _divider(),
            if (tasksLabel != null || progressTotal != null) ...[
              SizedBox(height: NemoTokens.space50),
              Row(
                children: [
                  Expanded(child: Text(tasksLabel ?? '', style: _t(NemoTokens.fontSize3, FontWeight.w600))),
                  // web's row is `gap-4` (16) — was unset, timeLeft had no spacing from the label.
                  if (timeLeft != null) SizedBox(width: NemoTokens.space100),
                  if (timeLeft != null) Text(timeLeft!, style: _t(NemoTokens.fontSize3, FontWeight.w400)),
                ],
              ),
              if (progressTotal != null) ...[
                SizedBox(height: NemoTokens.space50),
                Row(
                  children: [
                    Expanded(
                      // web's track is `rounded-full` — was 200, doesn't match any radius token.
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(NemoTokens.radiusPill),
                        child: Row(
                          children: [
                            for (var i = 0; i < segments; i++)
                              Expanded(child: Container(height: NemoTokens.space25, color: i < filled ? NemoTokens.colorInteractiveAccentPrimaryMain : NemoTokens.colorSurfaceNeutralSecondary)),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(width: NemoTokens.space50),
                    Text('${progressDone ?? 0}/$progressTotal', style: _t(NemoTokens.fontSize2, FontWeight.w400)),
                  ],
                ),
              ],
            ],
            for (final item in tasks) _ChecklistRow(item: item),
            if (assignees.isNotEmpty) ...[
              SizedBox(height: NemoTokens.space50),
              _divider(),
              SizedBox(height: NemoTokens.space50),
              for (final name in assignees)
                Padding(
                  padding: EdgeInsets.only(bottom: NemoTokens.space25),
                  child: Row(children: [
                    Icon(Icons.person_outline, size: NemoTokens.space100, color: NemoTokens.colorTextNeutralPrimary),
                    SizedBox(width: NemoTokens.space25),
                    Text(name, style: _t(NemoTokens.fontSize3, FontWeight.w600)),
                  ]),
                ),
            ],
            if (updatedLabel != null) ...[
              SizedBox(height: NemoTokens.space25),
              Align(alignment: Alignment.centerRight, child: Text(updatedLabel!, style: _t(NemoTokens.fontSize2, FontWeight.w400))),
            ],
          ],
        ],
      ),
    );
  }

  Widget _divider() => Container(height: 1, color: NemoTokens.colorBorderNeutralMain);
}

class _ChecklistRow extends StatelessWidget {
  const _ChecklistRow({required this.item});
  final TaskItem item;

  @override
  Widget build(BuildContext context) {
    final bg = {
      TaskStatus.done: NemoTokens.colorSurfaceAccentPrimary,
      TaskStatus.todo: NemoTokens.colorSurfaceSemanticWarning,
      TaskStatus.canceled: NemoTokens.colorSurfaceNeutralSecondary,
    }[item.status]!;
    final label = {TaskStatus.done: 'Realizada', TaskStatus.todo: 'A fazer', TaskStatus.canceled: 'Cancelada'}[item.status]!;

    // web's checkbox is `rounded-sm border-2` — radius was 6, doesn't match any radius token (sm=4).
    Widget checkbox() {
      if (item.disabled) {
        return Container(width: NemoTokens.space125, height: NemoTokens.space125, decoration: BoxDecoration(color: NemoTokens.colorSurfaceNeutralSecondary, borderRadius: BorderRadius.circular(NemoTokens.radiusSm)));
      }
      if (item.checked) {
        return Container(
          width: NemoTokens.space125, height: NemoTokens.space125,
          decoration: BoxDecoration(color: NemoTokens.colorInteractiveAccentPrimaryMain, borderRadius: BorderRadius.circular(NemoTokens.radiusSm)),
          child: Icon(Icons.check, size: 14, color: NemoTokens.colorInteractiveAccentPrimaryInverted),
        );
      }
      return Container(
        width: NemoTokens.space125, height: NemoTokens.space125,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(NemoTokens.radiusSm),
          border: Border.all(color: NemoTokens.colorBorderNeutralMain, width: NemoTokens.borderWidthMd),
        ),
      );
    }

    return Opacity(
      opacity: item.disabled ? 0.4 : 1,
      child: SizedBox(
        height: NemoTokens.space250,
        child: Row(
          children: [
            Expanded(
              child: Row(children: [
                checkbox(),
                SizedBox(width: NemoTokens.space50),
                Text(item.title, style: _t(NemoTokens.fontSize3, FontWeight.w400)),
                if (item.description != null) ...[
                  SizedBox(width: NemoTokens.space50),
                  Expanded(child: Text(item.description!, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(NemoTokens.fontSize3, FontWeight.w400))),
                ],
              ]),
            ),
            SizedBox(width: NemoTokens.space100),
            Container(
              // web's status pill is `rounded-full` — was 40, doesn't match any radius token.
              padding: EdgeInsets.symmetric(horizontal: NemoTokens.space50, vertical: NemoTokens.space25),
              decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(NemoTokens.radiusPill)),
              child: Text(label, style: _t(NemoTokens.fontSize3, FontWeight.w400, item.status == TaskStatus.canceled ? NemoTokens.colorTextNeutralSecondary : NemoTokens.colorTextNeutralPrimary)),
            ),
          ],
        ),
      ),
    );
  }
}

TextStyle _t(double size, FontWeight weight, [Color? color]) =>
    TextStyle(fontSize: size, fontWeight: weight, height: 1.4, color: color ?? NemoTokens.colorTextNeutralPrimary);

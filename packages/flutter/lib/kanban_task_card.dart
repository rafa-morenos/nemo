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
        border: Border(left: BorderSide(color: NemoTokens.colorInteractiveAccentPrimaryMain, width: NemoTokens.borderWidthMd * 2)),
        boxShadow: _nemoShadow,
      ),
      padding: const EdgeInsets.fromLTRB(16, 8, 8, 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(child: Text(createdLabel, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(14, FontWeight.w400))),
              Icon(collapsed ? Icons.keyboard_arrow_down : Icons.keyboard_arrow_up, size: 16, color: NemoTokens.colorTextNeutralSecondary),
            ],
          ),
          const SizedBox(height: 8),
          Text(title, style: _t(18, FontWeight.w500).copyWith(fontFamily: NemoFonts.heading)),
          if (description != null) ...[const SizedBox(height: 8), Text(description!, style: _t(14, FontWeight.w600))],
          if (!collapsed) ...[
            const SizedBox(height: 8),
            _divider(),
            if (tasksLabel != null || progressTotal != null) ...[
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(child: Text(tasksLabel ?? '', style: _t(14, FontWeight.w600))),
                  if (timeLeft != null) Text(timeLeft!, style: _t(14, FontWeight.w400)),
                ],
              ),
              if (progressTotal != null) ...[
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(200),
                        child: Row(
                          children: [
                            for (var i = 0; i < segments; i++)
                              Expanded(child: Container(height: 4, color: i < filled ? NemoTokens.colorInteractiveAccentPrimaryMain : NemoTokens.colorSurfaceNeutralSecondary)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text('${progressDone ?? 0}/$progressTotal', style: _t(12, FontWeight.w400)),
                  ],
                ),
              ],
            ],
            for (final item in tasks) _ChecklistRow(item: item),
            if (assignees.isNotEmpty) ...[
              const SizedBox(height: 8),
              _divider(),
              const SizedBox(height: 8),
              for (final name in assignees)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(children: [
                    Icon(Icons.person_outline, size: 16, color: NemoTokens.colorTextNeutralPrimary),
                    const SizedBox(width: 4),
                    Text(name, style: _t(14, FontWeight.w600)),
                  ]),
                ),
            ],
            if (updatedLabel != null) ...[
              const SizedBox(height: 4),
              Align(alignment: Alignment.centerRight, child: Text(updatedLabel!, style: _t(12, FontWeight.w400))),
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

    Widget checkbox() {
      if (item.disabled) {
        return Container(width: 20, height: 20, decoration: BoxDecoration(color: NemoTokens.colorSurfaceNeutralSecondary, borderRadius: BorderRadius.circular(6)));
      }
      if (item.checked) {
        return Container(
          width: 20, height: 20,
          decoration: BoxDecoration(color: NemoTokens.colorInteractiveAccentPrimaryMain, borderRadius: BorderRadius.circular(6)),
          child: Icon(Icons.check, size: 14, color: NemoTokens.colorInteractiveAccentPrimaryInverted),
        );
      }
      return Container(
        width: 20, height: 20,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(6),
          border: Border.all(color: NemoTokens.colorBorderNeutralMain, width: 2),
        ),
      );
    }

    return Opacity(
      opacity: item.disabled ? 0.4 : 1,
      child: SizedBox(
        height: 40,
        child: Row(
          children: [
            Expanded(
              child: Row(children: [
                checkbox(),
                const SizedBox(width: 8),
                Text(item.title, style: _t(14, FontWeight.w400)),
                if (item.description != null) ...[
                  const SizedBox(width: 8),
                  Expanded(child: Text(item.description!, maxLines: 1, overflow: TextOverflow.ellipsis, style: _t(14, FontWeight.w400))),
                ],
              ]),
            ),
            const SizedBox(width: 16),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(40)),
              child: Text(label, style: _t(14, FontWeight.w400, item.status == TaskStatus.canceled ? NemoTokens.colorTextNeutralSecondary : NemoTokens.colorTextNeutralPrimary)),
            ),
          ],
        ),
      ),
    );
  }
}

TextStyle _t(double size, FontWeight weight, [Color? color]) =>
    TextStyle(fontSize: size, fontWeight: weight, height: 1.4, color: color ?? NemoTokens.colorTextNeutralPrimary);

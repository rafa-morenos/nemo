import 'package:flutter/material.dart';
import 'package:nemo_flutter/kanban_card.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookUseCase kanbanCardPlaygroundUseCase() => WidgetbookUseCase(
  name: 'Playground',
  builder: (context) => SizedBox(
    width: 400,
    child: KanbanCard(
      variant: context.knobs.object.dropdown<KanbanVariant>(
        label: 'Variant',
        initialOption: KanbanVariant.order,
        options: KanbanVariant.values,
        labelBuilder: (e) => e.name,
      ),
      urgency: context.knobs.object.dropdown<KanbanUrgency>(
        label: 'Urgency',
        initialOption: KanbanUrgency.normal,
        options: KanbanUrgency.values,
        labelBuilder: (e) => e.name,
      ),
      mode: context.knobs.object.dropdown<KanbanMode>(
        label: 'Mode',
        initialOption: KanbanMode.core,
        options: KanbanMode.values,
        labelBuilder: (e) => e.name,
      ),
      orderId: context.knobs.string(
        label: 'Order ID',
        initialValue: '8b81223456T',
      ),
      scheduled: context.knobs.boolean(label: 'Scheduled', initialValue: false)
          ? context.knobs.string(
              label: 'Scheduled label',
              initialValue: 'Agendado • 15:00 a 15:30',
            )
          : null,
      timers: [
        KanbanTimer(
          context.knobs.string(label: 'Timer 1', initialValue: '2:57'),
          dot: true,
        ),
        KanbanTimer(
          context.knobs.string(
            label: 'Timer 2',
            initialValue: 'ETA 45 • 00:02',
          ),
        ),
      ],
      clientName: context.knobs.string(
        label: 'Client name',
        initialValue: 'Georgia P. S.',
      ),
      clientBadge:
          context.knobs.boolean(label: 'Client badge', initialValue: true)
          ? context.knobs.string(
              label: 'Client badge label',
              initialValue: '1º Pedido',
            )
          : null,
      address: context.knobs.string(
        label: 'Address',
        initialValue: 'Tv Canto das Duas Flores, 3 AP 02',
      ),
      neighborhood: context.knobs.string(
        label: 'Neighborhood',
        initialValue: 'Jardim Nova Vida',
      ),
      shopper: KanbanAssignment(
        label: context.knobs.string(
          label: 'Shopper label',
          initialValue: 'Shopper',
        ),
        value: context.knobs.string(
          label: 'Shopper value',
          initialValue: 'Ulisses Camilo',
        ),
      ),
      rider: KanbanAssignment(
        label: context.knobs.string(
          label: 'Rider label',
          initialValue: 'Rider: Modo',
        ),
        value: context.knobs.string(
          label: 'Rider value',
          initialValue: 'Ofertando',
        ),
        tone: context.knobs.object.dropdown<AssignTone>(
          label: 'Rider tone',
          initialOption: AssignTone.normal,
          options: AssignTone.values,
          labelBuilder: (e) => e.name,
        ),
      ),
      groupedLabel: context.knobs.string(
        label: 'Grouped label',
        initialValue: 'Entrega agrupada',
      ),
    ),
  ),
);

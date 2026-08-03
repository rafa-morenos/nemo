import 'package:flutter/material.dart';
import 'package:nemo_flutter/kanban_card.dart';
import 'package:widgetbook/widgetbook.dart';

const _shopper = KanbanAssignment(label: 'Shopper', value: 'Ulisses Camilo');
const _rider = KanbanAssignment(label: 'Rider: Modo', value: 'Ofertando');

Widget _fixedWidth(Widget child) => SizedBox(width: 400, child: child);

WidgetbookUseCase kanbanCardOrderUseCase() => WidgetbookUseCase(
  name: 'Order',
  builder: (context) => _fixedWidth(
    const KanbanCard(
      variant: KanbanVariant.order,
      orderId: '8b81223456T',
      timers: [KanbanTimer('2:57', dot: true), KanbanTimer('ETA 45 • 00:02')],
      clientName: "Georgia P. S.",
      clientBadge: '1º Pedido',
      address: 'Tv Canto das Duas Flores, 3 AP 02',
      neighborhood: 'Jardim Nova Vida',
      shopper: _shopper,
      rider: _rider,
    ),
  ),
);

WidgetbookUseCase kanbanCardOrderScheduledUseCase() => WidgetbookUseCase(
  name: 'Order scheduled',
  builder: (context) => _fixedWidth(
    const KanbanCard(
      variant: KanbanVariant.order,
      scheduled: 'Agendado • 15:00 a 15:30',
      orderId: '8b81223456T',
      timers: [KanbanTimer('2:57', dot: true)],
      clientName: "Georgia P. S.",
      clientBadge: '1º Pedido',
      address: 'Tv Canto das Duas Flores, 3 AP 02',
      neighborhood: 'Jardim Nova Vida',
      shopper: _shopper,
      rider: _rider,
    ),
  ),
);

WidgetbookUseCase kanbanCardStackingUseCase(
  String name, {
  required KanbanUrgency urgency,
  required AssignTone riderTone,
}) => WidgetbookUseCase(
  name: name,
  builder: (context) => _fixedWidth(
    KanbanCard(
      variant: KanbanVariant.stacking,
      urgency: urgency,
      orderId: '8b812',
      timers: const [
        KanbanTimer('Tag label', dot: true),
        KanbanTimer('Tag label'),
      ],
      clientName: "Client's abbreviated full name",
      clientBadge: 'Tag label',
      address: 'Address',
      neighborhood: 'Neighborhood',
      shopper: const KanbanAssignment(label: 'Shopper', value: 'Status'),
      rider: KanbanAssignment(
        label: 'Rider: Auto',
        value: 'Ofertando',
        tone: riderTone,
      ),
    ),
  ),
);

WidgetbookUseCase kanbanCardStackingAgendadoUseCase() => WidgetbookUseCase(
  name: 'Stacking agendado',
  builder: (context) => _fixedWidth(
    const KanbanCard(
      variant: KanbanVariant.stacking,
      mode: KanbanMode.agendado,
      scheduled: 'Agendado • 15:00 a 15:30',
      orderId: '8b812',
      timers: [KanbanTimer('Tag label', dot: true), KanbanTimer('Tag label')],
      clientName: "Client's abbreviated full name",
      clientBadge: 'Tag label',
      address: 'Address',
      neighborhood: 'Neighborhood',
      shopper: _shopper,
      rider: _rider,
    ),
  ),
);

WidgetbookUseCase kanbanCardStackingSuperDakiUseCase() => WidgetbookUseCase(
  name: 'Stacking super daki',
  builder: (context) => _fixedWidth(
    const KanbanCard(
      variant: KanbanVariant.stacking,
      mode: KanbanMode.superDaki,
      orderId: '8b812',
      timers: [KanbanTimer('SuperDaki', dot: true), KanbanTimer('3:00')],
      clientName: "Client's abbreviated full name",
      clientBadge: 'Tag label',
      address: 'Address',
      neighborhood: 'Neighborhood',
      shopper: _shopper,
      rider: _rider,
    ),
  ),
);

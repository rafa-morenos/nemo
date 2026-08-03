import 'package:flutter/material.dart';
import 'package:nemo_flutter/kanban_card.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

Story kanbanCardPlaygroundStory(String name) => Story(
  name: name,
  builder: (context) => SizedBox(
    width: 400,
    child: KanbanCard(
      variant: context.knobs.options(
        label: 'Variant',
        initial: KanbanVariant.order,
        options: KanbanVariant.values
            .map((e) => Option(label: e.name, value: e))
            .toList(),
      ),
      urgency: context.knobs.options(
        label: 'Urgency',
        initial: KanbanUrgency.normal,
        options: KanbanUrgency.values
            .map((e) => Option(label: e.name, value: e))
            .toList(),
      ),
      mode: context.knobs.options(
        label: 'Mode',
        initial: KanbanMode.core,
        options: KanbanMode.values
            .map((e) => Option(label: e.name, value: e))
            .toList(),
      ),
      orderId: context.knobs.text(label: 'Order ID', initial: '8b81223456T'),
      scheduled: context.knobs.boolean(label: 'Scheduled', initial: false)
          ? context.knobs.text(
              label: 'Scheduled label',
              initial: 'Agendado • 15:00 a 15:30',
            )
          : null,
      timers: [
        KanbanTimer(
          context.knobs.text(label: 'Timer 1', initial: '2:57'),
          dot: true,
        ),
        KanbanTimer(
          context.knobs.text(label: 'Timer 2', initial: 'ETA 45 • 00:02'),
        ),
      ],
      clientName: context.knobs.text(
        label: 'Client name',
        initial: 'Georgia P. S.',
      ),
      clientBadge: context.knobs.boolean(label: 'Client badge', initial: true)
          ? context.knobs.text(
              label: 'Client badge label',
              initial: '1º Pedido',
            )
          : null,
      address: context.knobs.text(
        label: 'Address',
        initial: 'Tv Canto das Duas Flores, 3 AP 02',
      ),
      neighborhood: context.knobs.text(
        label: 'Neighborhood',
        initial: 'Jardim Nova Vida',
      ),
      shopper: KanbanAssignment(
        label: context.knobs.text(label: 'Shopper label', initial: 'Shopper'),
        value: context.knobs.text(
          label: 'Shopper value',
          initial: 'Ulisses Camilo',
        ),
      ),
      rider: KanbanAssignment(
        label: context.knobs.text(label: 'Rider label', initial: 'Rider: Modo'),
        value: context.knobs.text(label: 'Rider value', initial: 'Ofertando'),
        tone: context.knobs.options(
          label: 'Rider tone',
          initial: AssignTone.normal,
          options: AssignTone.values
              .map((e) => Option(label: e.name, value: e))
              .toList(),
        ),
      ),
      groupedLabel: context.knobs.text(
        label: 'Grouped label',
        initial: 'Entrega agrupada',
      ),
    ),
  ),
);

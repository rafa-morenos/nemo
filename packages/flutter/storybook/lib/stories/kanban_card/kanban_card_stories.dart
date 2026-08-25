import 'package:nemo_flutter/kanban_card.dart';
import 'package:widgetbook/widgetbook.dart';

import 'kanban_card_examples_story.dart';
import 'kanban_card_playground_story.dart';

List<WidgetbookUseCase> get kanbanCardUseCases => [
  kanbanCardPlaygroundUseCase(),
  kanbanCardOrderUseCase(),
  kanbanCardOrderScheduledUseCase(),
  kanbanCardStackingUseCase(
    'Stacking normal',
    urgency: KanbanUrgency.normal,
    riderTone: AssignTone.normal,
  ),
  kanbanCardStackingUseCase(
    'Stacking waning',
    urgency: KanbanUrgency.waning,
    riderTone: AssignTone.warning,
  ),
  kanbanCardStackingUseCase(
    'Stacking critical',
    urgency: KanbanUrgency.critical,
    riderTone: AssignTone.danger,
  ),
  kanbanCardStackingAgendadoUseCase(),
  kanbanCardStackingSuperDakiUseCase(),
];

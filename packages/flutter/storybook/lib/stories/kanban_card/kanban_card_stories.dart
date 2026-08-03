import 'package:nemo_flutter/kanban_card.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

import 'kanban_card_examples_story.dart';
import 'kanban_card_playground_story.dart';

class KanbanCardStories {
  static const _prefix = 'KanbanCard';
  static const playgroundStoryName = '$_prefix/Playground';

  List<Story> get stories => [
    kanbanCardPlaygroundStory(playgroundStoryName),
    kanbanCardOrderStory('$_prefix/Order'),
    kanbanCardOrderScheduledStory('$_prefix/Order scheduled'),
    kanbanCardStackingStory(
      '$_prefix/Stacking normal',
      urgency: KanbanUrgency.normal,
      riderTone: AssignTone.normal,
    ),
    kanbanCardStackingStory(
      '$_prefix/Stacking waning',
      urgency: KanbanUrgency.waning,
      riderTone: AssignTone.warning,
    ),
    kanbanCardStackingStory(
      '$_prefix/Stacking critical',
      urgency: KanbanUrgency.critical,
      riderTone: AssignTone.danger,
    ),
    kanbanCardStackingAgendadoStory('$_prefix/Stacking agendado'),
    kanbanCardStackingSuperDakiStory('$_prefix/Stacking super daki'),
  ];
}

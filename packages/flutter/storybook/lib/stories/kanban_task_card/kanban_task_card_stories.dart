import 'package:storybook_flutter/storybook_flutter.dart';

import 'kanban_task_card_examples_story.dart';

class KanbanTaskCardStories {
  static const _prefix = 'KanbanTaskCard';

  List<Story> get stories => [
    kanbanTaskCardStory('$_prefix/Default'),
    kanbanTaskCardCollapsedStory('$_prefix/Collapsed'),
  ];
}

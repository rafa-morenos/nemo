import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nemo_storybook/stories/badge/badge_stories.dart';
import 'package:nemo_storybook/stories/kanban_card/kanban_card_stories.dart';
import 'package:nemo_storybook/stories/kanban_task_card/kanban_task_card_stories.dart';
import 'package:nemo_storybook/stories/product_card/product_card_stories.dart';
import 'package:nemo_storybook/wrapper_builder/nemo_wrapper_builder.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

void main() {
  final allStories = [
    ...BadgeStories().stories,
    ...KanbanCardStories().stories,
    ...KanbanTaskCardStories().stories,
    ...ProductCardStories().stories,
  ];

  for (final story in allStories) {
    testWidgets('story "${story.name}" renders without errors', (tester) async {
      tester.view.physicalSize = const Size(1400, 1000);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        Storybook(
          plugins: initializePlugins(enableDeviceFrame: false),
          stories: [story],
          initialStory: story.name,
          wrapperBuilder: nemoWrapperBuilder,
        ),
      );
      await tester.pumpAndSettle();
      expect(tester.takeException(), isNull);
    });
  }
}

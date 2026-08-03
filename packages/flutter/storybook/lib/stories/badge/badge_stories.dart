import 'package:storybook_flutter/storybook_flutter.dart';

import 'badge_examples_story.dart';
import 'badge_matrix_story.dart';
import 'badge_playground_story.dart';

class BadgeStories {
  static const _prefix = 'Badge';
  static const playgroundStoryName = '$_prefix/Playground';

  List<Story> get stories => [
    badgePlaygroundStory(playgroundStoryName),
    badgeMatrixStory('$_prefix/Matrix'),
    badgeWithoutIconStory('$_prefix/Without icon'),
    badgeDiscountTagStory('$_prefix/Discount tag'),
    badgeCounterStory('$_prefix/Counter'),
    badgeFilterChipStory('$_prefix/Filter chip'),
  ];
}

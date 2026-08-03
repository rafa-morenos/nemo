import 'package:widgetbook/widgetbook.dart';

import 'badge_examples_story.dart';
import 'badge_matrix_story.dart';
import 'badge_playground_story.dart';

List<WidgetbookUseCase> get badgeUseCases => [
  badgePlaygroundUseCase(),
  badgeMatrixUseCase(),
  badgeWithoutIconUseCase(),
  badgeDiscountTagUseCase(),
  badgeCounterUseCase(),
  badgeFilterChipUseCase(),
];

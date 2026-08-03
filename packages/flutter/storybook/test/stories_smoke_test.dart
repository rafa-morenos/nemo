import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nemo_storybook/stories/badge/badge_stories.dart';
import 'package:nemo_storybook/stories/kanban_card/kanban_card_stories.dart';
import 'package:nemo_storybook/stories/kanban_task_card/kanban_task_card_stories.dart';
import 'package:nemo_storybook/stories/product_card/product_card_stories.dart';
import 'package:nemo_storybook/wrapper_builder/nemo_wrapper_builder.dart';
import 'package:widgetbook/widgetbook.dart';

// Espelha `WidgetbookNode.path` (lowercase, espaço vira hífen) — usado só pra
// montar a `initialRoute` de cada teste isolado; não dá pra ler `.path` de
// verdade antes de montar a árvore real (o parent só é setado dentro de
// `_WidgetbookState.initState`, que roda depois do `pumpWidget`).
String _slug(String name) => name.toLowerCase().replaceAll(' ', '-');

void main() {
  final components = {
    'Badge': badgeUseCases,
    'KanbanCard': kanbanCardUseCases,
    'KanbanTaskCard': kanbanTaskCardUseCases,
    'ProductCard': productCardUseCases,
  };

  for (final entry in components.entries) {
    for (final useCase in entry.value) {
      testWidgets(
        'use case "${entry.key}/${useCase.name}" renders without errors',
        (tester) async {
          tester.view.physicalSize = const Size(1400, 1000);
          tester.view.devicePixelRatio = 1.0;
          addTearDown(tester.view.resetPhysicalSize);
          addTearDown(tester.view.resetDevicePixelRatio);

          await tester.pumpWidget(
            Widgetbook.material(
              appBuilder: nemoAppBuilder,
              initialRoute: '/${_slug(entry.key)}/${_slug(useCase.name)}',
              directories: [
                WidgetbookComponent(name: entry.key, useCases: [useCase]),
              ],
            ),
          );
          await tester.pumpAndSettle();
          expect(tester.takeException(), isNull);
        },
      );
    }
  }
}

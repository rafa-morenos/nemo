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
// `_WidgetbookState.initState`, que roda depois do `pumpWidget`). A rota do
// Widgetbook não usa segmentos de path — o node selecionado vem do query
// param `path` (`AppRouteConfig.path => uri.queryParameters['path']`, usado
// como chave em `WidgetbookRoot.table`). Uma rota que não bate com nenhum
// node não dá erro nenhum — só mostra a `DefaultHomePage` silenciosamente
// (por isso o teste também confere que essa página de boas-vindas NÃO
// apareceu, pra não passar de mentirinha sem nunca chamar o builder de
// verdade).
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

          final path = '${_slug(entry.key)}/${_slug(useCase.name)}';
          await tester.pumpWidget(
            Widgetbook.material(
              appBuilder: nemoAppBuilder,
              initialRoute: '/?path=$path',
              directories: [
                WidgetbookComponent(name: entry.key, useCases: [useCase]),
              ],
            ),
          );
          await tester.pumpAndSettle();
          expect(tester.takeException(), isNull);
          expect(
            find.text('Welcome to Widgetbook'),
            findsNothing,
            reason:
                'a rota "$path" não bateu com nenhum node — caiu na tela de '
                'boas-vindas em vez de renderizar o use case de verdade',
          );
        },
      );
    }
  }
}

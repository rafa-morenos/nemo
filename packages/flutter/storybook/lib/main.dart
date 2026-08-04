import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';

import 'stories/badge/badge_stories.dart';
import 'stories/kanban_card/kanban_card_stories.dart';
import 'stories/kanban_task_card/kanban_task_card_stories.dart';
import 'stories/product_card/product_card_stories.dart';
import 'wrapper_builder/nemo_wrapper_builder.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Widgetbook.material(
      // Abre direto no primeiro use case em vez da tela de boas-vindas do
      // Widgetbook. A rota do Widgetbook não usa segmentos de path (`/x/y`)
      // — o node selecionado vem do query param `path` (`AppRouteConfig.path
      // => uri.queryParameters['path']`, usado como chave em
      // `WidgetbookRoot.table`); o slug em si espelha `WidgetbookNode.path`
      // (lowercase, espaço vira hífen).
      initialRoute: '/?path=badge/playground',
      // `appBuilder` troca o `MaterialApp` genérico do Widgetbook por um com
      // o fundo neutro secundário e a fonte Inter default do Nemo.
      appBuilder: nemoAppBuilder,
      // Sem ViewportAddon/DeviceFrameAddon: os componentes do Nemo
      // (KanbanCard/ProductCard) são bem mais largos que um preview de
      // telefone padrão — igual ao Storybook web, que não simula moldura de
      // dispositivo nenhuma. ZoomAddon deixa dar zoom out pra ver o card
      // inteiro quando a tela for menor que ele.
      addons: [ZoomAddon(), AlignmentAddon()],
      directories: [
        WidgetbookComponent(name: 'Badge', useCases: badgeUseCases),
        WidgetbookComponent(name: 'KanbanCard', useCases: kanbanCardUseCases),
        WidgetbookComponent(
          name: 'KanbanTaskCard',
          useCases: kanbanTaskCardUseCases,
        ),
        WidgetbookComponent(name: 'ProductCard', useCases: productCardUseCases),
      ],
    );
  }
}

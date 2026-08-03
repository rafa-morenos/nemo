import 'package:flutter/material.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

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
    // `nemoWrapperBuilder` só embrulha o conteúdo de cada story (o
    // `MaterialApp` dele fica bem no meio da árvore, dentro do painel da
    // story atual) — o "chrome" do Storybook em volta (barra de ícones,
    // popups do Contents/Knobs, painel do Logging) fica FORA desse
    // `MaterialApp` e não tem nenhuma `Directionality` ambiente. O plugin de
    // Logging (ícone "”" na barra) usa uma `ListView` embutida direto
    // nesse chroma — sem isso aqui, abrir o painel de log quebra com "No
    // Directionality widget found".
    return const Directionality(
      textDirection: TextDirection.ltr,
      child: _NemoStorybook(),
    );
  }
}

class _NemoStorybook extends StatelessWidget {
  const _NemoStorybook();

  @override
  Widget build(BuildContext context) {
    return Storybook(
      // Sem device frame: os componentes do Nemo (KanbanCard/ProductCard)
      // são bem mais largos que um preview de telefone padrão — igual ao
      // Storybook web, que não simula moldura de dispositivo nenhuma.
      plugins: initializePlugins(enableDeviceFrame: false),
      // "expanded" desenha as sidebars de Contents E Knobs (250dp cada,
      // fixas) lado a lado — em qualquer emulador de celular (~360-430dp)
      // isso soma mais que a largura da tela, sobra 0/negativo pro conteúdo
      // real e some junto o próprio ícone que alternaria de volta (fica
      // sem saída, só resolve com hot-restart). "compact" nunca cai nessa
      // armadilha, então fixamos aqui em vez de deixar em `Layout.auto`.
      initialLayout: Layout.compact,
      stories: [
        ...BadgeStories().stories,
        ...KanbanCardStories().stories,
        ...KanbanTaskCardStories().stories,
        ...ProductCardStories().stories,
      ],
      initialStory: BadgeStories.playgroundStoryName,
      wrapperBuilder: nemoWrapperBuilder,
    );
  }
}

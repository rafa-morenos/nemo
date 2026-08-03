import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

enum Layout { compact, expanded, auto }

enum EffectiveLayout { compact, expanded }

class LayoutProvider extends ValueNotifier<Layout> {
  LayoutProvider(super._value);
}

class LayoutPlugin extends Plugin {
  LayoutPlugin(Layout initialLayout)
      : super(
          icon: _buildIcon,
          wrapperBuilder: (context, child) =>
              _buildWrapper(context, child, initialLayout),
          onPressed: _onPressed,
        );
}

// Nemo: sem ícone (o toggle padrão do pacote fica escondido) — em
// "expanded" o Contents e o Knobs viram sidebars permanentes de 250dp cada
// SEM nenhum jeito de fechar (o ícone que abriria/fecharia cada um só existe
// em "compact"); em qualquer largura de celular real (~360-430dp) 250+250
// já estoura a tela sozinho, o conteúdo do meio (inclusive a barra de
// ícones que resolveria isso) fica com largura zero e o app trava sem
// nenhum elemento tocável pra sair — só um hot-restart resolve. Como este
// storybook só roda em simuladores/emuladores de celular, nunca queremos
// "expanded"; escondendo o ícone o `LayoutProvider` nunca sai do
// `initialLayout` (`Layout.compact`, fixado em main.dart) e a armadilha
// deixa de existir.
Widget? _buildIcon(BuildContext context) => null;

Widget _buildWrapper(
  BuildContext _,
  Widget? child,
  Layout initialLayout,
) =>
    ChangeNotifierProvider(
      create: (context) => LayoutProvider(initialLayout),
      child: _EffectiveLayoutBuilder(child: child),
    );

void _onPressed(BuildContext context) {
  final layout = context.read<LayoutProvider>();
  final position = Layout.values.indexOf(layout.value);
  layout.value = Layout.values[(position + 1) % Layout.values.length];
}

class _EffectiveLayoutBuilder extends StatefulWidget {
  const _EffectiveLayoutBuilder({required this.child});

  final Widget? child;

  @override
  State<_EffectiveLayoutBuilder> createState() =>
      _EffectiveLayoutBuilderState();
}

class _EffectiveLayoutBuilderState extends State<_EffectiveLayoutBuilder> {
  late EffectiveLayout _layout;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final width = MediaQuery.sizeOf(context).width;
    _layout = switch (context.watch<LayoutProvider>().value) {
      Layout.auto =>
        width < 800 ? EffectiveLayout.compact : EffectiveLayout.expanded,
      Layout.compact => EffectiveLayout.compact,
      Layout.expanded => EffectiveLayout.expanded,
    };
  }

  @override
  Widget build(BuildContext context) => Provider.value(
        value: _layout,
        child: widget.child,
      );
}

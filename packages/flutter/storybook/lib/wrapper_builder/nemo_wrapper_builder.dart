import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_fonts.dart';
import 'package:nemo_flutter/nemo_tokens.dart';

/// Envolve cada story num `MaterialApp`/`Scaffold` com o fundo neutro
/// secundário do Nemo (mesmo contraste que o Storybook web usa pro canvas) e
/// `Inter` como fonte padrão — só o título do `KanbanTaskCard` pina
/// `Owners Text` explicitamente, o resto do texto usa a fonte default do tema.
Widget nemoWrapperBuilder(BuildContext context, Widget? child) => MaterialApp(
  debugShowCheckedModeBanner: false,
  theme: ThemeData(
    fontFamily: NemoFonts.sans,
    scaffoldBackgroundColor: NemoTokens.colorSurfaceNeutralSecondary,
  ),
  home: Scaffold(
    body: Center(
      child: Padding(padding: const EdgeInsets.all(24), child: child),
    ),
  ),
);

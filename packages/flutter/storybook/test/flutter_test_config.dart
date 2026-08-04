import 'dart:async';
import 'dart:io';

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';

// `flutter test` renders text with the "Ahem" placeholder font unless the
// real families are registered manually — Ahem's fixed, oversized glyphs
// make components overflow in tests even when they fit fine with the real
// (much narrower) Nemo/Inter fonts in the actual app.
Future<void> _loadFont(String family, String path) async {
  final bytes = await File(path).readAsBytes();
  final loader = FontLoader(family)
    ..addFont(Future.value(ByteData.view(bytes.buffer)));
  await loader.load();
}

Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  TestWidgetsFlutterBinding.ensureInitialized();
  await _loadFont('Owners Narrow', 'fonts/OwnersNarrow-Black.ttf');
  await _loadFont('Owners Text', 'fonts/OwnersText-Regular.ttf');
  await _loadFont('Owners Text', 'fonts/OwnersText-Medium.ttf');
  await _loadFont('Inter', 'fonts/Inter-Variable.ttf');
  return testMain();
}

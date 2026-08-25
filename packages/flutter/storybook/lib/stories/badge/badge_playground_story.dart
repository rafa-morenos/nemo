import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_badge.dart';
import 'package:widgetbook/widgetbook.dart';

WidgetbookUseCase badgePlaygroundUseCase() => WidgetbookUseCase(
  name: 'Playground',
  builder: (context) => NemoBadge(
    label: context.knobs.string(
      label: 'Label',
      description: 'Conteúdo em texto do badge',
      initialValue: 'Tag label',
    ),
    color: context.knobs.object.dropdown<NemoBadgeColor>(
      label: 'Color',
      initialOption: NemoBadgeColor.defaultColor,
      options: NemoBadgeColor.values,
      labelBuilder: (e) => e.name,
    ),
    variant: context.knobs.object.dropdown<NemoBadgeVariant>(
      label: 'Variant',
      initialOption: NemoBadgeVariant.filled,
      options: NemoBadgeVariant.values,
      labelBuilder: (e) => e.name,
    ),
    size: context.knobs.object.dropdown<NemoBadgeSize>(
      label: 'Size',
      initialOption: NemoBadgeSize.md,
      options: NemoBadgeSize.values,
      labelBuilder: (e) => e.name,
    ),
    shape: context.knobs.object.dropdown<NemoBadgeShape>(
      label: 'Shape',
      initialOption: NemoBadgeShape.pill,
      options: NemoBadgeShape.values,
      labelBuilder: (e) => e.name,
    ),
    icon: context.knobs.boolean(label: 'Icon', initialValue: false)
        ? Icons.favorite
        : null,
    dot: context.knobs.boolean(label: 'Dot', initialValue: false),
    count: context.knobs.intOrNull.slider(label: 'Count', min: 0, max: 200),
  ),
);

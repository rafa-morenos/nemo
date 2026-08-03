import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_badge.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

Story badgePlaygroundStory(String name) => Story(
  name: name,
  builder: (context) => NemoBadge(
    label: context.knobs.text(
      label: 'Label',
      description: 'Conteúdo em texto do badge',
      initial: 'Tag label',
    ),
    color: context.knobs.options(
      label: 'Color',
      initial: NemoBadgeColor.defaultColor,
      options: NemoBadgeColor.values
          .map((e) => Option(label: e.name, value: e))
          .toList(),
    ),
    variant: context.knobs.options(
      label: 'Variant',
      initial: NemoBadgeVariant.filled,
      options: NemoBadgeVariant.values
          .map((e) => Option(label: e.name, value: e))
          .toList(),
    ),
    size: context.knobs.options(
      label: 'Size',
      initial: NemoBadgeSize.md,
      options: NemoBadgeSize.values
          .map((e) => Option(label: e.name, value: e))
          .toList(),
    ),
    shape: context.knobs.options(
      label: 'Shape',
      initial: NemoBadgeShape.pill,
      options: NemoBadgeShape.values
          .map((e) => Option(label: e.name, value: e))
          .toList(),
    ),
    icon: context.knobs.boolean(label: 'Icon', initial: false)
        ? Icons.favorite
        : null,
    dot: context.knobs.boolean(label: 'Dot', initial: false),
    count: context.knobs.nullable.sliderInt(
      label: 'Count',
      initial: null,
      min: 0,
      max: 200,
    ),
  ),
);

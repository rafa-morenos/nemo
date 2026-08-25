import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_badge.dart';
import 'package:nemo_flutter/nemo_tokens.dart';
import 'package:widgetbook/widgetbook.dart';

Widget _row(List<Widget> children) => Wrap(
  spacing: NemoTokens.space50,
  runSpacing: NemoTokens.space50,
  crossAxisAlignment: WrapCrossAlignment.center,
  children: children,
);

/// Sem ícone — mesma seleção de cores/labels da story `WithoutIcon` do web.
WidgetbookUseCase badgeWithoutIconUseCase() => WidgetbookUseCase(
  name: 'Without icon',
  builder: (context) => _row(const [
    NemoBadge(color: NemoBadgeColor.success, label: 'Entregue'),
    NemoBadge(color: NemoBadgeColor.warning, label: 'Atenção'),
    NemoBadge(color: NemoBadgeColor.critical, label: 'Atrasado'),
    NemoBadge(color: NemoBadgeColor.info, label: 'Novidade'),
    NemoBadge(color: NemoBadgeColor.disabled, label: 'Rascunho'),
  ]),
);

/// Migra `DiscountTag` (Daki Web/App) → `color=critical variant=solid`.
WidgetbookUseCase badgeDiscountTagUseCase() => WidgetbookUseCase(
  name: 'Discount tag',
  builder: (context) => _row(const [
    NemoBadge(
      color: NemoBadgeColor.critical,
      variant: NemoBadgeVariant.solid,
      label: '-30%',
    ),
    NemoBadge(
      color: NemoBadgeColor.defaultColor,
      variant: NemoBadgeVariant.solid,
      label: 'Grátis',
    ),
  ]),
);

/// Migra `counter-tag`/`PickingAmountTags` (HUBR) → `count` sem `label`.
WidgetbookUseCase badgeCounterUseCase() => WidgetbookUseCase(
  name: 'Counter',
  builder: (context) => _row(const [
    NemoBadge(count: 3),
    NemoBadge(count: 12, color: NemoBadgeColor.info),
    NemoBadge(count: 128, color: NemoBadgeColor.critical),
    NemoBadge(color: NemoBadgeColor.defaultColor, label: 'Itens'),
    NemoBadge(color: NemoBadgeColor.defaultColor, label: 'Itens', count: 12),
  ]),
);

/// Chip de filtro compacto — `size=sm` + `shape=square`.
WidgetbookUseCase badgeFilterChipUseCase() => WidgetbookUseCase(
  name: 'Filter chip',
  builder: (context) => _row(const [
    NemoBadge(
      size: NemoBadgeSize.sm,
      shape: NemoBadgeShape.square,
      variant: NemoBadgeVariant.outline,
      label: 'Entrega hoje',
    ),
    NemoBadge(
      size: NemoBadgeSize.sm,
      shape: NemoBadgeShape.square,
      variant: NemoBadgeVariant.outline,
      color: NemoBadgeColor.info,
      label: 'Super Daki',
    ),
  ]),
);

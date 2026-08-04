import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_badge.dart';
import 'package:nemo_flutter/nemo_tokens.dart';
import 'package:widgetbook/widgetbook.dart';

/// Espelha a story `Matrix` do web (`badge.stories.tsx`) — todas as
/// combinações de `color` × `variant`, com ícone e dot, pra conferência
/// visual rápida em bloco.
WidgetbookUseCase badgeMatrixUseCase() => WidgetbookUseCase(
  name: 'Matrix',
  builder: (context) => SingleChildScrollView(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final color in NemoBadgeColor.values) ...[
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 80,
                child: Text(
                  color.name,
                  style: TextStyle(
                    fontSize: NemoTokens.fontSize2,
                    color: NemoTokens.colorTextNeutralSecondary,
                  ),
                ),
              ),
              Expanded(
                child: Wrap(
                  spacing: NemoTokens.space50,
                  runSpacing: NemoTokens.space50,
                  children: [
                    for (final variant in NemoBadgeVariant.values)
                      NemoBadge(
                        color: color,
                        variant: variant,
                        icon: Icons.favorite,
                        dot: true,
                        label: 'Tag label',
                      ),
                  ],
                ),
              ),
            ],
          ),
          SizedBox(height: NemoTokens.space75),
        ],
      ],
    ),
  ),
);

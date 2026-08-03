import 'package:flutter/material.dart';
import 'package:nemo_flutter/nemo_badge.dart';
import 'package:nemo_flutter/nemo_tokens.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

/// Espelha a story `Matrix` do web (`badge.stories.tsx`) — todas as
/// combinações de `color` × `variant`, com ícone e dot, pra conferência
/// visual rápida em bloco.
Story badgeMatrixStory(String name) => Story(
  name: name,
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

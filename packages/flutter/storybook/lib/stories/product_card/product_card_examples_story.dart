import 'package:flutter/material.dart';
import 'package:nemo_flutter/product_card.dart';
import 'package:widgetbook/widgetbook.dart';

List<Widget> _genericTags() => const [
  ProductCardPill(
    icon: Icon(Icons.extension, size: 12),
    dot: true,
    child: Text('Tag label', style: TextStyle(fontSize: 12)),
  ),
  ProductCardPill(
    icon: Icon(Icons.extension, size: 12),
    dot: true,
    child: Text('Tag label', style: TextStyle(fontSize: 12)),
  ),
];

Widget _genericImageBadge() => const ProductCardPill(
  icon: Icon(Icons.extension, size: 12),
  dot: true,
  child: Text('Tag label', style: TextStyle(fontSize: 12)),
);

Widget _fixedWidth(Widget child) => SizedBox(width: 320, child: child);

WidgetbookUseCase productCardHorizontalUseCase() => WidgetbookUseCase(
  name: 'Horizontal',
  builder: (context) => _fixedWidth(
    ProductCardWithBadges(
      variant: ProductCardVariant.horizontal,
      topBadges: _genericTags(),
      imageBadge: _genericImageBadge(),
      title: 'Title',
      location: 'Badge label',
      content: const ProductCardText(
        primary: Text('Content'),
        secondary: Text('text-secondary'),
      ),
      bottomBadges: _genericTags(),
      footer: const Text('Badge label'),
    ),
  ),
);

WidgetbookUseCase productCardVerticalUseCase() => WidgetbookUseCase(
  name: 'Vertical',
  builder: (context) => _fixedWidth(
    ProductCardWithBadges(
      variant: ProductCardVariant.vertical,
      topBadges: _genericTags(),
      imageBadge: _genericImageBadge(),
      title: 'Title',
      location: 'Badge label',
      content: const ProductCardText(
        primary: Text('Content'),
        secondary: Text('text-secondary'),
      ),
      bottomBadges: _genericTags(),
      footer: const Text('Badge label'),
    ),
  ),
);

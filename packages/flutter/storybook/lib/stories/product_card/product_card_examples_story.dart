import 'package:flutter/material.dart';
import 'package:nemo_flutter/product_card.dart';
import 'package:storybook_flutter/storybook_flutter.dart';

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

Story productCardHorizontalStory(String name) => Story(
  name: name,
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

Story productCardVerticalStory(String name) => Story(
  name: name,
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

import 'package:storybook_flutter/storybook_flutter.dart';

import 'product_card_examples_story.dart';

class ProductCardStories {
  static const _prefix = 'ProductCard';

  List<Story> get stories => [
    productCardHorizontalStory('$_prefix/Horizontal'),
    productCardVerticalStory('$_prefix/Vertical'),
  ];
}

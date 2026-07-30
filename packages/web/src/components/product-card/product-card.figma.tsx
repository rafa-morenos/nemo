import figma from "@figma/code-connect";
import { Puzzle } from "lucide-react";
import { ProductCardPill, ProductCardText, ProductCardWithBadges } from "./product-card";

/**
 * Code Connect — maps Figma node 19188:22490 ("Product card", variants "Badge
 * horizontal"/"Badge vertical") to `ProductCardWithBadges`. This node replaced the
 * older per-HUBR-flow node (18628:978) with a single boolean/variant-driven component —
 * `bagdeSuperior`/`badgeInferior`/`content`/`status`/`imageBadge` map 1:1 to
 * `ProductCardWithBadges`'s props (present prop = shown, same as Figma's toggle).
 *
 * The HUBR-specific flows (picking/pré-picking/bipagem de conferência) aren't part of
 * this Figma node at all — they're still real use cases, just built directly from the
 * `ProductCard`/`ProductCardBody`/etc. primitives (still exported from `./product-card`),
 * since a stepper-based flow isn't expressible as this node's toggles.
 *
 * Publish with: `npx figma connect publish` (needs a Figma token; not run here).
 */

const FILE = "https://www.figma.com/design/MqJ2Kp2MG4YOlLrwi1XJUx";

const genericTags = (
  <>
    <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
      Tag label
    </ProductCardPill>
    <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
      Tag label
    </ProductCardPill>
  </>
);

/* -------- Variant=Badge horizontal -------- */
figma.connect(ProductCardWithBadges, `${FILE}?node-id=19188-22491`, {
  props: {
    bagdeSuperior: figma.boolean("bagdeSuperior"),
    imageBadge: figma.boolean("imageBadge"),
    content: figma.boolean("content"),
    badgeInferior: figma.boolean("badgeInferior"),
    status: figma.boolean("status"),
  },
  example: ({ bagdeSuperior, imageBadge, content, badgeInferior, status }) => (
    <ProductCardWithBadges
      variant="horizontal"
      topBadges={bagdeSuperior && genericTags}
      imageBadge={
        imageBadge && (
          <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
            Tag label
          </ProductCardPill>
        )
      }
      title="Title"
      location="Badge label"
      content={content && <ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={badgeInferior && genericTags}
      footer={status && "Badge label"}
    />
  ),
});

/* -------- Variant=Badge vertical -------- */
figma.connect(ProductCardWithBadges, `${FILE}?node-id=19189-69379`, {
  props: {
    imageBadge: figma.boolean("imageBadge"),
    content: figma.boolean("content"),
    badgeInferior: figma.boolean("badgeInferior"),
    status: figma.boolean("status"),
  },
  example: ({ imageBadge, content, badgeInferior, status }) => (
    <ProductCardWithBadges
      variant="vertical"
      topBadges={genericTags}
      imageBadge={
        imageBadge && (
          <ProductCardPill className="text-xs" icon={<Puzzle />} dot>
            Tag label
          </ProductCardPill>
        )
      }
      title="Title"
      location="Badge label"
      content={content && <ProductCardText primary="Content" secondary="text-secondary" />}
      bottomBadges={badgeInferior && genericTags}
      footer={status && "Badge label"}
    />
  ),
});

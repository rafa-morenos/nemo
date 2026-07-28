import type { Meta, StoryObj } from "@storybook/react";
import manifest from "../../../../build/manifest.json";

/**
 * Typography tokens — the brand type system from the Daki Figma export:
 * Owners Narrow / Owners Text / Inter families + the fontSize and fontWeight
 * scales. Data-driven from build/manifest.json.
 */
const meta = { title: "Foundations/Typography" } satisfies Meta;
export default meta;
type Story = StoryObj;

type Tok = { name: string; path: string[]; type: string; value: string };
const tokens = manifest as Tok[];
const inter = "var(--nemo-font-family-inter)";
const byGroup = (g: string) => tokens.filter((t) => t.path[0] === "font" && t.path[1] === g);

const FAMILIES = [
  { label: "Display · Owners Narrow", varName: "--nemo-font-family-owners-narrow", weight: 900 },
  { label: "Heading · Owners Text", varName: "--nemo-font-family-owners-text", weight: 500 },
  { label: "Body / UI · Inter", varName: "--nemo-font-family-inter", weight: 400 },
];

export const Families: Story = {
  render: () => (
    <div style={{ maxWidth: 820 }}>
      {FAMILIES.map((f) => (
        <div key={f.varName} style={{ padding: "20px 0", borderBottom: "1px solid var(--nemo-color-border-neutral-main)" }}>
          <div style={{ fontFamily: inter, fontSize: 12, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--nemo-color-text-neutral-tertiary)", marginBottom: 8 }}>{f.label}</div>
          <div style={{ fontFamily: `var(${f.varName})`, fontWeight: f.weight, fontSize: 40, lineHeight: 1.1, color: "var(--nemo-color-text-neutral-primary)" }}>
            Entrega em minutos
          </div>
          <div style={{ fontFamily: `var(${f.varName})`, fontWeight: f.weight, fontSize: 18, color: "var(--nemo-color-text-neutral-secondary)", marginTop: 6 }}>
            Do jeitinho Daki — abcdefg 0123456789
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SizeScale: Story = {
  render: () => (
    <div style={{ fontFamily: inter, maxWidth: 820 }}>
      {byGroup("size").map((t) => (
        <div key={t.name} style={{ display: "flex", alignItems: "baseline", gap: 20, padding: "6px 0", borderBottom: "1px solid var(--nemo-color-border-neutral-main)" }}>
          <code style={{ width: 130, flex: "none", fontSize: 12, color: "var(--nemo-color-text-neutral-tertiary)" }}>size/{t.path[2]} · {t.value}</code>
          <span style={{ fontSize: `var(${t.name})`, color: "var(--nemo-color-text-neutral-primary)", lineHeight: 1.2 }}>Entrega em minutos</span>
        </div>
      ))}
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ fontFamily: inter, maxWidth: 820 }}>
      {byGroup("weight").map((t) => (
        <div key={t.name} style={{ display: "flex", alignItems: "baseline", gap: 20, padding: "8px 0" }}>
          <code style={{ width: 130, flex: "none", fontSize: 12, color: "var(--nemo-color-text-neutral-tertiary)" }}>weight/{t.path[2]} · {t.value}</code>
          <span style={{ fontSize: 24, fontWeight: Number(t.value), color: "var(--nemo-color-text-neutral-primary)" }}>Entrega em minutos</span>
        </div>
      ))}
    </div>
  ),
};

/**
 * Named text styles — the actual composed styles from the "🎨 Design Tokens
 * V3" Figma file (🆎 Typography page, node 94:500), not yet exported into our
 * token pipeline (they're Figma text styles, no "typography" composite token
 * exists in tokens/*.json). Hero/Heading/Title use the Desk (web) variants;
 * Body/Label/Support are shared ("Global") across platforms.
 */
const FAMILY_VAR = {
  narrow: "var(--nemo-font-family-owners-narrow)",
  text: "var(--nemo-font-family-owners-text)",
  inter: "var(--nemo-font-family-inter)",
} as const;

type TextStyle = {
  token: string;
  family: keyof typeof FAMILY_VAR;
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing?: number;
  decoration?: "underline" | "line-through";
};

const TEXT_STYLE_SECTIONS: { title: string; description?: string; styles: TextStyle[] }[] = [
  {
    title: "Hero · Desk",
    description: "Tipografia para uso expressivo.",
    styles: [
      { token: "hero-sm", family: "narrow", weight: 900, size: 24, lineHeight: 1.2, letterSpacing: 0.48 },
      { token: "hero-md", family: "narrow", weight: 900, size: 32, lineHeight: 1.2, letterSpacing: 0.64 },
      { token: "hero-lg", family: "narrow", weight: 900, size: 40, lineHeight: 1.2, letterSpacing: 0.8 },
    ],
  },
  {
    title: "Heading · Desk",
    description: "Títulos de maior relevância.",
    styles: [
      { token: "heading-sm", family: "text", weight: 500, size: 18, lineHeight: 1.2 },
      { token: "heading-md", family: "text", weight: 500, size: 24, lineHeight: 1.2 },
      { token: "heading-lg", family: "text", weight: 500, size: 28, lineHeight: 1.2 },
      { token: "heading-xl", family: "text", weight: 500, size: 32, lineHeight: 1.2 },
    ],
  },
  {
    title: "Title · Desk",
    description: "Títulos de menor relevância.",
    styles: [
      { token: "title-sm", family: "text", weight: 400, size: 14, lineHeight: 1.2 },
      { token: "title-md", family: "text", weight: 400, size: 16, lineHeight: 1.2 },
      { token: "title-lg", family: "text", weight: 400, size: 18, lineHeight: 1.2 },
      { token: "title-xl", family: "text", weight: 400, size: 24, lineHeight: 1.2 },
    ],
  },
  {
    title: "Body · Regular",
    description: "Para uso em blocos de texto.",
    styles: [
      { token: "body-regular-xxs", family: "inter", weight: 400, size: 10, lineHeight: 1.5 },
      { token: "body-regular-xs", family: "inter", weight: 400, size: 12, lineHeight: 1.5 },
      { token: "body-regular-sm", family: "inter", weight: 400, size: 14, lineHeight: 1.5 },
      { token: "body-regular-md", family: "inter", weight: 400, size: 16, lineHeight: 1.5 },
      { token: "body-regular-lg", family: "inter", weight: 400, size: 18, lineHeight: 1.5 },
    ],
  },
  {
    title: "Body · Bold",
    description: "Ênfase dentro de blocos de texto.",
    styles: [
      { token: "body-bold-xxs", family: "inter", weight: 600, size: 10, lineHeight: 1.5 },
      { token: "body-bold-xs", family: "inter", weight: 600, size: 12, lineHeight: 1.5 },
      { token: "body-bold-sm", family: "inter", weight: 600, size: 14, lineHeight: 1.5 },
      { token: "body-bold-md", family: "inter", weight: 600, size: 16, lineHeight: 1.5 },
      { token: "body-bold-lg", family: "inter", weight: 600, size: 18, lineHeight: 1.5 },
    ],
  },
  {
    title: "Label",
    description: "Usado para rotulagem de elementos.",
    styles: [
      { token: "label-xxs", family: "inter", weight: 500, size: 8, lineHeight: 1 },
      { token: "label-xs", family: "inter", weight: 500, size: 10, lineHeight: 1 },
      { token: "label-sm", family: "inter", weight: 500, size: 12, lineHeight: 1 },
      { token: "label-md", family: "inter", weight: 500, size: 14, lineHeight: 1 },
      { token: "label-lg", family: "inter", weight: 500, size: 16, lineHeight: 1 },
    ],
  },
  {
    title: "Label · Bold",
    styles: [
      { token: "label-bold-xs", family: "inter", weight: 700, size: 10, lineHeight: 1 },
      { token: "label-bold-sm", family: "inter", weight: 700, size: 12, lineHeight: 1 },
      { token: "label-bold-md", family: "inter", weight: 700, size: 14, lineHeight: 1 },
      { token: "label-bold-lg", family: "inter", weight: 700, size: 16, lineHeight: 1 },
    ],
  },
  {
    title: "Support · Button",
    description: "Para uso em componentes.",
    styles: [
      { token: "support-button-xs", family: "inter", weight: 700, size: 12, lineHeight: 1 },
      { token: "support-button-sm", family: "inter", weight: 700, size: 14, lineHeight: 1 },
      { token: "support-button-md", family: "inter", weight: 700, size: 16, lineHeight: 1 },
      { token: "support-button-lg", family: "inter", weight: 700, size: 20, lineHeight: 1 },
    ],
  },
  {
    title: "Support · Link",
    styles: [
      { token: "support-link-sm", family: "inter", weight: 400, size: 14, lineHeight: 1.5, decoration: "underline" },
      { token: "support-link-md", family: "inter", weight: 400, size: 16, lineHeight: 1.5, decoration: "underline" },
      { token: "support-link-lg", family: "inter", weight: 400, size: 18, lineHeight: 1.5, decoration: "underline" },
    ],
  },
  {
    title: "Support · Strike",
    styles: [
      { token: "support-strike-sm", family: "inter", weight: 400, size: 14, lineHeight: 1.2, decoration: "line-through" },
      { token: "support-strike-md", family: "inter", weight: 400, size: 16, lineHeight: 1.2, decoration: "line-through" },
      { token: "support-strike-lg", family: "inter", weight: 400, size: 18, lineHeight: 1.2, decoration: "line-through" },
    ],
  },
];

export const TextStyles: Story = {
  render: () => (
    <div style={{ maxWidth: 820 }}>
      {TEXT_STYLE_SECTIONS.map((section) => (
        <section key={section.title} style={{ marginBottom: 28 }}>
          <h3
            style={{
              fontFamily: "var(--nemo-font-family-owners-text)",
              fontWeight: 500,
              fontSize: 20,
              margin: "0 0 4px",
              color: "var(--nemo-color-text-neutral-primary)",
            }}
          >
            {section.title}
          </h3>
          {section.description != null && (
            <p style={{ fontFamily: inter, fontSize: 13, margin: "0 0 12px", color: "var(--nemo-color-text-neutral-tertiary)" }}>
              {section.description}
            </p>
          )}
          <div>
            {section.styles.map((s) => (
              <div
                key={s.token}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 20,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--nemo-color-border-neutral-main)",
                }}
              >
                <code
                  style={{
                    width: 170,
                    flex: "none",
                    fontFamily: inter,
                    fontSize: 11,
                    color: "var(--nemo-color-text-neutral-tertiary)",
                  }}
                >
                  {s.token}
                  <br />
                  {s.size}px · {s.weight} · lh {s.lineHeight}
                  {s.letterSpacing ? ` · ls ${s.letterSpacing}px` : ""}
                </code>
                <span
                  style={{
                    fontFamily: FAMILY_VAR[s.family],
                    fontWeight: s.weight,
                    fontSize: s.size,
                    lineHeight: s.lineHeight,
                    letterSpacing: s.letterSpacing ? `${s.letterSpacing}px` : undefined,
                    textDecoration: s.decoration,
                    color: "var(--nemo-color-text-neutral-primary)",
                  }}
                >
                  Mercado em minutos!
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

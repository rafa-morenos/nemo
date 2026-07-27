import type { Meta, StoryObj } from "@storybook/react";
import manifest from "../../../../build/manifest.json";

/**
 * Alias colors — the product-facing semantic layer, exactly as exported from
 * the Daki Figma file: Surface / Text / Border / Icon / Interactive / Background,
 * each with Neutral / Accent / Semantic / Medal subgroups. Data-driven from
 * build/manifest.json; swatches use live CSS vars → theme-aware.
 */
const meta = { title: "Foundations/Alias Colors" } satisfies Meta;
export default meta;
type Story = StoryObj;

type Tok = { name: string; path: string[]; type: string; value: string };
const tokens = (manifest as Tok[]).filter((t) => t.path[0] === "color" && t.type === "color");
const GROUPS = ["surface", "text", "border", "icon", "interactive", "background"];
const SUBTYPE_ORDER = ["neutral", "accent", "semantic", "medal"];

function Chip({ t }: { t: Tok }) {
  return (
    <div style={{ width: 132 }}>
      <div style={{ height: 44, borderRadius: "var(--nemo-radius-md)", background: `var(${t.name})`, border: "1px solid var(--nemo-color-border-neutral-main)" }} />
      <div style={{ marginTop: 6, fontFamily: "var(--nemo-font-family-inter)", fontSize: 11, lineHeight: 1.35 }}>
        <div style={{ color: "var(--nemo-color-text-neutral-primary)", fontWeight: 600 }}>{t.path.slice(2).join(" / ")}</div>
        <code style={{ color: "var(--nemo-color-text-neutral-tertiary)", fontSize: 10 }}>{t.value}</code>
      </div>
    </div>
  );
}

export const All: Story = {
  render: () => {
    const all = tokens.filter((t) => GROUPS.includes(t.path[1]));
    return (
      <div style={{ maxWidth: 960 }}>
        <p style={{ fontFamily: "var(--nemo-font-family-inter)", fontSize: 14, color: "var(--nemo-color-text-neutral-secondary)", marginBottom: 24 }}>
          {all.length} tokens de alias exportados do Figma. Alterne o tema (🌗) para o deep-sea.
        </p>
        {GROUPS.map((g) => {
          const items = all.filter((t) => t.path[1] === g);
          if (!items.length) return null;
          const subtypes = [...new Set(items.map((t) => t.path[2]))].sort(
            (a, b) => (SUBTYPE_ORDER.includes(a) ? SUBTYPE_ORDER.indexOf(a) : 99) - (SUBTYPE_ORDER.includes(b) ? SUBTYPE_ORDER.indexOf(b) : 99)
          );
          return (
            <section key={g} style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "var(--nemo-font-family-owners-text)", fontWeight: 500, fontSize: 20, margin: "0 0 12px", textTransform: "capitalize", color: "var(--nemo-color-text-neutral-primary)" }}>
                {g} <span style={{ fontSize: 12, color: "var(--nemo-color-text-neutral-tertiary)" }}>· {items.length}</span>
              </h3>
              {subtypes.map((sub) => {
                const subItems = items.filter((t) => t.path[2] === sub);
                return (
                  <div key={sub} style={{ marginBottom: 16 }}>
                    {subtypes.length > 1 && (
                      <h4 style={{ fontFamily: "var(--nemo-font-family-inter)", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 8px", color: "var(--nemo-color-text-neutral-tertiary)" }}>
                        {sub} <span style={{ fontWeight: 400 }}>· {subItems.length}</span>
                      </h4>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{subItems.map((t) => <Chip key={t.name} t={t} />)}</div>
                  </div>
                );
              })}
            </section>
          );
        })}
      </div>
    );
  },
};

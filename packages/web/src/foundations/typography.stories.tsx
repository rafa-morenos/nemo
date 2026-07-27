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

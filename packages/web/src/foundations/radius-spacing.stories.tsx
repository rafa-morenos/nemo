import type { Meta, StoryObj } from "@storybook/react";

/** Radius & spacing scales, exactly as exported from the Daki Figma file (Layout). */
const meta = { title: "Foundations/Radius & Spacing" } satisfies Meta;
export default meta;
type Story = StoryObj;

const font = "var(--nemo-font-family-inter)";

export const Radius: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontFamily: font }}>
      {["sm", "md", "lg", "xl", "pill"].map((r) => (
        <div key={r} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 88,
              height: 88,
              background: "var(--nemo-color-surface-accent-primary)",
              border: "2px solid var(--nemo-color-interactive-accent-primary-main)",
              borderRadius: `var(--nemo-radius-${r})`,
            }}
          />
          <div style={{ fontSize: 12, marginTop: 6, color: "var(--nemo-color-text-neutral-secondary)" }}>radius/{r}</div>
        </div>
      ))}
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ fontFamily: font }}>
      {[25, 50, 75, 100, 125, 150, 200, 250, 300, 400].map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
          <code style={{ width: 96, fontSize: 12, color: "var(--nemo-color-text-neutral-tertiary)" }}>space/{s}</code>
          <div style={{ height: 16, width: `var(--nemo-space-${s})`, background: "var(--nemo-color-interactive-accent-primary-main)", borderRadius: 4 }} />
        </div>
      ))}
    </div>
  ),
};

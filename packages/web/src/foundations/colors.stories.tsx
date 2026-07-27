import type { Meta, StoryObj } from "@storybook/react";

/** Primitive color ramps, exactly as exported from the Daki Figma file. */
const meta = { title: "Foundations/Colors" } satisfies Meta;
export default meta;
type Story = StoryObj;

function Swatch({ label, varName }: { label: string; varName: string }) {
  return (
    <div style={{ width: 96 }}>
      <div
        style={{
          height: 56,
          borderRadius: "var(--nemo-radius-md)",
          background: `var(${varName})`,
          border: "1px solid var(--nemo-color-border-neutral-main)",
        }}
      />
      <div style={{ fontSize: 11, marginTop: 6, color: "var(--nemo-color-text-neutral-secondary)", fontFamily: "var(--nemo-font-family-inter)" }}>{label}</div>
    </div>
  );
}

function Scale({ title, prefix, steps }: { title: string; prefix: string; steps: (string | number)[] }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontFamily: "var(--nemo-font-family-owners-text)", fontWeight: 500, fontSize: 20, margin: "0 0 12px", color: "var(--nemo-color-text-neutral-primary)" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {steps.map((s) => (
          <Swatch key={s} label={`${prefix}/${s}`} varName={`--nemo-color-${prefix}-${s}`} />
        ))}
      </div>
    </section>
  );
}

const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100];

export const Primitives: Story = {
  render: () => (
    <div>
      <Scale title="Blue · mar azulão (Primary = blue.40 · #0069ff)" prefix="blue" steps={TONES} />
      <Scale title="Gray · neutral" prefix="gray" steps={TONES} />
      <Scale title="Red · critical" prefix="red" steps={TONES} />
      <Scale title="Green · success" prefix="green" steps={TONES} />
      <Scale title="Yellow · warning" prefix="yellow" steps={TONES} />
      <Scale title="Navy · info" prefix="navy" steps={TONES} />
      <Scale title="Emerald · benefit" prefix="emerald" steps={TONES} />
      <Scale title="Purple · incentive" prefix="purple" steps={TONES} />
      <Scale title="Gold · medal" prefix="gold" steps={TONES} />
    </div>
  ),
};

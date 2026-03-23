import { Section, Text } from "@react-email/components";

type HighlightVariant = "warning" | "success" | "info";

interface EmailHighlightBoxProps {
  children: React.ReactNode;
  variant?: HighlightVariant;
}

const variantStyles: Record<
  HighlightVariant,
  { background: string; borderColor: string; color: string }
> = {
  warning: {
    background: "#FEF3C7",
    borderColor: "#F59E0B",
    color: "#92400E",
  },
  success: {
    background: "#F0FDF4",
    borderColor: "#34D399",
    color: "#166534",
  },
  info: {
    background: "#FBF1E7",
    borderColor: "#edc79e",
    color: "#374151",
  },
};

export default function EmailHighlightBox({
  children,
  variant = "info",
}: EmailHighlightBoxProps) {
  const v = variantStyles[variant];

  return (
    <Section
      style={{
        backgroundColor: v.background,
        borderRadius: "12px",
        borderLeft: `4px solid ${v.borderColor}`,
        padding: "16px 20px",
        margin: "16px 0",
      }}
    >
      <Text
        style={{
          fontFamily: "'Sora', Arial, sans-serif",
          fontSize: "14px",
          lineHeight: "22px",
          color: v.color,
          margin: "0",
        }}
      >
        {children}
      </Text>
    </Section>
  );
}

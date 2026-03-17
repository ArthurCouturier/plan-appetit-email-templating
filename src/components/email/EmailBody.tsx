import { Section, Text } from "@react-email/components";

interface EmailBodyProps {
  children: React.ReactNode;
}

export default function EmailBody({ children }: EmailBodyProps) {
  return <Section style={styles.container}>{children}</Section>;
}

export function EmailText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
}

export function EmailHeading({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return <Text style={{ ...styles.heading, ...style }}>{children}</Text>;
}

const styles = {
  container: {
    backgroundColor: "#ffffff",
    padding: "32px 24px",
  },
  text: {
    fontFamily: "'Sora', Arial, sans-serif",
    fontSize: "15px",
    lineHeight: "24px",
    color: "#374151",
    margin: "0 0 16px",
  },
  heading: {
    fontFamily: "'Sora', Arial, sans-serif",
    fontSize: "18px",
    fontWeight: 700,
    color: "#1f2937",
    margin: "0 0 12px",
  },
};

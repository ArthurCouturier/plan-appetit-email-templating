import { Section, Img, Text, Link } from "@react-email/components";
import { buildUtmUrl } from "./EmailContext";

interface EmailHeaderProps {
  title?: string;
  campaign: string;
}

export default function EmailHeader({ title, campaign }: EmailHeaderProps) {
  return (
    <Section style={styles.container}>
      <Link href={buildUtmUrl("/", campaign, "logo")}>
        <Img
          src="https://plan-appetit.fr/logo/actual/logo-light-color.svg"
          width="140"
          height="54"
          alt="Plan'Appétit"
          style={styles.logo}
        />
      </Link>
      {title && <Text style={styles.title}>{title}</Text>}
    </Section>
  );
}

const styles = {
  container: {
    backgroundColor: "#FBF1E7",
    padding: "32px 24px 16px",
    textAlign: "center" as const,
  },
  logo: {
    margin: "0 auto",
  },
  title: {
    fontFamily: "'Sora', Arial, sans-serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#1f2937",
    margin: "16px 0 0",
  },
};

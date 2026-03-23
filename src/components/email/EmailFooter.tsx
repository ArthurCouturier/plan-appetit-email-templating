import { Section, Text, Link, Hr } from "@react-email/components";
import { buildUtmUrl } from "./EmailContext";

interface EmailFooterProps {
  campaign: string;
}

export default function EmailFooter({ campaign }: EmailFooterProps) {
  return (
    <Section style={styles.container}>
      <Hr style={styles.hr} />
      <Text style={styles.text}>
        <Link href={buildUtmUrl("/", campaign, "footer")} style={styles.link}>
          Plan'Appétit
        </Link>{" "}
        — L'appli qui te fait devenir la star de la cuisine
      </Text>
      <Text style={styles.sub}>
        Vous recevez cet email car vous êtes inscrit(e) sur Plan'Appétit.
        <br />
        <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={styles.link}>
          Se désinscrire
        </Link>
      </Text>
    </Section>
  );
}

const styles = {
  container: {
    backgroundColor: "#FBF1E7",
    padding: "16px 24px 32px",
    textAlign: "center" as const,
  },
  hr: {
    borderColor: "#edc79e",
    margin: "0 0 16px",
  },
  text: {
    fontFamily: "'Sora', Arial, sans-serif",
    fontSize: "13px",
    color: "#374151",
    margin: "0 0 8px",
  },
  sub: {
    fontFamily: "'Sora', Arial, sans-serif",
    fontSize: "11px",
    color: "#9ca3af",
    margin: "0",
    lineHeight: "18px",
  },
  link: {
    color: "#f17c63",
    textDecoration: "underline" as const,
  },
};

import { Section, Img, Text, Link } from "@react-email/components";
import { buildUtmUrl } from "./EmailContext";

/* ─── Confetti config ─── */

const CONFETTI_COLORS = [
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
];

const INITIAL_PIECES = [
  { marginLeft: "4%", delay: 0, size: 8 },
  { marginLeft: "3%", delay: 0.3, size: 6 },
  { marginLeft: "5%", delay: 0.1, size: 10 },
  { marginLeft: "4%", delay: 0.5, size: 7 },
  { marginLeft: "3%", delay: 0.2, size: 9 },
  { marginLeft: "5%", delay: 0.4, size: 6 },
  { marginLeft: "3%", delay: 0.15, size: 8 },
  { marginLeft: "5%", delay: 0.35, size: 10 },
  { marginLeft: "3%", delay: 0.25, size: 7 },
  { marginLeft: "4%", delay: 0.45, size: 9 },
  { marginLeft: "3%", delay: 0.1, size: 6 },
  { marginLeft: "4%", delay: 0.55, size: 8 },
];

/* ─── CSS ─── */

export const CONFETTI_HEAD_CSS = `
  @-webkit-keyframes confetti-fall {
    0% { opacity: 1; -webkit-transform: translateY(0) rotate(0deg); }
    100% { opacity: 0; -webkit-transform: translateY(80px) rotate(720deg); }
  }
  @keyframes confetti-fall {
    0% { opacity: 1; transform: translateY(0) rotate(0deg); }
    100% { opacity: 0; transform: translateY(80px) rotate(720deg); }
  }
`;

/* ─── Component ─── */

interface EmailHeaderProps {
  title?: string;
  campaign: string;
  confetti?: boolean;
}

export default function EmailHeader({ title, campaign, confetti = false }: EmailHeaderProps) {
  return (
    <Section style={styles.container}>
      {confetti && (
        <div style={{ textAlign: "center", lineHeight: "0", fontSize: "0" }}>
          {INITIAL_PIECES.map((piece, i) => (
            <div
              key={i}
              style={{
                display: "inline-block",
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                marginLeft: piece.marginLeft,
                backgroundColor: CONFETTI_COLORS[i],
                borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
                opacity: 0,
                WebkitAnimation: `confetti-fall 1.8s ease-out ${piece.delay}s 1 forwards`,
                animation: `confetti-fall 1.8s ease-out ${piece.delay}s 1 forwards`,
              }}
            />
          ))}
        </div>
      )}

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

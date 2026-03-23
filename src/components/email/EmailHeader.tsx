import { Section, Img, Text, Link } from "@react-email/components";
import { buildUtmUrl } from "./EmailContext";

const CONFETTI_COLORS = [
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
  "#f17c63", "#edc79e", "#F4B63C", "#34d399",
];

const CONFETTI_POSITIONS = [
  { left: "5%", delay: "0s", size: 8 },
  { left: "12%", delay: "0.3s", size: 6 },
  { left: "22%", delay: "0.1s", size: 10 },
  { left: "32%", delay: "0.5s", size: 7 },
  { left: "40%", delay: "0.2s", size: 9 },
  { left: "50%", delay: "0.4s", size: 6 },
  { left: "58%", delay: "0.15s", size: 8 },
  { left: "68%", delay: "0.35s", size: 10 },
  { left: "76%", delay: "0.25s", size: 7 },
  { left: "84%", delay: "0.45s", size: 9 },
  { left: "90%", delay: "0.1s", size: 6 },
  { left: "96%", delay: "0.55s", size: 8 },
];

const CONFETTI_KEYFRAMES = `
  @keyframes confetti-fall {
    0% { opacity: 1; transform: translateY(0) rotate(0deg); }
    100% { opacity: 0; transform: translateY(120px) rotate(720deg); }
  }
  @-webkit-keyframes confetti-fall {
    0% { opacity: 1; -webkit-transform: translateY(0) rotate(0deg); }
    100% { opacity: 0; -webkit-transform: translateY(120px) rotate(720deg); }
  }
`;

interface EmailHeaderProps {
  title?: string;
  campaign: string;
  confetti?: boolean;
}

export default function EmailHeader({ title, campaign, confetti = false }: EmailHeaderProps) {
  return (
    <>
      {confetti && (
        <>
          <style dangerouslySetInnerHTML={{ __html: CONFETTI_KEYFRAMES }} />
          <Section
            style={{
              position: "relative",
              height: "0",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {CONFETTI_POSITIONS.map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: "0",
                  left: pos.left,
                  width: `${pos.size}px`,
                  height: `${pos.size}px`,
                  backgroundColor: CONFETTI_COLORS[i],
                  borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0",
                  opacity: 0,
                  WebkitAnimation: `confetti-fall 1.8s ease-out ${pos.delay} 1 forwards`,
                  animation: `confetti-fall 1.8s ease-out ${pos.delay} 1 forwards`,
                }}
              />
            ))}
          </Section>
        </>
      )}
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
    </>
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

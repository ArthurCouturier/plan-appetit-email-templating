import { Button } from "@react-email/components";
import { buildUtmUrl } from "./EmailContext";

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
  campaign: string;
  variant?: "primary" | "secondary";
  utmContent?: string;
}

export default function EmailButton({
  href,
  children,
  campaign,
  variant = "primary",
  utmContent = "cta",
}: EmailButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Button
      href={buildUtmUrl(href, campaign, utmContent)}
      style={{
        fontFamily: "'Sora', Arial, sans-serif",
        backgroundColor: isPrimary ? "#f17c63" : "#FBF1E7",
        color: isPrimary ? "#ffffff" : "#f17c63",
        fontSize: "15px",
        fontWeight: 600,
        padding: "14px 32px",
        borderRadius: "12px",
        textDecoration: "none",
        display: "inline-block",
        border: isPrimary ? "none" : "2px solid #f17c63",
      }}
    >
      {children}
    </Button>
  );
}

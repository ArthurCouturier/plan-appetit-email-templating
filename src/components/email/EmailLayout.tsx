import {
  Html,
  Head,
  Body,
  Container,
  Font,
  Preview,
} from "@react-email/components";

interface EmailLayoutProps {
  preview?: string;
  campaign?: string;
  children: React.ReactNode;
}

export default function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="fr">
      <Head>
        <Font
          fontFamily="Sora"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnk-DKQRDA2mfkA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Sora"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/sora/v12/xMQOuFFYT72X5wkB_18qmnndmSdSnk-NKQRDA2mfkA.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={bodyStyle}>
        <Container style={containerStyle}>{children}</Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  backgroundColor: "#F6E3CF",
  margin: "0",
  padding: "40px 0",
  fontFamily: "'Sora', Arial, sans-serif",
};

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: "16px",
  overflow: "hidden" as const,
  border: "1px solid #edc79e",
};

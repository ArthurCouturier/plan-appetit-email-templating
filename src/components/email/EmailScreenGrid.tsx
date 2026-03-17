import { Section, Row, Column, Img } from "@react-email/components";

interface Screen {
  src: string;
  alt?: string;
}

interface EmailScreenGridProps {
  screens: [Screen, Screen, Screen, Screen];
  gap?: number;
  borderRadius?: number;
  border?: number;
}

export default function EmailScreenGrid({
  screens,
  gap = 12,
  borderRadius = 12,
  border = 0.0
}: EmailScreenGridProps) {
  const imgStyle = {
    borderRadius: `${borderRadius}px`,
    display: "block" as const,
    width: "100%",
    height: "auto" as const,
    border: `${border}px solid #edc79e`,
  };

  return (
    <Section style={{ padding: `0 0 ${gap}px` }}>
      <Row style={{ marginBottom: `${gap}px` }}>
        <Column style={{ width: "50%", paddingRight: `${gap / 2}px` }}>
          <Img
            src={screens[0].src}
            alt={screens[0].alt ?? "Screenshot 1"}
            style={imgStyle}
            width="100%"
          />
        </Column>
        <Column style={{ width: "50%", paddingLeft: `${gap / 2}px` }}>
          <Img
            src={screens[1].src}
            alt={screens[1].alt ?? "Screenshot 2"}
            style={imgStyle}
            width="100%"
          />
        </Column>
      </Row>
      <Row>
        <Column style={{ width: "50%", paddingRight: `${gap / 2}px` }}>
          <Img
            src={screens[2].src}
            alt={screens[2].alt ?? "Screenshot 3"}
            style={imgStyle}
            width="100%"
          />
        </Column>
        <Column style={{ width: "50%", paddingLeft: `${gap / 2}px` }}>
          <Img
            src={screens[3].src}
            alt={screens[3].alt ?? "Screenshot 4"}
            style={imgStyle}
            width="100%"
          />
        </Column>
      </Row>
    </Section>
  );
}

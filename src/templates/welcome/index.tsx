import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";

const CAMPAIGN = "welcome";

export default function WelcomeEmail() {
  return (
    <EmailLayout campaign={CAMPAIGN} preview="Bienvenue sur Plan'Appétit ! Découvrez la cuisine assistée par IA.">
      <EmailHeader campaign={CAMPAIGN} title="Bienvenue sur Plan'Appétit !" />
      <EmailBody>
        <EmailHeading>Bonjour 👋</EmailHeading>
        <EmailText>
          Merci de nous rejoindre ! Plan'Appétit utilise l'intelligence
          artificielle pour vous aider à créer des recettes personnalisées,
          adaptées à vos goûts, votre budget et vos ingrédients disponibles.
        </EmailText>
        <EmailText>
          Pour commencer, explorez nos différents modes de génération de
          recettes :
        </EmailText>
        <EmailText style={{ paddingLeft: "16px", borderLeft: "3px solid #edc79e" }}>
          🍳 <strong>Mode Frigo</strong> — Dites-nous ce que vous avez, on
          s'occupe du reste
          <br />
          📍 <strong>Mode Localisation</strong> — Des recettes inspirées de
          votre région
          <br />
          💰 <strong>Mode Budget</strong> — Cuisinez malin sans compromis
        </EmailText>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Découvrir Plan'Appétit
          </EmailButton>
        </div>
        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Si vous avez des questions, répondez directement à cet email. Nous
          sommes toujours ravis d'échanger avec vous !
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

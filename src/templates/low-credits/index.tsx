import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "low-credits";

export default function LowCreditsEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Plus qu'1 crédit sur ton compte ! Passe à Premium pour cuisiner sans limite."
    >
      <EmailHeader campaign={CAMPAIGN} title="Plus qu'1 crédit !" />
      <EmailBody>
        <EmailHeading>Il te reste un dernier crédit</EmailHeading>
        <EmailText>
          Tu as bien profité de Plan'Appétit et c'est super ! Mais ton
          compteur arrive bientôt à zéro.
        </EmailText>

        <EmailHighlightBox variant="warning">
          <strong>Astuce :</strong> avec l'abonnement Premium, tu n'as plus
          jamais à te soucier de tes crédits. Recettes illimitées, tous les
          modes de génération, zéro limite.
        </EmailHighlightBox>

        <EmailText>
          Tu peux aussi acheter un pack de crédits si tu préfères y aller à
          ton rythme.
        </EmailText>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr/premium">
            Découvrir Premium
          </EmailButton>
        </div>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

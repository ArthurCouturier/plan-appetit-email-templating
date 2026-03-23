import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "credits-purchased";

export default function CreditsPurchasedEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Tes crédits ont été ajoutés ! Génère tes prochaines recettes dès maintenant."
    >
      <EmailHeader campaign={CAMPAIGN} title="Crédits ajoutés !" confetti />
      <EmailBody>
        <EmailHeading>Tes crédits sont prêts</EmailHeading>
        <EmailText>
          Merci pour ton achat ! Tes nouveaux crédits sont disponibles
          sur ton compte.
        </EmailText>

        <EmailHighlightBox variant="success">
          Chaque crédit te permet de générer une recette unique, pensée par
          l'IA selon tes envies et ce que tu as sous la main.
        </EmailHighlightBox>

        <EmailText>
          Pas envie de réfléchir ce soir ? Lance le mode "Vide mon frigo" et
          laisse-toi guider.
        </EmailText>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Utiliser mes crédits
          </EmailButton>
        </div>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

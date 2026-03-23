import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "cancellation";

export default function CancellationEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Ton annulation est confirmée. Tu gardes l'accès Premium jusqu'à la fin de ta période."
    >
      <EmailHeader campaign={CAMPAIGN} title="On est triste de te voir partir" />
      <EmailBody>
        <EmailHeading>Ton annulation est confirmée</EmailHeading>
        <EmailText>
          On a bien pris en compte ta demande. Ton abonnement Premium reste
          actif jusqu'à la fin de ta période en cours, tu ne perds rien
          d'ici là.
        </EmailText>

        <EmailHighlightBox variant="info">
          Toutes tes recettes et collections restent accessibles, même après
          la fin de ton abonnement. Tu pourras toujours les consulter.
        </EmailHighlightBox>

        <EmailText>
          Si tu changes d'avis, tu peux te réabonner à tout moment depuis
          ton compte.
        </EmailText>

        <EmailHighlightBox variant="warning">
          <strong>Changé d'avis ?</strong> Tu peux réactiver ton abonnement
          en un clic, sans perdre tes avantages.
        </EmailHighlightBox>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr/account">
            Réactiver mon abonnement
          </EmailButton>
        </div>

        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Si tu as annulé par erreur ou si tu as besoin d'aide, réponds
          simplement à cet email.
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

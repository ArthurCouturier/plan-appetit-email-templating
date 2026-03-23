import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "subscription-ended";

export default function SubscriptionEndedEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Ton abonnement Premium a pris fin. Tes recettes sont toujours là, reviens quand tu veux."
    >
      <EmailHeader campaign={CAMPAIGN} title="Ton Premium a pris fin" />
      <EmailBody>
        <EmailHeading>On espère te revoir bientôt</EmailHeading>
        <EmailText>
          Ton abonnement Premium est arrivé à son terme. Tu peux toujours
          utiliser Plan'Appétit et consulter toutes tes recettes existantes.
        </EmailText>
        <EmailText>
          Pour générer de nouvelles recettes, tu auras besoin de crédits ou
          d'un nouvel abonnement.
        </EmailText>

        <EmailHighlightBox variant="success">
          <strong>Bonne nouvelle :</strong> tes recettes et collections sont
          conservées. Rien n'a été supprimé.
        </EmailHighlightBox>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr/premium">
            Redevenir Premium
          </EmailButton>
        </div>

        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Tu préfères y aller doucement ? Tu peux aussi acheter un pack de
          crédits depuis l'application.
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

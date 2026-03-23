import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "subscription-confirmed";

export default function SubscriptionConfirmedEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Ton abonnement Premium est activé ! Recettes illimitées, c'est parti."
    >
      <EmailHeader campaign={CAMPAIGN} title="Bienvenue chez les Premium !" confetti />
      <EmailBody>
        <EmailHeading>C'est officiel, tu es Premium</EmailHeading>
        <EmailText>
          Merci pour ta confiance ! Ton abonnement est maintenant actif et tu
          as accès à tout Plan'Appétit sans limite.
        </EmailText>

        <EmailHighlightBox variant="success">
          <strong>Ce qui change pour toi :</strong>
          <br />
          Génération de recettes illimitée, recettes du jour complètes et
          tous les modes de création accessibles.
        </EmailHighlightBox>

        <EmailText>
          Plus besoin de compter tes crédits. Tu peux générer autant de
          recettes que tu veux, quand tu veux.
        </EmailText>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Générer une recette
          </EmailButton>
        </div>

        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Si tu as la moindre question sur ton abonnement, réponds à cet
          email. On est là.
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

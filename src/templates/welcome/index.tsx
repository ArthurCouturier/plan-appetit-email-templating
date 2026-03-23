import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "welcome";

export default function WelcomeEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="Bienvenue sur Plan'Appétit ! Tu as 3 crédits gratuits pour générer tes premières recettes."
    >
      <EmailHeader campaign={CAMPAIGN} title="Bienvenue !" confetti />
      <EmailBody>
        <EmailHeading>Ta cuisine, boostée par l'IA</EmailHeading>
        <EmailText>
          Tu viens de rejoindre Plan'Appétit et on est ravis de t'accueillir !
        </EmailText>
        <EmailText>
          Dis-nous ce que tu as dans ton frigo, ton budget, tes envies et en
          quelques secondes, on te génère une recette sur mesure.
        </EmailText>

        <EmailHighlightBox variant="success">
          <strong>3 crédits offerts</strong> t'attendent sur ton compte.
          Chaque crédit = une recette générée par l'IA, rien que pour toi.
        </EmailHighlightBox>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Génère ta première recette
          </EmailButton>
        </div>

        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Une question ? Réponds directement à cet email, on lit tout.
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

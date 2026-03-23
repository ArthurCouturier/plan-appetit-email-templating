import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "reengagement-j2";

export default function ReengagementJ2Email() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="2 crédits offerts si tu génères une recette aujourd'hui !"
    >
      <EmailHeader campaign={CAMPAIGN} title="On t'a gardé quelque chose" />
      <EmailBody>
        <EmailHeading>Tu nous manques !</EmailHeading>
        <EmailText>
          Ça fait quelques jours qu'on ne t'a pas vu sur Plan'Appétit.
          On a pensé à toi.
        </EmailText>

        <EmailHighlightBox variant="warning">
          <strong>Offre spéciale :</strong> génère une recette aujourd'hui
          et on t'offre <strong>2 crédits bonus</strong> en cadeau.
          L'offre expire ce soir à minuit !
        </EmailHighlightBox>

        <EmailText>
          Que ce soit pour improviser avec ce qu'il te reste au frigo ou
          pour tester une nouvelle idée, c'est le moment.
        </EmailText>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Récupérer mes 2 crédits
          </EmailButton>
        </div>

        <EmailText style={{ fontSize: "13px", color: "#9ca3af" }}>
          Les 2 crédits seront ajoutés automatiquement après ta prochaine
          génération de recette.
        </EmailText>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

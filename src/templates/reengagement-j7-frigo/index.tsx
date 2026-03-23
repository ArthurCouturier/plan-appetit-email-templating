import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailHighlightBox from "../../components/email/EmailHighlightBox";

const CAMPAIGN = "reengagement-j7-frigo";

export default function ReengagementJ7FrigoEmail() {
  return (
    <EmailLayout
      campaign={CAMPAIGN}
      preview="On le vide ton frigo ? Dis-nous ce qu'il te reste, on s'occupe de la recette."
    >
      <EmailHeader campaign={CAMPAIGN} title="On le vide ton frigo ?" />
      <EmailBody>
        <EmailHeading>Rien à manger ce soir ?</EmailHeading>
        <EmailText>
          Pas envie de faire les courses, un frigo à moitié vide et zéro
          inspiration ? On connaît.
        </EmailText>
        <EmailText>
          Le mode <strong>Vide mon frigo</strong> est fait pour ça. Dis-nous
          ce que tu as sous la main, réponds à quelques questions et en
          quelques secondes tu as ta recette.
        </EmailText>

        <EmailHighlightBox variant="info">
          <strong>Comment ça marche :</strong>
          <br />
          1. Appuie sur "Nouvelle recette"
          <br />
          2. Choisis "Vide mon frigo"
          <br />
          3. Réponds aux questions
          <br />
          4. Ta recette est prête !
        </EmailHighlightBox>

        <div style={{ textAlign: "center", margin: "28px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Vider mon frigo
          </EmailButton>
        </div>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

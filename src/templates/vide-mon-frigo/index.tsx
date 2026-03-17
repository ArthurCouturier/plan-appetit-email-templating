import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";
import EmailScreenGrid from "@components/EmailScreenGrid";

const CAMPAIGN = "vide-mon-frigo";

export default function VideMonFrigoEmail() {
  return (
    <EmailLayout campaign={CAMPAIGN} preview="Vide mon frigo! La nouvelle fonctionnalité de Plan Appétit est déjà disponible!">
      <EmailHeader campaign={CAMPAIGN} title="Vide mon frigo!" />
      <EmailBody>
        <EmailHeading>Frigo à moitié plein?</EmailHeading>
        <EmailHeading>Rien à manger ce soir?</EmailHeading>
        <EmailText>
          La toute nouvelle version de Plan Appétit vient de voir le jour.
        </EmailText>
        <EmailText>
          Tu ne sais pas quoi faire de tes restes et tu as la <b>flemme de faire des courses</b>?
        </EmailText>
        <EmailText>
          Allume Plan Appétit, appuie sur "Nouvelle recette" puis "Vide mon frigo!".
        </EmailText>
        <EmailText>
          Réponds à de simples questions et quelques secondes plus tard, tu as ta recette sur mesure!
        </EmailText>
        <EmailScreenGrid
          screens={[
            { src: "https://plan-appetit.fr/emails/03-17-2026/screen1.png", alt: "Appuie sur Nouvelle Recette" },
            { src: "https://plan-appetit.fr/emails/03-17-2026/screen2.png", alt: "Recettes" },
            { src: "https://plan-appetit.fr/emails/03-17-2026/screen3.png", alt: "Mode frigo" },
            { src: "https://plan-appetit.fr/emails/03-17-2026/screen4.png", alt: "Collections" },
          ]}
        />
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Ouvrir Plan'Appétit
          </EmailButton>
        </div>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}

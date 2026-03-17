import { useState } from "react";

interface CreateTemplateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (slug: string) => void;
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CreateTemplateModal({
  open,
  onClose,
  onCreated,
}: CreateTemplateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const slug = toSlug(name);
  const canSubmit = name.trim() && title.trim() && preview.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/create-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: name.trim(),
          description: description.trim(),
          title: title.trim(),
          preview: preview.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setName("");
        setDescription("");
        setTitle("");
        setPreview("");
        onCreated(data.slug);
      } else {
        setError(data.error || "Erreur inconnue");
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #edc79e",
          padding: "32px",
          width: "100%",
          maxWidth: "460px",
          margin: "16px",
          boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ ...text, fontSize: "20px", fontWeight: 700, margin: "0 0 24px" }}>
          Nouveau template
        </h2>

        <label style={labelStyle}>
          Nom
          <input
            style={inputStyle}
            placeholder="Ex: Promotion Noël"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </label>
        {slug && (
          <p style={{ ...text, fontSize: "11px", color: "#9ca3af", margin: "-12px 0 16px" }}>
            Dossier : templates/<strong>{slug}</strong>/
          </p>
        )}

        <label style={labelStyle}>
          Description <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optionnelle)</span>
          <input
            style={inputStyle}
            placeholder="Ex: Offre spéciale fêtes de fin d'année"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label style={labelStyle}>
          Titre de l'email
          <input
            style={inputStyle}
            placeholder="Ex: Joyeuses fêtes de la part de Plan'Appétit !"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label style={labelStyle}>
          Texte d'aperçu
          <input
            style={inputStyle}
            placeholder="Ex: Découvrez nos offres spéciales pour les fêtes..."
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
          <span style={{ ...text, fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
            Texte visible dans la boîte de réception avant ouverture
          </span>
        </label>

        {error && (
          <p style={{ ...text, fontSize: "13px", color: "#ef4444", margin: "0 0 12px" }}>
            {error}
          </p>
        )}

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              ...text,
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #edc79e",
              backgroundColor: "#FBF1E7",
              color: "#374151",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!canSubmit || loading}
            style={{
              ...text,
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              backgroundColor: canSubmit ? "#f17c63" : "#eda391",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: canSubmit && !loading ? "pointer" : "not-allowed",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Création..." : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}

const text: React.CSSProperties = {
  fontFamily: "'Sora', sans-serif",
  color: "#1f2937",
};

const labelStyle: React.CSSProperties = {
  ...text,
  display: "flex",
  flexDirection: "column",
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "16px",
  gap: "6px",
};

const inputStyle: React.CSSProperties = {
  ...text,
  fontSize: "14px",
  fontWeight: 400,
  padding: "10px 12px",
  borderRadius: "10px",
  border: "1px solid #edc79e",
  outline: "none",
  backgroundColor: "#FBF1E7",
};

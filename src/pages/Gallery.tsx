import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTemplates } from "../templates/registry";
import CreateTemplateModal from "../components/CreateTemplateModal";

export default function Gallery() {
  const templates = getTemplates();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreated = (slug: string) => {
    setModalOpen(false);
    navigate(`/preview/${slug}`);
    // HMR will pick up the new files — a page reload may be needed
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <header
        style={{
          padding: "32px 24px 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "28px",
            fontWeight: 700,
            color: "#1f2937",
            margin: "0 0 4px",
          }}
        >
          Plan'Appétit — Emails
        </h1>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
            color: "#374151",
            margin: 0,
          }}
        >
          {templates.length} template{templates.length !== 1 && "s"}
        </p>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {templates.map((t) => (
          <Link
            key={t.id}
            to={`/preview/${t.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #edc79e",
                padding: "24px",
                cursor: "pointer",
                transition: "transform 0.15s, box-shadow 0.15s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(241,124,99,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#FBF1E7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  marginBottom: "16px",
                }}
              >
                ✉️
              </div>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1f2937",
                  margin: "0 0 6px",
                }}
              >
                {t.meta.name}
              </h3>
              <p
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "13px",
                  color: "#374151",
                  margin: "0 0 12px",
                  flex: 1,
                }}
              >
                {t.meta.description}
              </p>
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "11px",
                  color: "#9ca3af",
                }}
              >
                {t.meta.createdAt}
              </span>
            </div>
          </Link>
        ))}

        {/* Create card */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            backgroundColor: "transparent",
            borderRadius: "16px",
            border: "2px dashed #eda391",
            padding: "24px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "160px",
            transition: "border-color 0.15s, background-color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#f17c63";
            e.currentTarget.style.backgroundColor = "rgba(241,124,99,0.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#eda391";
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#FBF1E7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "#f17c63",
              fontWeight: 300,
              marginBottom: "12px",
            }}
          >
            +
          </div>
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#f17c63",
            }}
          >
            Nouveau template
          </span>
        </div>
      </main>

      <CreateTemplateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback, createElement } from "react";
import { render } from "@react-email/render";
import { getTemplate } from "../templates/registry";

type Viewport = "desktop" | "mobile";

export default function Preview() {
  const { templateId } = useParams<{ templateId: string }>();
  const entry = getTemplate(templateId!);
  const [viewport, setViewport] = useState<Viewport>(
    () => (sessionStorage.getItem("email-viewport") as Viewport) || "desktop"
  );
  const [html, setHtml] = useState("");
  const [exporting, setExporting] = useState(false);
  const [exportMsg, setExportMsg] = useState("");

  // Re-render HTML whenever the component reference changes (HMR swaps it)
  const Component = entry?.component;
  useEffect(() => {
    if (!Component) return;
    let cancelled = false;
    render(createElement(Component), { pretty: true }).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => { cancelled = true; };
  }, [Component]);

  const handleExport = useCallback(async () => {
    if (!html || !entry) return;
    setExporting(true);
    setExportMsg("");
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: entry.id, html }),
      });
      const data = await res.json();
      if (data.success) {
        setExportMsg(`Exporté → ${data.path}`);
      } else {
        setExportMsg(`Erreur: ${data.error}`);
      }
    } catch (e: any) {
      setExportMsg(`Erreur: ${e.message}`);
    }
    setExporting(false);
    setTimeout(() => setExportMsg(""), 5000);
  }, [html, entry]);

  const handleCopyHtml = useCallback(() => {
    navigator.clipboard.writeText(html);
    setExportMsg("HTML copié !");
    setTimeout(() => setExportMsg(""), 3000);
  }, [html]);

  if (!entry) {
    return (
      <div style={{ padding: "48px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: "16px" }}>
          Template "{templateId}" introuvable.
        </p>
        <Link
          to="/"
          style={{
            color: "#f17c63",
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
          }}
        >
          ← Retour
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Toolbar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "16px 24px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #edc79e",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "13px",
            color: "#f17c63",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← Retour
        </Link>
        <span
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "15px",
            fontWeight: 600,
            color: "#1f2937",
            flex: 1,
          }}
        >
          {entry.meta.name}
        </span>

        {/* Viewport toggle */}
        <div
          style={{
            display: "flex",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #edc79e",
          }}
        >
          {(["desktop", "mobile"] as Viewport[]).map((v) => (
            <button
              key={v}
              onClick={() => {
                setViewport(v);
                sessionStorage.setItem("email-viewport", v);
              }}
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                padding: "6px 14px",
                border: "none",
                cursor: "pointer",
                backgroundColor: viewport === v ? "#f17c63" : "#ffffff",
                color: viewport === v ? "#ffffff" : "#374151",
                transition: "all 0.15s",
              }}
            >
              {v === "desktop" ? "Desktop" : "Mobile"}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopyHtml}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            padding: "6px 14px",
            border: "1px solid #edc79e",
            borderRadius: "8px",
            cursor: "pointer",
            backgroundColor: "#FBF1E7",
            color: "#374151",
          }}
        >
          Copier HTML
        </button>

        <button
          onClick={handleExport}
          disabled={exporting || !html}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: exporting ? "wait" : "pointer",
            backgroundColor: "#f17c63",
            color: "#ffffff",
            opacity: exporting ? 0.7 : 1,
          }}
        >
          {exporting ? "Export..." : "Exporter HTML"}
        </button>

        {exportMsg && (
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "12px",
              color: exportMsg.startsWith("Erreur") ? "#ef4444" : "#3d8f7c",
              width: "100%",
              marginTop: "4px",
            }}
          >
            {exportMsg}
          </span>
        )}
      </header>

      {/* Preview area — iframe isolates email HTML from app DOM */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "32px 16px",
          backgroundColor: "#F6E3CF",
          overflow: "auto",
        }}
      >
        <iframe
          srcDoc={html}
          title="Email Preview"
          style={{
            width: viewport === "desktop" ? "700px" : "375px",
            maxWidth: "100%",
            height: "calc(100vh - 120px)",
            border: "1px solid #edc79e",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            transition: "width 0.3s ease",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        />
      </main>
    </div>
  );
}

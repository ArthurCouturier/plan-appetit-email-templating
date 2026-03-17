import type { ComponentType } from "react";

export interface TemplateMeta {
  name: string;
  description: string;
  createdAt: string;
}

export interface TemplateEntry {
  id: string;
  meta: TemplateMeta;
  component: ComponentType;
}

const modules = import.meta.glob<{ default: ComponentType }>("./*/index.tsx", {
  eager: true,
});

const metas = import.meta.glob<TemplateMeta>("./*/meta.json", {
  eager: true,
  import: "default",
});

export function getTemplates(): TemplateEntry[] {
  return Object.entries(modules).map(([path, mod]) => {
    const id = path.split("/")[1];
    const metaPath = `./${id}/meta.json`;
    const meta = metas[metaPath] ?? {
      name: id,
      description: "",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    return { id, meta, component: mod.default };
  });
}

export function getTemplate(id: string): TemplateEntry | undefined {
  return getTemplates().find((t) => t.id === id);
}

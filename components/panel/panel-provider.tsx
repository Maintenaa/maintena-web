"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { BreadcrumbItem } from "../nav-breadcrumb";
import PanelContent from "./panel-content";

export interface PanelContext {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void;
}

export const PanelContext = createContext({} as PanelContext);

export function usePanelContext() {
  return useContext(PanelContext);
}

export function PanelProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  return (
    <PanelContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      <PanelContent breadcrumbs={breadcrumbs}>{children}</PanelContent>
    </PanelContext.Provider>
  );
}

"use client";

import { usePanelContext } from "@/components/panel/panel-provider";
import { useEffect } from "react";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();

  useEffect(() => {
    setBreadcrumbs([["Assets", "/assets"], ["Create"]]);
  }, []);

  return (
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem doloribus ea
      beatae odio excepturi, at commodi. Voluptatum, quam ratione sint, sunt
      distinctio quis architecto ipsum veniam, rerum vitae ducimus hic?
    </div>
  );
}

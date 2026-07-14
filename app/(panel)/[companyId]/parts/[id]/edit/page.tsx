"use client";

import PartForm from "@/components/panel/part/part-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useGetPartById } from "@/hooks/part/use-get-part-by-id";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs } = usePanelContext();

  const {
    query: { data },
  } = useGetPartById(id);

  useEffect(() => {
    setBreadcrumbs([["Parts", "/parts"], ["Edit Part"]]);
  }, []);

  if (!data) return null;

  return <PartForm part={data} />;
}

"use client";

import PositionForm from "@/components/panel/position/position-form";
import { usePanelContext } from "@/components/panel/panel-provider";
import { useGetPositionById } from "@/hooks/position/use-get-position-by-id";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const { setBreadcrumbs } = usePanelContext();

  const {
    query: { data },
  } = useGetPositionById(id);

  useEffect(() => {
    setBreadcrumbs([["Positions", "/positions"], ["Edit Position"]]);
  }, []);

  if (!data) return null;

  return <PositionForm position={data} />;
}

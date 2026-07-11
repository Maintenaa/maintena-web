"use client";

import { CloudDrizzleIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon?: React.ElementType;
}

export function NoRecord({
  title,
  description,
  icon: Icon = CloudDrizzleIcon,
}: Props) {
  return (
    <div className="py-20 flex items-center justify-center flex-col gap-4 text-center">
      <Icon className="size-20 text-muted-foreground/60" />

      <div className="text-center space-y-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

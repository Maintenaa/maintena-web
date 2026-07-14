import { useCompany } from "@/components/provider/company-provider";
import { usePathname } from "next/navigation";

export const UUID_REGEX = /.{8}-.{4}-.{4}-.{4}-.{12}/;

export function usePanelPath() {
  const pathname = usePathname();
  const { currentCompany } = useCompany();

  function panelUrl(path?: string) {
    return `/${currentCompany?.id}${path || ""}`.replaceAll(/\/{2,}/g, "/");
  }

  function isPanelPathActive(match: string) {
    const founds = UUID_REGEX.exec(window.location.pathname);
    const normalizedPath = founds
      ? pathname.replace(`/${founds[0]}`, "") || "/"
      : pathname;

    if (match.endsWith("*")) {
      return normalizedPath.startsWith(match.replace("*", ""));
    } else {
      return normalizedPath === match;
    }
  }

  return { panelUrl, isPanelPathActive };
}

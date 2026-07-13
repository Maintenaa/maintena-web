import { useCompany } from "@/modules/company/context/company-context";

export const UUID_REGEX = /.{8}-.{4}-.{4}-.{4}-.{12}/;

export function usePanelPath() {
  const { currentCompany } = useCompany();

  function panelUrl(path?: string) {
    return `/${currentCompany?.id}${path || ""}`.replaceAll(/\/{2,}/g, "/");
  }

  function isPanelPathActive(path: string, match: string) {
    const founds = UUID_REGEX.exec(window.location.pathname);
    const normalizedPath = founds
      ? path.replace(`/${founds[0]}`, "") || "/"
      : path;

    if (match.endsWith("*")) {
      return normalizedPath.startsWith(match.replace("*", ""));
    } else {
      return normalizedPath === match;
    }
  }

  return { panelUrl, isPanelPathActive };
}

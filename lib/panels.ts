import { isClient } from "./utils";

export const UUID_REGEX = /.{8}-.{4}-.{4}-.{4}-.{12}/;

export function panelUrl(path?: string) {
  if (!isClient) return path || "/";

  const founds = UUID_REGEX.exec(window.location.pathname);
  const basepath = founds ? founds[0].toString() : "/";

  return `/${basepath}${path || ""}`.replaceAll(/\/{2,}/g, "/");
}

export function isPanelPathActive(path: string, match: string) {
  if (!isClient) return false;

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

import { KumaHeartbeat } from "./types";

export function statusText(status?: number) {
  switch (status) {
    case 1:
      return "UP";
    case 0:
      return "DOWN";
    case 2:
      return "PENDING";
    case 3:
      return "MAINTENANCE";
    default:
      return "UNKNOWN";
  }
}

export function statusColorClasses(status?: number) {
  const map: Record<number, { text: string; bg: string }> = {
    1: { text: "text-green-700", bg: "bg-green-100" },
    0: { text: "text-red-700", bg: "bg-red-100" },
    3: { text: "text-orange-600", bg: "bg-orange-100" },
    2: { text: "text-gray-600", bg: "bg-gray-200" },
  };

  return (
    (status != undefined && map[status]) || {
      text: "text-gray-600",
      bg: "bg-gray-200",
    }
  );
}

export function getLatestHeartbeat(
  list?: KumaHeartbeat[],
): KumaHeartbeat | undefined {
  if (!list || list.length === 0) return undefined;
  return list.reduce((latest, curr) =>
    new Date(curr.time).getTime() > new Date(latest.time).getTime()
      ? curr
      : latest,
  );
}

export function formatPercent(value?: number) {
  if (value == undefined || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}

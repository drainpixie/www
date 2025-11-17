import "server-only";

import {
  KumaMonitor,
  KumaStatusPageData,
  KumaHeartbeatsResponse,
  MonitorWithMetrics,
} from "./types";
import { getLatestHeartbeat } from "./utils";

export async function fetchStatusPageMonitors(
  baseUrl: string,
  slug: string,
): Promise<KumaMonitor[]> {
  const res = await fetch(`${baseUrl}/api/status-page/${slug}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch status page: ${res.status} ${res.statusText} ${text}`,
    );
  }

  const data: KumaStatusPageData = await res.json();

  const monitors: KumaMonitor[] = [];
  const groups = data.publicGroupList ?? [];

  for (const group of groups) {
    for (const monitor of group.monitorList ?? []) {
      if (typeof monitor.id === "number") {
        monitors.push(monitor);
      }
    }
  }

  return monitors;
}

export async function fetchHeartbeats(
  baseUrl: string,
  slug: string,
): Promise<KumaHeartbeatsResponse> {
  const res = await fetch(`${baseUrl}/api/status-page/heartbeat/${slug}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch heartbeats: ${res.status} ${res.statusText} ${text}`,
    );
  }

  const data: KumaHeartbeatsResponse = await res.json();
  return data;
}

export async function fetchMonitorsWithMetrics(): Promise<
  MonitorWithMetrics[]
> {
  const baseUrl = process.env.KUMA_URL;
  const slug = process.env.KUMA_SLUG ?? "rin";

  if (!baseUrl) throw new Error("KUMA_URL environment variable is not set");

  const [monitors, heartbeats] = await Promise.all([
    fetchStatusPageMonitors(baseUrl, slug),
    fetchHeartbeats(baseUrl, slug),
  ]);

  const result: MonitorWithMetrics[] = monitors.map((m) => {
    const idStr = String(m.id);
    const hbList = heartbeats.heartbeatList?.[idStr] || [];
    const latest = getLatestHeartbeat(hbList);
    const uptime24h = heartbeats.uptimeList?.[`${m.id}_24`];
    const currentStatus = latest?.status;

    return {
      ...m,
      latestHeartbeat: latest,
      uptime24h,
      currentStatus,
    };
  });

  return result;
}

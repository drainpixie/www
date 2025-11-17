// NOTE: API definitions are approximate

type Status = 0 | 1 | 2 | 3;

export interface KumaMonitor {
  id: number;
  name: string;
  type?: string;
  url?: string;
}

export interface KumaStatusPageData {
  publicGroupList?: {
    id: number;
    name: string;
    weight: number;
    monitorList: KumaMonitor[];
  }[];
}

export interface KumaHeartbeat {
  status: Status;
  time: string;
  msg?: string;
  ping?: number | null;
}

export interface KumaHeartbeatsResponse {
  heartbeatList: Record<string, KumaHeartbeat[]>;
  uptimeList: Record<string, number>;
}

export interface MonitorWithMetrics extends KumaMonitor {
  latestHeartbeat?: KumaHeartbeat;
  uptime24h?: number;
  currentStatus?: Status;
}

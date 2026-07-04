export type Period = "30d" | "90d" | "6m" | "12m";

export type ChartPoint = {
  label: string;
  value: number;
};

export type StatKey = "bounce_rate" | "pages_per_visit" | "monthly_visits" | "visit_duration";

export type StatDatum = {
  key: StatKey;
  value: string;
  percent: string;
};

const chartByPeriod: Record<Period, ChartPoint[]> = {
  "30d": [
    { label: "W1", value: 18000 },
    { label: "W2", value: 24500 },
    { label: "W3", value: 15200 },
    { label: "W4", value: 27800 },
  ],
  "90d": [
    { label: "Jan", value: 12500 },
    { label: "Feb", value: 21000 },
    { label: "Mar", value: 29603 },
    { label: "Apr", value: 16800 },
    { label: "May", value: 25400 },
    { label: "Jun", value: 33200 },
  ],
  "6m": [
    { label: "Feb", value: 21000 },
    { label: "Mar", value: 29603 },
    { label: "Apr", value: 16800 },
    { label: "May", value: 25400 },
    { label: "Jun", value: 33200 },
    { label: "Jul", value: 30100 },
  ],
  "12m": [
    { label: "Aug", value: 14200 },
    { label: "Sep", value: 19800 },
    { label: "Oct", value: 22600 },
    { label: "Nov", value: 26900 },
    { label: "Dec", value: 31500 },
    { label: "Jan", value: 12500 },
    { label: "Feb", value: 21000 },
    { label: "Mar", value: 29603 },
    { label: "Apr", value: 16800 },
    { label: "May", value: 25400 },
    { label: "Jun", value: 33200 },
    { label: "Jul", value: 30100 },
  ],
};

const statsByPeriod: Record<Period, StatDatum[]> = {
  "30d": [
    { key: "bounce_rate", value: "38.10%", percent: "24%" },
    { key: "pages_per_visit", value: "3.90", percent: "12%" },
    { key: "monthly_visits", value: "298.40K", percent: "58%" },
    { key: "visit_duration", value: "00:02:58", percent: "9%" },
  ],
  "90d": [
    { key: "bounce_rate", value: "42.34%", percent: "30%" },
    { key: "pages_per_visit", value: "4.20", percent: "19%" },
    { key: "monthly_visits", value: "324.60K", percent: "65%" },
    { key: "visit_duration", value: "00:03:27", percent: "2.4%" },
  ],
  "6m": [
    { key: "bounce_rate", value: "40.85%", percent: "27%" },
    { key: "pages_per_visit", value: "4.05", percent: "15%" },
    { key: "monthly_visits", value: "312.10K", percent: "61%" },
    { key: "visit_duration", value: "00:03:12", percent: "5%" },
  ],
  "12m": [
    { key: "bounce_rate", value: "39.72%", percent: "22%" },
    { key: "pages_per_visit", value: "4.35", percent: "26%" },
    { key: "monthly_visits", value: "356.80K", percent: "70%" },
    { key: "visit_duration", value: "00:03:41", percent: "11%" },
  ],
};

export function getChartData(period: Period) {
  return chartByPeriod[period];
}

export function getStatsData(period: Period) {
  return statsByPeriod[period];
}

export type InvoiceStatus = "viewed" | "pending" | "overdue";

export type Invoice = {
  id: string;
  number: string;
  clientName: string;
  date: string;
  amount: string;
  status: InvoiceStatus;
};

export const invoices: Invoice[] = [
  {
    id: "1",
    number: "#00106",
    clientName: "Mindtickle",
    date: "2 Sep, 2020",
    amount: "$3,500",
    status: "viewed",
  },
  {
    id: "2",
    number: "#00105",
    clientName: "Cleancloud",
    date: "1 Sep, 2020",
    amount: "$2,000",
    status: "viewed",
  },
  {
    id: "3",
    number: "#00104",
    clientName: "Mindtickle",
    date: "2 Sep, 2020",
    amount: "$3,500",
    status: "pending",
  },
];

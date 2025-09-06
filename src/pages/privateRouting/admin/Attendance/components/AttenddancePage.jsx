import React from "react";

/* ===================== Shared (data + helpers) ===================== */
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Avatar,
  Button,
  Input,
  Dropdown,
  Option,
  Divider,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
  parseISO,
} from "date-fns";

// ------- SAMPLE DATA --------
const SAMPLE_DAYS = [
  {
    date: "2024-01-01",
    statuses: ["present"],
    checkIn: "9:10 AM",
    checkOut: "6:10 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  { date: "2024-01-02", statuses: ["absent"] },
  {
    date: "2024-01-03",
    statuses: ["present", "late"],
    checkIn: "9:25 AM",
    checkOut: "6:30 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-04",
    statuses: ["present"],
    checkIn: "9:05 AM",
    checkOut: "6:00 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-05",
    statuses: ["present", "overtime"],
    checkIn: "9:00 AM",
    checkOut: "7:45 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-06",
    statuses: ["late"],
    checkIn: "10:05 AM",
    checkOut: "6:20 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-08",
    statuses: ["present"],
    checkIn: "9:12 AM",
    checkOut: "6:00 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-11",
    statuses: ["present"],
    checkIn: "9:08 AM",
    checkOut: "6:04 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-12",
    statuses: ["present"],
    checkIn: "9:11 AM",
    checkOut: "6:20 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  { date: "2024-01-15", statuses: ["absent"] },
  {
    date: "2024-01-16",
    statuses: ["present"],
    checkIn: "9:10 AM",
    checkOut: "6:10 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-17",
    statuses: ["present"],
    checkIn: "9:14 AM",
    checkOut: "6:00 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-18",
    statuses: ["present"],
    checkIn: "9:09 AM",
    checkOut: "6:05 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-19",
    statuses: ["present", "overtime"],
    checkIn: "9:00 AM",
    checkOut: "7:15 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-22",
    statuses: ["present"],
    checkIn: "9:06 AM",
    checkOut: "6:03 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-25",
    statuses: ["present"],
    checkIn: "9:15 AM",
    checkOut: "6:30 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-29",
    statuses: ["late"],
    checkIn: "10:00 AM",
    checkOut: "6:30 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-30",
    statuses: ["present"],
    checkIn: "9:05 AM",
    checkOut: "6:00 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
  {
    date: "2024-01-31",
    statuses: ["present"],
    checkIn: "9:12 AM",
    checkOut: "6:05 PM",
    location: "Mumbai Office",
    project: "Villa",
    supervisor: "Rajesh Kumar",
  },
];

const STATUS_COLORS = {
  present: "#16A34A", // green-600
  absent: "#EF4444", // red-500
  overtime: "#7C3AED", // violet-600
  late: "#F59E0B", // amber-500
};

function findDayInfo(map, d) {
  const key = format(d, "yyyy-MM-dd");
  return map[key];
}
function buildMap(items) {
  const m = {};
  items.forEach((i) => (m[i.date] = i));
  return m;
}

/* ===================== FLUENT UI (primary) ===================== */
const useStyles = makeStyles({
  page: {
    backgroundColor: tokens.colorNeutralBackground4,
    minHeight: "100vh",
    padding: "16px",
  },
  backRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    cursor: "pointer",
  },
  headerCard: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    borderColor: tokens.colorNeutralStroke2,
    marginBottom: "16px",
  },
  headerGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gap: "16px",
    alignItems: "center",
  },
  person: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  label: {
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },
  value: {
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
  },
  filtersRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: "12px",
    alignItems: "center",
    marginBottom: "12px",
  },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "12px",
  },
  card: {
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    borderColor: tokens.colorNeutralStroke2,
  },
  calendarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px",
  },
  dayCell: {
    position: "relative",
    background: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    padding: "10px 8px",
    minHeight: "56px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    cursor: "pointer",
  },
  outsideMonth: { opacity: 0.45 },
  selected: {
    outline: `2px solid ${tokens.colorPaletteBlueBorderActive}`,
    background: tokens.colorSubtleBackgroundSelected,
  },
  dayNumber: { fontSize: "12px", color: tokens.colorNeutralForeground3 },
  dotRow: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dot: { width: "8px", height: "8px", borderRadius: "999px" },
  legend: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginTop: "10px",
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },
  detailList: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    rowGap: "10px",
  },
  subtle: { color: tokens.colorNeutralForeground3 },
  pill: {
    background: tokens.colorNeutralBackground2,
    ...shorthands.padding("6px", "10px"),
    ...shorthands.borderRadius("999px"),
    fontSize: "12px",
  },
});

export function AttendancePageFluent() {
  const styles = useStyles();
  const [monthCursor, setMonthCursor] = React.useState(parseISO("2024-01-01"));
  const [selected, setSelected] = React.useState(parseISO("2024-01-25"));
  const [project, setProject] = React.useState("All Projects");
  const [query, setQuery] = React.useState("");

  const map = React.useMemo(() => buildMap(SAMPLE_DAYS), []);
  const monthStart = startOfMonth(monthCursor);
  const monthEnd = endOfMonth(monthCursor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const weeks = [];
  let day = gridStart;
  while (day <= gridEnd) {
    const row = [];
    for (let i = 0; i < 7; i++) {
      row.push(day);
      day = addDays(day, 1);
    }
    weeks.push(row);
  }

  const detail = findDayInfo(map, selected);

  return (
    <div className={styles.page}>
      {/* Back */}
      <div className={styles.backRow} role="button" tabIndex={0}>
        <ArrowLeft24Regular />
        <span>Back</span>
      </div>

      {/* Top info card */}
      <Card appearance="outline" className={styles.headerCard}>
        <div className={styles.headerGrid} style={{ padding: 16 }}>
          <div className={styles.person}>
            <Avatar
              name="Girish Jewargi"
              image={{ src: "https://i.pravatar.cc/80?img=12" }}
              size={40}
            />
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>
                Girish Jewargi
              </div>
              <div className={styles.subtle}>Worker</div>
            </div>
          </div>

          <div>
            <div className={styles.label}>Location</div>
            <div className={styles.value}>Mumbai Office</div>
            <div className={styles.label} style={{ marginTop: 10 }}>
              Email
            </div>
            <div className={styles.value}>priya.sarpanch@company.com</div>
            <div className={styles.label} style={{ marginTop: 10 }}>
              User ID
            </div>
            <div className={styles.value}>#EMP-2024-0156</div>
          </div>

          <div>
            <div className={styles.label}>Last Check-in</div>
            <div className={styles.value}>Today, 9:15 AM</div>
            <div className={styles.label} style={{ marginTop: 10 }}>
              Days Present (Jan)
            </div>
            <div className={styles.value}>18 days</div>
            <div className={styles.label} style={{ marginTop: 10 }}>
              Total Absences
            </div>
            <div className={styles.value}>3 days</div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className={styles.filtersRow}>
        <Dropdown
          aria-label="Month"
          selectedOptions={[format(monthStart, "MMMM yyyy")]}
          onOptionSelect={(_, data) => {
            const m = new Date(`${data.optionValue}-01`);
            if (!Number.isNaN(m.getTime())) setMonthCursor(m);
          }}
        >
          {[
            "2024-01",
            "2024-02",
            "2024-03",
            "2024-04",
            "2024-05",
            "2024-06",
            "2024-07",
            "2024-08",
            "2024-09",
            "2024-10",
            "2024-11",
            "2024-12",
          ].map((iso) => (
            <Option value={iso} key={iso}>
              {format(new Date(`${iso}-01`), "MMMM yyyy")}
            </Option>
          ))}
        </Dropdown>

        <Dropdown
          aria-label="Project"
          selectedOptions={[project]}
          onOptionSelect={(_, data) =>
            setProject(data.optionValue || "All Projects")
          }
        >
          {["All Projects", "Villa", "Mall", "Township"].map((p) => (
            <Option value={p} key={p}>
              {p}
            </Option>
          ))}
        </Dropdown>

        <div
          style={{
            justifySelf: "end",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            contentBefore={<Search24Regular />}
            placeholder="Quick search"
            value={query}
            onChange={(_, d) => setQuery(d.value)}
          />
          <Avatar image={{ src: "https://i.pravatar.cc/64?img=68" }} />
        </div>
      </div>

      {/* Main grid */}
      <div className={styles.mainGrid}>
        {/* Calendar */}
        <Card appearance="outline" className={styles.card}>
          <div style={{ padding: 16 }}>
            <div className={styles.calendarHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Button
                  icon={<ChevronLeft20Regular />}
                  appearance="subtle"
                  onClick={() => setMonthCursor(addMonths(monthCursor, -1))}
                />
                <div style={{ fontWeight: 600 }}>
                  {format(monthStart, "MMMM yyyy")}
                </div>
                <Button
                  icon={<ChevronRight20Regular />}
                  appearance="subtle"
                  onClick={() => setMonthCursor(addMonths(monthCursor, 1))}
                />
              </div>
              <Button
                appearance="secondary"
                onClick={() => setMonthCursor(new Date(2024, 0, 1))}
              >
                Today
              </Button>
            </div>

            <div className={styles.weekRow} style={{ marginBottom: 6 }}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div
                  key={d}
                  className={styles.subtle}
                  style={{ textAlign: "center", fontSize: 12 }}
                >
                  {d}
                </div>
              ))}
            </div>

            {weeks.map((row, idx) => (
              <div className={styles.weekRow} key={idx}>
                {row.map((d) => {
                  const info = findDayInfo(map, d);
                  const isOut = !isSameMonth(d, monthStart);
                  const isSel = isSameDay(d, selected);
                  return (
                    <Tooltip
                      key={d.toISOString()}
                      content={
                        info
                          ? `${format(d, "MMM d")}: ${info.statuses.join(", ")}`
                          : format(d, "MMM d")
                      }
                      relationship="label"
                    >
                      <div
                        className={[
                          styles.dayCell,
                          isOut ? styles.outsideMonth : "",
                          isSel ? styles.selected : "",
                        ].join(" ")}
                        onClick={() => setSelected(d)}
                        role="button"
                      >
                        <div className={styles.dayNumber}>{format(d, "d")}</div>
                        <div className={styles.dotRow}>
                          {(info?.statuses || []).map((s) => (
                            <span
                              key={s}
                              className={styles.dot}
                              style={{ background: STATUS_COLORS[s] }}
                            />
                          ))}
                        </div>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
            ))}

            <div className={styles.legend}>
              {["present", "absent", "overtime", "late"].map((s) => (
                <span
                  key={s}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    className={styles.dot}
                    style={{ background: STATUS_COLORS[s] }}
                  />
                  <span style={{ textTransform: "capitalize" }}>{s}</span>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Day details */}
        <Card appearance="outline" className={styles.card}>
          <div style={{ padding: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              {format(selected, "MMMM d, yyyy")}
            </div>
            <div className={styles.subtle} style={{ marginBottom: 12 }}>
              {format(selected, "EEEE")}
            </div>
            <Divider />
            <div className={styles.detailList} style={{ marginTop: 12 }}>
              <div className={styles.subtle}>Check-In</div>
              <div>{detail?.checkIn || "-"}</div>
              <div className={styles.subtle}>Check-Out</div>
              <div>{detail?.checkOut || "-"}</div>
              <div className={styles.subtle}>Total Hours</div>
              <div>{detail?.checkIn && detail?.checkOut ? "9h 15m" : "-"}</div>
              <div className={styles.subtle}>Location</div>
              <div>{detail?.location || "-"}</div>
              <div className={styles.subtle}>Project</div>
              <div>{detail?.project || "-"}</div>
              <div className={styles.subtle}>Supervisor</div>
              <div>{detail?.supervisor || "-"}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  className={styles.dot}
                  style={{ background: STATUS_COLORS.present }}
                />
                <span className={styles.subtle}>Check - in</span>
                <span className={styles.pill}>Arrival Time at Site</span>
                <span>{detail?.checkIn || "-"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 8,
                }}
              >
                <span
                  className={styles.dot}
                  style={{ background: STATUS_COLORS.late }}
                />
                <span className={styles.subtle}>Check - Out</span>
                <span className={styles.pill}>Leaving Time at Site</span>
                <span>{detail?.checkOut || "-"}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

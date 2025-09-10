// // AttendanceCalendar.jsx
// import * as React from "react";
// import { Stack, PrimaryButton, Dialog, IconButton } from "@fluentui/react";
// import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
// import {
//   addMonths,
//   subMonths,
//   format,
//   startOfMonth,
//   endOfMonth,
//   startOfWeek,
//   endOfWeek,
//   addDays,
//   isSameMonth,
//   isToday,
// } from "date-fns";

// const STATUS = {
//   Present: { tile: "#E7F6EC", dot: "#107C10", label: "Present" },
//   Absent: { tile: "#FDE7E9", dot: "#A4262C", label: "Absent" },
//   Overtime: { tile: "#EEE8F9", dot: "#5C2E91", label: "Overtime" },
//   Late: { tile: "#FFF3D6", dot: "#C19C00", label: "Late" },
//   earlyLeave: { tile: "#FFF3D6", dot: "#C19C00", label: "Early Leave" },
// };
// const WEEKEND_BG = "#F3F2F1";
// const OUTSIDE_BG = "#F5F5F5";
// const BORDER = "#E1DFDD";
// const RADIUS = 12;
// const MONTHS = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];
// const keyOf = (d) => format(d, "yyyy-MM-dd");

// // simple helper to style chevrons like disabled buttons
// const chevronStyle = (disabled) => ({
//   fontSize: 26,
//   cursor: disabled ? "not-allowed" : "pointer",
//   opacity: disabled ? 0.3 : 1,
//   pointerEvents: disabled ? "none" : "auto",
// });

// export default function AttendanceCalendar({
//   // statusMap = {},
//   holidays = [],
//   data,
//   initialMonth = new Date(), // e.g., new Date(2025, 8) for Sep 2025
//   minMonth = null, // optional: Date to cap left navigation
//   onMonthChange,
//   setSelectedDate,
// }) {
//   const today = new Date();
//   const currentMonth = startOfMonth(today);
//   const [viewDate, setViewDate] = React.useState(startOfMonth(initialMonth));

//   const statusMap = React.useMemo(() => {
//     const map = {};
//     data?.forEach((item) => {
//       if (item.attendanceDate && item.status) {
//         map[item.attendanceDate] = item.status;
//       }
//     });
//     return map;
//   }, [data]);

//   const holidayMap = React.useMemo(() => {
//     const map = {};
//     holidays.forEach((h) => {
//       const d = new Date(h.date * 1000); // your dates are in seconds
//       map[format(d, "yyyy-MM-dd")] = h.holidayName;
//     });
//     return map;
//   }, [holidays]);

//   // month grid window
//   const monthStart = startOfMonth(viewDate);
//   const monthEnd = endOfMonth(viewDate);
//   const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
//   const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

//   // navigation guards
//   const minStart = minMonth ? startOfMonth(minMonth) : null;
//   const canGoPrev = !minStart || viewDate > minStart;
//   const canGoNext = viewDate < currentMonth; // don't go into the future

//   const goPrev = () => {
//     if (!canGoPrev) return;
//     const d = subMonths(viewDate, 1);
//     setViewDate(d);
//     onMonthChange?.(d);
//   };
//   const goNext = () => {
//     if (!canGoNext) return;
//     const d = addMonths(viewDate, 1);
//     setViewDate(d);
//     onMonthChange?.(d);
//   };
//   const goToday = () => {
//     setViewDate(currentMonth);
//     onMonthChange?.(currentMonth);
//   };

//   // ---------- MONTH/YEAR PICKER MODAL ----------
//   const [pickerOpen, setPickerOpen] = React.useState(false);
//   const [pickerYear, setPickerYear] = React.useState(viewDate.getFullYear());

//   const openPicker = () => {
//     setPickerYear(viewDate.getFullYear());
//     setPickerOpen(true);
//   };
//   const closePicker = () => setPickerOpen(false);

//   const yearCanDec =
//     !minStart ||
//     new Date(pickerYear, 0, 1) > new Date(minStart.getFullYear(), 0, 1);
//   const yearCanInc = new Date(pickerYear, 11, 1) < currentMonth;

//   const changeYear = (delta) => {
//     const next = pickerYear + delta;
//     // clamp against min & current
//     if (delta < 0 && !yearCanDec) return;
//     if (delta > 0 && !yearCanInc) return;
//     setPickerYear(next);
//   };

//   const monthInRange = (year, mIdx) => {
//     const m = startOfMonth(new Date(year, mIdx, 1));
//     if (minStart && m < minStart) return false;
//     if (m > currentMonth) return false;
//     return true;
//   };

//   const chooseMonth = (mIdx) => {
//     if (!monthInRange(pickerYear, mIdx)) return;
//     const d = startOfMonth(new Date(pickerYear, mIdx, 1));
//     setViewDate(d);
//     onMonthChange?.(d);
//     closePicker();
//   };

//   // ---------- header ----------
//   const Header = () => (
//     <Stack
//       horizontal
//       verticalAlign="center"
//       horizontalAlign="space-between"
//       styles={{ root: { marginBottom: 12 } }}
//     >
//       <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
//         <ChevronLeftRegular
//           onClick={goPrev}
//           style={chevronStyle(!canGoPrev)}
//           aria-label="Previous month"
//         />

//         <h2
//           onClick={openPicker}
//           style={{
//             margin: 0,
//             fontWeight: 700,
//             cursor: "pointer",
//             userSelect: "none",
//           }}
//           role="button"
//           aria-label="Open month & year picker"
//           title="Select month & year"
//         >
//           {format(viewDate, "MMMM yyyy")}
//         </h2>
//         <ChevronRightRegular
//           onClick={goNext}
//           style={chevronStyle(!canGoNext)}
//           aria-label="Next month"
//         />
//       </div>

//       <Stack horizontal tokens={{ childrenGap: 6 }} verticalAlign="center">
//         <div onClick={goToday} style={{ fontSize: "16px", cursor: "pointer" }}>
//           Today
//         </div>
//       </Stack>
//     </Stack>
//   );

//   const Weekdays = () => {
//     const base = startOfWeek(new Date(), { weekStartsOn: 0 });
//     return (
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7,1fr)",
//           marginBottom: 8,
//         }}
//       >
//         {Array.from({ length: 7 }).map((_, i) => (
//           <div key={i} style={{ textAlign: "center", fontWeight: 700 }}>
//             {format(addDays(base, i), "EEE")}
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const Cells = () => {
//     const tiles = [];
//     for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
//       const k = keyOf(d);
//       console.log(k, "k");
//       // const weekend = d.getDay() === 0 || d.getDay() === 6;
//       const inMonth = isSameMonth(d, monthStart);
//       const st = statusMap[k];
//       const holiday = holidayMap[k];

//       let bg = inMonth ? "#fff" : OUTSIDE_BG;
//       // if (weekend) bg = WEEKEND_BG;
//       if (holiday) bg = "#EDEDED";
//       if (inMonth && st && STATUS[st]) bg = STATUS[st].tile;

//       tiles.push(
//         <div
//           key={d.getTime()}
//           onClick={() => {
//             // find full object for this date
//             const selected = data?.find((item) => item.attendanceDate === k);
//             setSelectedDate?.(selected || { date: k, holiday });
//           }}
//           style={{
//             position: "relative",
//             height: 64,
//             border: `1px solid ${BORDER}`,
//             borderRadius: RADIUS,
//             background: bg,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontWeight: 600,
//             color: inMonth ? "#1B1A19" : "#B3B0AD",
//             outline: isToday(d) ? "2px solid #0078d4" : "none",
//             boxShadow: isToday(d) ? "0 0 0 3px rgba(0,120,212,.25)" : "none",
//           }}
//         >
//           {format(d, "d")}
//           {st && STATUS[st] && (
//             <span
//               title={STATUS[st].label}
//               style={{
//                 position: "absolute",
//                 bottom: 6,
//                 width: 8,
//                 height: 8,
//                 borderRadius: 8,
//                 background: STATUS[st].dot,
//               }}
//             />
//           )}
//         </div>
//       );
//     }
//     return (
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(7,1fr)",
//           gap: 10,
//         }}
//       >
//         {tiles}
//       </div>
//     );
//   };

//   const Legend = () => (
//     <Stack
//       horizontal
//       wrap
//       tokens={{ childrenGap: 14 }}
//       styles={{
//         root: { marginTop: 12, textAlign: "center", alignItems: "center" },
//       }}
//     >
//       {Object.entries(STATUS).map(([k, v]) => (
//         <Stack
//           key={k}
//           horizontal
//           verticalAlign="center"
//           tokens={{ childrenGap: 6 }}
//         >
//           <span
//             style={{ width: 8, height: 8, borderRadius: 8, background: v.dot }}
//           />
//           <span style={{ fontSize: 14 }}>{v.label}</span>
//         </Stack>
//       ))}
//     </Stack>
//   );

//   return (
//     <div
//       style={{
//         width: 480,
//         borderRadius: 16,
//         border: `1px solid ${BORDER}`,
//         padding: 16,
//         background: "#fff",
//         fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
//       }}
//     >
//       <Header />
//       <Weekdays />
//       <Cells />
//       <Legend />

//       {/* Month/Year Picker Modal */}
//       <Dialog
//         hidden={!pickerOpen}
//         onDismiss={closePicker}
//         modalProps={{ isBlocking: false }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 8,
//           }}
//         >
//           <ChevronLeftRegular
//             onClick={() => changeYear(-1)}
//             disabled={!yearCanDec}
//             aria-label="Previous year"
//             style={chevronStyle(!canGoPrev)}
//           />
//           <div style={{ fontWeight: 700, fontSize: 18 }}>{pickerYear}</div>
//           <ChevronRightRegular
//             aria-label="Next year"
//             onClick={() => changeYear(1)}
//             disabled={!yearCanInc}
//             style={{ fontSize: "26px", cursor: "pointer" }}
//           />
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(3, 1fr)",
//             gap: 8,
//           }}
//         >
//           {MONTHS.map((m, i) => {
//             const disabled = !monthInRange(pickerYear, i);
//             const isSel =
//               pickerYear === viewDate.getFullYear() &&
//               i === viewDate.getMonth();

//             return (
//               <button
//                 key={m}
//                 onClick={() => chooseMonth(i)}
//                 disabled={disabled}
//                 style={{
//                   height: 40,
//                   borderRadius: 10,
//                   border: `1px solid ${BORDER}`,
//                   background: disabled
//                     ? "#F8F8F8"
//                     : isSel
//                     ? "#E5F1FB"
//                     : "#FFFFFF",
//                   color: disabled ? "#B3B0AD" : "#1B1A19",
//                   fontWeight: 600,
//                   cursor: disabled ? "not-allowed" : "pointer",
//                 }}
//               >
//                 {m}
//               </button>
//             );
//           })}
//         </div>

//         <Stack
//           horizontal
//           horizontalAlign="end"
//           tokens={{ childrenGap: 8 }}
//           styles={{ root: { marginTop: 12 } }}
//         >
//           <PrimaryButton
//             onClick={() => {
//               goToday();
//               closePicker();
//             }}
//           >
//             Today
//           </PrimaryButton>
//         </Stack>
//       </Dialog>
//     </div>
//   );
// }

// AttendanceCalendar.jsx
import * as React from "react";
import { Stack, Dialog, PrimaryButton } from "@fluentui/react";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
} from "date-fns";

const STATUS = {
  Present: { tile: "#E7F6EC", dot: "#107C10", label: "Present" },
  Absent: { tile: "#FDE7E9", dot: "#A4262C", label: "Absent" },
  Overtime: { tile: "#EEE8F9", dot: "#5C2E91", label: "Overtime" },
  Late: { tile: "#FFF3D6", dot: "#C19C00", label: "Late" },
  earlyLeave: { tile: "#FFF3D6", dot: "#C19C00", label: "Early Leave" },
};
const OUTSIDE_BG = "#F5F5F5";
const BORDER = "#E1DFDD";
const RADIUS = 12;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const keyOf = (d) => format(d, "yyyy-MM-dd");

const chevronStyle = (disabled) => ({
  fontSize: 26,
  cursor: disabled ? "not-allowed" : "pointer",
  opacity: disabled ? 0.3 : 1,
  pointerEvents: disabled ? "none" : "auto",
});

export default function AttendanceCalendar({
  holidays = [],
  data,
  initialMonth = new Date(),
  minMonth = null,
  onMonthChange,
  setSelectedDate,
  setOpenForm,
}) {
  const today = new Date();
  const currentMonth = startOfMonth(today);
  const [viewDate, setViewDate] = React.useState(startOfMonth(initialMonth));
  const [selectedKey, setSelectedKey] = React.useState(keyOf(today));

  // modal state
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [pickerYear, setPickerYear] = React.useState(viewDate.getFullYear());

  const statusMap = React.useMemo(() => {
    const map = {};
    data?.forEach((item) => {
      if (item.attendanceDate && item.status) {
        map[item.attendanceDate] = item.status;
      }
    });
    return map;
  }, [data]);

  const holidayMap = React.useMemo(() => {
    const map = {};
    holidays.forEach((h) => {
      const d = new Date(h.date * 1000);
      map[format(d, "yyyy-MM-dd")] = h.holidayName;
    });
    return map;
  }, [holidays]);

  // grid dates
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const minStart = minMonth ? startOfMonth(minMonth) : null;
  const canGoPrev = !minStart || viewDate > minStart;
  const canGoNext = viewDate < currentMonth;

  const goPrev = () => {
    if (!canGoPrev) return;
    const d = subMonths(viewDate, 1);
    setViewDate(d);
    onMonthChange?.(d);
    setOpenForm((prev) => ({
      ...prev,
      date: Math.floor(d.getTime() / 1000),
    }));
  };
  const goNext = () => {
    if (!canGoNext) return;
    const d = addMonths(viewDate, 1);
    setViewDate(d);
    onMonthChange?.(d);
    setOpenForm((prev) => ({
      ...prev,
      date: Math.floor(d.getTime() / 1000),
    }));
  };
  const goToday = () => {
    setViewDate(currentMonth);
    setSelectedKey(keyOf(today));
    onMonthChange?.(currentMonth);
  };

  // ---- modal logic ----
  const openPicker = () => {
    setPickerYear(viewDate.getFullYear());
    setPickerOpen(true);
  };
  const closePicker = () => setPickerOpen(false);

  const changeYear = (delta) => {
    setPickerYear((prev) => prev + delta);
  };

  const chooseMonth = (mIdx) => {
    const d = startOfMonth(new Date(pickerYear, mIdx, 1));
    setViewDate(d);
    onMonthChange?.(d);
    setOpenForm((prev) => ({
      ...prev,
      date: Math.floor(d.getTime() / 1000),
    }));
    closePicker();
  };

  const Header = () => (
    <Stack
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{ root: { marginBottom: 12 } }}
    >
      <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
        <ChevronLeftRegular onClick={goPrev} style={chevronStyle(!canGoPrev)} />
        <h2
          style={{ margin: 0, fontWeight: 700, cursor: "pointer" }}
          onClick={openPicker}
        >
          {format(viewDate, "MMMM yyyy")}
        </h2>
        <ChevronRightRegular
          onClick={goNext}
          style={chevronStyle(!canGoNext)}
        />
      </div>
    </Stack>
  );

  const Weekdays = () => {
    const base = startOfWeek(new Date(), { weekStartsOn: 0 });
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          marginBottom: 8,
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{ textAlign: "center", fontWeight: 700 }}>
            {format(addDays(base, i), "EEE")}
          </div>
        ))}
      </div>
    );
  };

  const Cells = () => {
    const tiles = [];
    for (let d = gridStart; d <= gridEnd; d = addDays(d, 1)) {
      const k = keyOf(d);
      const inMonth = isSameMonth(d, monthStart);
      const st = statusMap[k];
      const holiday = holidayMap[k];
      let bg = inMonth ? "#fff" : OUTSIDE_BG;
      if (holiday) bg = "#EDEDED";
      if (inMonth && st && STATUS[st]) bg = STATUS[st].tile;
      const isSelected = selectedKey === k;

      tiles.push(
        <div
          key={d.getTime()}
          onClick={() => {
            setSelectedKey(k);
            const selected = data?.find((item) => item.attendanceDate === k);
            setSelectedDate?.(selected || { date: k, holiday });
            // setOpenForm((prev) => ({
            //   ...prev,
            //   date: Math.floor(startOfMonth(d).getTime() / 1000),
            // }));
          }}
          style={{
            position: "relative",
            height: 64,
            border: `1px solid ${BORDER}`,
            borderRadius: RADIUS,
            background: isSelected ? "#0078D4" : bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            color: isSelected ? "#fff" : inMonth ? "#1B1A19" : "#B3B0AD",
            cursor: "pointer",
          }}
        >
          {format(d, "d")}
        </div>
      );
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: 10,
        }}
      >
        {tiles}
      </div>
    );
  };

  const Legend = () => (
    <Stack
      horizontal
      wrap
      tokens={{ childrenGap: 14 }}
      styles={{
        root: { marginTop: 12, textAlign: "center", alignItems: "center" },
      }}
    >
      {Object.entries(STATUS).map(([k, v]) => (
        <Stack
          key={k}
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 6 }}
        >
          <span
            style={{ width: 8, height: 8, borderRadius: 8, background: v.dot }}
          />
          <span style={{ fontSize: 14 }}>{v.label}</span>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <div
      style={{
        width: 480,
        borderRadius: 16,
        border: `1px solid ${BORDER}`,
        padding: 16,
        background: "#fff",
      }}
    >
      <Header />
      <Weekdays />
      <Cells />
      <Legend />

      {/* ---- Year/Month Picker Modal ---- */}
      <Dialog
        hidden={!pickerOpen}
        onDismiss={closePicker}
        modalProps={{ isBlocking: false }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <ChevronLeftRegular
            onClick={() => changeYear(-1)}
            style={{ fontSize: "26px", cursor: "pointer" }}
          />
          <div style={{ fontWeight: 700, fontSize: 18 }}>{pickerYear}</div>
          <ChevronRightRegular
            onClick={() => changeYear(1)}
            style={{ fontSize: "26px", cursor: "pointer" }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 8,
          }}
        >
          {MONTHS.map((m, i) => (
            <button
              key={m}
              onClick={() => chooseMonth(i)}
              style={{
                height: 40,
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                background:
                  i === viewDate.getMonth() &&
                  pickerYear === viewDate.getFullYear()
                    ? "#E5F1FB"
                    : "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        <Stack
          horizontal
          horizontalAlign="end"
          tokens={{ childrenGap: 8 }}
          styles={{ root: { marginTop: 12 } }}
        >
          <PrimaryButton
            onClick={() => {
              goToday();
              closePicker();
            }}
          >
            Today
          </PrimaryButton>
        </Stack>
      </Dialog>
    </div>
  );
}

/* =========================================================================
   SkyManager — mock data layer
   In a real system this would come from an API. Kept here as a single
   source of truth so every page (dashboard, tickets, departures, arrivals)
   renders from the same data instead of hard-coded markup.
   ========================================================================= */

const AIRLINES = {
  PA: { name: "PakAir", icon: "bi-airplane-fill" },
  ES: { name: "EastSky", icon: "bi-airplane-engines-fill" },
  GW: { name: "GulfWing", icon: "bi-airplane-fill" },
  NV: { name: "NovaJet", icon: "bi-airplane-engines-fill" },
  BR: { name: "BlueRay Air", icon: "bi-airplane-fill" },
};

/**
 * type: "departure" | "arrival"
 * status (departure): scheduled | boarding | delayed | departed | cancelled
 * status (arrival):    scheduled | approaching | landed | delayed | cancelled
 */
const FLIGHTS = [
  { id: "FL-101", flightNo: "PA 204", airline: "PA", type: "departure", city: "Karachi (KHI)", time: "08:20", gateOrBelt: "Gate A3", terminal: "T1", status: "boarding" },
  { id: "FL-102", flightNo: "ES 118", airline: "ES", type: "departure", city: "Dubai (DXB)", time: "09:05", gateOrBelt: "Gate B7", terminal: "T2", status: "on time" },
  { id: "FL-103", flightNo: "GW 552", airline: "GW", type: "departure", city: "Doha (DOH)", time: "09:40", gateOrBelt: "Gate A1", terminal: "T1", status: "delayed" },
  { id: "FL-104", flightNo: "NV 330", airline: "NV", type: "departure", city: "Istanbul (IST)", time: "10:15", gateOrBelt: "Gate C2", terminal: "T3", status: "scheduled" },
  { id: "FL-105", flightNo: "BR 077", airline: "BR", type: "departure", city: "London (LHR)", time: "11:00", gateOrBelt: "Gate B2", terminal: "T2", status: "on time" },
  { id: "FL-106", flightNo: "PA 445", airline: "PA", type: "departure", city: "Lahore (LHE)", time: "12:30", gateOrBelt: "Gate A5", terminal: "T1", status: "cancelled" },
  { id: "FL-107", flightNo: "ES 909", airline: "ES", type: "departure", city: "Riyadh (RUH)", time: "13:10", gateOrBelt: "Gate B4", terminal: "T2", status: "scheduled" },
  { id: "FL-108", flightNo: "GW 213", airline: "GW", type: "departure", city: "Muscat (MCT)", time: "14:45", gateOrBelt: "Gate A2", terminal: "T1", status: "on time" },

  { id: "FL-201", flightNo: "NV 118", airline: "NV", type: "arrival", city: "Manchester (MAN)", time: "07:55", gateOrBelt: "Belt 4", terminal: "T3", status: "landed" },
  { id: "FL-202", flightNo: "BR 302", airline: "BR", type: "arrival", city: "Toronto (YYZ)", time: "08:40", gateOrBelt: "Belt 2", terminal: "T2", status: "landed" },
  { id: "FL-203", flightNo: "PA 611", airline: "PA", type: "arrival", city: "Jeddah (JED)", time: "09:25", gateOrBelt: "Belt 1", terminal: "T1", status: "approaching" },
  { id: "FL-204", flightNo: "ES 044", airline: "ES", type: "arrival", city: "Abu Dhabi (AUH)", time: "10:05", gateOrBelt: "Belt 5", terminal: "T2", status: "on time" },
  { id: "FL-205", flightNo: "GW 880", airline: "GW", type: "arrival", city: "Singapore (SIN)", time: "11:20", gateOrBelt: "Belt 3", terminal: "T1", status: "delayed" },
  { id: "FL-206", flightNo: "NV 265", airline: "NV", type: "arrival", city: "Toronto (YYZ)", time: "12:50", gateOrBelt: "Belt 6", terminal: "T3", status: "scheduled" },
  { id: "FL-207", flightNo: "BR 190", airline: "BR", type: "arrival", city: "Frankfurt (FRA)", time: "13:35", gateOrBelt: "Belt 2", terminal: "T2", status: "cancelled" },
  { id: "FL-208", flightNo: "PA 077", airline: "PA", type: "arrival", city: "Islamabad (ISB)", time: "15:10", gateOrBelt: "Belt 1", terminal: "T1", status: "on time" },
];

let TICKETS = [
  { id: "TKT-3001", passenger: "Ayesha Khan", email: "ayesha.khan@mail.com", flightNo: "PA 204", cls: "business", seat: "4A", date: "2026-07-19", status: "confirmed" },
  { id: "TKT-3002", passenger: "Bilal Ahmed", email: "bilal.ahmed@mail.com", flightNo: "ES 118", cls: "economy", seat: "22C", date: "2026-07-19", status: "confirmed" },
  { id: "TKT-3003", passenger: "Sara Malik", email: "sara.malik@mail.com", flightNo: "GW 552", cls: "premium", seat: "11F", date: "2026-07-20", status: "pending" },
  { id: "TKT-3004", passenger: "Hamza Farooq", email: "hamza.farooq@mail.com", flightNo: "NV 330", cls: "economy", seat: "18B", date: "2026-07-20", status: "checked-in" },
  { id: "TKT-3005", passenger: "Zainab Riaz", email: "zainab.riaz@mail.com", flightNo: "BR 077", cls: "first", seat: "1A", date: "2026-07-21", status: "confirmed" },
  { id: "TKT-3006", passenger: "Usman Tariq", email: "usman.tariq@mail.com", flightNo: "PA 445", cls: "economy", seat: "27D", date: "2026-07-18", status: "cancelled" },
  { id: "TKT-3007", passenger: "Mahnoor Iqbal", email: "mahnoor.iqbal@mail.com", flightNo: "ES 909", cls: "premium", seat: "9E", date: "2026-07-21", status: "confirmed" },
  { id: "TKT-3008", passenger: "Danish Raza", email: "danish.raza@mail.com", flightNo: "GW 213", cls: "economy", seat: "31A", date: "2026-07-22", status: "pending" },
  { id: "TKT-3009", passenger: "Kiran Shahid", email: "kiran.shahid@mail.com", flightNo: "PA 611", cls: "business", seat: "3C", date: "2026-07-18", status: "checked-in" },
  { id: "TKT-3010", passenger: "Omar Siddiqui", email: "omar.siddiqui@mail.com", flightNo: "NV 118", cls: "economy", seat: "14F", date: "2026-07-19", status: "confirmed" },
];

// Weekly flight volume (Mon-Sun) — used for the dashboard bar chart
const WEEKLY_FLIGHTS = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  departures: [18, 22, 19, 25, 27, 21, 16],
  arrivals: [16, 20, 21, 23, 24, 19, 15],
};

// Seat class distribution — used for the dashboard doughnut chart
const CLASS_DISTRIBUTION = {
  labels: ["Economy", "Premium", "Business", "First"],
  values: [58, 21, 15, 6],
};

let ticketSeq = 3011;
function nextTicketId() {
  return "TKT-" + ticketSeq++;
}

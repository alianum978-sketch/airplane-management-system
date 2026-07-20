/* =========================================================================
   AirManager — Dashboard controller
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  renderFlapBoard();
  renderRecentBookings();
  renderWeeklyChart();
  renderClassChart();
});

function renderStats() {
  const totalFlights = FLIGHTS.length;
  const activeTickets = TICKETS.filter((t) => t.status !== "cancelled").length;
  const onTimeCount = FLIGHTS.filter((f) => ["on time", "boarding", "landed", "approaching"].includes(f.status)).length;
  const onTimePct = Math.round((onTimeCount / FLIGHTS.length) * 100);
  const issues = FLIGHTS.filter((f) => ["delayed", "cancelled"].includes(f.status)).length;

  $("#statFlights").textContent = totalFlights;
  $("#statTickets").textContent = activeTickets;
  $("#statOnTime").textContent = onTimePct + "%";
  $("#statIssues").textContent = issues;
}

function renderFlapBoard() {
  const body = $("#flapBoardBody");
  const upcoming = [...FLIGHTS].sort((a, b) => a.time.localeCompare(b.time)).slice(0, 6);

  body.innerHTML = upcoming
    .map((f) => {
      const airline = AIRLINES[f.airline];
      const typeIcon = f.type === "departure" ? "bi-box-arrow-up-right" : "bi-box-arrow-in-down-left";
      return `
        <div class="flap-row">
          <div class="flap-cell">${f.flightNo}</div>
          <div class="flap-cell dim"><i class="bi ${typeIcon} flight-type-icon"></i>${f.type === "departure" ? "DEP" : "ARR"}</div>
          <div class="flap-cell dim">${escapeHtml(f.city)}</div>
          <div class="flap-cell">${f.time}</div>
          <div class="flap-cell dim">${f.gateOrBelt}</div>
          <div>${statusBadge(f.status)}</div>
        </div>`;
    })
    .join("");

  const now = new Date();
  $("#boardUpdated").textContent = "updated " + now.toLocaleTimeString("en-US", { hour12: false });
}

function renderRecentBookings() {
  const body = $("#recentBookingsBody");
  const recent = [...TICKETS].slice(-6).reverse();

  if (!recent.length) {
    body.innerHTML = `<tr class="empty-row"><td colspan="6">No bookings yet.</td></tr>`;
    return;
  }

  body.innerHTML = recent
    .map(
      (t) => `
      <tr>
        <td class="mono cell-sub">${t.id}</td>
        <td>
          <div class="passenger-cell">
            <span class="row-avatar">${initials(t.passenger)}</span>
            <div>
              <div class="cell-primary">${escapeHtml(t.passenger)}</div>
              <div class="cell-sub">${escapeHtml(t.email)}</div>
            </div>
          </div>
        </td>
        <td class="mono">${t.flightNo}</td>
        <td>${classBadge(t.cls)}</td>
        <td class="cell-sub">${formatDate(t.date)}</td>
        <td>${statusBadge(t.status)}</td>
      </tr>`
    )
    .join("");
}

function renderWeeklyChart() {
  const ctx = document.getElementById("weeklyChart");
  if (!ctx || typeof Chart === "undefined") return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: WEEKLY_FLIGHTS.labels,
      datasets: [
        {
          label: "Departures",
          data: WEEKLY_FLIGHTS.departures,
          backgroundColor: "#f5a623",
          borderRadius: 6,
          maxBarThickness: 22,
        },
        {
          label: "Arrivals",
          data: WEEKLY_FLIGHTS.arrivals,
          backgroundColor: "#3aa0ff",
          borderRadius: 6,
          maxBarThickness: 22,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { usePointStyle: true, boxWidth: 8, font: { family: "Inter", size: 11 } },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "#eef0f4" }, beginAtZero: true },
      },
    },
  });
}

function renderClassChart() {
  const ctx = document.getElementById("classChart");
  if (!ctx || typeof Chart === "undefined") return;

  const colors = ["#8b93a8", "#3aa0ff", "#f5a623", "#7a3fd1"];

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: CLASS_DISTRIBUTION.labels,
      datasets: [
        {
          data: CLASS_DISTRIBUTION.values,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      plugins: { legend: { display: false } },
    },
  });

  const legend = $("#classLegend");
  legend.innerHTML = CLASS_DISTRIBUTION.labels
    .map(
      (label, i) => `
      <div class="legend-item">
        <span class="legend-swatch" style="background:${colors[i]}"></span>
        ${label} · ${CLASS_DISTRIBUTION.values[i]}%
      </div>`
    )
    .join("");
}

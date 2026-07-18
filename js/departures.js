/* =========================================================================
   SkyManager — Departures controller
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderDepartureStats();
  renderDepartures();

  $("#depSearch").addEventListener("input", renderDepartures);
  $("#depFilterStatus").addEventListener("change", renderDepartures);
});

function getDepartureFlights() {
  return FLIGHTS.filter((f) => f.type === "departure");
}

function renderDepartureStats() {
  const flights = getDepartureFlights();
  $("#depTotal").textContent = flights.length;
  $("#depOnTime").textContent = flights.filter((f) => ["on time", "boarding"].includes(f.status)).length;
  $("#depDelayed").textContent = flights.filter((f) => f.status === "delayed").length;
  $("#depCancelled").textContent = flights.filter((f) => f.status === "cancelled").length;
}

function getFilteredDepartures() {
  const query = $("#depSearch").value.trim().toLowerCase();
  const statusFilter = $("#depFilterStatus").value;

  return getDepartureFlights().filter((f) => {
    const matchesQuery = !query || f.flightNo.toLowerCase().includes(query) || f.city.toLowerCase().includes(query);
    const matchesStatus = !statusFilter || f.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
}

function renderDepartures() {
  const body = $("#departuresBody");
  const list = getFilteredDepartures().sort((a, b) => a.time.localeCompare(b.time));

  if (!list.length) {
    body.innerHTML = `<tr class="empty-row"><td colspan="7"><i class="bi bi-inbox" style="font-size:1.4rem;display:block;margin-bottom:.4rem;"></i>No departures match your search.</td></tr>`;
  } else {
    body.innerHTML = list
      .map((f) => {
        const airline = AIRLINES[f.airline];
        return `
        <tr>
          <td class="mono cell-primary">${f.flightNo}</td>
          <td>
            <div class="airline-cell">
              <i class="bi ${airline.icon}"></i>
              <span>${escapeHtml(airline.name)}</span>
            </div>
          </td>
          <td>${escapeHtml(f.city)}</td>
          <td class="cell-sub">${f.terminal}</td>
          <td class="mono cell-sub">${f.gateOrBelt}</td>
          <td class="mono cell-primary">${f.time}</td>
          <td>${statusBadge(f.status)}</td>
        </tr>`;
      })
      .join("");
  }

  $("#depCount").textContent = `Showing ${list.length} of ${getDepartureFlights().length} departures`;
}

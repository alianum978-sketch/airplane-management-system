/* =========================================================================
   AirManager — Arrivals controller
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderArrivalStats();
  renderArrivals();

  $("#arrSearch").addEventListener("input", renderArrivals);
  $("#arrFilterStatus").addEventListener("change", renderArrivals);
});

function getArrivalFlights() {
  return FLIGHTS.filter((f) => f.type === "arrival");
}

function renderArrivalStats() {
  const flights = getArrivalFlights();
  $("#arrTotal").textContent = flights.length;
  $("#arrLanded").textContent = flights.filter((f) => f.status === "landed").length;
  $("#arrDelayed").textContent = flights.filter((f) => f.status === "delayed").length;
  $("#arrCancelled").textContent = flights.filter((f) => f.status === "cancelled").length;
}

function getFilteredArrivals() {
  const query = $("#arrSearch").value.trim().toLowerCase();
  const statusFilter = $("#arrFilterStatus").value;

  return getArrivalFlights().filter((f) => {
    const matchesQuery = !query || f.flightNo.toLowerCase().includes(query) || f.city.toLowerCase().includes(query);
    const matchesStatus = !statusFilter || f.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
}

function renderArrivals() {
  const body = $("#arrivalsBody");
  const list = getFilteredArrivals().sort((a, b) => a.time.localeCompare(b.time));

  if (!list.length) {
    body.innerHTML = `<tr class="empty-row"><td colspan="7"><i class="bi bi-inbox" style="font-size:1.4rem;display:block;margin-bottom:.4rem;"></i>No arrivals match your search.</td></tr>`;
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

  $("#arrCount").textContent = `Showing ${list.length} of ${getArrivalFlights().length} arrivals`;
}

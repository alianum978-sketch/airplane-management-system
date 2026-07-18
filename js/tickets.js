/* =========================================================================
   SkyManager — Ticket Management controller
   Full CRUD against the in-memory TICKETS array from data.js
   ========================================================================= */

let editingTicketId = null;

document.addEventListener("DOMContentLoaded", () => {
  renderTickets();

  $("#ticketSearch").addEventListener("input", renderTickets);
  $("#filterClass").addEventListener("change", renderTickets);
  $("#filterStatus").addEventListener("change", renderTickets);

  $("#newTicketBtn").addEventListener("click", () => openTicketModal());

  $("#ticketForm").addEventListener("submit", handleTicketSubmit);

  $("#ticketModal").addEventListener("hidden.bs.modal", resetTicketForm);
});

function getFilteredTickets() {
  const query = $("#ticketSearch").value.trim().toLowerCase();
  const clsFilter = $("#filterClass").value;
  const statusFilter = $("#filterStatus").value;

  return TICKETS.filter((t) => {
    const matchesQuery =
      !query ||
      t.passenger.toLowerCase().includes(query) ||
      t.flightNo.toLowerCase().includes(query) ||
      t.id.toLowerCase().includes(query) ||
      t.email.toLowerCase().includes(query);
    const matchesClass = !clsFilter || t.cls === clsFilter;
    const matchesStatus = !statusFilter || t.status === statusFilter;
    return matchesQuery && matchesClass && matchesStatus;
  });
}

function renderTickets() {
  const body = $("#ticketsBody");
  const list = getFilteredTickets();

  if (!list.length) {
    body.innerHTML = `<tr class="empty-row"><td colspan="8"><i class="bi bi-inbox" style="font-size:1.4rem;display:block;margin-bottom:.4rem;"></i>No tickets match your search.</td></tr>`;
  } else {
    body.innerHTML = list
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
          <td class="mono">${escapeHtml(t.flightNo)}</td>
          <td>${classBadge(t.cls)}</td>
          <td class="mono cell-sub">${escapeHtml(t.seat)}</td>
          <td class="cell-sub">${formatDate(t.date)}</td>
          <td>${statusBadge(t.status)}</td>
          <td>
            <div class="row-actions">
              <button class="action-btn edit" data-edit="${t.id}" aria-label="Edit ticket ${t.id}"><i class="bi bi-pencil"></i></button>
              <button class="action-btn danger" data-delete="${t.id}" aria-label="Delete ticket ${t.id}"><i class="bi bi-trash3"></i></button>
            </div>
          </td>
        </tr>`
      )
      .join("");
  }

  $("#ticketCount").textContent = `Showing ${list.length} of ${TICKETS.length} tickets`;

  $$("[data-edit]", body).forEach((btn) =>
    btn.addEventListener("click", () => openTicketModal(btn.dataset.edit))
  );
  $$("[data-delete]", body).forEach((btn) =>
    btn.addEventListener("click", () => deleteTicket(btn.dataset.delete))
  );
}

function openTicketModal(ticketId) {
  const modalEl = $("#ticketModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  if (ticketId) {
    const t = TICKETS.find((x) => x.id === ticketId);
    if (!t) return;
    editingTicketId = t.id;
    $("#ticketModalLabel").textContent = "Edit Ticket";
    $("#ticketSubmitLabel").textContent = "Update ticket";
    $("#passengerName").value = t.passenger;
    $("#passengerEmail").value = t.email;
    $("#flightNo").value = t.flightNo;
    $("#seat").value = t.seat;
    $("#cls").value = t.cls;
    $("#travelDate").value = t.date;
    $("#status").value = t.status;
  } else {
    editingTicketId = null;
    $("#ticketModalLabel").textContent = "New Ticket";
    $("#ticketSubmitLabel").textContent = "Save ticket";
  }

  modal.show();
}

function resetTicketForm() {
  $("#ticketForm").reset();
  editingTicketId = null;
}

function handleTicketSubmit(e) {
  e.preventDefault();

  const payload = {
    passenger: $("#passengerName").value.trim(),
    email: $("#passengerEmail").value.trim(),
    flightNo: $("#flightNo").value.trim(),
    seat: $("#seat").value.trim(),
    cls: $("#cls").value,
    date: $("#travelDate").value,
    status: $("#status").value,
  };

  if (editingTicketId) {
    const t = TICKETS.find((x) => x.id === editingTicketId);
    Object.assign(t, payload);
  } else {
    TICKETS.push({ id: nextTicketId(), ...payload });
  }

  bootstrap.Modal.getOrCreateInstance($("#ticketModal")).hide();
  renderTickets();
}

function deleteTicket(ticketId) {
  const t = TICKETS.find((x) => x.id === ticketId);
  if (!t) return;
  const ok = confirm(`Remove ticket ${t.id} for ${t.passenger}? This cannot be undone.`);
  if (!ok) return;
  TICKETS = TICKETS.filter((x) => x.id !== ticketId);
  renderTickets();
}

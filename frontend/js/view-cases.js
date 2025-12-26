console.log("View Cases JS loaded");

async function loadLeads() {
  try {
    const res = await fetch("/api/leads");
    const leads = await res.json();

    console.log("Leads from API:", leads);

    const tbody = document.querySelector("#leadsTable tbody");

    if (!tbody) {
      console.error("Table body not found");
      return;
    }

    tbody.innerHTML = "";

    if (leads.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4">No leads found</td></tr>`;
      return;
    }

    leads.forEach((lead) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${lead.loanId}</td>
        <td>${lead.name}</td>
        <td>${lead.mobile}</td>
        <td>${lead.loanAmount}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading leads:", err);
  }
}

loadLeads();

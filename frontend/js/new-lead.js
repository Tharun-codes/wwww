// 🔢 Generate Loan ID: YYYYMM + sequence
function generateLoanId() {
  const now = new Date();
  const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;

  let lastSeq = localStorage.getItem("lastLoanSeq");

  if (!lastSeq || !lastSeq.startsWith(yearMonth)) {
    lastSeq = `${yearMonth}00`;
  }

  const nextSeq = Number(lastSeq.slice(-2)) + 1;
  const loanId = `${yearMonth}${String(nextSeq).padStart(2, "0")}`;

  localStorage.setItem("lastLoanSeq", loanId);
  return loanId;
}

// 🕒 Date & Time
function setDateTime() {
  return new Date().toLocaleString();
}

// On load
document.getElementById("loanId").value = generateLoanId();
document.getElementById("dateTime").value = setDateTime();

// Submit handler
document.getElementById("leadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!this.checkValidity()) {
    alert("Please fill all mandatory fields");
    return;
  }

  const leadData = {
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    loanAmount: document.getElementById("loanAmount").value,
    rcNo: document.getElementById("rcNo").value,
    vehicle: document.getElementById("vehicle").value,
    ownerContact: document.getElementById("ownerContact").value,
    addressCategory: document.getElementById("addressCategory").value,
    landmark: document.getElementById("landmark").value,
    dealer: document.getElementById("dealer").value
  };

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData)
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/view-cases.html";
  } else {
    alert("Failed to save lead");
  }
});

console.log("New Lead JS loaded");

// submit lead to backend
document.getElementById("leadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const leadData = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    loanAmount: document.getElementById("loanAmount").value
  };

  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leadData)
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "/view-cases.html";
  } else {
    alert("Failed to save lead");
  }
});

const form = document.getElementById("registration-form");
const tableBody = document.querySelector("#userTable tbody");

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  tableBody.innerHTML = "";
  entries.forEach(addRowToTable);
}

function addRowToTable(entry) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dob}</td>
    <td>${entry.acceptedTerms}</td>
  `;
  tableBody.appendChild(row);
}

function isValidDOB(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  // Email validation handled by type="email", DOB checked here:
  if (!isValidDOB(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = {
    name,
    email,
    password,
    dob,
    acceptedTerms,
  };

  const entries = JSON.parse(localStorage.getItem("entries")) || [];
  entries.push(newEntry);
  localStorage.setItem("entries", JSON.stringify(entries));

  addRowToTable(newEntry);
  form.reset();
});

// Load existing entries when page is opened
window.onload = loadEntries;

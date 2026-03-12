const fullnameInput = document.getElementById("fullname");
const scoreInput = document.getElementById("score");
const addBtn = document.getElementById("addBtn");
const searchInput = document.getElementById("searchInput");
const filterRank = document.getElementById("filterRank");
const tbody = document.getElementById("studentTableBody");
const scoreHeader = document.getElementById("scoreHeader");
const noResult = document.getElementById("noResult");

let students = [];
let sortAsc = true;

function getRank(score) {
  if (score >= 8.5) return "Giỏi";
  if (score >= 7.0) return "Khá";
  if (score >= 5.0) return "Trung bình";
  return "Yếu";
}

function addStudent() {
  const fullname = fullnameInput.value.trim();
  const score = Number(scoreInput.value);

  if (fullname === "") {
    alert("Họ tên không được để trống!");
    return;
  }

  if (isNaN(score) || score < 0 || score > 10) {
    alert("Điểm phải từ 0 đến 10!");
    return;
  }

  students.push({ fullname, score });
  fullnameInput.value = "";
  scoreInput.value = "";
  fullnameInput.focus();

  applyFilters();
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const rank = filterRank.value;

  let filteredStudents = students.filter(student => {
    const matchName = student.fullname.toLowerCase().includes(keyword);
    const matchRank = rank === "Tất cả" || getRank(student.score) === rank;
    return matchName && matchRank;
  });

  filteredStudents.sort((a, b) => sortAsc ? a.score - b.score : b.score - a.score);

  renderTable(filteredStudents);
}

function renderTable(list) {
  tbody.innerHTML = "";

  if (list.length === 0) {
    noResult.style.display = "block";
    return;
  }

  noResult.style.display = "none";

  list.forEach((student, index) => {
    const tr = document.createElement("tr");
    if (student.score < 5) tr.classList.add("weak");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.fullname}</td>
      <td>${student.score}</td>
      <td>${getRank(student.score)}</td>
      <td><button class="delete-btn" data-name="${student.fullname}" data-score="${student.score}">Xóa</button></td>
    `;

    tbody.appendChild(tr);
  });
}

addBtn.addEventListener("click", addStudent);

searchInput.addEventListener("input", applyFilters);
filterRank.addEventListener("change", applyFilters);

scoreHeader.addEventListener("click", function () {
  sortAsc = !sortAsc;
  scoreHeader.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼";
  applyFilters();
});

tbody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const name = event.target.getAttribute("data-name");
    const score = Number(event.target.getAttribute("data-score"));

    students = students.filter(student => !(student.fullname === name && student.score === score));
    applyFilters();
  }
});
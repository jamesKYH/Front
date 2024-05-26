document.addEventListener("DOMContentLoaded", function () {
  const savedSection = localStorage.getItem("activeSection") || "home";
  showContent(savedSection);

  const subjectForm = document.getElementById('subject-form');
  subjectForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addSubject();
    closeModal();
  });

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', filterSubjects);

  const addSubjectButton = document.getElementById('add-subject-button');
  const modal = document.getElementById('add-subject-modal');
  const closeButton = document.querySelector('.close-button');

  addSubjectButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', outsideClick);

  const clearSearchButton = document.getElementById('clear-search-button');
  clearSearchButton.addEventListener('click', clearSearch);

  // 저장된 데이터 불러오기
  loadSubjects();
  // 하드코딩된 예제 추가
  addHardcodedExamples();
});

function clearSearch() {
  document.getElementById('search-input').value = '';
  filterSubjects();
}

function showContent(section) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => {
    sec.style.display = 'none';
  });
  const activeSection = document.getElementById(section);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
  localStorage.setItem("activeSection", section);
}

function addSubject(name, type, deadline, professor, save = true) {
  const table = document.getElementById('subject-schedule-list');
  const row = table.insertRow();
  row.insertCell(0).innerText = name || document.getElementById('subject-name').value;
  row.insertCell(1).innerText = type || document.getElementById('subject-type').value;
  row.insertCell(2).innerText = deadline || document.getElementById('subject-deadline').value;
  row.insertCell(3).innerText = professor || document.getElementById('subject-professor').value;

  if (save) {
    saveSubject(name, type, deadline, professor);
  }

  if (!name) {
    document.getElementById('subject-form').reset();
  }
}

function saveSubject(name, type, deadline, professor) {
  const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
  subjects.push({
    name: name || document.getElementById('subject-name').value,
    type: type || document.getElementById('subject-type').value,
    deadline: deadline || document.getElementById('subject-deadline').value,
    professor: professor || document.getElementById('subject-professor').value
  });
  localStorage.setItem('subjects', JSON.stringify(subjects));
}

function loadSubjects() {
  const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
  subjects.forEach(subject => addSubject(subject.name, subject.type, subject.deadline, subject.professor, false));
}

function addHardcodedExamples() {
  if (localStorage.getItem('subjects')) return; // Subjects already loaded, skip adding examples
  const hardcodedSubjects = [
    { name: '운영체제', type: '강의', deadline: '2024-06-01', professor: '노재춘' },
    { name: '데이터베이스', type: '과제', deadline: '2024-06-10', professor: '변재욱' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' },
    { name: '창의학기제', type: '과제', deadline: '2024-05-30', professor: '한동일' }
  ];
  hardcodedSubjects.forEach(subject => addSubject(subject.name, subject.type, subject.deadline, subject.professor));
}

function filterSubjects() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const keywords = searchInput.split(',').map(keyword => keyword.trim());
  const rows = document.querySelectorAll('#subject-schedule-list tr');
  rows.forEach(row => {
    const subjectName = row.cells[0].innerText.toLowerCase();
    const subjectType = row.cells[1].innerText.toLowerCase();
    const subjectProfessor = row.cells[3].innerText.toLowerCase();
    const match = keywords.every(keyword => subjectName.includes(keyword) || subjectType.includes(keyword) || subjectProfessor.includes(keyword));
    row.style.display = match ? '' : 'none';
  });
}

function applyFilter(keyword) {
  const searchInput = document.getElementById('search-input');
  const currentKeywords = searchInput.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword !== "");
  if (!currentKeywords.includes(keyword)) {
    currentKeywords.push(keyword);
  }
  searchInput.value = currentKeywords.join(', ');
  filterSubjects();
}

function openModal() {
  document.getElementById('add-subject-modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('add-subject-modal').style.display = 'none';
}

function outsideClick(event) {
  if (event.target == document.getElementById('add-subject-modal')) {
    closeModal();
  }
}

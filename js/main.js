// /js/main.js 파일
document.addEventListener("DOMContentLoaded", function () {
  const savedSection = localStorage.getItem("activeSection") || "home";
  showContent(savedSection);
});

function showContent(section) {
  // 모든 섹션을 숨기기
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(sec => {
    sec.style.display = 'none';
  });

  // 선택한 섹션만 보이기
  const activeSection = document.getElementById(section);
  if (activeSection) {
    activeSection.style.display = 'block';
  }

  // 현재 활성화된 섹션을 localStorage에 저장
  localStorage.setItem("activeSection", section);
}

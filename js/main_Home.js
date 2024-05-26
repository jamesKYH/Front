// profile.js

document.addEventListener('DOMContentLoaded', () => {
    const updateButton = document.getElementById('update-button');
    const userName = document.getElementById('user-name');
    const userDepartment = document.getElementById('user-department');
    const userId = document.getElementById('user-id');
    const userSubjects = document.getElementById('user-subjects');
    const modal = document.getElementById('signup-modal');
    const closeButton = document.querySelector('.close-button');
  
    // 서버에서 사용자 정보 불러오기
    function fetchUserProfile() {
      fetch('https://your-api-endpoint.com/user-profile')
        .then(response => response.json())
        .then(data => {
          userName.textContent = data.name;
          userDepartment.textContent = data.department;
          userId.textContent = data.id;
          userSubjects.textContent = data.subjects.join(', ');
        })
        .catch(error => console.error('Error fetching user profile:', error));
    }
  
    // 페이지 로드 시 사용자 정보 불러오기
    fetchUserProfile();
  
    // 업데이트 버튼 클릭 시 모달 열기
    updateButton.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    // 모달 닫기 버튼 클릭 시 모달 닫기
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  });
  
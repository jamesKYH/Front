// /js/signup.js 파일
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const agreeTermsCheckbox = document.getElementById("agree-terms");
    const signupButton = document.getElementById("signup-button");
  
    agreeTermsCheckbox.addEventListener("change", function () {
      signupButton.disabled = !this.checked;
    });
  
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault(); // 폼의 기본 제출 동작을 막음
        
      const username = signupForm.username.value.trim();
      const password = signupForm.password.value.trim();
  
      if (!username) {
        alert("아이디를 입력해주세요.");
        return;
      }
  
      if (!password) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
  
      if (!agreeTermsCheckbox.checked) {
        alert("학생 인증을 위한 약관에 동의해야 합니다.");
        return;
      }
  
      const formData = new FormData(signupForm);
  
      fetch(signupForm.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('회원가입이 완료되었습니다.');
          window.location.href = '/createAccount'; // 성공 시 페이지 이동
        } else {
          alert('회원가입에 실패하였습니다: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      });
    });
  });
  
  function showTerms() {
    document.getElementById("terms-modal").style.display = "block";
  }
  
  function closeTerms() {
    document.getElementById("terms-modal").style.display = "none";
  }
  
  function acceptTerms() {
    document.getElementById("agree-terms").checked = true;
    document.getElementById("signup-button").disabled = false;
    closeTerms();
  }
  
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
  
    fetch('http://43.201.71.15:8080/login', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text()) // 서버 응답을 텍스트로 받기
      .then(data => {
        // data는 응답된 텍스트 데이터
        const tokenMatch = data.match(/token=([^\s]+)/);
        if (tokenMatch && tokenMatch[1]) {
          const token = tokenMatch[1];
          document.cookie = `token=${token}; path=/;`;
          alert('로그인 성공!');
          // Redirect or perform other actions after successful login
        } else {
          alert('로그인 실패: ' + data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다.');
      });
  });
  
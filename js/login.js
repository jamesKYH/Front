document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
  
    fetch('http://43.201.71.15:8080/login', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          document.cookie = `token=${data.token}; path=/;`;
          alert('로그인 성공!');
          // Redirect or perform other actions after successful login
        } else {
          alert('로그인 실패: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다.');
      });
  });
  
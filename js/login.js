document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
  
    fetch('http://43.201.71.15:8080/login', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          const token = response.headers.get('Authorization');
          const hasAuthorizationHeader = response.headers.has('expires');
          console.log(hasAuthorizationHeader);
          if (token) {
            alert('Login successful!');
            localStorage.setItem('authToken', token); 
            makeAuthorizedRequest(token);
          } else {
            response.headers.forEach((value, name) => {
              console.log(`${name}: ${value}`);
            });
            alert('Login failed: No token received');
          }
        } else {
          return response.json().then(data => {
            throw new Error(data.message || 'Login failed');
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('로그인 중 오류가 발생했습니다.');
      });
  });
  
  function makeAuthorizedRequest(token) {
    // 여기에 토큰을 사용하여 인증된 요청을 수행하는 코드를 작성하십시오.
    console.log('Making authorized request with token:', token);
    // 예시 요청
    fetch('http://43.201.71.15:8080/some-secure-endpoint', {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }
  
document.getElementById('submit-button').addEventListener('click', function() {
    const input = document.getElementById('name-input').value;
    const errorMessage = document.getElementById('error-message');

    if (input === 'Nguyễn Văn Tổng') {
        window.location.href = 'thanksletter.html';
    } else {
        errorMessage.textContent = 'Incorrect name. Please try again.';
        errorMessage.style.display = 'block';
    }
});

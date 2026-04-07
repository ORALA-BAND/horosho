// 1. Убираем экран загрузки через 3 секунды
window.onload = () => {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        document.getElementById('startup-sound').play(); // Нужен файл assets/startup.mp3
    }, 3000);
    
    updateTime();
    setInterval(updateTime, 1000);
};

// 2. Живые часы
function updateTime() {
    const now = new Date();
    const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').innerText = timeStr;
}

// 3. Открытие папок
const folderContent = {
    'my-computer': '<h3>Донаты</h3><p><a href="#">Россия (СБП)</a></p><p><a href="#">International (PayPal)</a></p>',
    'player': '<h3>Музыкальный плеер</h3><p>Тут будет твой плеер...</p><a href="ССЫЛКА_НА_ГУГЛ_ДРАЙВ">Скачать альбом</a>',
    'secret': '<p>Введите пароль:</p><input type="password" id="pass"><button onclick="checkPass()">OK</button>',
    'trash': '<h3>Мерч (Корзина)</h3><p>Фото твоих футболок тут.</p>'
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const title = document.querySelector('.window-title');
    
    body.innerHTML = folderContent[id];
    title.innerText = id.replace('-', ' ').toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function checkPass() {
    const val = document.getElementById('pass').value;
    if(val === '1234') { // Твой пароль
        document.getElementById('window-body').innerHTML = '<h4>Секретные фото:</h4><img src="assets/secret.jpg" width="100%">';
    } else {
        alert('Неверный пароль!');
    }
}

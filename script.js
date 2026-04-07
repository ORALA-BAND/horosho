// 1. Логика загрузки и часов
window.onload = () => {
    setTimeout(() => {
        const bootScreen = document.getElementById('boot-screen');
        if (bootScreen) bootScreen.style.display = 'none';
        
        const audio = document.getElementById('startup-sound');
        if (audio) audio.play().catch(() => console.log("Звук заблокирован"));
    }, 3000);
    
    setInterval(updateTime, 1000);
    updateTime();
};

function updateTime() {
    const clock = document.getElementById('clock');
    if (clock) {
        const now = new Date();
        clock.innerText = now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
    }
}

// 2. Контент папок
const folderContent = {
    'my-computer': `
        <div style="display:flex; gap:20px; padding:10px;">
            <div style="text-align:center; width:80px;">
                <a href="ССЫЛКА_РФ" target="_blank"><img src="https://alexmeub.com" width="32"><br>Донат (РФ)</a>
            </div>
            <div style="text-align:center; width:80px;">
                <a href="ССЫЛКА_ИНТ" target="_blank"><img src="https://alexmeub.com" width="32"><br>PayPal</a>
            </div>
        </div>`,
    
    'player': `
        <div style="background:#fff; border:1px inset #808080; padding:10px;">
            <div style="display:flex; gap:10px; margin-bottom:10px;">
                <img src="assets/album-cover.jpg" style="width:60px; height:60px; border:1px solid #000;">
                <div>
                    <b id="track-title" style="font-size:12px;">Выберите трек</b><br>
                    <audio id="main-audio" controls style="width:180px; height:30px; margin-top:5px;"></audio>
                </div>
            </div>
            <div style="height:100px; overflow-y:auto; border-top:1px solid #ccc; font-size:11px;">
                <div class="tr-item" onclick="playTrack('track1.mp3', '01. Интро')" style="padding:4px; cursor:pointer;">01. Интро</div>
                <div class="tr-item" onclick="playTrack('track2.mp3', '02. Трек 2')" style="padding:4px; cursor:pointer;">02. Трек 2</div>
                <div class="tr-item" onclick="playTrack('track3.mp3', '03. Трек 3')" style="padding:4px; cursor:pointer;">03. Трек 3</div>
            </div>
        </div>`,

    'secret': `
        <div id="lock" style="text-align:center;">
            <p>Введите пароль:</p>
            <input type="password" id="pass_input" style="width:80px;">
            <button onclick="checkPass()">OK</button>
        </div>
        <div id="secret-files" style="display:none; text-align:center;">
            <p>Успешно! Кликни, чтобы сменить фон:</p>
            <img src="assets/secret1.jpg" onclick="document.querySelector('.desktop').style.backgroundImage='url(assets/secret1.jpg)'" style="width:40%; cursor:pointer;">
        </div>`,

    'trash': `<p style="text-align:center;">Тут пока пусто...</p>`
};

// 3. Функции управления
function openFolder(id) {
    const win = document.getElementById('window-template');
    document.getElementById('window-body').innerHTML = folderContent[id];
    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function checkPass() {
    if(document.getElementById('pass_input').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('secret-files').style.display = 'block';
    } else {
        alert('Неверно!');
    }
}

function playTrack(file, title) {
    const a = document.getElementById('main-audio');
    document.getElementById('track-title').innerText = title;
    a.src = 'assets/' + file;
    a.play();
}

let currentTrackIndex = 0;

window.onload = () => {
    // Убираем загрузку
    setTimeout(() => {
        const boot = document.getElementById('boot-screen');
        if(boot) boot.style.display = 'none';
        document.getElementById('startup-sound').play().catch(() => {});
    }, 3000);

    // Логика плеера
    const audio = document.getElementById('main-audio');
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');

    audio.onended = () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        playTrackByIndex(currentTrackIndex);
    };

    tracks.forEach((item, index) => {
        item.onclick = () => {
            currentTrackIndex = index;
            playTrackByIndex(index);
        };
    });

    setInterval(updateTime, 1000);
    updateTime();
};

const folderContent = {
    'my-computer': `
        <div style="color:black; font-size:14px; padding:10px;">
            <p>Система: Windows XP Music Edition</p>
            <p style="margin:15px 0;"><strong>ПОДДЕРЖКА ПРОЕКТА:</strong></p>
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:blue; text-decoration:underline;">> Донат Россия (СБП)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:blue; text-decoration:underline; margin-top:10px;">> Support International (PayPal)</p>
        </div>`,
    'secret': `
        <div id="lock" style="text-align:center; color:black; padding:10px;">
            <p>ДОСТУП ЗАБЛОКИРОВАН</p>
            <input type="password" id="psw" style="margin:10px 0; width:100px;">
            <br><button onclick="checkPass()">ВВОД</button>
        </div>
        <div id="sec-files" style="display:none; text-align:center;">
            <img src="assets/secret1.jpg" style="width:100%; border:1px solid #000;">
            <p style="font-size:10px; color:black; margin-top:5px;">Секретное фото #1</p>
        </div>`,
    'trash': `<div style="text-align:center; color:#888; padding:20px;">КОРЗИНА ПУСТА</div>`
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    const player = document.getElementById('player-container');

    if (id === 'player') {
        win.classList.add('player-mode');
        body.style.display = 'none'; // Прячем обычный текст
        player.style.display = 'block'; // Показываем плеер
    } else {
        win.classList.remove('player-mode');
        player.style.display = 'none'; // Прячем плеер (но он продолжает играть!)
        body.style.display = 'block'; // Показываем текст
        body.innerHTML = folderContent[id]; // Загружаем текст папки
    }

    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

function closeWindow() {
    document.getElementById('window-template').style.display = 'none';
}

function playTrackByIndex(index) {
    const tracks = document.querySelectorAll('#actual-playlist .tr-item');
    const audio = document.getElementById('main-audio');
    const title = document.getElementById('track-title');
    
    audio.src = 'assets/' + tracks[index].getAttribute('data-src');
    title.innerText = tracks[index].getAttribute('data-title');
    audio.play();

    tracks.forEach(t => t.style.background = "transparent");
    tracks[index].style.background = "#ff00ff";
    tracks[index].style.color = "white";
}

function updateTime() {
    const now = new Date();
    document.getElementById('clock').innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
    } else { alert('ОШИБКА ДОСТУПА'); }
}

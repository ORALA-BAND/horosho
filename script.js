window.onload = () => {
    setTimeout(() => {
        document.getElementById('boot-screen').style.display = 'none';
        const snd = document.getElementById('startup-sound');
        if(snd) snd.play().catch(() => {});
    }, 3000);
    setInterval(updateTime, 1000);
    updateTime();
};

function updateTime() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if(clock) clock.innerText = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

const folderContent = {
    'my-computer': `
        <div style="color:black; padding:10px;">
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:blue; text-decoration:underline;">> Поддержать (Россия)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:blue; text-decoration:underline;">> Support (PayPal)</p>
        </div>`,
    
    'player': `
        <div class="synth-player">
            <img src="assets/album-cover.jpg" class="main-cover">
            <div id="track-title" class="neon-text">ВЫБЕРИТЕ ТРЕК</div>
            <audio id="main-audio" controls></audio>
            <div style="margin-top:10px; max-height:80px; overflow-y:auto; background:rgba(0,0,0,0.3);">
                <div class="tr-item" onclick="playTrack('track1.mp3', '01. Intro')">01. Intro</div>
                <div class="tr-item" onclick="playTrack('track2.mp3', '02. Midnight')">02. Midnight</div>
                <div class="tr-item" onclick="playTrack('track3.mp3', '03. Neon')">03. Neon</div>
            </div>
        </div>`,

    'secret': `
        <div id="lock" style="text-align:center; color:black; padding:10px;">
            <p>Введите пароль:</p>
            <input type="password" id="psw" style="width:100px;">
            <button onclick="checkPass()">OK</button>
        </div>
        <div id="sec-files" style="display:none; text-align:center; padding:10px;">
            <img src="assets/secret1.jpg" onclick="document.querySelector('.desktop').style.background='url(assets/secret1.jpg) center/cover'" style="width:100%; border:1px solid #000; cursor:pointer;">
            <p style="font-size:10px; color:black; margin-top:5px;">Кликни на фото, чтобы сменить фон</p>
        </div>`,

    'trash': `<div style="text-align:center; color:#888; padding:20px;">КОРЗИНА ПУСТА</div>`
};

function openFolder(id) {
    const win = document.getElementById('window-template');
    const body = document.getElementById('window-body');
    if (id === 'player') { win.classList.add('player-mode'); } 
    else { win.classList.remove('player-mode'); }
    body.innerHTML = folderContent[id];
    document.querySelector('.window-title').innerText = id.toUpperCase();
    win.style.display = 'block';
}

function closeWindow() { document.getElementById('window-template').style.display = 'none'; }

function checkPass() {
    if(document.getElementById('psw').value === '1234') {
        document.getElementById('lock').style.display = 'none';
        document.getElementById('sec-files').style.display = 'block';
    } else { alert('НЕВЕРНЫЙ ПАРОЛЬ'); }
}

function playTrack(file, title) {
    const a = document.getElementById('main-audio');
    document.getElementById('track-title').innerText = title;
    a.src = 'assets/' + file;
    a.play();
}

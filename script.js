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
        <div style="color:black; font-size:14px;">
            <p onclick="window.open('ССЫЛКА_РФ')" style="cursor:pointer; color:blue; text-decoration:underline; margin-bottom:15px;">> Поддержать (Россия/СБП)</p>
            <p onclick="window.open('ССЫЛКА_ИНТ')" style="cursor:pointer; color:blue; text-decoration:underline;">> Support (PayPal/Global)</p>
        </div>`,
    
    'player': `
        <div class="synth-player">
            <img src="assets/album-cover.jpg" class="main-cover">
            <div id="track-title" class="neon-text">ВЫБЕРИТЕ ТРЕК</div>
            
            <!-- Плеер без кнопок скачивания и скорости -->
            <audio id="main-audio" controls controlsList="nodownload noplaybackrate"></audio>
            
            <div style="margin-top:10px; max-height:120px; overflow-y:auto; background:rgba(0,0,0,0.4);">
                <div class="tr-item" onclick="playTrack('track1.mp3', '01. ХОРОШО')">01. horosho</div>
                <div class="tr-item" onclick="playTrack('track2.mp3', '02. ЛУЖА ФАНТАЗИЙ')">02. luzha fantasi</div>
                <div class="tr-item" onclick="playTrack('track3.mp3', '03. Я ДУМАЛА, Я СЕКСИ')">03. ya dumdld ya sexy</div>
            </div>

            <!-- Ссылка под треками -->
            <div style="margin-top:15px; padding-bottom:10px;">
                <a href="ССЫЛКА_НА_ГУГЛ_ДИСК" target="_blank" style="color:#ff00ff; font-size:12px; text-decoration:underline; font-weight:bold;">
                    СКАЧАТЬ АЛЬБОМ / DOWNLOAD ALBUM
                </a>
            </div>
        </div>`,


    'secret': `
        <div id="lock" style="text-align:center; color:black;">
            <p>ДОСТУП ОГРАНИЧЕН</p>
            <input type="password" id="psw" style="width:120px; margin:10px 0; padding:5px;">
            <br>
            <button onclick="checkPass()" style="padding:5px 20px; cursor:pointer;">OK</button>
        </div>
        <div id="sec-files" style="display:none; text-align:center;">
            <img src="assets/secret1.jpg" onclick="document.querySelector('.desktop').style.background='url(assets/secret1.jpg) center/cover'" style="width:100%; border:2px solid #000; cursor:pointer;">
            <p style="font-size:11px; color:black; margin-top:10px;">Кликни на фото, чтобы сменить фон</p>
        </div>`,

    'trash': `<div style="text-align:center; color:#888; padding:30px;">КОРЗИНА ПУСТА</div>`
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
    } else { alert('ACCESS DENIED'); }
}

function playTrack(file, title) {
    const a = document.getElementById('main-audio');
    document.getElementById('track-title').innerText = title;
    a.src = 'assets/' + file;
    a.play();
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultsDiv = document.getElementById('results');
    const slotSound = document.getElementById('slotSound');
    const resultSound = document.getElementById('resultSound');
    const slotTemplate = document.getElementById('slotTemplate');

    // 参加者の配列
    const participants = ['参加者1', '参加者2', '参加者3', '参加者4', '参加者5'];
    
    // くじの種類（A-E）
    const lots = ['A', 'B', 'C', 'D', 'E'];

    // Fisher-Yatesシャッフルアルゴリズム
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // スロットを停止する関数
    async function stopSlot(slotWrapper, finalValue, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                slotWrapper.style.animation = 'none';
                // 最終位置を計算（各スロットアイテムの高さは60px）
                const finalPosition = -(lots.indexOf(finalValue) * 60);
                slotWrapper.style.top = `${finalPosition}px`;
                slotWrapper.parentElement.classList.add('slot-flash');
                resolve();
            }, delay);
        });
    }

    // くじ引きを実行する関数
    async function drawLots() {
        // ボタンを無効化
        startButton.disabled = true;
        
        // 結果コンテナをクリア
        resultsDiv.innerHTML = '';
        resultContainer.style.display = 'block';

        // くじをシャッフル
        const shuffledLots = shuffle([...lots]);

        // 各参加者のスロットを作成
        participants.forEach((participant, index) => {
            const slotElement = slotTemplate.content.cloneNode(true);
            slotElement.querySelector('.participant-name').textContent = participant;
            resultsDiv.appendChild(slotElement);
        });

        // スロットサウンドをループ再生
        slotSound.loop = true;
        slotSound.play();

        // 全てのスロットを回転開始
        const slotWrappers = document.querySelectorAll('.slot-wrapper');
        slotWrappers.forEach(wrapper => {
            wrapper.style.animation = 'slotSpin 0.1s linear infinite';
        });

        // 各スロットを順番に停止
        for (let i = 0; i < participants.length; i++) {
            await stopSlot(
                slotWrappers[i],
                shuffledLots[i],
                2000 + (i * 500) // 各スロットは500msずつ遅れて停止
            );
        }

        // スロットサウンドを停止し、結果サウンドを再生
        slotSound.pause();
        slotSound.currentTime = 0;
        resultSound.play();

        // ボタンを再度有効化
        startButton.disabled = false;
        startButton.textContent = 'もう一度引く';
    }

    // ボタンクリックイベントの設定
    startButton.addEventListener('click', drawLots);

    // 効果音の準備（エラー対策）
    const prepareSounds = () => {
        slotSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuhy5jYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
        resultSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuhy5jYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    };
    prepareSounds();
});
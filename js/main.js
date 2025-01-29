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
    function stopSlot(slotWrapper, finalValue, delay) {
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

    // アニメーション完了を待機する関数
    function waitForAnimation(element) {
        return new Promise(resolve => {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'style' && 
                        mutation.target.style.animation === 'none') {
                        observer.disconnect();
                        resolve();
                    }
                });
            });
            
            observer.observe(element, {
                attributes: true,
                attributeFilter: ['style']
            });
        });
    }

    // くじ引きを実行する関数
    async function drawLots() {
        try {
            // ボタンを無効化
            startButton.disabled = true;
            startButton.textContent = '抽選中...';
            
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
            const stopPromises = [];
            slotWrappers.forEach((wrapper, index) => {
                const promise = stopSlot(
                    wrapper,
                    shuffledLots[index],
                    2000 + (index * 500) // 各スロットは500msずつ遅れて停止
                );
                stopPromises.push(promise);
            });

            // 全てのスロットが停止するのを待つ
            await Promise.all(stopPromises);

            // スロットサウンドを停止し、結果サウンドを再生
            slotSound.pause();
            slotSound.currentTime = 0;
            resultSound.play();

            // アニメーション完了を待ってからボタンの状態を更新
            await new Promise(resolve => setTimeout(resolve, 500));
        } finally {
            // ボタンを再度有効化し、テキストを変更
            startButton.textContent = 'もう一度引く';
            startButton.disabled = false;
        }
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
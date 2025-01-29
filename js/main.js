document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const resultContainer = document.getElementById('resultContainer');
    const resultsDiv = document.getElementById('results');
    const slotSound = document.getElementById('slotSound');
    const resultSound = document.getElementById('resultSound');
    const slotTemplate = document.getElementById('slotTemplate');

    // Participants array
    const participants = ['Ueda', 'Ojima', 'Maruo', 'Mimura', 'Abe'];
    
    // Lot types (A-E)
    const lots = ['A', 'B', 'C', 'D', 'E'];

    // Fisher-Yates shuffle algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to stop slot animation
    function stopSlot(slotWrapper, finalValue, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                slotWrapper.style.animation = 'none';
                // Calculate final position (slot item height is 60px)
                const finalPosition = -(lots.indexOf(finalValue) * 60);
                slotWrapper.style.top = `${finalPosition}px`;
                slotWrapper.parentElement.classList.add('slot-flash');
                resolve();
            }, delay);
        });
    }

    // Function to draw lots
    async function drawLots() {
        try {
            // Disable button
            startButton.disabled = true;
            startButton.textContent = 'Drawing...';
            
            // Clear results container
            resultsDiv.innerHTML = '';
            resultContainer.style.display = 'block';

            // Shuffle lots
            const shuffledLots = shuffle([...lots]);

            // Create slot elements for each participant
            participants.forEach((participant, index) => {
                const slotElement = slotTemplate.content.cloneNode(true);
                slotElement.querySelector('.participant-name').textContent = participant;
                resultsDiv.appendChild(slotElement);
            });

            // Play slot sound in loop
            slotSound.loop = true;
            slotSound.play();

            // Start all slot animations
            const slotWrappers = document.querySelectorAll('.slot-wrapper');
            slotWrappers.forEach(wrapper => {
                wrapper.style.animation = 'slotSpin 0.1s linear infinite';
            });

            // Stop slots one by one
            const stopPromises = [];
            slotWrappers.forEach((wrapper, index) => {
                const promise = stopSlot(
                    wrapper,
                    shuffledLots[index],
                    2000 + (index * 500) // Each slot stops with 500ms delay
                );
                stopPromises.push(promise);
            });

            // Wait for all slots to stop
            await Promise.all(stopPromises);

            // Stop slot sound and play result sound
            slotSound.pause();
            slotSound.currentTime = 0;
            resultSound.play();

            // Wait for animation completion before updating button
            await new Promise(resolve => setTimeout(resolve, 500));
        } finally {
            // Re-enable button and update text
            startButton.textContent = 'Draw Again';
            startButton.disabled = false;
        }
    }

    // Set button click event
    startButton.addEventListener('click', drawLots);

    // Prepare sound effects (error prevention)
    const prepareSounds = () => {
        slotSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuhy5jYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
        resultSound.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjIwLjEwMAAAAAAAAAAAAAAA//tUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgCenp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6e//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjM1AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuhy5jYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//vUZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    };
    prepareSounds();
});
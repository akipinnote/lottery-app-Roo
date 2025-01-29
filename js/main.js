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

    // Constants for calculations
    const SLOT_HEIGHT = window.innerWidth <= 480 ? 40 : 48; // Responsive slot height

    // Fisher-Yates shuffle algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to stop slot animation
    function stopSlot(slotGrid, finalValue, delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                // Remove spinning animation
                slotGrid.style.animation = 'none';
                
                // Force a reflow before applying transform
                void slotGrid.offsetHeight;
                
                // Calculate final position
                const totalHeight = SLOT_HEIGHT * lots.length;
                const targetIndex = lots.indexOf(finalValue);
                const finalPosition = -(targetIndex * SLOT_HEIGHT);
                
                // Apply transform with high precision
                slotGrid.style.transform = `translate3d(0, ${finalPosition}px, 0)`;
                
                // Add flash effect to container
                slotGrid.parentElement.classList.add('slot-flash');
                
                resolve();
            }, delay);
        });
    }

    // Function to draw lots
    async function drawLots() {
        try {
            // Disable button and update text
            startButton.disabled = true;
            startButton.textContent = 'Drawing...';
            
            // Reset and show results container
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

            // Start sound effect
            slotSound.loop = true;
            slotSound.play().catch(() => {/* Handle autoplay restrictions */});

            // Start all slot animations
            const slotGrids = document.querySelectorAll('.slot-grid');
            slotGrids.forEach(grid => {
                // Reset transform and force reflow
                grid.style.transform = 'translate3d(0, 0, 0)';
                void grid.offsetHeight;
                
                // Start spinning animation
                grid.style.animation = 'slotSpin 0.1s linear infinite';
            });

            // Stop slots one by one
            const stopPromises = [];
            slotGrids.forEach((grid, index) => {
                const promise = stopSlot(
                    grid,
                    shuffledLots[index],
                    2000 + (index * 500) // Progressive delay
                );
                stopPromises.push(promise);
            });

            // Wait for all slots to stop
            await Promise.all(stopPromises);

            // Play result sound
            slotSound.pause();
            slotSound.currentTime = 0;
            resultSound.play().catch(() => {/* Handle autoplay restrictions */});

            // Wait for final animation
            await new Promise(resolve => setTimeout(resolve, 500));
        } finally {
            // Re-enable button with updated text
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
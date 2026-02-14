document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const startOverlay = document.getElementById('start-overlay');
    const startBtn = document.getElementById('start-btn');
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    const volumeSlider = document.getElementById('volume-slider');
    let currentSlide = 0;
    let musicPlaying = false;

    // --- Start Experience ---
    startBtn.addEventListener('click', () => {
        startOverlay.style.opacity = '0';
        setTimeout(() => {
            startOverlay.style.display = 'none';
        }, 1000);

        // Try to play music
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            console.log("Audio play failed:", error);
        });
    });

    // --- Music Control ---
    musicBtn.addEventListener('click', () => {
        if (musicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        musicPlaying = !musicPlaying;
    });

    // Set initial volume
    bgMusic.volume = 0.5;

    volumeSlider.addEventListener('input', (e) => {
        bgMusic.volume = e.target.value;
    });

    // --- Navigation Logic ---
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Handle loop logic if desired, or clamp
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        currentSlide = index;

        // Add active class to current
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Check if we are on the last slide to trigger typewriter
        if (slides[currentSlide].id === 'slide-4') {
            startTypewriter();
        }
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.slide);
            showSlide(index);
        });
    });



    // --- Typewriter Effect ---
    const textToType = "Sevgilim, \n\nSeninle geçirdiğim her an hayatımın en heyecanlı anı \nSeni çok seviyorum. \n\nBebegimm";
    const typeWriterElement = document.getElementById('typewriter-text');
    let typeIndex = 0;
    let isTyping = false;

    function startTypewriter() {
        if (isTyping || typeIndex > 0) return; // Prevent restart if already running or done
        isTyping = true;
        typeWriter();
    }

    function typeWriter() {
        if (typeIndex < textToType.length) {
            typeWriterElement.innerHTML += textToType.charAt(typeIndex) === '\n' ? '<br>' : textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50); // Typing speed
        } else {
            isTyping = false;
            // Show restart button
            document.querySelector('.restart-btn').style.opacity = '1';
        }
    }

    // --- Background Hearts Animation ---
    function createHeart() {
        const heart = document.createElement('i');
        heart.classList.add('fas', 'fa-heart', 'floating-heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 7 + 's'; // 7-10s
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';

        document.querySelector('.background-hearts').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000); // Match max animation duration
    }

    setInterval(createHeart, 500);

    // Initial call
    showSlide(0);
});

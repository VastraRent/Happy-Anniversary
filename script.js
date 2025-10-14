// Simple, clean JavaScript for the anniversary website

let currentPage = 0;
const totalPages = 7;

// Memory data
const memories = [
    {
        image: "./assets/images/KA.jpg",
        title: "✨ First Kaleshi Garden Date ✨",
        caption: "The day we met to resolve a conflict, but it became one of the best memories of my life that I will treasure forever in my heart. 😍💫"
    },
    {
        image: "./assets/images/uf.jpg",
        title: "💐 Our Unofficial Date 💐",
        caption: "The day we decided to have some good quality time together. I saw my cutie in a very sexy dress, my heart skipped a beat! 💕"
    },
    {
        image: "./assets/images/First Date.jpg",
        title: "🏠 Finally Our Official Date 🏠",
        caption: "The day I was waiting for a very long time. I officially proposed to my girl and made her mine! 🌟💞"
    },
    {
        image: "./assets/images/Hotel.jpg",
        title: "💞 First NightOver 💞",
        caption: "The night we stayed together, had so much fun, played games, clicked pictures and cuddled each other. One of the best days of my life! 🗺️💕"
    },
    {
        image: "./assets/images/Trip.jpg",
        title: "✈️ Our First Trip Together ✈️",
        caption: "We had sooo much fun together, laughed together, danced together. Again, unforgettable moments of my life! 🌟💞"
    },
    {
        image: "./assets/images/godi.jpg",
        title: "🤗 Sweet Cuddles 🤗",
        caption: "Those precious moments when we just hold each other close. Your warmth makes everything perfect! 💕"
    },
    {
        image: "./assets/images/mask.jpg",
        title: "😷 Masked Memories 😷",
        caption: "Even with masks on, your eyes still made my heart skip a beat. Love finds a way through everything! 💖"
    },
    {
        image: "./assets/images/pappi.jpg",
        title: "💋 Sweet Kisses 💋",
        caption: "Every kiss with you feels like the first one. These moments of pure love and affection mean everything to me! 😘"
    },
    {
        image: "./assets/images/before.jpg",
        title: "📅 Before We Were Us 📅",
        caption: "Looking back at how we were before we became 'us' - destiny was already writing our love story! 🌟"
    },
    {
        image: "./assets/images/after.jpg",
        title: "💑 After We Found Love 💑",
        caption: "After finding each other, everything changed for the better. This is us, happy and complete together! ✨"
    }
];

// Quiz data
const quizQuestions = [
    {
        question: "What's my favorite color?",
        options: ["Ocean Blue", "Sunset Orange", "Forest Green", "Royal Purple"],
        correct: 0,
        explanation: "You always said my eyes remind you of the ocean!"
    },
    {
        question: "What's my biggest fear?",
        options: ["Spiders", "Heights", "Losing you", "Public speaking"],
        correct: 2,
        explanation: "The thought of losing you is the only thing that truly scares me."
    },
    {
        question: "What's my dream destination with you?",
        options: ["Paris", "Tokyo", "Maldives", "Santorini"],
        correct: 3,
        explanation: "Those white buildings and blue waters, just you and me!"
    },
    {
        question: "What's my favorite thing about you?",
        options: ["Your laugh", "Your kindness", "Your smile", "Everything"],
        correct: 3,
        explanation: "How could I choose just one thing when everything about you is perfect?"
    },
    {
        question: "What do I want our future to look like?",
        options: ["Traveling the world", "A cozy home together", "Growing old together", "All of these dreams"],
        correct: 3,
        explanation: "I want it all with you - every adventure, every quiet moment, every year ahead."
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;

// Page navigation
function showPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    const dots = document.querySelectorAll('.dot');

    pages.forEach(page => page.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;

        // Update navigation dot
        if (dots[pageNumber]) {
            dots[pageNumber].classList.add('active');
        }

        // Special page actions
        if (pageNumber === 4) {
            initializeQuiz();
        }
    }
}

// Memory gallery
function showRandomMemory() {
    const randomIndex = Math.floor(Math.random() * memories.length);
    const memory = memories[randomIndex];

    const memoryImg = document.getElementById('random-memory-image');
    const memoryText = document.getElementById('random-memory-text');

    if (memoryImg) {
        memoryImg.src = memory.image;
        memoryImg.alt = memory.title;
    }
    
    if (memoryText) {
        memoryText.innerHTML = `<strong>${memory.title}</strong><br>${memory.caption}`;
    }

    // Add a nice transition effect
    if (memoryImg) {
        memoryImg.style.transform = 'scale(0.95)';
        memoryImg.style.opacity = '0.7';
        setTimeout(() => {
            memoryImg.style.transform = 'scale(1)';
            memoryImg.style.opacity = '1';
        }, 200);
    }
}

// Quiz system
function initializeQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuizQuestion];

        // Update question
        const questionText = document.getElementById('question-text');
        if (questionText) {
            questionText.textContent = question.question;
        }

        // Update options
        const optionsContainer = document.getElementById('quiz-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'quiz-option';
                button.textContent = option;
                button.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(button);
            });
        }

        // Update progress
        const progress = document.getElementById('progress');
        const questionCounter = document.getElementById('question-counter');
        const scoreDisplay = document.getElementById('score-display');

        if (progress) {
            const progressPercent = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
            progress.style.width = progressPercent + '%';
        }

        if (questionCounter) {
            questionCounter.textContent = `Question ${currentQuizQuestion + 1} of ${quizQuestions.length}`;
        }

        if (scoreDisplay) {
            scoreDisplay.textContent = `Score: ${quizScore}`;
        }

        // Clear previous result
        const resultDiv = document.getElementById('quiz-result');
        if (resultDiv) {
            resultDiv.innerHTML = '';
        }
    } else {
        showQuizResult();
    }
}

function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuizQuestion];
    const options = document.querySelectorAll('.quiz-option');

    // Disable all options
    options.forEach((option, index) => {
        option.disabled = true;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== question.correct) {
            option.classList.add('incorrect');
        }
    });

    // Update score
    if (selectedIndex === question.correct) {
        quizScore++;
    }

    // Show explanation
    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 10px; margin-top: 1rem;">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        `;
    }

    // Move to next question after delay
    setTimeout(() => {
        currentQuizQuestion++;
        showQuizQuestion();
    }, 3000);
}

function showQuizResult() {
    const percentage = (quizScore / quizQuestions.length) * 100;

    let message = '';
    if (percentage === 100) {
        message = "Perfect! You know me so well! ❤️";
    } else if (percentage >= 70) {
        message = "Great job! You know me pretty well! 😊";
    } else {
        message = "We need to spend more time together! 😉";
    }

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const resultDiv = document.getElementById('quiz-result');

    if (questionText) {
        questionText.textContent = 'Quiz Complete!';
    }

    if (optionsContainer) {
        optionsContainer.innerHTML = '';
    }

    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3>Your Score: ${quizScore} out of ${quizQuestions.length}</h3>
                <p style="font-size: 1.2rem; margin: 1rem 0;">${message}</p>
                <button onclick="initializeQuiz()" style="background: #ff6b6b; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; margin-top: 1rem;">Try Again</button>
            </div>
        `;
    }
}

// Countdown timer - Forward counting from October 15, 2024
function startCountdown() {
    const startDate = new Date('2024-10-15T00:00:00'); // October 15, 2024

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = now - startDate.getTime(); // Forward counting

        // If the start date hasn't arrived yet, show zeros
        if (distance < 0) {
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = '000';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement) daysElement.textContent = days.toString().padStart(3, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Celebration function
function celebrate() {
    // Create confetti effect
    createConfetti();

    // Show celebration message (removed alert popup)
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';

        document.body.appendChild(confetti);

        // Animate confetti falling
        let position = -10;
        const fallSpeed = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;

        const fall = setInterval(() => {
            position += fallSpeed;
            confetti.style.top = position + 'px';
            confetti.style.transform = `rotate(${rotation + position}deg)`;

            if (position > window.innerHeight) {
                clearInterval(fall);
                document.body.removeChild(confetti);
            }
        }, 20);
    }
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Once animated, stop observing this element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animateElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-fade'
    );

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced typewriter effect with scroll trigger
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.getAttribute('data-text');
    if (!text) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypewriter(typewriterElement, text);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(typewriterElement);
}

function startTypewriter(element, text) {
    element.textContent = '';
    let i = 0;

    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 50 + Math.random() * 50); // Variable speed for natural feel
        }
    }

    typeChar();
}

// Enhanced handwriting effect with scroll trigger
function initHandwriting() {
    const handwritingElement = document.getElementById('letter-handwrite');
    if (!handwritingElement) return;

    const text = handwritingElement.getAttribute('data-text');
    if (!text) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startHandwriting(handwritingElement, text);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(handwritingElement);
}

function startHandwriting(element, text) {
    element.textContent = '';
    let i = 0;

    // Show the writing hand
    const writingHand = document.querySelector('.writing-hand');
    if (writingHand) {
        writingHand.style.opacity = '1';
    }

    function writeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;

            // Add slight hand movement while writing
            if (writingHand) {
                writingHand.style.transform = `translateX(${Math.random() * 4 - 2}px) translateY(${Math.random() * 2 - 1}px)`;
            }

            // Slower speed for handwriting effect with variation
            setTimeout(writeChar, 80 + Math.random() * 40);
        } else {
            // Remove cursor after writing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
                // Hide the writing hand after completion
                if (writingHand) {
                    writingHand.style.opacity = '0';
                    writingHand.style.transform = 'translateY(-20px)';
                }
            }, 1000);
        }
    }

    writeChar();
}

// Start Experience functionality
function initStartExperience() {
    const startButton = document.getElementById('start-experience');
    const startOverlay = document.getElementById('start-overlay');
    const bgMusic = document.getElementById('bg-music');

    if (startButton && startOverlay) {
        startButton.addEventListener('click', function () {
            // Change button text to show loading
            startButton.textContent = '✨ Starting... ✨';
            startButton.disabled = true;

            // Try to play background music
            if (bgMusic) {
                bgMusic.play().catch(error => {
                    console.log('Audio autoplay prevented:', error);
                });
            }

            // Start falling hearts animation
            startFallingHearts();

            // Hide overlay with animation
            setTimeout(() => {
                startOverlay.style.opacity = '0';
                startOverlay.style.transform = 'scale(0.95)';

                setTimeout(() => {
                    startOverlay.style.display = 'none';
                }, 500);
            }, 800);
        });
    }
}

// Falling hearts animation
function startFallingHearts() {
    const fallingLayer = document.getElementById('falling-layer');
    if (!fallingLayer) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';

        const duration = (Math.random() * 4 + 3) + 's';
        heart.style.animationDuration = duration;
        heart.style.animationName = 'fall';
        heart.style.animationTimingFunction = 'linear';
        heart.style.animationIterationCount = '1';
        heart.style.animationFillMode = 'forwards';

        fallingLayer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, parseFloat(duration) * 1000 + 1000);
    }

    // Create hearts less frequently (reduced quantity)
    setInterval(createHeart, 4000);
}

// Music toggle functionality
function initMusicToggle() {
    const musicToggle = document.getElementById('toggle-music');
    const bgMusic = document.getElementById('bg-music');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', function () {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicToggle.textContent = '⏸️ Pause Music';
                    musicToggle.setAttribute('aria-pressed', 'true');
                }).catch(error => {
                    console.log('Audio play failed:', error);
                });
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🎵 Play Music ▷';
                musicToggle.setAttribute('aria-pressed', 'false');
            }
        });
    }
}

// Simple Timeline Steps Animation
function initTimelineSteps() {
    const timelineSteps = document.querySelectorAll('.timeline-step');

    console.log('Timeline Steps initialized:', timelineSteps.length, 'steps');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = parseInt(entry.target.getAttribute('data-step'));
                console.log('Step', stepNumber, 'is visible');

                // Animate the step
                entry.target.classList.add('animate-in');

                // Animate the connecting line after the step appears
                const connectingLine = entry.target.querySelector('.connecting-line');
                if (connectingLine) {
                    setTimeout(() => {
                        connectingLine.classList.add('animate');
                        console.log('Animating line for step', stepNumber);
                    }, 500);
                }

                // Pulse the step dot
                const stepDot = entry.target.querySelector('.step-dot');
                if (stepDot) {
                    setTimeout(() => {
                        stepDot.style.animation = 'pulseStep 0.6s ease-out';
                    }, 300);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineSteps.forEach(step => {
        observer.observe(step);
    });
}

// Initialize website
document.addEventListener('DOMContentLoaded', function () {
    // Initialize start experience
    initStartExperience();

    // Initialize music toggle
    initMusicToggle();

    // Initialize interactive elements
    initInteractiveElements();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize typewriter and handwriting effects
    initTypewriter();
    initHandwriting();

    // Start countdown
    startCountdown();

    // Initialize first memory
    showRandomMemory();

    // Initialize compatibility card
    initCompatibilityCard();

    // Initialize love confession animation
    initLoveConfession();

    // Initialize timeline steps
    initTimelineSteps();

    // Start hearts animation immediately
    startFallingHearts();

    // Initialize love meter
    initLoveMeter();

    console.log('Anniversary website loaded successfully! ❤️');
});

// Interactive Love Meter functionality
function initLoveMeter() {
    const loveHeartButton = document.getElementById('love-heart-button');
    const loveStats = document.getElementById('love-stats');
    const loveResult = document.getElementById('love-result');
    const floatingHeartsContainer = document.getElementById('floating-hearts');

    if (!loveHeartButton) return;

    loveHeartButton.addEventListener('click', function () {
        // Add active class to heart
        loveHeartButton.classList.add('active');

        // Show and animate stats
        setTimeout(() => {
            if (loveStats) {
                loveStats.classList.add('show');
                animateStatBars();
            }
        }, 500);

        // Show result
        setTimeout(() => {
            if (loveResult) {
                loveResult.classList.add('show');
                createFloatingHearts();
            }
        }, 2000);

        // Disable button after click
        loveHeartButton.style.pointerEvents = 'none';
        loveHeartButton.style.opacity = '0.8';
    });
}

function animateStatBars() {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach((fill, index) => {
        setTimeout(() => {
            const value = fill.getAttribute('data-value');
            fill.style.width = value + '%';
        }, index * 200);
    });
}

function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const hearts = ['💖', '💕', '💗', '💝', '💘'];

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(heart);

            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 3000);
        }, i * 100);
    }
}

// Balloon animation function
function createBalloonAnimation() {
    const balloonLayer = document.getElementById('balloon-layer');
    if (!balloonLayer) return;

    const balloonColors = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const balloonEmojis = ['🎈', '🎉', '🎊', '🎁', '💖'];

    // Create multiple balloons
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';

            // Random balloon emoji
            balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];

            // Random starting position
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.bottom = '-50px';

            // Random animation duration and delay
            const duration = (Math.random() * 2 + 3) + 's';
            balloon.style.animationDuration = duration;
            balloon.style.animationDelay = (Math.random() * 0.5) + 's';

            balloonLayer.appendChild(balloon);

            // Remove balloon after animation
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 5000);
        }, i * 150); // Stagger balloon creation
    }
}

// Certificate generation function
function generateAndDownloadCertificate() {
    // Create canvas for certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#ff6b9d');
    gradient.addColorStop(0.5, '#c471ed');
    gradient.addColorStop(1, '#12c2e9');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add decorative border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner border
    ctx.strokeStyle = '#ffeaa7';
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Certificate text
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    // Title
    ctx.font = 'bold 48px serif';
    ctx.fillText('💖 Certificate of Love 💖', canvas.width / 2, 120);

    // Subtitle
    ctx.font = '24px serif';
    ctx.fillText('This certifies that', canvas.width / 2, 180);

    // Names
    ctx.font = 'bold 36px serif';
    ctx.fillStyle = '#ffeaa7';
    ctx.fillText('Nick & Anjali', canvas.width / 2, 240);

    // Main text
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px serif';
    ctx.fillText('Have shared an incredible love story', canvas.width / 2, 300);
    ctx.fillText('Full of beautiful memories, laughter, and joy', canvas.width / 2, 330);
    ctx.fillText('Their love is certified to be', canvas.width / 2, 370);

    // Special text
    ctx.font = 'bold 28px serif';
    ctx.fillStyle = '#ffeaa7';
    ctx.fillText('✨ FOREVER & ALWAYS ✨', canvas.width / 2, 420);

    // Date
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px serif';
    const today = new Date().toLocaleDateString();
    ctx.fillText(`Issued on: ${today}`, canvas.width / 2, 480);

    // Hearts decoration
    ctx.font = '30px serif';
    ctx.fillText('💕', 150, 500);
    ctx.fillText('💕', canvas.width - 150, 500);
    ctx.fillText('🌟', 100, 200);
    ctx.fillText('🌟', canvas.width - 100, 200);

    // Download the certificate
    const link = document.createElement('a');
    link.download = 'Love_Certificate_Nick_Anjali.png';
    link.href = canvas.toDataURL();
    link.click();

    // Show success message
    const button = document.getElementById('download-certificate');
    const originalText = button.textContent;
    button.textContent = '✅ Certificate Downloaded!';
    button.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
}

// Compatibility Card Animation
function initCompatibilityCard() {
    const compatibilityBars = document.querySelectorAll('.compatibility-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                bar.style.setProperty('--target-width', percentage + '%');
                bar.style.width = percentage + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    compatibilityBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Love Confession Animation
function initLoveConfession() {
    const playButton = document.getElementById('play-confession');
    const replayButton = document.getElementById('replay-confession');
    const confessionScene = document.querySelector('.confession-scene');

    if (playButton) {
        playButton.addEventListener('click', function () {
            playLoveConfession();
            playButton.style.display = 'none';
            replayButton.style.display = 'inline-block';
        });
    }

    if (replayButton) {
        replayButton.addEventListener('click', function () {
            replayLoveConfession();
        });
    }
}

function playLoveConfession() {
    const scene = document.querySelector('.confession-scene');
    const characters = scene.querySelectorAll('.character-me, .character-you');
    const flowers = scene.querySelector('.flowers-bouquet');
    const hearts = scene.querySelectorAll('.confession-heart');
    const speechBubble = scene.querySelector('.speech-bubble');
    const confessionText = document.getElementById('confession-text');

    // Reset all animations
    scene.classList.add('playing');

    // Animate characters entering
    setTimeout(() => {
        const nickCharacter = scene.querySelector('.character-me');
        const anjaliCharacter = scene.querySelector('.character-you');

        // Anjali bounces in first
        if (anjaliCharacter) {
            anjaliCharacter.style.animation = 'bounceIn 1s ease-out both';
        }

        // Nick bounces in after
        if (nickCharacter) {
            nickCharacter.style.animation = 'bounceIn 1s ease-out 0.5s both';
        }
    }, 100);

    // Show flowers and make Nick move closer
    setTimeout(() => {
        if (flowers) {
            flowers.style.animation = 'fadeInFlowers 1s ease-out both';
        }
    }, 1500);

    // Make Nick move closer to Anjali with flowers
    setTimeout(() => {
        const nickCharacter = scene.querySelector('.character-me');
        if (nickCharacter) {
            nickCharacter.style.animation = 'moveCloserWithFlowers 2s ease-in-out both';
        }

        // Move flowers with Nick
        if (flowers) {
            flowers.classList.add('moving');
            flowers.style.animation = 'moveFlowersWithNick 2s ease-in-out both';
        }

        // Change Nick's arm animation to extend toward Anjali
        const nickArm = scene.querySelector('.character-me .arm.holding-flowers');
        if (nickArm) {
            setTimeout(() => {
                nickArm.style.animation = 'extendArmToAnjali 1s ease-out both';
            }, 1000);
        }

        // Add Anjali's shy reaction when Nick gets closer
        const anjaliCharacter = scene.querySelector('.character-you');
        if (anjaliCharacter) {
            setTimeout(() => {
                anjaliCharacter.style.animation = 'anjaliShyReaction 1.5s ease-in-out both';
            }, 1200);
        }
    }, 2000);

    // Show speech bubble with typing effect
    setTimeout(() => {
        if (speechBubble && confessionText) {
            speechBubble.style.animation = 'showSpeech 1s ease-out both';
            typeConfessionText();
        }
    }, 2500);

    // Animate hearts
    setTimeout(() => {
        hearts.forEach((heart, index) => {
            heart.style.animation = `floatHeart 4s ease-in-out infinite ${index * 0.5}s`;
        });
    }, 3000);

    // Final celebration
    setTimeout(() => {
        createConfessionCelebration();
    }, 5000);
}

function replayLoveConfession() {
    const scene = document.querySelector('.confession-scene');

    // Reset all elements
    scene.classList.remove('playing');

    // Clear existing animations
    const animatedElements = scene.querySelectorAll('*');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });

    // Restart after a brief delay
    setTimeout(() => {
        playLoveConfession();
    }, 200);
}

function typeConfessionText() {
    const textElement = document.getElementById('confession-text');
    if (!textElement) return;

    const messages = [
        "Anjali... 💕",
        "You make my heart skip a beat 💓",
        "Will you be mine forever? 💍",
        "I love you more than words can say! 💖✨"
    ];

    let messageIndex = 0;

    function showNextMessage() {
        if (messageIndex < messages.length) {
            textElement.textContent = messages[messageIndex];
            messageIndex++;
            setTimeout(showNextMessage, 2000);
        }
    }

    showNextMessage();
}

function createConfessionCelebration() {
    const scene = document.querySelector('.confession-scene');
    if (!scene) return;

    // Create celebration hearts
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['💖', '💕', '💝', '💗', '💞'][Math.floor(Math.random() * 5)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '20';

        scene.appendChild(heart);

        // Animate heart floating up
        heart.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(-${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'ease-out'
        }).onfinish = () => {
            heart.remove();
        };
    }
}

// Additional interactive functionality
function initInteractiveElements() {
    // Quiz form submission
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleQuizSubmission();
        });
    }

    // Random memory button
    const randomMemoryBtn = document.getElementById('random-memory-btn');
    if (randomMemoryBtn) {
        randomMemoryBtn.addEventListener('click', showRandomMemory);
    }

    // Before/after slider
    const baSlider = document.getElementById('ba-slider');
    if (baSlider) {
        baSlider.addEventListener('input', function () {
            const afterImg = document.querySelector('.ba-after');
            if (afterImg) {
                afterImg.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
            }
        });
    }

    // Secret unlock
    const secretUnlock = document.getElementById('secret-unlock');
    const secretInput = document.getElementById('secret-input');
    if (secretUnlock && secretInput) {
        secretUnlock.addEventListener('click', function () {
            const inputValue = secretInput.value;
            const correctDate = '15102024'; // Change this to your special date

            if (inputValue.toLowerCase() === correctDate.toLowerCase()) {
                const secretContent = document.getElementById('secret-content');
                if (secretContent) {
                    secretContent.hidden = false;
                    secretContent.style.animation = 'slideUp 0.8s ease-out';
                }
            } else {
                // Show error message without popup
                const input = document.getElementById('secret-input');
                if (input) {
                    input.style.borderColor = '#ff6b6b';
                    input.placeholder = '🤔 Try again! Think about our special date 💕✨';
                    setTimeout(() => {
                        input.style.borderColor = '';
                        input.placeholder = 'e.g., October 18 2024';
                    }, 3000);
                }
            }
        });

        // Allow Enter key to unlock
        secretInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                secretUnlock.click();
            }
        });
    }

    // Final button
    const finalButton = document.getElementById('final-button');
    if (finalButton) {
        finalButton.addEventListener('click', function () {
            // Start balloon animation first
            createBalloonAnimation();

            // Hide the button immediately
            finalButton.style.display = 'none';

            // Show final message after balloon animation
            setTimeout(() => {
                const finalMessage = document.getElementById('final-message');
                if (finalMessage) {
                    finalMessage.hidden = false;
                    finalMessage.style.animation = 'slideUp 0.8s ease-out';
                }

                // Trigger celebration after message appears
                setTimeout(() => {
                    celebrate();
                }, 500);
            }, 2000); // Wait for balloons to go up
        });
    }

    // Certificate download functionality
    const certificateButton = document.getElementById('download-certificate');
    if (certificateButton) {
        certificateButton.addEventListener('click', function () {
            generateAndDownloadCertificate();
        });
    }
}

function handleQuizSubmission() {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    if (!form || !resultDiv) return;

    const formData = new FormData(form);
    let score = 0;
    let total = 5; // Number of questions

    // Check answers
    const correctAnswers = {
        'q1': 'italian',
        'q2': 'NYC',
        'q3': 'Harry Potter',
        'q4': 'Your Voice',
        'q5': 'sunset'
    };

    for (let [question, correctAnswer] of Object.entries(correctAnswers)) {
        if (formData.get(question) === correctAnswer) {
            score++;
        }
    }

    const percentage = (score / total) * 100;
    let message = '';

    if (percentage === 100) {
        message = "🎉 Perfect! You know me so well! 💖✨";
    } else if (percentage >= 80) {
        message = "🌟 Amazing! You really pay attention! 😊💕";
    } else if (percentage >= 60) {
        message = "😊 Pretty good! We're getting there! 💕🌸";
    } else {
        message = "😉 We need to spend more time together! 💑💕";
    }

    resultDiv.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <h3>Your Score: ${score} out of ${total}</h3>
            <p style="font-size: 1.2rem; margin: 1rem 0;">${message}</p>
            <div style="width: 100%; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; margin: 1rem 0;">
                <div style="width: ${percentage}%; background: linear-gradient(45deg, var(--pink), var(--purple)); height: 20px; border-radius: 10px; transition: width 1s ease;"></div>
            </div>
        </div>
    `;

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Make functions globally available
window.showPage = showPage;
window.showRandomMemory = showRandomMemory;
window.selectAnswer = selectAnswer;
window.celebrate = celebrate;
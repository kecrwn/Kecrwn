// Smooth scroll to insights section
function scrollToInsights() {
    const insightsSection = document.querySelector('.insights-section');
    if (insightsSection) {
        insightsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openCommentsPopup() {
    const popup = document.getElementById('commentsPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus on name input
        setTimeout(() => {
            const nameInput = document.getElementById('userName');
            if (nameInput) {
                nameInput.focus();
            }
        }, 300);
        
        // Play popup sound
        playPopupSound();
    }
}

function closeCommentsPopup() {
    const popup = document.getElementById('commentsPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

function scrollToComments() {
    openCommentsPopup();
}

// Glitch text effect enhancement
function enhanceGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    // Add random glitch bursts
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            glitchText.style.animation = 'none';
            setTimeout(() => {
                glitchText.style.animation = 'glitch-skew 2s infinite';
            }, 50);
        }
    }, 3000);
    
    // Add hover effect to intensify glitch
    glitchText.addEventListener('mouseenter', function() {
        this.style.animationDuration = '0.3s';
    });
    
    glitchText.addEventListener('mouseleave', function() {
        this.style.animationDuration = '2s';
    });
    
    // Add click handler for popup
    glitchText.addEventListener('click', function() {
        openDimensionPopup();
        startMatrixMusic();
    });
}

// Popup management
let audioContext = null;
let musicInterval = null;

function openDimensionPopup() {
    const popup = document.getElementById('dimensionPopup');
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDimensionPopup() {
    const popup = document.getElementById('dimensionPopup');
    popup.classList.remove('show');
    document.body.style.overflow = 'auto';
    stopMatrixMusic();
}

// Matrix-style background music
function startMatrixMusic() {
    if (audioContext) {
        stopMatrixMusic();
    }
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create ambient matrix sound
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        // Configure oscillator 1 (deep bass)
        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(55, audioContext.currentTime); // A1
        oscillator1.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 2);
        
        // Configure oscillator 2 (higher tone)
        oscillator2.type = 'triangle';
        oscillator2.frequency.setValueAtTime(220, audioContext.currentTime); // A3
        oscillator2.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 3);
        
        // Configure filter for matrix-like sound
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, audioContext.currentTime);
        filter.Q.setValueAtTime(10, audioContext.currentTime);
        
        // Configure gain (volume)
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 5);
        
        // Connect nodes
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioContext.destination);
        
        // Start oscillators
        oscillator1.start();
        oscillator2.start();
        
        // Add digital beeps periodically
        musicInterval = setInterval(() => {
            if (Math.random() < 0.3) {
                createDigitalBeep();
            }
        }, 1000 + Math.random() * 2000);
        
    } catch (error) {
        console.log('Audio not supported or blocked');
    }
}

function createDigitalBeep() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const beepGain = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
    
    beepGain.gain.setValueAtTime(0.05, audioContext.currentTime);
    beepGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.connect(beepGain);
    beepGain.connect(audioContext.destination);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function stopMatrixMusic() {
    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }
    if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
    }
}

// Setup popup event listeners
function setupPopupEvents() {
    const closeBtn = document.getElementById('closePopup');
    const popup = document.getElementById('dimensionPopup');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDimensionPopup);
    }
    
    if (popup) {
        // Close on outside click
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeDimensionPopup();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('show')) {
                closeDimensionPopup();
            }
        });
    }
}

// Initialize modern name effect (replaces typing effect)
function initializeModernName() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    // Add initial entrance animation
    glitchText.style.opacity = '0';
    glitchText.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        glitchText.style.transition = 'all 0.8s ease-out';
        glitchText.style.opacity = '1';
        glitchText.style.transform = 'translateX(0)';
    }, 1500);
}

// Digital Rain Effect Enhancement
function createDigitalRain() {
    const digitalRain = document.getElementById('digitalRain');
    if (!digitalRain) return;
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    const charsArray = chars.split('');
    
    const createRainDrop = () => {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.textContent = charsArray[Math.floor(Math.random() * charsArray.length)];
        drop.style.position = 'absolute';
        drop.style.top = '-20px';
        drop.style.left = Math.random() * window.innerWidth + 'px';
        drop.style.color = '#00FF41';
        drop.style.fontSize = '14px';
        drop.style.fontFamily = 'JetBrains Mono, monospace';
        drop.style.opacity = '0.3';
        drop.style.pointerEvents = 'none';
        drop.style.zIndex = '1';
        
        const fallDuration = Math.random() * 20 + 10;
        drop.style.animation = `fall ${fallDuration}s linear infinite`;
        
        digitalRain.appendChild(drop);
        
        // Remove drop after animation
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, fallDuration * 1000);
    };
    
    // Create initial drops
    for (let i = 0; i < 20; i++) {
        setTimeout(createRainDrop, i * 200);
    }
    
    // Continue creating drops
    setInterval(createRainDrop, 800);
}

// Add CSS animation for falling drops
function addRainAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-20px);
                opacity: 0.3;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Card hover enhancement
function enhanceCardInteractions() {
    const cards = document.querySelectorAll('.fact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Typing effect for hero title (optional enhancement)
function addTypingEffect() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    
    const originalText = title.textContent;
    title.textContent = '';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        title.textContent += originalText[index];
        index++;
        
        if (index >= originalText.length) {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Intersection Observer for fade-in animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all fact cards
    const cards = document.querySelectorAll('.fact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('.insights-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Matrix character rain background
function createMatrixBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00FF41';
        ctx.font = `${fontSize}px JetBrains Mono, monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Advanced Hyprland-Style Loading Screen Management
const systemMessages = [
    { delay: 0, text: "boot sequence initiated..." },
    { delay: 200, text: "loading neural matrix framework..." },
    { delay: 400, text: "initializing quantum processors..." },
    { delay: 600, text: "establishing encrypted channels..." },
    { delay: 800, text: "calibrating emotional algorithms..." },
    { delay: 1000, text: "loading relationship protocols..." },
    { delay: 1200, text: "synchronizing consciousness matrix..." },
    { delay: 1400, text: "validating user credentials..." },
    { delay: 1600, text: "connecting to wisdom database..." },
    { delay: 1800, text: "optimizing neural pathways..." },
    { delay: 2000, text: "finalizing system integration..." },
    { delay: 2200, text: "system ready. entering matrix..." }
];

const terminalCommands = [
    "neural-sync --mode=advanced --priority=high",
    "matrix-load --protocol=relationship --version=2.4.1",
    "authenticate --user=partner --level=trusted",
    "initialize --core=emotional-intelligence",
    "sync --databases=wisdom,insights,connection",
    "optimize --performance=maximum --latency=minimum",
    "ready --status=operational --access=granted"
];

let loadingProgress = 0;
let currentMessageIndex = 0;
let terminalTimer = null;

function startAdvancedLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressValue = document.getElementById('progressValue');
    const terminalContent = document.getElementById('terminalContent');
    
    if (!loadingScreen) return;
    
    // Initialize audio
    createMatrixLoadingSound();
    
    // Start terminal command stream
    startTerminalStream(terminalContent);
    
    // Start system messages
    displaySystemMessages(terminalContent);
    
    // Animate progress segments
    animateProgressSegments();
    
    // Main progress animation
    const totalDuration = 3500; // 3.5 seconds for a more dynamic feel
    const startTime = Date.now();
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        loadingProgress = Math.min((elapsed / totalDuration) * 100, 100);
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = loadingProgress + '%';
        }
        
        // Update progress value
        if (progressValue) {
            progressValue.textContent = Math.round(loadingProgress) + '%';
        }
        
        // Update system status
        updateSystemStatus(loadingProgress);
        
        // Complete loading
        if (loadingProgress >= 100) {
            setTimeout(() => {
                completeAdvancedLoading();
            }, 800);
        } else {
            requestAnimationFrame(updateProgress);
        }
    }
    
    updateProgress();
}

function createMatrixLoadingSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a more complex loading sound
        const playTone = (freq, duration, delay = 0) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(freq * 0.5, audioContext.currentTime + duration);
                
                gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + duration);
            }, delay);
        };
        
        // Play a sequence of tones
        playTone(440, 0.3, 0);    // A4
        playTone(523, 0.3, 200);  // C5
        playTone(659, 0.3, 400);  // E5
        playTone(784, 0.5, 600);  // G5
        
    } catch (error) {
        // Audio not supported
    }
}

function startTerminalStream(terminalContent) {
    if (!terminalContent) return;
    
    let commandIndex = 0;
    
    terminalTimer = setInterval(() => {
        if (commandIndex < terminalCommands.length) {
            const command = terminalCommands[commandIndex];
            const timestamp = formatTimestamp(commandIndex * 0.3);
            
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `
                <span class="timestamp">[${timestamp}]</span>
                <span class="command">$ ${command}</span>
            `;
            
            terminalContent.appendChild(commandLine);
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            commandIndex++;
        } else {
            clearInterval(terminalTimer);
        }
    }, 300);
}

function displaySystemMessages(terminalContent) {
    if (!terminalContent) return;
    
    systemMessages.forEach((message, index) => {
        setTimeout(() => {
            const timestamp = formatTimestamp(message.delay / 1000);
            const messageLine = document.createElement('div');
            messageLine.className = 'terminal-line';
            messageLine.innerHTML = `
                <span class="timestamp">[${timestamp}]</span>
                <span class="command">${message.text}</span>
            `;
            
            terminalContent.appendChild(messageLine);
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }, message.delay);
    });
}

function animateProgressSegments() {
    const segments = ['segment1', 'segment2', 'segment3', 'segment4'];
    
    segments.forEach((segmentId, index) => {
        const segment = document.getElementById(segmentId);
        if (segment) {
            setTimeout(() => {
                segment.style.opacity = '1';
                segment.style.transform = segment.style.transform.replace('scale(1)', 'scale(1.3)');
            }, index * 200);
        }
    });
}

function updateSystemStatus(progress) {
    const systemStatus = document.getElementById('systemStatus');
    if (systemStatus) {
        if (progress < 30) {
            systemStatus.textContent = "SYSTEM INITIALIZATION";
        } else if (progress < 60) {
            systemStatus.textContent = "NEURAL SYNCHRONIZATION";
        } else if (progress < 90) {
            systemStatus.textContent = "PROTOCOL CALIBRATION";
        } else {
            systemStatus.textContent = "SYSTEM READY";
        }
    }
}

function formatTimestamp(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:00`;
}

function completeAdvancedLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        // Add final status update
        const systemStatus = document.getElementById('systemStatus');
        if (systemStatus) {
            systemStatus.textContent = "ACCESS GRANTED";
            systemStatus.style.color = '#00FF41';
        }
        
        // Add completion message to terminal
        const terminalContent = document.getElementById('terminalContent');
        if (terminalContent) {
            const completionLine = document.createElement('div');
            completionLine.className = 'terminal-line';
            completionLine.innerHTML = `
                <span class="timestamp">[00:00:04]</span>
                <span class="command" style="color: #00FF41; font-weight: bold;">✓ SYSTEM ONLINE - WELCOME TO THE MATRIX</span>
            `;
            terminalContent.appendChild(completionLine);
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
        
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Remove loading screen after animation and initialize main content
            setTimeout(() => {
                loadingScreen.remove();
                initializeMainContent();
            }, 800);
        }, 1000);
    }
}

function generateRandomBinary() {
    let binary = '';
    const patterns = [
        '01001000 01000101 01001100 01001100 01001111', // HELLO
        '01010111 01001111 01010010 01001100 01000100', // WORLD
        '01001001 01001110 01010011 01001001 01000111 01001000 01010100', // INSIGHT
        '01001101 01000001 01010100 01010010 01001001 01011000', // MATRIX
        '01010010 01000101 01001100 01000001 01010100 01001001 01001111 01001110' // RELATION
    ];
    
    // 70% chance to show a word, 30% random binary
    if (Math.random() < 0.7) {
        return patterns[Math.floor(Math.random() * patterns.length)];
    } else {
        for (let i = 0; i < 45; i++) {
            binary += Math.random() < 0.5 ? '0' : '1';
        }
        return binary;
    }
}

function initializeMainContent() {
    // Initialize all the main content effects
    addRainAnimation();
    createDigitalRain();
    createMatrixBackground();
    enhanceCardInteractions();
    setupScrollAnimations();
    setupPopupEvents();
    initializeModernName();
    initializeCommentSystem();
    setupPopupEventListeners();
    
    console.log('Matrix Interface: Initialized');
    console.log('System Status: All protocols active');
    console.log('Developer: KRISH - Protocol enhanced');
    console.log('Dimension Access: Available');
    console.log('Comment System: Online');
    console.log('Popup System: Active');
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start loading screen immediately
    startAdvancedLoadingScreen();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click effect to cards
document.querySelectorAll('.fact-card').forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Comment System Management
function initializeCommentSystem() {
    const commentForm = document.getElementById('commentForm');
    const userComment = document.getElementById('userComment');
    const charCount = document.getElementById('charCount');
    const commentsList = document.getElementById('commentsList');
    const commentsCount = document.getElementById('commentsCount');
    const noComments = document.getElementById('noComments');
    
    if (!commentForm) return;
    
    // Load existing comments
    loadComments();
    updateCommentsCount();
    
    // Character counter
    if (userComment && charCount) {
        userComment.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 450) {
                charCount.style.color = '#FF6B6B';
            } else if (count > 400) {
                charCount.style.color = '#FFD93D';
            } else {
                charCount.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    // Form submission
    commentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value.trim();
        const commentText = userComment.value.trim();
        
        if (!userName || !commentText) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (userName.length < 2) {
            showNotification('Name must be at least 2 characters', 'error');
            return;
        }
        
        if (commentText.length < 10) {
            showNotification('Comment must be at least 10 characters', 'error');
            return;
        }
        
        // Create comment object
        const comment = {
            id: generateCommentId(),
            name: sanitizeInput(userName),
            text: sanitizeInput(commentText),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            time: new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        // Save comment
        saveComment(comment);
        
        // Display comment
        displayComment(comment);
        
        // Update count
        updateCommentsCount();
        
        // Clear form
        commentForm.reset();
        if (charCount) charCount.textContent = '0';
        
        // Show success message
        showNotification('Message transmitted successfully!', 'success');
        
        // Play success sound
        playSuccessSound();
        
        // Close popup after a delay
        setTimeout(() => {
            closeCommentsPopup();
        }, 2000);
    });
}

function saveComment(comment) {
    let comments = getComments();
    comments.unshift(comment); // Add to beginning
    
    // Keep only the latest 50 comments
    if (comments.length > 50) {
        comments = comments.slice(0, 50);
    }
    
    localStorage.setItem('matrix-relationship-comments', JSON.stringify(comments));
}

function getComments() {
    const stored = localStorage.getItem('matrix-relationship-comments');
    return stored ? JSON.parse(stored) : [];
}

function loadComments() {
    const comments = getComments();
    const commentsList = document.getElementById('commentsList');
    const noComments = document.getElementById('noComments');
    
    if (!commentsList) return;
    
    // Clear existing comments (except no-comments message)
    const existingComments = commentsList.querySelectorAll('.comment-item');
    existingComments.forEach(comment => comment.remove());
    
    if (comments.length === 0) {
        if (noComments) noComments.style.display = 'block';
        return;
    }
    
    if (noComments) noComments.style.display = 'none';
    
    // Display comments
    comments.forEach(comment => {
        displayComment(comment);
    });
}

function displayComment(comment) {
    const commentsList = document.getElementById('commentsList');
    const noComments = document.getElementById('noComments');
    
    if (!commentsList) return;
    
    if (noComments) noComments.style.display = 'none';
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.setAttribute('data-comment-id', comment.id);
    
    commentElement.innerHTML = `
        <div class="comment-header-item">
            <div class="comment-name">${escapeHtml(comment.name)}</div>
            <div class="comment-timestamp">${comment.date} ${comment.time}</div>
        </div>
        <div class="comment-text">${escapeHtml(comment.text)}</div>
    `;
    
    // Insert at the beginning
    commentsList.insertBefore(commentElement, commentsList.firstChild);
    
    // Animate in
    setTimeout(() => {
        commentElement.style.opacity = '1';
        commentElement.style.transform = 'translateY(0)';
    }, 50);
}

function updateCommentsCount() {
    const comments = getComments();
    const commentsCount = document.getElementById('commentsCount');
    
    if (commentsCount) {
        const count = comments.length;
        commentsCount.textContent = `${count} MESSAGE${count !== 1 ? 'S' : ''}`;
    }
}

function generateCommentId() {
    return 'comment_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function sanitizeInput(input) {
    return input.replace(/[<>]/g, '').trim();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : '⚡'}</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 65, 0.9)' : type === 'error' ? 'rgba(255, 107, 107, 0.9)' : 'rgba(0, 255, 65, 0.9)'};
        color: #000;
        padding: 15px 20px;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        font-weight: 600;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function playSuccessSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a success chord
        const frequencies = [523, 659, 784]; // C5, E5, G5
        
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
            }, index * 100);
        });
    } catch (error) {
        // Audio not supported
    }
}

function playPopupSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        // Audio not supported
    }
}

// Initialize comment system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCommentSystem();
    setupPopupEventListeners();
});

function setupPopupEventListeners() {
    // Open popup button
    const openBtn = document.getElementById('openCommentsBtn');
    if (openBtn) {
        openBtn.addEventListener('click', openCommentsPopup);
    }
    
    // Close popup button
    const closeBtn = document.getElementById('closeCommentsBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCommentsPopup);
    }
    
    // Close popup on overlay click
    const popupOverlay = document.getElementById('commentsPopup');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closeCommentsPopup();
            }
        });
    }
    
    // Close popup on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('commentsPopup');
            if (popup && popup.classList.contains('active')) {
                closeCommentsPopup();
            }
        }
    });
}

// Console easter egg
console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║                   MATRIX RELATION PROTOCOL               ║
    ║                     INITIALIZATION COMPLETE              ║
    ║                                                            ║
    ║  Developer: KRISH                                         ║
    ║  "There is no spoon."                                     ║
    ║  "But there is love."                                     ║
    ║  "And now you know the truth."                            ║
    ║                                                            ║
    ║  ⚡ NEW FEATURES ACTIVATED:                               ║
    ║  • Matrix-Style Loading Screen                            ║
    ║  • Modern Font Integration                                ║
    ║  • Interactive Dimension Popup                            ║
    ║  • Matrix-Style Audio System                              ║
    ║  • Enhanced Glitch Effects                                ║
    ║  • Dynamic Binary Code Generation                         ║
    ║  • Glassmorphism Comment Popup                            ║
    ║                                                            ║
    ║  🔥 EXPERIENCE COMPLETE:                                  ║
    ║  1. Matrix loading animation (3.5s)                       ║
    ║  2. Scroll to explore insights                            ║
    ║  3. Click on "KRISH" to enter another dimension...        ║
    ║  4. Click "SHARE YOUR INSIGHTS" for popup comments        ║
    ║                                                            ║
    ║  "Welcome to the real world."                            ║
    ╚══════════════════════════════════════════════════════════╝
`);
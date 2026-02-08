/**
 * Infinite Love - Narrative Engine (CORRECTED)
 * Handles state transitions, UI rendering, and interaction logic.
 * 
 * FIXES APPLIED:
 * - Proper evasive button activation logic
 * - 100px proximity detection for mouse
 * - Correct boundary calculations for button repositioning
 * - Image loading error handling
 * - Confetti timing after fade-in
 * - Fixed touch event handling
 * - Script load order protection
 */

// Constants
const FADE_DURATION = 300; // milliseconds
const CONFETTI_DURATION = 3000; // milliseconds
const PROXIMITY_THRESHOLD = 100; // pixels
const BUTTON_MARGIN = 20; // pixels from edge

// Global State
let currentNodeId = null;
let evasionAttempts = 0;
let isEvasiveActive = false;
let proximityListener = null;

// DOM Elements
let contentLayer, imageEl, wittyEl, questionEl, yesBtn, noBtn, buttonsDiv, appContainer, loadingOverlay, imageLoadingEl;

/**
 * Initialize the application
 * Waits for DOM to be ready and STORY_CONFIG to be loaded
 */
function initApp() {
    // Check if STORY_CONFIG is loaded
    if (typeof STORY_CONFIG === 'undefined') {
        console.error('STORY_CONFIG not loaded. Make sure story.js loads before engine.js');
        alert('Configuration error. Please refresh the page.');
        return;
    }
    
    // Get DOM elements
    contentLayer = document.getElementById("content-layer");
    imageEl = document.getElementById("storyImage");
    wittyEl = document.getElementById("wittyLine");
    questionEl = document.getElementById("question");
    yesBtn = document.getElementById("yesBtn");
    noBtn = document.getElementById("noBtn");
    buttonsDiv = document.getElementById("buttons");
    appContainer = document.getElementById("app");
    loadingOverlay = document.getElementById("loading-overlay");
    imageLoadingEl = document.getElementById("image-loading");
    
    // Set up image error handling
    setupImageErrorHandling();
    
    // Start from the configured start node
    currentNodeId = STORY_CONFIG.start_node;
    
    // Hide loading overlay
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        contentLayer.classList.add('fade-in');
        renderNode(currentNodeId);
    }, 500);
}

/**
 * Sets up global image error handling with fallback
 * Tries imageFallback from current node before falling back to SVG placeholder
 */
function setupImageErrorHandling() {
    imageEl.onerror = () => {
        const node = currentNodeId && STORY_CONFIG.nodes[currentNodeId];
        const fallbackUrl = node && node.imageFallback;
        if (fallbackUrl && imageEl.src !== fallbackUrl) {
            imageEl.src = fallbackUrl;
            return;
        }
        console.warn(`Failed to load image: ${imageEl.src}`);
        imageEl.src = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="#FFB6C1">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `);
        imageLoadingEl.classList.add('hidden');
    };
    
    imageEl.onload = () => {
        imageLoadingEl.classList.add('hidden');
        imageEl.classList.add('loaded');
    };
}

/**
 * Renders the content for a specific narrative node
 * Implements the fade transition requirement
 */
function renderNode(id) {
    const node = STORY_CONFIG.nodes[id];
    
    // Graceful failure for invalid IDs
    if (!node) {
        console.error(`Error: Node ID "${id}" not found.`);
        alert("Story error: Node not found. Please refresh the page.");
        return;
    }

    // 1. Start Transition: Fade Out
    contentLayer.classList.add("fade-out");
    contentLayer.classList.remove("fade-in");

    // Wait for fade out to complete
    setTimeout(() => {
        // 2. Update Content
        imageLoadingEl.classList.remove('hidden');
        imageEl.classList.remove('loaded');
        imageEl.src = node.image;
        // Support wittyLines (array) for random selection, or wittyLine (string)
        wittyEl.textContent = Array.isArray(node.wittyLines)
            ? node.wittyLines[Math.floor(Math.random() * node.wittyLines.length)]
            : node.wittyLine;
        questionEl.textContent = node.question;

        // Reset UI State
        resetButtons();
        evasionAttempts = 0;

        // 3. Handle Terminal vs Interactive Nodes
        if (node.isTerminal) {
            handleTerminalNode();
        } else {
            handleInteractiveNode(node);
        }

        // 4. End Transition: Fade In
        contentLayer.classList.remove("fade-out");
        contentLayer.classList.add("fade-in");
        
    }, FADE_DURATION);
}

/**
 * Sets up buttons for user interaction
 * CORRECTED: Proper evasive button activation logic
 * Supports yesOnly nodes (only Yes button, no No button)
 * ending_no shows both buttons with evasive No (runs away from cursor)
 */
function handleInteractiveNode(node) {
    buttonsDiv.style.display = "flex";
    
    // Yes-only nodes: hide No button, only show Yes (ending_no is NOT yesOnly - it has evasive No)
    if (node.yesOnly === true) {
        noBtn.style.display = "none";
        yesBtn.onclick = () => goTo(node.yes_target);
        return;
    }
    
    // Normal nodes: show both buttons
    noBtn.style.display = "";
    yesBtn.onclick = () => goTo(node.yes_target);
    noBtn.onclick = () => goTo(node.no_target);

    // Evasive logic: activate when node has both buttons and Yes leads to terminal
    // (covers stage_yes_bridge, no_stage_5, and ending_no)
    const yesTarget = STORY_CONFIG.nodes[node.yes_target];
    const isFinalQuestion = !node.isTerminal && 
                           !node.yesOnly && 
                           node.no_target != null &&
                           yesTarget && yesTarget.isTerminal;

    if (isFinalQuestion) {
        activateEvasiveButton();
    }
}

/**
 * Handles the final celebratory state
 * CORRECTED: Confetti launches after fade-in completes
 */
function handleTerminalNode() {
    buttonsDiv.style.display = "none";
    
    // Wait for fade-in to complete before launching confetti
    setTimeout(() => {
        launchConfetti();
    }, FADE_DURATION + 50);
}

/**
 * Resets buttons to default position/style
 * CORRECTED: Properly removes all evasive mechanics
 */
function resetButtons() {
    // Deactivate evasive mode
    deactivateEvasiveButton();
    
    // Restore No button visibility (in case it was hidden on a yesOnly node)
    noBtn.style.display = "";
    
    // Reset button styles
    noBtn.classList.remove('evasive');
    noBtn.style.position = "static";
    noBtn.style.transform = "scale(1)";
    noBtn.style.left = "auto";
    noBtn.style.top = "auto";
}

/**
 * State Transition Function
 */
function goTo(targetId) {
    if (!targetId) return;
    currentNodeId = targetId;
    renderNode(currentNodeId);
}

/**
 * CORRECTED: Evasive Button with Proximity Detection
 * Activates the evasive "No" button behavior
 * PRD Reference: Section 4.2.1
 */
function activateEvasiveButton() {
    isEvasiveActive = true;
    noBtn.classList.add('no-select');
    
    // CORRECTED: Implement 100px proximity detection
    proximityListener = (e) => {
        // Only track if button is not already moved
        const rect = noBtn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(e.clientX - btnCenterX, 2) + 
            Math.pow(e.clientY - btnCenterY, 2)
        );
        
        if (distance < PROXIMITY_THRESHOLD) {
            moveButton();
        }
    };
    
    // Add proximity listener for desktop
    document.addEventListener('mousemove', proximityListener);
    
    // Add touch listener for mobile (scoped to button only)
    noBtn.addEventListener('touchstart', handleTouchMove, { passive: false });
}

/**
 * Deactivates evasive button behavior
 */
function deactivateEvasiveButton() {
    isEvasiveActive = false;
    
    // Remove proximity listener
    if (proximityListener) {
        document.removeEventListener('mousemove', proximityListener);
        proximityListener = null;
    }
    
    // Remove touch listener
    noBtn.removeEventListener('touchstart', handleTouchMove);
    
    noBtn.classList.remove('no-select');
}

/**
 * CORRECTED: Touch event handler that doesn't break scrolling
 */
function handleTouchMove(e) {
    e.preventDefault(); // Only prevents on the button itself
    moveButton();
}

/**
 * CORRECTED: Moves the button with proper boundary constraints
 * PRD Reference: Section 4.2.1 - "maintains 20px margin"
 */
function moveButton() {
    evasionAttempts++;
    
    // After 5 attempts, shrink the button for humor
    if (evasionAttempts > 5) {
        noBtn.style.transform = "scale(0.8)";
    }
    
    // CORRECTED: Calculate boundaries relative to app container
    const containerRect = appContainer.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate valid range (account for button size and margins)
    const maxX = containerRect.width - btnWidth - BUTTON_MARGIN;
    const maxY = containerRect.height - btnHeight - BUTTON_MARGIN;
    
    // Generate random position within safe bounds
    const randomX = BUTTON_MARGIN + Math.random() * (maxX - BUTTON_MARGIN);
    const randomY = BUTTON_MARGIN + Math.random() * (maxY - BUTTON_MARGIN);
    
    // Apply position
    noBtn.classList.add('evasive');
    noBtn.style.position = "absolute";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

/**
 * CORRECTED: Confetti with proper timing and specifications
 * PRD Reference: Section 4.2.2
 */
function launchConfetti() {
    const end = Date.now() + CONFETTI_DURATION;
    const colors = ['#C41E3A', '#FFB6C1', '#FFD700']; // Red, Pink, Gold
    
    (function frame() {
        // Launch from multiple origins for better effect
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: colors,
            shapes: ['circle', 'square'], // hearts not universally supported, use shapes
            scalar: 1.2
        });
        
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: colors,
            shapes: ['circle', 'square'],
            scalar: 1.2
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

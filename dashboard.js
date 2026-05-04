// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Mark nav item as active
    event.target.closest('.nav-item').classList.add('active');
}

// ===== IMAGE GENERATOR =====
function generateImage() {
    const prompt = document.getElementById('imagePrompt').value;
    if (!prompt) {
        alert('Please enter a prompt for the image');
        return;
    }

    const output = document.getElementById('imageOutput');
    output.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎨</div>
            <div style="color: var(--primary); margin-bottom: 0.5rem;">Generating image...</div>
            <div style="color: #a0a0a0; font-size: 0.9rem;">${prompt}</div>
            <div style="margin-top: 1.5rem;">
                <div style="width: 300px; height: 200px; background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(168, 85, 247, 0.1)); border-radius: 8px; margin: 0 auto;"></div>
            </div>
            <div style="color: #a0a0a0; margin-top: 1rem; font-size: 0.85rem;">✓ Image generated successfully!</div>
        </div>
    `;
}

// ===== BLOG WRITER =====
function generateBlog() {
    const topic = document.getElementById('blogTopic').value;
    const length = document.getElementById('blogLength').value;

    if (!topic) {
        alert('Please enter a blog topic');
        return;
    }

    const lengths = {
        short: 300,
        medium: 600,
        long: 1200
    };

    const sampleContent = `
        <div style="background: rgba(10, 14, 19, 0.8); padding: 1.5rem; border-radius: 8px;">
            <h3 style="color: var(--primary); margin-bottom: 1rem;">${topic}</h3>
            <p style="color: #a0a0a0; line-height: 1.8; margin-bottom: 1rem;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a sample blog post about "${topic}".
            </p>
            <p style="color: #a0a0a0; line-height: 1.8; margin-bottom: 1rem;">
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p style="color: #a0a0a0; line-height: 1.8;">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. This is approximately ${lengths[length]} words of content about your topic.
            </p>
            <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(0, 212, 255, 0.1);">
                <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;" onclick="copyToClipboard('blog')">📋 Copy</button>
                <button class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-left: 0.5rem;" onclick="downloadContent('blog', '${topic}')">⬇️ Download</button>
            </div>
        </div>
    `;

    document.getElementById('blogOutput').innerHTML = sampleContent;
}

// ===== SMART NOTES =====
let notes = JSON.parse(localStorage.getItem('userNotes')) || [];

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title || !content) {
        alert('Please enter both title and content');
        return;
    }

    const note = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date().toLocaleString()
    };

    notes.push(note);
    localStorage.setItem('userNotes', JSON.stringify(notes));

    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';

    displayNotes();
    alert('✅ Note saved successfully!');
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="color: #a0a0a0; text-align: center;">No notes yet. Create your first note above!</p>';
        return;
    }

    let html = '';
    notes.forEach(note => {
        html += `
            <div class="note-item">
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div style="color: #707070; font-size: 0.8rem; margin-bottom: 0.5rem;">${note.timestamp}</div>
                <button class="note-delete" onclick="deleteNote(${note.id})">🗑️ Delete</button>
            </div>
        `;
    });
    notesList.innerHTML = html;
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    localStorage.setItem('userNotes', JSON.stringify(notes));
    displayNotes();
}

// Load notes on page load
document.addEventListener('DOMContentLoaded', () => {
    displayNotes();
});

// ===== CAPTION GENERATOR =====
function generateCaption() {
    const desc = document.getElementById('captionDesc').value;
    const platform = document.getElementById('captionPlatform').value;

    if (!desc) {
        alert('Please describe your content');
        return;
    }

    const captions = {
        instagram: [
            `✨ ${desc} #instagood #instagram`,
            `Love this! 💫 ${desc} #photooftheday`,
            `🌟 ${desc} #insta`
        ],
        twitter: [
            `Check this out! ${desc} 🚀`,
            `Amazing! ${desc} ✨`,
            `${desc} 💯`
        ],
        facebook: [
            `Sharing this moment: ${desc} 👍`,
            `Love sharing these moments! ${desc}`,
            `Check out: ${desc} #friends`
        ],
        tiktok: [
            `${desc} 🎬 #foryou #trending`,
            `POV: ${desc} #fyp #viral`,
            `${desc} 🔥 #trending`
        ]
    };

    const selected = captions[platform];
    let html = '<div style="display: grid; gap: 1rem;">';
    selected.forEach((caption, idx) => {
        html += `
            <div style="background: rgba(10, 14, 19, 0.8); padding: 1rem; border-radius: 6px; border-left: 3px solid var(--primary);">
                <div style="color: #a0a0a0; margin-bottom: 0.75rem;">Caption ${idx + 1}:</div>
                <div style="color: var(--light); margin-bottom: 0.75rem;">${caption}</div>
                <button class="btn btn-small" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="copyCaption('${caption}')">📋 Copy</button>
            </div>
        `;
    });
    html += '</div>';
    document.getElementById('captionOutput').innerHTML = html;
}

function copyCaption(text) {
    navigator.clipboard.writeText(text);
    alert('✅ Caption copied to clipboard!');
}

// ===== STUDY TIMER =====
let timerInterval = null;
let timeRemaining = 25 * 60;
let isRunning = false;
let isStudyTime = true;

function startTimer() {
    if (isRunning) return;

    const studyTime = parseInt(document.getElementById('studyTime').value) * 60;
    if (timeRemaining === 25 * 60) {
        timeRemaining = studyTime;
    }

    isRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining === 0) {
            isStudyTime = !isStudyTime;
            const breakTime = parseInt(document.getElementById('breakTime').value) * 60;
            timeRemaining = isStudyTime ? studyTime : breakTime;
            
            const message = isStudyTime ? '⏱️ Study time! Get focused!' : '☕ Break time! Rest well!';
            alert(message);
            document.getElementById('timerStatus').textContent = message;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    const studyTime = parseInt(document.getElementById('studyTime').value) * 60;
    timeRemaining = studyTime;
    isStudyTime = true;
    updateTimerDisplay();
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('timerStatus').textContent = 'Ready to study!';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerValue').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// ===== WELLNESS BREAK =====
const wellnessGuides = {
    meditation: {
        title: '🧘 Guided Meditation',
        content: `<div class="wellness-instruction">
            <div style="margin-bottom: 1rem;">Find a comfortable position...</div>
            <div style="margin-bottom: 1rem;">Close your eyes and take deep breaths</div>
            <div style="margin-bottom: 1rem;">Focus on your breathing - 4 counts in, hold 4 counts, 4 counts out</div>
            <div style="margin-bottom: 1rem;">Visualize a peaceful place...</div>
            <div>Continue for 5-10 minutes</div>
        </div>`
    },
    stretching: {
        title: '🤸 Stretching Routine',
        content: `<div class="wellness-instruction">
            <div style="margin-bottom: 1rem;">1. Neck Rolls - Slowly roll your head in circles</div>
            <div style="margin-bottom: 1rem;">2. Shoulder Shrugs - Raise and lower shoulders</div>
            <div style="margin-bottom: 1rem;">3. Arm Circles - Extend arms and make circles</div>
            <div style="margin-bottom: 1rem;">4. Forward Bend - Touch your toes gently</div>
            <div>5. Hold each stretch for 30 seconds</div>
        </div>`
    },
    breathing: {
        title: '💨 Deep Breathing Exercise',
        content: `<div class="wellness-instruction">
            <div style="margin-bottom: 1rem;">4-7-8 Breathing Technique:</div>
            <div style="margin-bottom: 1rem;">Breathe in through nose for 4 counts</div>
            <div style="margin-bottom: 1rem;">Hold the breath for 7 counts</div>
            <div style="margin-bottom: 1rem;">Exhale through mouth for 8 counts</div>
            <div>Repeat 5-10 times for calm relaxation</div>
        </div>`
    },
    yoga: {
        title: '🧘‍♀️ Quick Yoga Sequence',
        content: `<div class="wellness-instruction">
            <div style="margin-bottom: 1rem;">1. Child's Pose - Kneel and fold forward</div>
            <div style="margin-bottom: 1rem;">2. Cat-Cow Stretch - Arch and round your back</div>
            <div style="margin-bottom: 1rem;">3. Downward Dog - Form an inverted V shape</div>
            <div style="margin-bottom: 1rem;">4. Warrior Pose - Strong standing position</div>
            <div>Hold each pose for 30-60 seconds</div>
        </div>`
    }
};

function startWellness(type) {
    const guide = wellnessGuides[type];
    const content = document.getElementById('wellnessContent');
    
    content.innerHTML = `
        <h3 style="color: var(--primary); margin-bottom: 1.5rem;">${guide.title}</h3>
        ${guide.content}
        <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="completeWellness()">✅ Complete</button>
    `;
    
    document.querySelector('.wellness-options').style.display = 'none';
    content.style.display = 'block';
}

function completeWellness() {
    alert('🎉 Great job! You\'ve completed your wellness break. Feel refreshed!');
    document.querySelector('.wellness-options').style.display = 'grid';
    document.getElementById('wellnessContent').style.display = 'none';
}

// ===== UTILITIES =====
function copyToClipboard(type) {
    const text = document.getElementById(type === 'blog' ? 'blogOutput' : 'imageOutput').innerText;
    navigator.clipboard.writeText(text);
    alert('✅ Copied to clipboard!');
}

function downloadContent(type, filename) {
    const content = document.getElementById(type === 'blog' ? 'blogOutput' : 'imageOutput').innerText;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${filename}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

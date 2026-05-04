// Initialize content library on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

// Load content from localStorage or use default
let allContent = JSON.parse(localStorage.getItem('adminContent')) || [
    {
        id: 1,
        title: "AI Prompt Engineering Guide",
        category: "guide",
        type: "premium",
        description: "Learn how to write effective prompts for AI models to get better results",
        icon: "📚",
        views: 2500
    },
    {
        id: 2,
        title: "Image Generation Workflow",
        category: "tutorial",
        type: "free",
        description: "Step-by-step tutorial on generating images with AI - from concept to final output",
        icon: "🎨",
        views: 1200
    },
    {
        id: 3,
        title: "Blog Writing Best Practices",
        category: "guide",
        type: "free",
        description: "Tips for writing engaging blog posts using AI assistance",
        icon: "✍️",
        views: 1800
    },
    {
        id: 4,
        title: "Advanced Image Generation Techniques",
        category: "tutorial",
        type: "premium",
        description: "Master advanced techniques for creating professional images with AI",
        icon: "🖼️",
        views: 950
    },
    {
        id: 5,
        title: "Productivity Hacks with AI",
        category: "tips",
        type: "free",
        description: "Quick tips to boost your productivity using AI tools",
        icon: "⚡",
        views: 3200
    },
    {
        id: 6,
        title: "Premium Templates Collection",
        category: "tutorial",
        type: "premium",
        description: "Exclusive collection of templates for all your AI projects",
        icon: "🎁",
        views: 1100
    }
];

// Load and display content
function loadContent() {
    displayContent(allContent);
}

// Display content based on current filters
function displayContent(contentToDisplay) {
    const grid = document.getElementById('contentGrid');
    
    if (contentToDisplay.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #a0a0a0;">No content found. Try adjusting your filters.</div>';
        return;
    }

    let html = '';
    contentToDisplay.forEach(item => {
        const lockIcon = item.type === 'premium' ? '🔒' : '🔓';
        html += `
            <div class="content-card" onclick="viewContent(${item.id})">
                <div class="content-icon">${item.icon}</div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <div class="content-meta">
                    <span class="content-views">👁️ ${item.views.toLocaleString()}</span>
                    <span class="preview-badge ${item.type}">${lockIcon} ${item.type}</span>
                </div>
            </div>
        `;
    });
    grid.innerHTML = html;
}

// Filter content
function filterContent() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedType = document.getElementById('typeFilter').value;

    let filtered = allContent.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || 
                            item.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || item.category === selectedCategory;
        const matchesType = !selectedType || item.type === selectedType;
        
        return matchesSearch && matchesCategory && matchesType;
    });

    displayContent(filtered);
}

// View content details
function viewContent(id) {
    const content = allContent.find(c => c.id === id);
    if (content) {
        if (content.type === 'premium') {
            alert(`🔒 This is premium content!\n\nTitle: ${content.title}\n\nUpgrade to Pro plan to access this content and unlock all premium features.`);
        } else {
            alert(`📖 ${content.title}\n\n${content.description}\n\n👁️ Views: ${content.views.toLocaleString()}\n\nClick "Get Started" to access full content!`);
        }
    }
}

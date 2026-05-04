// Admin content storage (in production, would use backend database)
let adminContent = JSON.parse(localStorage.getItem('adminContent')) || [
    {
        id: 1,
        title: "AI Prompt Engineering Guide",
        category: "guide",
        type: "premium",
        description: "Learn how to write effective prompts for AI models",
        icon: "📚",
        views: 2500,
        url: "#"
    },
    {
        id: 2,
        title: "Image Generation Workflow",
        category: "tutorial",
        type: "free",
        description: "Step-by-step tutorial on generating images with AI",
        icon: "🎨",
        views: 1200,
        url: "#"
    }
];

let adminUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Free", usage: "5/10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Pro", usage: "Unlimited" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Enterprise", usage: "Custom" }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', () => {
    loadManageContent();
    loadUsers();
});

// Switch admin tabs
function switchAdminTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Hide all nav items as active
    document.querySelectorAll('.admin-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    // Mark nav item as active
    event.target.closest('.admin-nav-item').classList.add('active');
}

// ===== SUBMIT CONTENT =====
function submitContent(e) {
    e.preventDefault();

    const title = document.getElementById('contentTitle').value;
    const category = document.getElementById('contentCategory').value;
    const type = document.getElementById('contentType').value;
    const description = document.getElementById('contentDesc').value;
    const icon = document.getElementById('contentIcon').value || '📄';
    const views = parseInt(document.getElementById('contentViews').value) || 0;
    const url = document.getElementById('contentUrl').value || '#';

    // Validate
    if (!title || !category || !type) {
        alert('Please fill all required fields');
        return;
    }

    // Create new content object
    const newContent = {
        id: adminContent.length + 1,
        title,
        category,
        type,
        description,
        icon,
        views,
        url,
        createdAt: new Date().toLocaleDateString()
    };

    // Add to array
    adminContent.push(newContent);

    // Save to localStorage
    localStorage.setItem('adminContent', JSON.stringify(adminContent));

    // Show success
    showSuccessModal(`Content "${title}" added successfully!`);

    // Reset form
    e.target.reset();

    // Update preview
    document.getElementById('previewContent').innerHTML = 
        `<p style="color: #00d4ff;">✓ Added: ${title}</p>`;

    // Update dashboard
    loadManageContent();
}

// ===== LOAD MANAGE CONTENT =====
function loadManageContent() {
    const tableContainer = document.getElementById('contentTable');
    
    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Views</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    adminContent.forEach(item => {
        html += `
            <tr>
                <td>${item.icon} ${item.title}</td>
                <td>${item.category}</td>
                <td><span class="preview-badge">${item.type}</span></td>
                <td>${item.views}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editContent(${item.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteContent(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    tableContainer.innerHTML = html;
}

// ===== EDIT CONTENT =====
function editContent(id) {
    const content = adminContent.find(c => c.id === id);
    if (content) {
        // Populate form with existing data
        document.getElementById('contentTitle').value = content.title;
        document.getElementById('contentCategory').value = content.category;
        document.getElementById('contentType').value = content.type;
        document.getElementById('contentDesc').value = content.description;
        document.getElementById('contentIcon').value = content.icon;
        document.getElementById('contentViews').value = content.views;
        document.getElementById('contentUrl').value = content.url;

        // Scroll to form
        document.querySelector('.admin-form').scrollIntoView({ behavior: 'smooth' });

        // Switch to content tab
        switchAdminTab('content');
        
        alert('Edit mode: Make changes and submit to update.');
    }
}

// ===== DELETE CONTENT =====
function deleteContent(id) {
    if (confirm('Are you sure you want to delete this content?')) {
        adminContent = adminContent.filter(c => c.id !== id);
        localStorage.setItem('adminContent', JSON.stringify(adminContent));
        showSuccessModal('Content deleted successfully!');
        loadManageContent();
    }
}

// ===== LOAD USERS =====
function loadUsers() {
    const usersGrid = document.getElementById('usersGrid');
    let html = '';

    adminUsers.forEach(user => {
        html += `
            <div class="user-card">
                <div class="user-avatar">👤</div>
                <h4>${user.name}</h4>
                <p style="color: #a0a0a0; font-size: 0.9rem;">${user.email}</p>
                <span class="user-plan">${user.plan}</span>
                <div class="user-stats">
                    <p>Usage: ${user.usage}</p>
                    <button class="btn btn-primary" style="margin-top: 0.8rem; padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="manageUser(${user.id})">Manage</button>
                </div>
            </div>
        `;
    });

    usersGrid.innerHTML = html;
}

function manageUser(id) {
    alert(`Managing user ID: ${id} (In production, opens detailed user management)`);
}

// ===== MODAL FUNCTIONS =====
function showSuccessModal(message) {
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('successModal').classList.add('active');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = (event) => {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.classList.remove('active');
    }
};

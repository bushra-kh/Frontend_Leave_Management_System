const LEAVES_KEY = "leaves";

function getLeaves() {
    return JSON.parse(localStorage.getItem(LEAVES_KEY)) || [];
}

function saveLeaves(leaves) {
    localStorage.setItem(LEAVES_KEY, JSON.stringify(leaves));
}

function addLeave(leave) {
    const leaves = getLeaves();
    leaves.push({
        id: Date.now(),
        ...leave,
        status: "Pending",
        createdAt: new Date().toISOString()
    });
    saveLeaves(leaves);
}

function updateLeaveStatus(id, status) {
    const leaves = getLeaves();
    const index = leaves.findIndex(l => l.id === id);
    if (index !== -1) {
        leaves[index].status = status;
        saveLeaves(leaves);
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Navigation highlighting
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav a").forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});

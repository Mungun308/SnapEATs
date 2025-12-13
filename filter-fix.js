// filter-fix.js - Filter system that doesn't remove restaurant cards
document.addEventListener('DOMContentLoaded', function() {
    console.log('Filter fix loaded');
    
    // Don't actually filter, just show what would be filtered
    document.querySelectorAll('.filter-section input, .search-btn').forEach(element => {
        element.addEventListener('change', function() {
            console.log('Filter changed:', this.value || this.type);
            
            // Just show a message, don't remove cards
            showFilterMessage('Filter applied (demo mode)');
        });
    });
    
    document.querySelector('.search-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showFilterMessage('Search clicked (demo mode)');
    });
    
    function showFilterMessage(message) {
        // Create or update notification
        let notification = document.querySelector('.filter-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'filter-notification';
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: #4CAF50;
                color: white;
                padding: 10px 15px;
                border-radius: 5px;
                z-index: 1000;
                font-size: 12px;
            `;
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        
        // Auto-remove after 2 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 2000);
    }
    
    console.log('Filter fix ready');
});
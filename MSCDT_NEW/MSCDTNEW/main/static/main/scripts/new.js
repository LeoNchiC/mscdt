document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.news-tab');
    const tabContents = document.querySelectorAll('.news-tab-content');
    const newsContentContainer = document.querySelector('.news-content');
    
    function setNewsContentColor(tabKey) {
        if (!newsContentContainer) return;
        newsContentContainer.classList.remove('news-content-second', 'news-content-third');
        if (tabKey === 'committee') {
            newsContentContainer.classList.add('news-content-second');
        } else if (tabKey === 'ministry') {
            newsContentContainer.classList.add('news-content-third');
        }
    }

    // Initialize color based on initially active tab
    const initialActive = document.querySelector('.news-tab.active');
    if (initialActive) {
        setNewsContentColor(initialActive.getAttribute('data-tab'));
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab + '-news').classList.add('active');

            // Update news content background color modifier
            setNewsContentColor(targetTab);
        });
    });

    // Smooth scrolling functionality
    const menuLinks = document.querySelectorAll('.main-menu a[href^="#"], .sec-menu a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset to account for fixed header
                const headerHeight = 220; // Approximate height of header + menu
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
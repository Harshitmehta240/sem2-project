// Enhanced JavaScript for Premium Car Dealership

class DriveNestApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.selectedCars = [];
        this.isLoading = true;
    }

    init() {
        this.showLoadingScreen();
        this.initializeAnimations();
        this.initializeCounters();
        this.initializeVideoBackground();
        this.initializeCarFilters();
        this.initializeCompareFeature();
        this.initializeModals();
        this.initializeScrollEffects();
    }

    bindEvents() {
        // Navigation events
        this.bindNavigationEvents();
        
        // Search events
        this.bindSearchEvents();
        
        // Car interaction events
        this.bindCarEvents();
        
        // Modal events
        this.bindModalEvents();
        
        // Scroll events
        this.bindScrollEvents();
        
        // Resize events
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    // Loading Screen Management
    showLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.isLoading = false;
                    this.triggerEntranceAnimations();
                }, 500);
            }
        }, 2500);
    }

    triggerEntranceAnimations() {
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.fade-in-up, .fade-in-right');
        heroElements.forEach((element, index) => {
            const delay = element.dataset.delay || `${index * 0.2}s`;
            setTimeout(() => {
                element.classList.add('animate');
            }, parseFloat(delay) * 1000);
        });

        // Start counter animations
        this.animateCounters();
    }

    // Navigation Management
    bindNavigationEvents() {
        const navbar = document.getElementById('navbar');
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.smoothScrollTo(targetSection);
                    this.updateActiveNavLink(link);
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        mobileToggle.classList.remove('active');
                    }
                }
            });
        });

        // Dropdown hover effects (enhanced for touch devices)
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            let timeoutId;

            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(timeoutId);
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });

            dropdown.addEventListener('mouseleave', () => {
                timeoutId = setTimeout(() => {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }, 150);
            });

            // Touch device support
            dropdown.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isVisible = dropdownMenu.style.visibility === 'visible';
                    
                    // Close all other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                            otherMenu.style.opacity = '0';
                            otherMenu.style.visibility = 'hidden';
                            otherMenu.style.transform = 'translateY(-10px)';
                        }
                    });

                    // Toggle current dropdown
                    if (isVisible) {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.transform = 'translateY(-10px)';
                    } else {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.transform = 'translateY(0)';
                    }
                }
            });
        });
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 90; // Account for navbar height
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation.bind(this));
        }

        requestAnimationFrame(animation.bind(this));
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Video Background Management
    initializeVideoBackground() {
        const video = document.querySelector('.video-background video');
        if (video) {
            video.addEventListener('loadeddata', () => {
                video.style.opacity = '1';
            });

            // Pause video on mobile to save bandwidth
            if (window.innerWidth <= 768) {
                video.pause();
                video.style.display = 'none';
            }

            // Resume video when returning to tab
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    video.pause();
                } else {
                    if (window.innerWidth > 768) {
                        video.play();
                    }
                }
            });
        }
    }

    // Counter Animations
    initializeCounters() {
        const counters = document.querySelectorAll('.counter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            if (this.isElementInViewport(counter)) {
                this.animateCounter(counter);
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target > 1000) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current) + (target === 99 ? '%' : '');
            }
        }, 16);
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Search Management
    bindSearchEvents() {
        const searchTabs = document.querySelectorAll('.search-tab');
        const searchForms = document.querySelectorAll('.search-form');

        searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;
                
                // Update active tab
                searchTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding form (if multiple forms exist)
                // For now, we'll just add a visual effect
                tab.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    tab.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Search form submission
        const searchBtn = document.querySelector('.search-btn-main');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }
    }

    performSearch() {
        // Add search loading effect
        const searchBtn = document.querySelector('.search-btn-main');
        const originalText = searchBtn.innerHTML;
        
        searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        searchBtn.disabled = true;

        // Simulate search (replace with actual search logic)
        setTimeout(() => {
            searchBtn.innerHTML = originalText;
            searchBtn.disabled = false;
            
            // Scroll to inventory section
            const inventorySection = document.getElementById('inventory');
            if (inventorySection) {
                this.smoothScrollTo(inventorySection);
            }
        }, 1500);
    }

    // Car Filtering
    initializeCarFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const carCards = document.querySelectorAll('.car-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter cars with animation
                this.filterCars(filter, carCards);
            });
        });
    }

    filterCars(filter, carCards) {
        carCards.forEach((card, index) => {
            const shouldShow = filter === 'all' || card.classList.contains(filter);
            
            setTimeout(() => {
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-30px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }, index * 100);
        });
    }

    // Car Comparison Feature
    initializeCompareFeature() {
        const compareInputs = document.querySelectorAll('.compare-input');
        const compareBtn = document.getElementById('compareBtn');
        const compareCount = document.querySelector('.compare-count');
        const comparisonModal = document.getElementById('comparisonModal');

        compareInputs.forEach(input => {
            input.addEventListener('change', () => {
                const carId = input.dataset.carId;
                
                if (input.checked) {
                    if (this.selectedCars.length < 3) {
                        this.selectedCars.push(carId);
                        this.addCompareAnimation(input.closest('.car-card'));
                    } else {
                        input.checked = false;
                        this.showNotification('Maximum 3 cars can be compared', 'warning');
                    }
                } else {
                    this.selectedCars = this.selectedCars.filter(id => id !== carId);
                    this.removeCompareAnimation(input.closest('.car-card'));
                }
                
                this.updateCompareButton();
            });
        });

        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                if (this.selectedCars.length >= 2) {
                    this.showComparison();
                } else {
                    this.showNotification('Select at least 2 cars to compare', 'info');
                }
            });
        }
    }

    addCompareAnimation(card) {
        card.classList.add('compare-selected');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 200);
    }

    removeCompareAnimation(card) {
        card.classList.remove('compare-selected');
    }

    updateCompareButton() {
        const compareCount = document.querySelector('.compare-count');
        const compareBtn = document.getElementById('compareBtn');
        
        if (compareCount) {
            compareCount.textContent = this.selectedCars.length;
            
            if (this.selectedCars.length > 0) {
                compareCount.style.display = 'flex';
                compareBtn.style.animation = 'luxuryPulse 1s ease';
            } else {
                compareCount.style.display = 'none';
                compareBtn.style.animation = 'none';
            }
        }
    }

    showComparison() {
        const comparisonModal = document.getElementById('comparisonModal');
        const comparisonBody = document.getElementById('comparisonBody');
        
        if (comparisonModal && comparisonBody) {
            // Generate comparison content
            const comparisonHTML = this.generateComparisonHTML();
            comparisonBody.innerHTML = comparisonHTML;
            
            // Show modal
            comparisonModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    generateComparisonHTML() {
        // This would typically fetch real car data
        const sampleComparisonData = {
            'car-1': {
                name: 'BMW X7 M60i xDrive',
                image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=400',
                price: '₹2,15,00,000',
                specs: {
                    power: '523 HP',
                    fuel: 'V8 TwinTurbo',
                    transmission: '8-Speed Auto',
                    alloy: '22" M Alloy',
                    seats: 7,
                    topSpeed: '250 km/h'
                }
            },
            'car-2': {
                name: 'Porsche 911 Turbo S',
                image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=400',
                price: '₹3,85,00,000',
                specs: {
                    power: '640 HP',
                    fuel: 'Twin-Turbo H6',
                    transmission: '8-Speed PDK',
                    alloy: '21" Turbo Alloy',
                    seats: 4,
                    topSpeed: '330 km/h'
                }
            },
            'car-3': {
                name: 'Mercedes EQS AMG',
                image: 'https://images.pexels.com/photos/172070/pexels-photo-172070.jpeg?auto=compress&cs=tinysrgb&w=400',
                price: '₹2,75,00,000',
                specs: {
                    power: '761 HP',
                    fuel: 'Electric',
                    transmission: 'Single Speed',
                    alloy: '22" AMG Alloy',
                    seats: 5,
                    topSpeed: '250 km/h'
                }
            }
        };

        let html = '<div class="comparison-table"><div class="comparison-row comparison-header">';
        html += '<div class="comparison-cell feature-name">Features</div>';
        
        // Add selected cars as columns
        this.selectedCars.forEach(carId => {
            const car = sampleComparisonData[carId];
            if (car) {
                html += `<div class="comparison-cell car-column">
                    <img src="${car.image}" alt="${car.name}" class="comparison-car-image">
                    <h4>${car.name}</h4>
                    <p class="comparison-price">${car.price}</p>
                </div>`;
            }
        });
        
        html += '</div>';

        // Add specification rows
        const specRows = [
            { key: 'power', label: 'Power' },
            { key: 'fuel', label: 'Engine' },
            { key: 'transmission', label: 'Transmission' },
            { key: 'alloy', label: 'Alloy Wheels' },
            { key: 'seats', label: 'Seating' },
            { key: 'topSpeed', label: 'Top Speed' }
        ];

        specRows.forEach(spec => {
            html += `<div class="comparison-row">
                <div class="comparison-cell feature-name">${spec.label}</div>`;
            
            this.selectedCars.forEach(carId => {
                const car = sampleComparisonData[carId];
                const value = car ? car.specs[spec.key] : 'N/A';
                html += `<div class="comparison-cell">${value}</div>`;
            });
            
            html += '</div>';
        });

        html += '</div>';

        // Add some styling for the comparison table
        html += `
            <style>
                .comparison-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 2rem;
                }
                .comparison-row {
                    display: grid;
                    grid-template-columns: 200px repeat(${this.selectedCars.length}, 1fr);
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid var(--primary-gold);
                }
                .comparison-header {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 15px;
                }
                .comparison-cell {
                    text-align: center;
                    padding: 1rem;
                }
                .feature-name {
                    font-weight: 600;
                    color: var(--primary-gold);
                    text-align: left;
                }
                .car-column h4 {
                    margin: 1rem 0 0.5rem 0;
                    color: var(--platinum);
                }
                .comparison-car-image {
                    width: 100%;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 12px;
                }
                .comparison-price {
                    color: var(--primary-gold);
                    font-weight: 700;
                    font-size: 1.1rem;
                }
            </style>
        `;

        return html;
    }

    // Modal Management
    initializeModals() {
        this.bindModalEvents();
        this.initializeQuickView();
    }

    bindModalEvents() {
        // Comparison modal
        const closeComparison = document.getElementById('closeComparison');
        const comparisonModal = document.getElementById('comparisonModal');

        if (closeComparison && comparisonModal) {
            closeComparison.addEventListener('click', () => {
                comparisonModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            // Close on backdrop click
            comparisonModal.addEventListener('click', (e) => {
                if (e.target === comparisonModal) {
                    comparisonModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Quick view modal
        const closeQuickView = document.getElementById('closeQuickView');
        const quickViewModal = document.getElementById('quickViewModal');

        if (closeQuickView && quickViewModal) {
            closeQuickView.addEventListener('click', () => {
                quickViewModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });

            quickViewModal.addEventListener('click', (e) => {
                if (e.target === quickViewModal) {
                    quickViewModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    }

    initializeQuickView() {
        const quickViewBtns = document.querySelectorAll('.quick-view');
        
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const carId = btn.dataset.car;
                this.showQuickView(carId);
            });
        });
    }

    showQuickView(carId) {
        const quickViewModal = document.getElementById('quickViewModal');
        const quickViewTitle = document.getElementById('quickViewTitle');
        const quickViewBody = document.getElementById('quickViewBody');

        if (quickViewModal && quickViewTitle && quickViewBody) {
            // Generate quick view content
            const quickViewHTML = this.generateQuickViewHTML(carId);
            quickViewBody.innerHTML = quickViewHTML;
            quickViewTitle.textContent = 'Vehicle Details';
            
            // Show modal
            quickViewModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    generateQuickViewHTML(carId) {
        // Sample quick view content
        const sampleData = {
            'car-1': {
                name: 'BMW X7 M60i xDrive',
                images: [
                    'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=600',
                    'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=600'
                ],
                price: '₹2,15,00,000',
                description: 'Experience ultimate luxury with the BMW X7 M60i xDrive. This flagship SUV combines exceptional performance with unparalleled comfort.',
                specs: {
                    power: '523 HP',
                    torque: '750 Nm',
                    acceleration: '0-100 in 4.7s',
                    topSpeed: '250 km/h',
                    fuel: 'V8 TwinTurbo',
                    transmission: '8-Speed Automatic',
                    drivetrain: 'xDrive AWD',
                    alloy: '22" M Performance Alloy'
                }
            }
        };

        const car = sampleData[carId];
        if (!car) return '<p>Car details not available</p>';

        return `
            <div class="quick-view-content-inner">
                <div class="quick-view-images">
                    <img src="${car.images[0]}" alt="${car.name}" class="main-image">
                </div>
                <div class="quick-view-details">
                    <h3>${car.name}</h3>
                    <p class="quick-view-price">${car.price}</p>
                    <p class="quick-view-description">${car.description}</p>
                    
                    <div class="quick-view-specs">
                        <h4>Specifications</h4>
                        <div class="specs-grid">
                            ${Object.entries(car.specs).map(([key, value]) => `
                                <div class="spec-item">
                                    <span class="spec-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                    <span class="spec-value">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="quick-view-actions">
                        <button class="btn btn-primary">Schedule Test Drive</button>
                        <button class="btn btn-outline">Contact Specialist</button>
                    </div>
                </div>
            </div>
            
            <style>
                .quick-view-content-inner {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                }
                .main-image {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 15px;
                }
                .quick-view-price {
                    font-size: 1.8rem;
                    color: var(--primary-gold);
                    font-weight: 700;
                    margin: 1rem 0;
                }
                .quick-view-description {
                    color: var(--platinum);
                    line-height: 1.6;
                    margin-bottom: 2rem;
                }
                .specs-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0 2rem 0;
                }
                .spec-item {
                    background: var(--dark-charcoal);
                    padding: 1rem;
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .spec-label {
                    color: var(--primary-gold);
                    font-weight: 600;
                }
                .spec-value {
                    color: var(--platinum);
                }
                .quick-view-actions {
                    display: flex;
                    gap: 1rem;
                }
            </style>
        `;
    }

    // Car Events
    bindCarEvents() {
        // Car card hover effects
        const carCards = document.querySelectorAll('.car-card');
        carCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCarHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCarHoverEffect(card);
            });
        });

        // Action button events
        const actionBtns = document.querySelectorAll('.btn-action');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCarAction(btn);
            });
        });
    }

    addCarHoverEffect(card) {
        const image = card.querySelector('.car-image img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    }

    removeCarHoverEffect(card) {
        const image = card.querySelector('.car-image img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    }

    handleCarAction(btn) {
        const action = btn.textContent.trim().toLowerCase();
        
        if (action.includes('viewing') || action.includes('test drive')) {
            this.showNotification('Test drive appointment request sent successfully!', 'success');
        } else if (action.includes('concierge') || action.includes('call')) {
            this.showNotification('Our concierge will contact you shortly', 'info');
        }
        
        // Add button animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }

    // Scroll Effects
    initializeScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for car cards
                    if (entry.target.classList.contains('car-card')) {
                        this.animateCarCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.car-card, .service-card, .stat-item, .section-header');
        animatedElements.forEach(el => observer.observe(el));
    }

    animateCarCard(card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }

    bindScrollEvents() {
        // Back to top button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
            
            // Update active nav link based on scroll position
            this.updateActiveNavOnScroll();
        });

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Animations
    initializeAnimations() {
        // Add CSS animations dynamically
        const style = document.createElement('style');
        style.textContent = `
            .compare-selected {
                border-color: var(--primary-gold) !important;
                box-shadow: 0 0 20px rgba(212, 175, 55, 0.3) !important;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10001;
                padding: 1rem 2rem;
                border-radius: 15px;
                color: white;
                font-weight: 600;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                min-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification.success {
                background: linear-gradient(135deg, var(--emerald), #40e0d0);
            }
            
            .notification.warning {
                background: linear-gradient(135deg, #ff9500, #ff6500);
            }
            
            .notification.info {
                background: linear-gradient(135deg, var(--sapphire), #6495ed);
            }
        `;
        document.head.appendChild(style);
    }

    // Utility Functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    handleResize() {
        // Handle responsive behavior
        const video = document.querySelector('.video-background video');
        if (video) {
            if (window.innerWidth <= 768) {
                video.pause();
                video.style.display = 'none';
            } else {
                video.style.display = 'block';
                video.play();
            }
        }

        // Close mobile menu on resize
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        if (window.innerWidth > 768 && navMenu && mobileToggle) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DriveNestApp();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const video = document.querySelector('.video-background video');
    if (video) {
        if (document.hidden) {
            video.pause();
        } else {
            if (window.innerWidth > 768) {
                video.play();
            }
        }
    }
});
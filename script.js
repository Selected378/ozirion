// ============================================
// BREVET PRO BOOST - JAVASCRIPT PRINCIPAL
// Navigation, Animations, Exercices Interactifs
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des particules
    initParticles();
    
    // Navigation scroll effect
    initNavbarScroll();
    
    // Mobile menu
    initMobileMenu();
    
    // Exercice interactif
    initExercise();
    
    // Smooth scroll pour les liens
    initSmoothScroll();
    
    // Animation des cartes au scroll
    initScrollAnimations();
});

// ============================================
// PARTICLES BACKGROUND
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change l'icône
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Ferme le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animer les cartes de chapitres
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ============================================
// EXERCICE INTERACTIF - MATHÉMATIQUES
// ============================================
function initExercise() {
    const checkAnswerBtn = document.getElementById('checkAnswer');
    const retryExerciseBtn = document.getElementById('retryExercise');
    const answerInput = document.getElementById('answer');
    const exerciseResult = document.getElementById('exerciseResult');
    
    // La réponse correcte est x = 5 (car 3*5 + 7 = 15 + 7 = 22)
    const correctAnswer = 5;
    
    checkAnswerBtn.addEventListener('click', function() {
        const userAnswer = parseFloat(answerInput.value);
        
        if (isNaN(userAnswer)) {
            alert('Veuillez entrer une réponse valide.');
            return;
        }
        
        // Calculer la note
        let score = 0;
        let feedback = '';
        let explanation = '';
        let tips = [];
        
        if (userAnswer === correctAnswer) {
            score = 20;
            feedback = '🎉 Excellent ! Tu as trouvé la bonne réponse !';
            explanation = `
                <p><strong>Ta réponse :</strong> x = ${userAnswer}</p>
                <p><strong>Vérification :</strong> 3 × ${userAnswer} + 7 = ${3 * userAnswer} + 7 = ${3 * userAnswer + 7}</p>
                <p><strong>Résultat :</strong> ${3 * userAnswer + 7} = 22 ✅</p>
                <p>L'équation est bien vérifiée !</p>
            `;
            tips = [
                'Continue comme ça, tu maîtrises bien la résolution d\'équations !',
                'N\'oublie pas de toujours vérifier ta réponse en remplaçant x dans l\'équation.',
                'Pour les équations plus complexes, isole d\'abord les termes en x.'
            ];
        } else {
            // Calculer une note partielle basée sur la proximité
            const difference = Math.abs(userAnswer - correctAnswer);
            
            if (difference <= 1) {
                score = 15;
                feedback = '👍 Tu es très proche de la bonne réponse !';
            } else if (difference <= 2) {
                score = 10;
                feedback = '😊 Tu es sur la bonne voie, mais il y a une petite erreur.';
            } else if (difference <= 5) {
                score = 5;
                feedback = '🤔 La réponse n\'est pas correcte, mais tu peux y arriver !';
            } else {
                score = 0;
                feedback = '❌ La réponse n\'est pas correcte. Revoyons la méthode ensemble.';
            }
            
            explanation = `
                <p><strong>Ta réponse :</strong> x = ${userAnswer}</p>
                <p><strong>Vérification :</strong> 3 × ${userAnswer} + 7 = ${3 * userAnswer} + 7 = ${3 * userAnswer + 7}</p>
                <p><strong>Résultat :</strong> ${3 * userAnswer + 7} ≠ 22 ❌</p>
                <p>Ta réponse ne vérifie pas l'équation.</p>
            `;
            
            tips = [
                'Étape 1 : Soustrais 7 des deux côtés : 3x = 22 - 7 = 15',
                'Étape 2 : Divise par 3 : x = 15 ÷ 3 = 5',
                'Toujours vérifier : 3 × 5 + 7 = 15 + 7 = 22 ✅',
                'Méthode générale : isole d\'abord le terme en x, puis divise par son coefficient.'
            ];
        }
        
        // Afficher les résultats
        document.getElementById('scoreNumber').textContent = score;
        document.getElementById('feedbackTitle').textContent = feedback;
        document.getElementById('feedbackText').textContent = score >= 10 ? 
            'Bravo pour ton effort ! Continue à t\'entraîner.' : 
            'Ne te décourage pas, c\'est en pratiquant qu\'on progresse !';
        document.getElementById('explanationText').innerHTML = explanation;
        
        // Afficher les conseils
        const tipsList = document.getElementById('tipsList');
        tipsList.innerHTML = '';
        tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
        
        // Afficher la section résultat
        exerciseResult.classList.add('show');
        
        // Scroll vers le résultat
        exerciseResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    retryExerciseBtn.addEventListener('click', function() {
        // Réinitialiser
        answerInput.value = '';
        exerciseResult.classList.remove('show');
        answerInput.focus();
    });
    
    // Permettre de valider avec la touche Entrée
    answerInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswerBtn.click();
        }
    });
}

// ============================================
// PROGRESSION DES CHAPITRES (Simulation)
// ============================================
document.querySelectorAll('.chapter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.chapter-card');
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.chapter-progress span');
        
        // Simuler une progression
        let currentProgress = parseInt(progressFill.style.width) || 0;
        if (currentProgress < 100) {
            currentProgress = Math.min(currentProgress + 25, 100);
            progressFill.style.width = currentProgress + '%';
            progressText.textContent = currentProgress + '%';
            
            // Changer le texte du bouton
            if (currentProgress === 100) {
                this.innerHTML = '<i class="fas fa-check"></i> Terminé';
                this.style.background = 'var(--gradient-1)';
                this.style.color = 'var(--dark-bg)';
            } else {
                this.innerHTML = 'Continuer <i class="fas fa-arrow-right"></i>';
            }
        }
    });
});

// ============================================
// EFFETS HOER SUPPLÉMENTAIRES
// ============================================
// Ajouter un effet de parallaxe subtil au hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.scrollY;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🎓 Brevet Pro Boost', 'font-size: 24px; font-weight: bold; color: #00d4ff;');
console.log('%cRéussis ton Brevet Pro !', 'font-size: 14px; color: #00ff88;');

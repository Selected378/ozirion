// ============================================
// SYSTÈME D'AUTHENTIFICATION ET PROGRESSION
// Stockage local (localStorage)
// ============================================

const Auth = {
    // Clés localStorage
    USERS_KEY: 'brevet_pro_users',
    CURRENT_USER_KEY: 'brevet_pro_current_user',
    PROGRESSION_KEY: 'brevet_pro_progression',

    // Initialiser
    init() {
        // Vérifier si les données existent
        if (!localStorage.getItem(this.USERS_KEY)) {
            localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.PROGRESSION_KEY)) {
            localStorage.setItem(this.PROGRESSION_KEY, JSON.stringify({}));
        }
    },

    // Créer un compte
    register(username, password) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY));
        
        // Vérifier si l'utilisateur existe déjà
        if (users.find(u => u.username === username)) {
            return { success: false, message: 'Ce nom d\'utilisateur existe déjà.' };
        }

        // Créer le nouvel utilisateur
        const newUser = {
            id: Date.now(),
            username: username,
            password: password, // En production, il faudrait hasher le mot de passe
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

        // Initialiser la progression pour cet utilisateur
        const progression = JSON.parse(localStorage.getItem(this.PROGRESSION_KEY));
        progression[newUser.id] = {
            svt: {},
            physique: {},
            maths: {}
        };
        localStorage.setItem(this.PROGRESSION_KEY, JSON.stringify(progression));

        return { success: true, message: 'Compte créé avec succès !' };
    },

    // Connexion
    login(username, password) {
        const users = JSON.parse(localStorage.getItem(this.USERS_KEY));
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return { success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect.' };
        }

        // Connecter l'utilisateur
        localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true, message: 'Connexion réussie !', user: user };
    },

    // Déconnexion
    logout() {
        localStorage.removeItem(this.CURRENT_USER_KEY);
        return { success: true, message: 'Déconnexion réussie.' };
    },

    // Obtenir l'utilisateur connecté
    getCurrentUser() {
        const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    },

    // Vérifier si connecté
    isLoggedIn() {
        return this.getCurrentUser() !== null;
    },

    // Sauvegarder la progression d'un exercice
    saveProgression(subject, category, exerciseId, score) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, message: 'Utilisateur non connecté.' };

        const progression = JSON.parse(localStorage.getItem(this.PROGRESSION_KEY));
        
        if (!progression[user.id][subject][category]) {
            progression[user.id][subject][category] = {};
        }

        // score: 1 pour correct, 0 pour incorrect (chaque exercice = 20% du module)
        progression[user.id][subject][category][exerciseId] = {
            score: score,
            completedAt: new Date().toISOString()
        };

        localStorage.setItem(this.PROGRESSION_KEY, JSON.stringify(progression));
        return { success: true, message: 'Progression sauvegardée !' };
    },

    // Obtenir la progression
    getProgression() {
        const user = this.getCurrentUser();
        if (!user) return null;

        const progression = JSON.parse(localStorage.getItem(this.PROGRESSION_KEY));
        return progression[user.id] || null;
    },

    // Obtenir la progression d'une matière
    getSubjectProgression(subject) {
        const progression = this.getProgression();
        if (!progression) return null;

        return progression[subject] || {};
    },

    // Calculer le score global d'une matière
    getSubjectScore(subject) {
        const subjectProgression = this.getSubjectProgression(subject);
        if (!subjectProgression) return 0;

        let totalScore = 0;
        let totalExercises = 0;

        Object.values(subjectProgression).forEach(category => {
            Object.values(category).forEach(exercise => {
                totalScore += exercise.score;
                totalExercises++;
            });
        });

        return totalExercises > 0 ? Math.round(totalScore / totalExercises) : 0;
    }
};

// Initialiser au chargement
Auth.init();

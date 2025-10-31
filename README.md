# Application de Gestion d'Entreprise

Une application Angular moderne et élégante pour la gestion des entités d'entreprise avec un design sophistiqué et professionnel.

## 🚀 Fonctionnalités

### Entités Gérées
- **Production Informatique** : Gestion des systèmes, applications et infrastructures
- **Audit Informatique** : Suivi des audits de sécurité, conformité et performance
- **Veille Technologique** : Surveillance des tendances et innovations technologiques

### Fonctionnalités Principales
- ✅ Gestion des utilisateurs avec rôles et habilitations
- ✅ Dashboard interactif avec statistiques en temps réel
- ✅ Import/Export de données pour chaque entité
- ✅ Interface utilisateur moderne et responsive
- ✅ Design sophistiqué avec TailwindCSS
- ✅ Animations fluides et professionnelles
- ✅ Icônes FontAwesome intégrées

## 🛠️ Technologies Utilisées

- **Angular 17+** : Framework principal
- **TypeScript** : Langage de programmation
- **TailwindCSS** : Framework CSS pour le design
- **FontAwesome** : Icônes
- **SCSS** : Préprocesseur CSS
- **Angular Router** : Navigation
- **Angular Standalone Components** : Architecture moderne

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd gestion-entreprise
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:4200
   ```

## 🎨 Design

### Palette de Couleurs
- **Primary** : Bleu professionnel (#0ea5e9)
- **Secondary** : Gris sophistiqué (#64748b)
- **Success** : Vert (#10b981)
- **Warning** : Jaune (#f59e0b)
- **Error** : Rouge (#ef4444)

### Caractéristiques du Design
- Interface épurée et moderne
- Cartes avec ombres subtiles
- Animations fluides et professionnelles
- Typographie claire et lisible
- Responsive design pour tous les écrans
- Icônes cohérentes avec FontAwesome

## 📱 Pages et Fonctionnalités

### Dashboard
- Vue d'ensemble des statistiques
- Accès rapide aux différentes entités
- Activité récente
- Métriques en temps réel

### Gestion des Utilisateurs
- Liste des utilisateurs avec filtres
- Gestion des rôles (Admin, Manager, Utilisateur)
- Système d'habilitations
- Import/Export des données utilisateurs

### Production Informatique
- Gestion des projets IT
- Suivi des statuts (En développement, En production, Maintenance)
- Technologies utilisées
- Documents et ressources

### Audit Informatique
- Planning des audits
- Suivi des scores et recommandations
- Types d'audits (Sécurité, Conformité, Performance, Qualité)
- Rapports et documents

### Veille Technologique
- Surveillance des tendances
- Sources d'information
- Analyse d'impact
- Types de veille (Technologique, Concurrentielle, Réglementaire, Marché)

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env` pour configurer :
- URLs des APIs
- Paramètres de base de données
- Clés d'authentification

### Personnalisation
- Modifier les couleurs dans `tailwind.config.js`
- Ajouter de nouvelles entités dans les modèles
- Étendre les fonctionnalités dans les composants

## 📊 Structure du Projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── header/         # En-tête de l'application
│   │   ├── layout/         # Layout principal
│   │   ├── modal/          # Modales réutilisables
│   │   └── sidebar/        # Barre latérale de navigation
│   ├── models/             # Modèles de données
│   ├── pages/              # Pages de l'application
│   │   ├── audit/          # Gestion des audits
│   │   ├── production/     # Gestion de la production
│   │   ├── users/          # Gestion des utilisateurs
│   │   └── veille/         # Veille technologique
│   ├── services/           # Services Angular
│   └── app.routes.ts       # Configuration des routes
├── styles.scss             # Styles globaux
└── main.ts                 # Point d'entrée
```

## 🚀 Déploiement

### Build de Production
```bash
npm run build
```

### Déploiement sur Serveur
1. Construire l'application
2. Copier les fichiers du dossier `dist/` sur le serveur web
3. Configurer le serveur pour servir les fichiers statiques

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -am 'Ajouter nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développement** : Équipe de développement Angular
- **Design** : Interface utilisateur moderne et professionnelle
- **Architecture** : Architecture modulaire et scalable

---

**Application de Gestion d'Entreprise** - Une solution moderne et élégante pour la gestion des entités d'entreprise.
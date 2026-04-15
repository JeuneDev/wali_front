# Mes Offres (Recruteur)
Permettre au recruteur de consulter et gérer toutes ses offres d'emploi publiées.

Layout Hierarchy:
- Header (Full-width):
  - Navigation principale
- Main Content Area (Centered container):
  - En-tête avec action principale
  - Filtres et recherche
  - Liste des offres

## Navigation principale
- Logo de la plateforme
- Liens de navigation : Accueil, Espace recruteur
- Avatar utilisateur

## En-tête avec action
- Titre : "Mes offres d'emploi"
- Statistiques rapides (sur une ligne) :
  - Offres actives
  - Offres expirées
  - Total de candidatures reçues
- Bouton principal : "Publier une nouvelle offre"

## Filtres et recherche
- Barre de recherche : Rechercher par titre de poste
- Filtres en ligne :
  - Filtre par statut : Toutes, Actives, Expirées, Brouillons
  - Filtre par date de publication : Toutes, Cette semaine, Ce mois, Plus ancien
  - Sélecteur de tri : Plus récentes, Plus anciennes, Plus de candidatures

## Liste des offres
- Tableau ou cartes d'offres (12-15 offres par page) :
  - Pour chaque offre :
    - Titre du poste
    - Type de contrat
    - Localisation
    - Date de publication
    - Date de clôture (si définie)
    - Statut avec badge :
      - Active (vert)
      - Expirée (rouge)
      - Brouillon (gris)
    - Nombre de candidatures reçues avec badge
    - Nombre de nouvelles candidatures non vues
    - Actions :
      - "Voir les candidatures"
      - "Modifier l'offre"
      - "Clôturer/Réactiver"
      - "Supprimer"
- Pagination en bas de liste

## Section vide (si aucune offre)
- Illustration
- Titre : "Aucune offre publiée"
- Texte : "Commencez à recruter en publiant votre première offre"
- Bouton : "Publier une offre"

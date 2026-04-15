# Détail Offre et Candidatures (Recruteur)
Permettre au recruteur de consulter les détails d'une offre publiée et gérer toutes les candidatures reçues.

Layout Hierarchy:
- Header (Full-width):
  - Navigation principale
- Main Content Area (Full-width with sidebar):
  - Content principal : Liste des candidatures
  - Sidebar : Détails de l'offre

## Navigation principale
- Logo de la plateforme
- Fil d'ariane : Accueil > Espace recruteur > Mes offres > [Titre du poste]
- Avatar utilisateur

## Sidebar - Détails de l'offre
- Titre du poste
- Statut de l'offre avec badge
- Date de publication
- Date de clôture
- Nombre total de candidatures
- Actions rapides :
  - "Voir l'offre publique"
  - "Modifier l'offre"
  - "Clôturer l'offre"
  - "Partager l'offre"

## En-tête des candidatures
- Titre : "Candidatures reçues"
- Statistiques (sur une ligne) :
  - Total de candidatures
  - Nouvelles (non vues)
  - Présélectionnées
  - Rejetées

## Filtres et recherche
- Barre de recherche : Rechercher par nom de candidat
- Filtres en ligne :
  - Filtre par statut : Toutes, Nouvelles, Vues, Présélectionnées, Rejetées
  - Filtre par date : Plus récentes, Plus anciennes
  - Filtre par pertinence : Plus pertinentes en premier

## Liste des candidatures
- Tableau ou cartes de candidatures (10-15 par page) :
  - Pour chaque candidature :
    - Photo ou avatar du candidat
    - Nom complet
    - Titre professionnel actuel
    - Localisation
    - Date de candidature
    - Badge "Nouveau" si non vue
    - Résumé de l'expérience (années d'expérience)
    - Compétences clés (3-4 badges)
    - Statut de la candidature avec badge :
      - Nouvelle (bleu)
      - Vue (gris)
      - Présélectionnée (vert)
      - Rejetée (rouge)
    - Actions :
      - "Voir le profil complet"
      - "Télécharger le CV"
      - Menu déroulant : Marquer comme vue, Présélectionner, Rejeter, Contacter
- Pagination en bas de liste

## Section vide (si aucune candidature)
- Illustration
- Titre : "Aucune candidature reçue"
- Texte : "Les candidatures apparaîtront ici dès que des candidats postuleront"
- Bouton : "Partager l'offre"

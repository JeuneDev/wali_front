# Mes Candidatures
Permettre au candidat de consulter et gérer toutes ses candidatures envoyées avec leurs statuts.

Layout Hierarchy:
- Header (Full-width):
  - Navigation principale
- Main Content Area (Centered container):
  - En-tête avec statistiques
  - Filtres et recherche
  - Liste des candidatures

## Navigation principale
- Logo de la plateforme
- Liens de navigation : Accueil, Rechercher des offres, Mon espace
- Avatar utilisateur

## En-tête avec statistiques
- Titre : "Mes candidatures"
- Cartes de statistiques (sur une ligne) :
  - Total de candidatures envoyées
  - En cours d'examen
  - Réponses positives
  - Candidatures vues

## Filtres et recherche
- Barre de recherche : Rechercher par poste ou entreprise
- Filtres en ligne :
  - Filtre par statut : Toutes, Envoyée, Vue, En cours d'examen, Rejetée, Acceptée
  - Filtre par date : Toutes, Cette semaine, Ce mois, Plus ancien
  - Sélecteur de tri : Plus récentes, Plus anciennes, Par statut

## Liste des candidatures
- Tableau ou cartes de candidatures (15-20 candidatures par page) :
  - Pour chaque candidature :
    - Titre du poste
    - Nom de l'entreprise
    - Localisation
    - Date de candidature
    - Statut avec badge coloré :
      - Envoyée (gris)
      - Vue (bleu)
      - En cours d'examen (orange)
      - Rejetée (rouge)
      - Acceptée (vert)
    - Dernière mise à jour
    - Actions : "Voir l'offre", "Retirer ma candidature"
- Message si aucune candidature : "Vous n'avez pas encore postulé à des offres"
- Pagination en bas de liste

## Section vide (si aucune candidature)
- Illustration
- Titre : "Aucune candidature pour le moment"
- Texte : "Commencez à postuler aux offres qui vous intéressent"
- Bouton : "Rechercher des offres"

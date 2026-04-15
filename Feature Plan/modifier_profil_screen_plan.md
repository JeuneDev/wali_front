# Modifier Profil
Permettre au candidat de mettre à jour toutes les informations de son profil professionnel.

Layout Hierarchy:
- Header (Full-width):
  - Navigation principale
- Main Content Area (Centered container, medium width):
  - En-tête
  - Formulaire d'édition par sections
  - Actions de sauvegarde

## Navigation principale
- Logo de la plateforme
- Fil d'ariane : Accueil > Mon espace > Mon profil > Modifier
- Avatar utilisateur

## En-tête
- Titre : "Modifier mon profil"
- Message indicatif : "Complétez votre profil pour augmenter vos chances"
- Barre de progression de complétude

## Photo de profil
- Titre de section : "Photo de profil"
- Avatar actuel avec aperçu
- Bouton : "Changer la photo"
- Option : "Supprimer la photo"

## Informations personnelles
- Titre de section : "Informations personnelles"
- Champ : Prénom (obligatoire)
- Champ : Nom (obligatoire)
- Champ : Titre professionnel (obligatoire)
- Champ : Email (obligatoire, non modifiable)
- Champ : Téléphone (obligatoire)
- Champ date : Date de naissance
- Champ : Nationalité
- Champ : Ville (obligatoire)
- Zone de texte : Adresse complète

## Formation
- Titre de section : "Formation"
- Liste des formations existantes (éditable, supprimable)
- Pour chaque formation :
  - Champ : Diplôme
  - Champ : Établissement
  - Champ date : Date de début
  - Champ date : Date de fin
  - Zone de texte : Spécialisation
- Bouton : "Ajouter une formation"

## Expériences professionnelles
- Titre de section : "Expériences professionnelles"
- Liste des expériences existantes (éditable, supprimable)
- Pour chaque expérience :
  - Champ : Poste
  - Champ : Entreprise
  - Champ date : Date de début
  - Champ date : Date de fin
  - Case à cocher : "Poste actuel"
  - Zone de texte : Description des responsabilités
  - Champ : Localisation
- Bouton : "Ajouter une expérience"

## Compétences
- Titre de section : "Compétences"
- Champ avec auto-complétion : Ajouter des compétences techniques
- Liste des compétences techniques ajoutées (supprimables)
- Champ avec auto-complétion : Ajouter des compétences comportementales
- Liste des compétences comportementales ajoutées (supprimables)

## Préférences de recherche
- Titre de section : "Préférences de recherche"
- Sélecteur multiple : Secteurs d'activité recherchés
- Sélecteur multiple : Types de contrats souhaités
- Sélecteur multiple : Localisations préférées
- Sélecteur : Disponibilité (Immédiate, 1 mois, 2 mois, etc.)

## Documents
- Titre de section : "CV et documents"
- Zone de téléchargement : CV (PDF, max 5MB)
- CV actuel avec option de suppression
- Zone de téléchargement : Autres documents (optionnel)
- Liste des documents existants avec options de suppression

## Actions de sauvegarde
- Bouton principal : "Enregistrer les modifications"
- Bouton secondaire : "Annuler"
- Message de confirmation : "Vos modifications ont été enregistrées"

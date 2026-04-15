# PRD — Plateforme de Recherche d'Emploi V1 (MVP)

## 1) Background

Le marché de l'emploi guinéen souffre actuellement d'une infrastructure numérique inadaptée. Les plateformes existantes présentent des interfaces désorganisées, des informations incomplètes, et une expérience utilisateur frustrante tant pour les candidats que pour les recruteurs. Cette première itération vise à établir une alternative moderne qui répond aux besoins fondamentaux exprimés dans le Charter : offrir clarté, efficacité et accessibilité. Elle s'adresse directement aux frustrations de Mamadou (candidat actif) qui perd du temps sur des sites mal structurés, et de Fatoumata (recruteuse) qui peine à gérer efficacement ses processus de recrutement. C'est le moment idéal car le marché guinéen est en attente d'une solution professionnelle qui respecte les standards modernes du web tout en comprenant le contexte local.

## 2) Objectives & Desired Outcomes

- **Adoption initiale et validation du concept** : Les candidats et recruteurs découvrent la plateforme, créent leurs comptes, et trouvent l'expérience suffisamment supérieure aux alternatives existantes pour revenir régulièrement
- **Efficacité de la recherche** : Les candidats trouvent des offres pertinentes en moins de temps qu'avec les solutions existantes, grâce à des filtres clairs et une présentation structurée des informations
- **Qualité des connexions** : Les recruteurs reçoivent des candidatures complètes et pertinentes, peuvent les gérer de manière organisée, et réduisent le temps passé sur les tâches administratives
- **Confiance et crédibilité** : Les utilisateurs perçoivent la plateforme comme fiable, professionnelle et adaptée au marché guinéen, créant un sentiment de confiance qui favorise l'engagement
- **Non-goals / Boundaries** : Cette première version ne comprend pas de matching automatique par IA, de système de messagerie intégré, de recommandations personnalisées basées sur l'historique, ni d'outils avancés d'évaluation de candidats. L'objectif est de poser des fondations solides avec les fonctionnalités essentielles avant d'ajouter des couches d'intelligence supplémentaires.

## 3) Users & Stories

- **Primary Persona:** Mamadou Diallo (Candidat en recherche active)
  - Story A : En tant que chercheur d'emploi, je veux filtrer rapidement les offres par secteur, localisation et type de contrat, afin de ne voir que les opportunités réellement pertinentes pour mon profil.
  - Story B : En tant que candidat, je veux créer un profil professionnel complet une seule fois et l'utiliser pour postuler en quelques clics, afin de gagner du temps et éviter de ressaisir mes informations à chaque candidature.
  - Story C : En tant que chercheur d'emploi, je veux suivre l'état de toutes mes candidatures en un seul endroit, afin de savoir quelles offres sont toujours actives et lesquelles ont été consultées.
  - Story D : En tant que candidat mobile, je veux pouvoir rechercher des offres et postuler facilement depuis mon smartphone, car c'est mon principal moyen d'accès à internet.

- **Secondary Persona:** Fatoumata Camara (Recruteuse)
  - Story E : En tant que recruteuse, je veux publier des offres d'emploi avec un formulaire structuré et complet, afin d'attirer des candidats qualifiés qui comprennent clairement les exigences du poste.
  - Story F : En tant que responsable RH, je veux consulter et filtrer les candidatures reçues de manière organisée, afin d'identifier rapidement les profils les plus pertinents sans perdre de temps.
  - Story G : En tant que recruteuse, je veux accéder à des profils candidats complets avec CV, expériences et compétences, afin de prendre des décisions éclairées sur les présélections.

## 4) Key Feature

- **Recherche et filtrage d'offres d'emploi** : Les candidats peuvent rechercher des opportunités via une barre de recherche puissante et des filtres multiples (secteur, localisation, type de contrat, niveau d'expérience), avec des résultats clairs présentant les informations essentielles dès la liste
- **Profils candidats complets** : Les candidats créent et gèrent un profil professionnel détaillé incluant informations personnelles, formations, expériences, compétences, et préférences, utilisable pour postuler rapidement et être découvert par les recruteurs
- **Système de candidature simplifié** : Les candidats postulent en quelques clics en utilisant leur profil pré-rempli, avec confirmation immédiate et suivi centralisé de toutes leurs candidatures en cours
- **Publication et gestion d'offres pour recruteurs** : Les recruteurs publient des offres via un formulaire structuré garantissant la complétude des informations, et consultent les candidatures reçues dans un tableau organisé avec options de filtrage et de tri
- **Pages de détail complètes** : Chaque offre d'emploi dispose d'une page dédiée présentant toutes les informations pertinentes (description, exigences, entreprise, localisation, salaire si disponible, type de contrat, date de clôture)
- **Espaces personnels différenciés** : Les candidats et recruteurs disposent d'espaces dédiés adaptés à leurs besoins spécifiques, avec tableaux de bord pertinents et actions contextuelles

## 5) Key Flow

- **Exemple:** Recherche et candidature par un candidat
  - **Trigger:** Mamadou ouvre la plateforme depuis son smartphone, souhaitant trouver des opportunités en gestion commerciale à Conakry
  - **Path:** Il utilise la barre de recherche en tapant "commercial", applique les filtres "Conakry" et "CDI", parcourt les résultats affichant titre, entreprise, localisation et date, clique sur une offre qui l'intéresse pour voir tous les détails, puis clique sur "Postuler" et soumet sa candidature en 2 clics grâce à son profil pré-rempli
  - **Result:** Mamadou reçoit une confirmation de candidature, l'offre apparaît dans son espace "Mes candidatures" avec le statut "Envoyée", et le recruteur reçoit sa candidature complète avec accès à son profil détaillé

- **Exemple:** Publication d'offre et consultation de candidatures par un recruteur
  - **Trigger:** Fatoumata doit recruter un chargé de clientèle pour son entreprise | **Path:** Elle se connecte à son espace recruteur, clique sur "Publier une offre", remplit le formulaire structuré (titre, description, exigences, secteur, localisation, type de contrat, salaire), publie l'offre qui devient immédiatement visible sur la plateforme, puis consulte les candidatures reçues dans son tableau de bord organisé | **Result:** L'offre est publiée et consultable par tous les candidats, Fatoumata reçoit des candidatures complètes qu'elle peut filtrer et examiner de manière organisée

- **Exemple:** Création de profil candidat et découverte par un recruteur
  - **Trigger:** Un nouveau candidat s'inscrit sur la plateforme pour la première fois | **Path:** Il crée son compte, remplit progressivement son profil (informations personnelles, formations, expériences professionnelles, compétences, préférences de recherche), le système enregistre automatiquement ses informations, et son profil devient consultable par les recruteurs | **Result:** Le candidat dispose d'un profil complet lui permettant de postuler rapidement à des offres, et les recruteurs peuvent découvrir son profil lorsqu'ils examinent des candidatures ou recherchent des talents

## 6) Competitive Analysis

- **Landscape (qui résout ce problème):** Les principaux acteurs sur le marché guinéen incluent Emploirapide.net (plateforme locale établie), des groupes WhatsApp et Facebook informels (réseaux sociaux utilisés pour partager des offres), LinkedIn (réseau professionnel international mais peu adapté au contexte local), et l'approche "ne rien faire" (candidatures directes en personne ou via recommandations). Emploirapide.net s'adresse aux chercheurs d'emploi et recruteurs locaux, les réseaux sociaux aux communautés informelles, LinkedIn aux professionnels connectés internationalement.

- **Value Thesis (proposition de valeur de chaque acteur):** Emploirapide.net promet un accès basique aux offres locales mais souffre d'une interface vieillissante et d'une organisation déficiente. Les réseaux sociaux offrent une diffusion rapide et gratuite mais sans structure ni fiabilité. LinkedIn apporte professionnalisme et réseau international mais manque de pertinence locale et d'adoption en Guinée. L'approche directe garantit authenticité mais limite drastiquement la portée et l'efficacité.

- **Strengths / Weaknesses (avantages/inconvénients d'expérience):** Emploirapide.net bénéficie d'une reconnaissance locale mais présente une navigation confuse, des informations incomplètes et une expérience mobile médiocre. Les réseaux sociaux sont familiers et accessibles mais offrent zéro structure, aucun suivi de candidature et beaucoup de bruit. LinkedIn excelle en professionnalisme et fonctionnalités avancées mais exige une courbe d'apprentissage élevée et reste peu adopté localement. Les candidatures directes maximisent la relation humaine mais requièrent un investissement temps considérable et limitent les opportunités découvertes.

- **Our Differentiators (nos points uniques):** En combinant nos Brand Keywords de Clarté, Accessibilité, Efficacité, Fiabilité et Modernité, nous créons une expérience qui respecte les standards actuels du web tout en comprenant profondément le contexte guinéen. Notre architecture d'information structurée élimine la confusion d'Emploirapide.net, notre simplicité d'utilisation surpasse la complexité de LinkedIn, et notre organisation dépasse le chaos des réseaux sociaux, le tout avec une interface moderne qui inspire confiance. Notre trade-off assumé : nous sacrifions temporairement les fonctionnalités avancées (IA, messagerie intégrée) pour livrer une expérience fondamentale impeccable et accessible à tous.

- **Switching Costs & Risks (coûts de migration et risques):** Les utilisateurs d'Emploirapide.net devront recréer leurs profils et apprendre une nouvelle interface, mais la qualité supérieure de l'expérience compense largement cet investissement initial. Les recruteurs craindront peut-être de fragmenter leur audience en ajoutant une nouvelle plateforme, d'où l'importance de démontrer rapidement une masse critique d'utilisateurs et une qualité de candidatures supérieure. Le risque principal est que les utilisateurs attendent des fonctionnalités avancées (recommandations IA, messagerie) dès le lancement, nécessitant une communication claire sur notre feuille de route progressive.

- **Notes (liens de référence):** Étude terrain à réaliser pour capturer des screenshots comparatifs d'Emploirapide.net, analyse des groupes WhatsApp/Facebook emploi locaux, retours utilisateurs sur les frustrations actuelles du marché guinéen

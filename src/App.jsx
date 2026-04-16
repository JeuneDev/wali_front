import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import CandidatLayout from './components/layout/CandidatLayout';
import RecruteurLayout from './components/layout/RecruteurLayout';

// Auth pages (standalone)
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';

// Pages publiques
import Home from './pages/Home';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import Postuler from './pages/Postuler';
import NotFound from './pages/NotFound';

// Pages partagées (candidat + recruteur)
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Parametres from './pages/Parametres';

// Pages candidat
import EspaceCandidatDashboard from './pages/candidat/EspaceCandidatDashboard';
import MonProfil from './pages/candidat/MonProfil';
import ModifierProfil from './pages/candidat/ModifierProfil';
import MesCandidatures from './pages/candidat/MesCandidatures';
import Favoris from './pages/candidat/Favoris';
import Competences from './pages/candidat/Competences';

// Pages recruteur
import EspaceRecruteurDashboard from './pages/recruteur/EspaceRecruteurDashboard';
import MesOffres from './pages/recruteur/MesOffres';
import PublierOffre from './pages/recruteur/PublierOffre';
import DetailOffreCandidatures from './pages/recruteur/DetailOffreCandidatures';
import ProfilCandidatVueRecruteur from './pages/recruteur/ProfilCandidatVueRecruteur';
import RechercheCandidats from './pages/recruteur/RechercheCandidats';
import CandidatsFavoris from './pages/recruteur/CandidatsFavoris';
import Analytics from './pages/recruteur/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Auth (standalone) ────────────────────── */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* ── Public ───────────────────────────────── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/recherche" element={<JobSearch />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/postuler" element={<Postuler />} />
        </Route>

        {/* ── Espace candidat ──────────────────────── */}
        <Route element={<CandidatLayout />}>
          <Route path="/candidat/dashboard" element={<EspaceCandidatDashboard />} />
          <Route path="/candidat/profil" element={<MonProfil />} />
          <Route path="/candidat/profil/modifier" element={<ModifierProfil />} />
          <Route path="/candidat/candidatures" element={<MesCandidatures />} />
          <Route path="/candidat/favoris" element={<Favoris />} />
          <Route path="/candidat/competences" element={<Competences />} />
          <Route path="/candidat/messages" element={<Messages />} />
          <Route path="/candidat/notifications" element={<Notifications />} />
          <Route path="/candidat/parametres" element={<Parametres />} />
        </Route>

        {/* ── Espace recruteur ─────────────────────── */}
        <Route element={<RecruteurLayout />}>
          <Route path="/recruteur/dashboard" element={<EspaceRecruteurDashboard />} />
          <Route path="/recruteur/offres" element={<MesOffres />} />
          <Route path="/recruteur/offres/nouvelle" element={<PublierOffre />} />
          <Route path="/recruteur/offres/:id" element={<DetailOffreCandidatures />} />
          <Route path="/recruteur/candidats/:id" element={<ProfilCandidatVueRecruteur />} />
          <Route path="/recruteur/recherche-candidats" element={<RechercheCandidats />} />
          <Route path="/recruteur/favoris" element={<CandidatsFavoris />} />
          <Route path="/recruteur/analytics" element={<Analytics />} />
          <Route path="/recruteur/messages" element={<Messages />} />
          <Route path="/recruteur/notifications" element={<Notifications />} />
          <Route path="/recruteur/parametres" element={<Parametres />} />
        </Route>

        {/* ── 404 fallback ─────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

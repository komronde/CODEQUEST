import { useEffect, useState, type ReactNode } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { ToastProvider } from "@/context/ToastContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { GameProvider, useGame } from "@/context/GameContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageLoader } from "@/components/ui/Skeleton";
import LandingPage from "@/pages/LandingPage";
import DashboardPage from "@/pages/DashboardPage";
import PathsPage from "@/pages/PathsPage";
import CoursePage from "@/pages/CoursePage";
import LessonPage from "@/pages/LessonPage";
import PlaygroundPage from "@/pages/PlaygroundPage";
import QuestsPage from "@/pages/QuestsPage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import AchievementsPage from "@/pages/AchievementsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import NotFoundPage from "@/pages/NotFoundPage";

function Shell({ children }: { children: ReactNode }) {
  const { state } = useGame();
  return <MotionConfig reducedMotion={state.settings.reduceMotion ? "always" : "user"}>{children}</MotionConfig>;
}

export default function App() {
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setBooting(false), 650);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <ToastProvider>
      <ConfirmProvider>
        <GameProvider>
          <Shell>
            <HashRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/paths" element={<PathsPage />} />
                  <Route path="/course/:courseId" element={<CoursePage />} />
                  <Route path="/playground" element={<PlaygroundPage />} />
                  <Route path="/quests" element={<QuestsPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
                <Route path="/lesson/:courseId/:lessonId" element={<LessonPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </HashRouter>
            <AnimatePresence>{booting && <PageLoader />}</AnimatePresence>
          </Shell>
        </GameProvider>
      </ConfirmProvider>
    </ToastProvider>
  );
}

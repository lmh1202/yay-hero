import { createHashRouter } from "react-router-dom";
import HeroAdd from "./pages/HeroAdd";
import HeroEdit from "./pages/HeroEdit";
import HeroList from "./pages/HeroList";
import SettingsPage from "./pages/SettingsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <HeroList />,
  },
  {
    path: "/heroes",
    element: <HeroList />,
  },
  {
    path: "/heroes/add",
    element: <HeroAdd />,
  },
  {
    path: "/heroes/edit/:heroId",
    element: <HeroEdit />,
  },
  {
    path: "/heroes/setting",
    element: <SettingsPage />
  }
]);

export default router;

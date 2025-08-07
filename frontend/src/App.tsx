import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layouts/layout';
import Home from './pages/home';
import { appRoutes } from './pages/routes';

import type { AppRoute } from './pages/routes';

function renderRoutes(routes: AppRoute[]): React.ReactNode {
  return routes.map((route) => {
    // Wenn untergeordnete Routen vorhanden sind
    if (route.children && route.children.length > 0) {
      return renderRoutes(route.children); // rekursiv weiter
    }

    // Nur Routen mit `element` werden gerendert
    if (!route.element || !route.path) return null;

    return (
      <Route
        key={route.path}
        path={route.path === 'home' ? '' : route.path} // "" für Index-Route
        element={route.element}
      />
    );
  });
}

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {renderRoutes(appRoutes)}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

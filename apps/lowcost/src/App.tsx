import { Link, Route, Routes } from 'react-router-dom';
import { Container } from '@ledge/ui';
import { UrgencyBar } from './components/UrgencyBar';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceLanding from './pages/ServiceLanding';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import Reviews from './pages/Reviews';
import Areas from './pages/Areas';
import ServiceArea from './pages/ServiceArea';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <Container>
      <div className="py-24">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl">Page not found</h1>
        <Link to="/" className="mt-5 inline-block font-semibold text-brand hover:underline">
          ← Back home
        </Link>
      </div>
    </Container>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <UrgencyBar />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceLanding />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/areas/:slug" element={<ServiceArea />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

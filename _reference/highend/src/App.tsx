import { Link, Route, Routes } from 'react-router-dom';
import { Container } from '@ledge/ui';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Process from './pages/Process';
import About from './pages/About';
import Contact from './pages/Contact';

function NotFound() {
  return (
    <div className="pt-40 sm:pt-48">
      <Container>
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl">This page has grown over.</h1>
        <Link to="/" className="mt-6 inline-block text-brand underline-offset-4 hover:underline">
          Return home →
        </Link>
      </Container>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/process" element={<Process />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

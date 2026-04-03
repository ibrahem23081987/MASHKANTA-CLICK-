import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AccessibilityWidget } from './components/AccessibilityWidget'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Calculator } from './pages/Calculator'
import { Result } from './pages/Result'
import { Article } from './pages/Article'
import { Articles } from './pages/Articles'
import { Contact } from './pages/Contact'
import { PrivacyPage } from './pages/PrivacyPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { Terms } from './pages/Terms'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col" dir="rtl" lang="he">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/result" element={<Result />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget />
      </div>
    </BrowserRouter>
  )
}

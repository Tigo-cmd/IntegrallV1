import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './LandingPage.tsx'
import DocumentationPage from './Documentation.tsx'
import { ToastProvider } from '@/components/ui/toast-provider'

export default function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

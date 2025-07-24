import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import HomePage from "./pages/HomePage"
import LoadingSpinner from "./components/LoadingSpinner"

const AttributionsPage = lazy(() => import("./pages/AttributionsPage"))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/attributions" 
          element={
            <Suspense fallback={<LoadingSpinner message="Loading Attributions..." />}>
              <AttributionsPage />
            </Suspense>
          } 
        />
      </Routes>
    </>
  )
}

export default App
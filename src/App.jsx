import Hero from "./sections/Hero"
import Navbar from "./sections/Navbar"
// Import TestScrollContent if you saved it as a separate component
// import TestScrollContent from "./components/TestScrollContent"

// Or define it inline for testing
const TestScrollContent = () => {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Test Content for Scrolling</h2>
      <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        This is test content to ensure the page has enough height to trigger scrolling.
        If the navbar animation works when this content is present, then the issue was
        simply that there wasn't enough content to scroll.
      </p>
      
      {/* Generate multiple paragraphs to ensure scrollability */}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
            Section {i + 1}
          </h3>
          <p style={{ lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo 
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      ))}
    </div>
  );
};

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Add test content to ensure scrollability */}
      <TestScrollContent />
    </>
  )
}

export default App
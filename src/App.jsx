import { useState } from "react";
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Work from './Components/Work'
import Services from './Components/Services'
import Divider from './Components/Divider'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import Preloader from "./Components/PreLoader";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setIsLoaded(true)} />

      <Navbar />

      <main>
        <Hero isLoaded={isLoaded} />
        <Work />
        <Services />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
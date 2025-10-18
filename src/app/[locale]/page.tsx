import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Statistics from '@/components/Statistics';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import DeliveredCars from '@/components/DeliveredCars';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Statistics />
      <Services />
      <WhyChooseUs />
      <DeliveredCars />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
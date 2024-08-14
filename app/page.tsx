import Header from "@/components/Header"; // Import the Header component
import HomePage from "@/components/Home";
import Service from "@/components/Service"; 
import AiInterview from "@/components/AiInterview"; 
import AiSkill from "@/components/AiSkill";
import Questions from "@/components/Questions";
import Blog from "@/components/Blog"; 
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="m-2 overscroll-none">
      <Header /> {/* Add Header component */}
      <HomePage /> 
      <Service />
      <AiInterview />
      <AiSkill />
      <Questions />
      <Blog />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}

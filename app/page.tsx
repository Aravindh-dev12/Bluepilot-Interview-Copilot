import Header from "@/components/Header"; 
import HomePage from "@/components/Home";
import Service from "@/components/Service"; 
import AiInterview from "@/components/AiInterview"; 
import AiSkill from "@/components/AiSkill";
import Application from "@/components/Application";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="m-2 overscroll-none">
      <Header /> 
      <HomePage /> 
      <Service />
      <AiInterview />
      <AiSkill />
      <Application />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}

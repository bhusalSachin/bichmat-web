import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Footer from "@/components/Footer";
import Introduction2 from "@/components/Introduction2";

export default function Home() {
  return (
    <>
      <SEO />
      <main className="w-full h-screen mt-0 border-none outline-none rounded-sm">
        <div className="absolute top-0 left-0 -z-10">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-[100%] left-0 -z-10 border-none outline-none">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full transform rotate-180"
          />
        </div>
        <Header />
        <Introduction />

        <Introduction2 />
        <Footer />
      </main>
    </>
  );
}

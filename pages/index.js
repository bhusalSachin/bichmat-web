import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Card from "@/components/Card";
import { PROMO_LANDING } from "@/constants";
import Footer from "@/components/Footer";
import Introduction2 from "@/components/Introduction2";

export default function Home() {
  return (
    <>
      <SEO />
      <main className="w-full h-screen mt-0">
        <div className="absolute top-0 left-0 -z-10">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full"
          />
        </div>
        <Header />
        <Introduction />

        {/* <Introduction2 /> */}
        <Footer />
      </main>
    </>
  );
}

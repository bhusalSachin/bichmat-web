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
      <main className="w-full min-h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center justify-between mt-0">
        <div className="absolute top-0 left-0 -z-10">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full"
          />
        </div>
        <Header />
        <Introduction />

        {/* promo cards */}
        <div className="relative flex space-x-12 z-10 container mx-auto items-center justify-center after:w-full after:h-2 after:bg-green-600 after:absolute after:top-[50%] after:-z-10">
          {PROMO_LANDING.map((promo) => (
            <Card
              key={promo.text}
              text={promo.text}
              maintext={promo.maintext}
            />
          ))}
        </div>

        <Footer />
      </main>
    </>
  );
}

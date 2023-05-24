import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Footer from "@/components/Footer";
import Introduction2 from "@/components/Introduction2";

export default function Home() {
  return (
    <>
      <SEO />
      <main className="w-full h-screen mt-0 border-none outline-none rounded-sm relative">
        <div className="absolute h-screen xl:h-fit w-full top-0 left-0 -z-10">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute h-screen xl:h-fit w-full top-[100%] xl:top-[60%] 2xl:top-[100%] left-0 -z-10 border-none outline-none">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full transform rotate-180"
          />
        </div>
        <div className="block 2xl:hidden absolute h-full xl:h-fit w-full top-[160%] xl:top-[135%] left-0 -z-10 border-none outline-none">
          <img
            src="/images/bg-texture.jpeg"
            alt="loading.."
            className="object-cover w-full h-full transform rotate-180"
          />
        </div>
        <Header />
        <Introduction />

        <div className="w-full xl:hidden container flex items-center justify-center sm:mt-12">
          <div className="w-3/4 md:w-1/2 h-full">
            <img
              className="w-full h-full object-cover"
              src="/images/online_test.svg"
              alt="loading.."
            />
          </div>
        </div>

        <Introduction2 />
        <Footer />
      </main>
    </>
  );
}

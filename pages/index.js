import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import Footer from "@/components/Footer";
import Introduction2 from "@/components/Introduction2";
import EmailVerifiedText from "@/components/EmailVerified";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [verificationText, setVerificationText] = useState(
    props.verificationText ? props.verificationText : null
  );
  const [showVerificationText, setShowVerificationText] = useState(false);

  useEffect(() => {
    if (verificationText !== null) {
      setShowVerificationText(true);
    }
    const timer = setTimeout(() => {
      setShowVerificationText(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <SEO />
      <main className="w-full h-screen mt-0 border-none outline-none rounded-sm relative">
        {verificationText === null || !showVerificationText ? null : (
          <EmailVerifiedText>{verificationText}</EmailVerifiedText>
        )}
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

export const getServerSideProps = async (context) => {
  const { isVerified, username, first } = context.query;
  console.log("context.query = ", context.query);

  if (isVerified && (first === "true" || first === true)) {
    return {
      props: {
        verificationText: `Congratulations ${username}! Your email got verified successfully.`,
      },
    };
  }
  if (isVerified && (first === "false" || first === false)) {
    return {
      props: {
        verificationText: `Dear ${username}, your email was already verified.`,
      },
    };
  }
  return { props: {} };
};

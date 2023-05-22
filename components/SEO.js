const { TITLE, DESCRIPTION } = require("@/constants");
const { default: Head } = require("next/head");

const SEO = ({ title = TITLE, description = DESCRIPTION }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SEO;

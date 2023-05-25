import axios from "axios";
import * as cookie from "cookie";
import { Router } from "next/router";

const Admin = (props) => {
  const { isAdmin } = props;
  //   return {isAdmin ? (<div>Admin Page</div>) : (<div>You are not an admin, login please</div>)};
  return <div>welcome home boy</div>;
};

export const getServerSideProps = async (context) => {
  let adminToken;
  if (context.req.headers.cookie) {
    adminToken = cookie.parse(context.req.headers.cookie);
    //   console.log("sending token = ", adminToken)
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    };
  }

  try {
    const enterResponse = await axios.post(
      process.env.ADMIN_ENTER_URL,
      {},
      {
        headers: { Authorization: `Bearer ${adminToken.token}` },
      }
    );
    // console.log("enter response = ", enterResponse.data);
    if (enterResponse.data.success) {
      return { props: { isAdmin: true } };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/admin/login",
        },
        props: {},
      };
    }
  } catch (error) {
    return {
      redirect: { permanent: false, destination: "/admin/login" },
      props: {},
    };
  }
};

export default Admin;

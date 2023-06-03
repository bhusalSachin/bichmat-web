import Sidebar from "@/components/Sidebar";
import axios from "axios";
import * as cookie from "cookie";
import { Router } from "next/router";

const Admin = (props) => {
  const { isAdmin } = props;
  //   return {isAdmin ? (<div>Admin Page</div>) : (<div>You are not an admin, login please</div>)};
  return (
    <div className="flex bg-slate-300 min-h-screen">
      <Sidebar section={"home"} />

      <div className="flex-1">Welcome home boy!</div>
    </div>
  );
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

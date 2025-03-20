import toast from "react-hot-toast";
import {removeUserInfo} from "@/lib/cookies";

const useLogout = (router, logout) => {

  async function handleLogout() {
      const response = await logout();

      if(response.error) {
        removeUserInfo();
        return;
      }

      toast.success(response.data.message);
      removeUserInfo();
      router.push("/home")
  }

  return handleLogout;
}

export default useLogout;
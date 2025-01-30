import { useRouter } from "next/router";
import {useLogoutMutation} from "@/services/api";
import toast from "react-hot-toast";
import {removeUserInfo} from "@/lib/cookies";

const useLogout = (router, logout) => {

  async function handleLogout() {
      const response = await logout();

      if(response.error) {
        removeUserInfo();
        await router.push('/home');
        return;
      }

      toast.success(response.data.message);
      removeUserInfo();
      await router.push('/home');
  }

  return handleLogout;
}

export default useLogout;
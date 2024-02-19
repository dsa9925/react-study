import { atom } from "recoil";
import { getCookie } from "../util/cookieUtil";

const initState = {
  email: "",
};
const loadMembeCookie = () => {
  const memberInfo = getCookie("member");
  return memberInfo;
};

export const atomSignState = atom({
  key: "atomSignState",
  default: loadMembeCookie() || initState,
});

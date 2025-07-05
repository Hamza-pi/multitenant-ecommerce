import { cookies as getCookies } from "next/headers";

interface Props {
  name: string;
  value: string;
}

export const generateAuthCookie = async ({ name, value }: Props) => {
  const cookies = await getCookies();

  cookies.set({
    name: name,
    value: value,
    httpOnly: true,
    path: "/",
  });
};

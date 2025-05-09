import HomePage from "@/components/HomePage";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function Index() {
  let userInfo;
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("userId");
    if (!cookie) {
      console.log("no hay cookie");
      redirect("/login");
    }

    userInfo = jwt.verify(cookie.value, process.env.JWT_SECRET!);
  } catch (e: any) {
    console.log("cookie incorrecta");
    redirect("/login");
  }

  return (
    <>
      <HomePage user={userInfo} />
    </>
  );
}

export default Index;
//what

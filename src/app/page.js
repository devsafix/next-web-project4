import { fetchAuthUserAction } from "@/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();

  console.log(currentUser);

  return (
    <div className="p-10">
      <h1 className="text-3xl text-center text-red-500 font-bold">
        Next JS Authentication
      </h1>
      <div className="flex items-center justify-center gap-3 mt-10">
        <Button className="text-white bg-blue-500 py-2 px-4">
          <Link href={"/sign-up"}>Sing up</Link>
        </Button>
        <Button className="text-white bg-yellow-500 py-2 px-4">
          <Link href={"/sign-in"}>Sing in</Link>
        </Button>
      </div>
      <div>
        <h2 className="text-xl text-red-500 font-semibold">
          Name:{" "}
          <span className="text-blue-500">{currentUser.data.userName}</span>
        </h2>
        <h2 className="text-red-500 font-semibold">
          Email: <span className="text-blue-500">{currentUser.data.email}</span>
        </h2>
      </div>
    </div>
  );
}

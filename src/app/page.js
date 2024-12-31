import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
    </div>
  );
}

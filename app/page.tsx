import { redirect } from "next/navigation";
import AuthPage from "./components/AuthPage";
import { getCurrentUser } from "./lib/auth";

export default async function Home() {
  return <div className="text-white">miles tweets</div>;
}

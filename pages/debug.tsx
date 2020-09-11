import Nav from "../components/nav";
import { useContext } from "react";
import { BlockerContext } from "../components/model/BlockerContext";
import { useRouter } from "next/router";

export default function IndexPage() {
  const [blocker, _] = useContext(BlockerContext);
  const router = useRouter();

  if (!blocker) {
    router.push("/");
  }

  return (
    <div>
      <Nav />
    </div>
  );
}

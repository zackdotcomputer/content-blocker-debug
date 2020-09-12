import Nav from "../components/nav";
import ProblemSolution from "../components/problem-solution";
import RootContentBlocker from "../model/ContentBlocker";
import { useContext } from "react";
import { BlockerContext } from "../model/BlockerContext";
import { useRouter } from "next/router";

export default function IndexPage() {
  const [_, setBlocker] = useContext(BlockerContext);
  const router = useRouter();

  const onBeginDebug = (upload: any): Promise<{}> => {
    return new Promise<{}>((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
        let parsedBody: string;

        try {
          parsedBody = JSON.parse(fileReader.result as string);
        } catch (e) {
          console.error(e);
          reject("That file couldn't be parsed as valid JSON...");
          return;
        }

        try {
          let result = new RootContentBlocker(parsedBody);
          setBlocker(result);
          router.push("/debug");
          resolve({});
        } catch (e) {
          console.error(e);
          reject(e);
          return;
        }
      };

      if (upload !== undefined) {
        fileReader.readAsText(upload);
      } else {
        reject("No upload provided!");
      }
    });
  };

  return (
    <div>
      <Nav />
      <ProblemSolution onBeginDebug={onBeginDebug} />
    </div>
  );
}

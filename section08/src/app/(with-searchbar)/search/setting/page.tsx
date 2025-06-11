import { delay } from "@/util/delay";

export default async function Page() {
  await delay(500);
  return <div>setting Page</div>;
}
// src/app/(with-searchbar)/search 폴더의 loading이 보여짐

import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => ({
  title: "Ben Borgers",
});

export default function () {
  return <div>home</div>;
}

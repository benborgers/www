import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => ({
  title: "Ben Borgers’ Blog",
});

export default function () {
  return <div>blog</div>;
}

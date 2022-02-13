export default async function (path) {
  console.log(`Ghost query: "${path}"`);
  const res = await fetch(
    `https://write.benborgers.com/ghost/api/v3/content/${path}?key=8e5c0f45a4e338ab1190f9ef61&include=tags&limit=all`
  );

  return await res.json();
}

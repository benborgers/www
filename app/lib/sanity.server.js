import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "wg50cnqt",
  dataset: "production",
  apiVersion: "2021-12-07",
  useCdn: true,
});

export default client;

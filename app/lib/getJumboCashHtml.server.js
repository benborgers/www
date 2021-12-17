export default async function (username, password) {
  const session = Math.random().toString().slice(2);

  let loginPage = await (
    await fetch("https://www.jumbocash.net/login.php", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundaryu23BWBwQythlWmmc",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        cookie: `jsa_session=${session}`,
        Referer: "https://www.jumbocash.net/login.php?cid=233&",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="save"\r\n\r\n1\r\n------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="skey"\r\n\r\nad06fec13c000b825e51f4be786dff7a\r\n------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="cid"\r\n\r\n233\r\n------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="loginphrase"\r\n\r\n${username}\r\n------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="password"\r\n\r\n${password}\r\n------WebKitFormBoundaryu23BWBwQythlWmmc\r\nContent-Disposition: form-data; name="wason"\r\n\r\n\r\n------WebKitFormBoundaryu23BWBwQythlWmmc--\r\n`,
      method: "POST",
    })
  ).text();

  return loginPage;

  const dashboardPage = await (
    await fetch("https://www.jumbocash.net/index.php", {
      headers: {
        cookie: `jsa_session=${session}`,
      },
    })
  ).text();

  return dashboardPage;
}

Hi! I'm **Ben Borgers**. I’m a software engineer living in Boston. I work at [Owner](https://owner.com), and also contribute to [Buttondown](https://buttondown.com).

I'd love to hear from you — [benborgers@hey.com](mailto:benborgers@hey.com).

<div style="margin-top: 200px"></div>

## Work Experience

- [Owner](https://owner.com) (2025 – present): Software engineer.
- [Buttondown](https://buttondown.com) (2021 – present): Contributions to the product and supporting users.
- [Notion](https://notion.so/product) (summer 2024): Built and shipped a new version of the callout block to the editor and public API.
- [Locket](https://locket.camera) (2023 – 2024): Shipped usernames, chat, and other features to millions of active users on Android.
- [Luma](https://lu.ma) and [Glow](https://glow.app) (summer 2022)
- [IBM](https://www.ibm.com/guardium) (summer 2019 + 2020)

## Education

- [Tufts University](https://tufts.edu) (2021 – 2025): B.S. in Computer Science and Engineering Psychology, minor in German.

## Projects

- [JumboSmash](https://jumbosmash.app): Dating app for Tufts seniors.
- [TikTok Graveyard](https://tiktokgraveyard.com), [IG Valentine](https://igvalentine.com), and [Locket Yearbook](https://locketyearbook.com/kXYrENR6d1FPjUYYTDRI): Viral marketing for [Locket](https://locket.camera).
- [GovDiff](https://govdiff.com): Government websites before and after Trump.
- [Speakology](https://speakology.ai): AI speaking partner for language learning.
- [Govcentives](https://govcentives.com): Whitelabeled search engines for energy providers.
- [Tufts Meal Plan Wrapped](/wrapped): Spotify Wrapped for Tufts’ meal plans, used by 1,300+ students.
- [diffeqgrapher.com](https://diffeqgrapher.com): Friendlier differential equations grapher for my dad’s classes.
- [Kiwi](https://ask.kiwi): Live Q&A platform for university classes; built for University of Michigan research study and used by 2,000+ students.
- [War Room](https://war.elk.sh): Social to-do list app.
- [Bagel Institute](https://bagel.institute): Teaching tools for university classes, built for my dad.
- [opensheet](https://opensheet.elk.sh): Open-source Google Sheets API that receives over 200 million requests/month.
- [emojicdn](https://emojicdn.elk.sh): CDN for PNG images of emojis that gets millions of requests/month.
- [Blocks](/blocks): Schedule app for my high school that was used by 2,100 students and teachers (87% of the school).

<script>
  const currentScript = document.currentScript;
  const LOCAL_STORAGE_KEY = "www:magic_interest";

  (async () => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) === null) {
      const res = await fetch('/api/magic-interest')

      if (!res.ok) {
        return;
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, await res.text())
    }

    currentScript.outerHTML = `
        <h2>Interests</h2>
        <ul>
          <li>${localStorage.getItem(LOCAL_STORAGE_KEY)}</li>
        </ul>
        <!-- https://github.com/benborgers/www/blob/main/src/pages/api/magic-interest.ts -->
        <!-- :) -->
      `;
  })()
</script>

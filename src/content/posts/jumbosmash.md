---
title: "We built JumboSmash, a dating app for Tufts seniors"
draft: true
cover_image: ./images/jumbosmash/cover.png
---

On May 8, 2025, some friends and I launched _JumboSmash_, a dating (_"dating"_) app for Tufts seniors during the last week before graduation.

JumboSmash is a 10-year tradition, and to contribute to future generations, I thought I'd write down my late thoughts before I _totally_ forget them.

- [2015, 2016](https://github.com/jumbosmash/tradition)
- [2017](https://blog.cwrichardkim.com/we-spent-a-year-building-a-dating-app-that-only-lasts-one-week-e6e1a10cedb3)
- [2018](https://bernsteinbear.com/blog/jumbosmash-a-technical-retrospective/)
- [2019](https://github.com/mgreenw/JumboSmash)
- [2020 (gone too soon)](https://www.facebook.com/jumbosmash2020)
- [2022](https://www.instagram.com/jumbosmash2022)
- [2023](https://www.instagram.com/jumbosmash2023)
- [2024](https://github.com/JumboSmash2024/JumboSmash)
- [2025 (us!)](https://instagram.com/jumbosmash25)

We launched in the evening of May 8th, and shut it down on the morning of graduation, May 18th.

![app.png](https://raw.githubusercontent.com/benborgers/www/main/public/posts/jumbosmash/app.png)

Initially, we built an Expo app. But Apple refused to allow it onto the App Store, citing guideline [4.3 Spam](https://developer.apple.com/app-store/review/guidelines/#4.3) (which specifically names that the App Store does not need more dating apps).

We tried to argue that this was a very niche and short-lived dating app, but they were unconvinced. We had to pivot. 

I paid $200 for Claude Code (this was pretty early in its existence! I was amazed) and converted the app to a Next.js PWA web app that used web push notifications. This worked completely fine and didn't require Apple's blessing.

## Research notes / memory joggers

- Source coverage for these notes:
  - `[Git]` I read the full history of `../jumbosmash`: the first commit was January 27, and the graph contains 732 commits dated through May 18—471 of them in May alone.
  - `[Texts]` I searched a verified snapshot of `chat.db` from December 1, 2024 through May 18, 2025: 71,108 messages in all 28 threads containing Trisha, Dan, Alex, or Gaby (the individual threads plus 23 group chats). This includes the four-person build chat created on May 5, `bendana`, `picoparty`, and every other group combination—not just one-to-one conversations.
  - `[Sunrise]` I enumerated and fetched every one of the 169 daily entries from December 1 through May 18, rather than relying only on a keyword search.
  - `[Notion]` I also searched the personal workspace generally and read the [JumboSmash project page](https://app.notion.com/p/179602f7e55780f2b899fd848fb67427), its planning pages, and the complete task database for the period.

- The lead-in and original idea:
  - December 7: somebody dropped the old [`jumbosmash/tradition`](https://github.com/jumbosmash/tradition) repository into `picoparty`, the group chat containing Trisha, Dan, and Alex. This is the earliest JumboSmash-specific trace in the December/January lead-in.
  - January 11: Dan texted, “we should scheme about jumbosmash!” and proposed a weekend call.
  - January 12: you and Dan FaceTimed for about 90 minutes. You told Trisha afterward that it was “jumbosmash planning / what to do.” When she asked if you needed more people, your answer was effectively: not yet; plan more first, then see what help is needed.
  - Your [Sunrise entry from January 12](https://app.notion.com/p/17a602f7e55780b8be9efd575a85d89c) says you deliberately did not invite the Freebites people yet and initially chose Expo + Laravel. The same evening, you were already experimenting with Rails + Inertia, foreshadowing the stack indecision to come.
  - The original [feature brainstorm](https://app.notion.com/p/179602f7e557809ebcaaf22a10e3615f) already contained most of the eventual product: Google login with Tufts-senior verification, profiles with majors/prompts/audio/orientation, chat and read receipts, rate-limited swiping with return notifications, and preemptive blocking. There was even a possible paid “JumboSmash XL” tier: see people who liked you and get more profiles.
  - A second January 12 note said the explicit goal was to land in the App Store, probably without advertising the app’s one-week lifespan, using Expo + React Native. Apple was therefore part of the plan from day one, not an afterthought.
  - January 25: Dan said a friend would be interested in curating the Instagram and shared an example flyer for the eventual marketing phase.

- Forming the team and the working rhythm:
  - January 27: your first in-person JumboSmash meeting with Dan was at JCC. [Your journal](https://app.notion.com/p/18a602f7e55780db813fdcff053602b9) says you settled—for the moment—on an Expo frontend and Rails backend, and you began the Rails auth endpoints. The first Git commit landed that afternoon.
  - February 3: you and Dan worked at JCC, built the landing page, bought `jumbosmash.app`, and hosted the Rails API there with Kamal. Dan worked on logos while you worked on the site. ([Sunrise](https://app.notion.com/p/190602f7e55780738d23c75e6d072370))
  - That day you invited Alex to join. He said yes with the caveat that he would be learning web-app development as he went; you replied that learning as he went was the point. He immediately joked about the résumé line: “Helped Tufts students connect with one another.”
  - Dan resurfaced the 2022 logo, which you both thought was “lowkey fire,” if perhaps too suggestive.
  - February 6–7: Dan had the beginnings of swiping working, though he described it as desperately early. His early commits fixed NativeWind and introduced the swipe component and image work.
  - February 10: you and Dan worked in JCC and then did project management in Notion. Dan proposed freezing the coding team at the four of you, while still welcoming marketing/design help. He suggested that you and he own the weekly direction and ticket creation, while Alex and Gaby could grab work without the project becoming an obligation for them. That became the practical division of responsibility.
  - The Notion task assignments line up with the Git history:
    - Dan owned much of the native component/profile work: Instagram identity/logo work, select and image-upload components, audio recording, assembling and displaying profiles, and the swipe/profile view.
    - Gaby built the text-input component and major parts of chat: message UI and the conversations list.
    - Alex concentrated on settings, blocked-user selection and directory search, the yes/no control, image ordering, and related UI cleanup.
    - You owned the architecture, backend/data model, authentication and eligibility, deployments, App Store submission, PWA conversion, notifications, matching, operations, and most of the final integration.
  - Git attribution across the repository is roughly 653 commits from you, 39 from Dan, 24 from Alex, and 21 from Gaby (combining each person’s duplicate Git identities). Those numbers overstate the contrast somewhat because your final integration work produced many tiny commits.

- Building the product, February through April:
  - February 24: Laravel Cloud launched while you were driving to JCC for the weekly meeting. You signed up from the car (you remembered being user ID 551), rewrote the Rails backend in Laravel, rebuilt the waitlist page in Flux, and deployed the whole thing to Laravel Cloud that day. ([Sunrise](https://app.notion.com/p/1a4602f7e55781fb86a2ce6f2f7cedfa))
  - Early March: the architecture changed again. Git shows Instant being installed March 4 and Google auth landing shortly afterward; the final app used Instant for the live data layer while Laravel continued to support the waitlist/eligibility side.
  - March 5: the [Notion database sketch](https://app.notion.com/p/1ac602f7e55780b9847dc42d11a4706a) defined profiles, verifications, yes/no decisions, conversations, and messages, with explicit read/write rules. The basic relational shape survived into the shipped product.
  - March 6–10: you scraped the Tufts directory, produced a slimmed-down eligibility data file, backfilled names that could not be scraped, and built a flow to decide who counted as a senior—undergraduate Class of 2025 students plus 4+1 master’s students. Some exceptions ultimately remained hard-coded.
  - March 7: you and Dan took a Halligan study room specifically to decide how profiles should ask about gender and match preferences. ([Sunrise](https://app.notion.com/p/1af602f7e5578107a937ca0438593824))
  - March 10 onward: Gaby’s messaging UI landed; Dan worked on profile editing, photo slideshows, prompts, gender and preferences; Alex worked on settings and blocked users; you handled uploads, persistence, auth, and eligibility.
  - March 24–31: image uploads began persisting real URLs; type-checking went into CI; profile name/photos, height, prompts, gender/preferences, habits, major, and hometown were connected to the database; the login screen was styled; and the project email was set up.
  - The meetings were usually folded into ordinary senior-year life: JCC, Halligan, the Mac Lab, and occasionally fitting work around Spring Fling or taking care of a sick Trisha. Your journal repeatedly calls them the weekly meeting with Dan.
  - March 31: after another JCC session, you wrote that the profile page had made good progress, but “we only have 4 or so weeks left, eek.” ([Sunrise](https://app.notion.com/p/1c7602f7e557812d8918cf14ea84e57b))
  - April: the task list shifted from components toward launch requirements—locking profiles down, suspensions, a staff overview, match-pool loading, swiping, feature flags, announcements, Expo Updates, Sentry, account deletion, and a login path for App Review.
  - April 26, just before Spring Fling, you still held a JumboSmash meeting. On April 28 Dan thanked you for the experience and said that, ten years later, “making JumboSmash” would be a much better story than whatever else you might have done with the time.

- The App Store failure and emergency web rewrite:
  - May 1–2: Git becomes a wall of submission work—Sign in with Apple, account deletion, crash fixes, Expo Doctor, reviewer access, Terms of Service/reporting changes, and other changes specifically intended to satisfy App Review.
  - [Your May 2 journal](https://app.notion.com/p/1e7602f7e55781ef9adfe3424b887825) says you submitted from the Tufts Medical building while Trisha worked at the Yelick Lab. The app was rejected roughly three times that day: first for missing Terms/reporting and then under 4.3 “Spam,” on the theory that the store already had too many dating apps.
  - On the morning of May 3, you told Trisha that another rejection had arrived at 7:45 a.m. It again alleged inadequate filtering of questionable content—even after the added Terms and explanation—and again called it a spam dating app. Trisha suggested trying Apple once more while you continued the fallback.
  - The pivot was almost immediate: the “Updates to appease App Store Review” commit was at 6:39 p.m. on May 2; the commit creating a brand-new Next.js app was at 9:14 p.m. The skeleton alone added a `web-app` directory with more than 6,000 generated lines.
  - May 3 was an all-day PWA sprint: porting profile state, adding the countdown, warning about incomplete profiles, opt-out from the match pool, iOS and Android install instructions, notification permission and testing, push subscriptions, and fixes so tapping a notification behaved like an installed app rather than opening stray browser windows.
  - Dan caught an early PWA problem: the preview URL redirected to `jumbosmash.app` instead of behaving properly from the installed home-screen app.
  - Claude Code was not just a generic helper here: the interesting story is that, after months of native work, you used an early version of it to perform much of an emergency native-to-web conversion in the six days before launch.

- Prelaunch, May 5–7:
  - May 5: the four-person build iMessage thread was created, alongside Discord notifications for operational events.
  - Late May 5, you quietly pointed `jumbosmash.app` at the web app so DNS could propagate. By 9:33 the next morning, two people had already found it organically, including Trisha’s random sophomore-year roommate.
  - May 6: you archived the last waitlist snapshot and sent the early-access email. The [draft in Notion](https://app.notion.com/p/1ea602f7e5578082acedd3c981214b70) called JumboSmash a yearly, senior-week “dating” app “for the seniors, by the seniors,” promised Thursday at 3 p.m., and told waitlist members they could “hook up… your profile” early. Dan supplied the “exclusive (or maybe non-exclusive ;))” joke.
  - You and the team discussed deliberately fake Sidechat posts, staggered across May 6–7: “how does jumbosmash work,” “wait is jumbosmash out,” a screenshot of the countdown, and later fake excitement/match posts. Gaby repeatedly worried that the posts would be obviously from the team. You asked friends to upvote at least one of them; by May 7, Trisha told you not to post there again.
  - May 7 at 1:15 p.m.: you announced that the app had almost 200 accounts. The team estimated roughly 100 completed profiles and worried the initial audience skewed too close to CS, so people scrolled friends’/housemates’ Instagram following lists to recruit a broader mix.
  - The last launch-critical items were still swiping, messaging, and blocking. “Undo No” was desirable but not essential. Alex promised to finish blocking; deletion was still missing; exceptions absent from the scraped directory complicated the UI.
  - Eligibility was partly manual in production: “undetermined” accounts went into an admin queue that you periodically approved or banned. If a legitimate account was caught by the do-not-email data, you proactively emailed the user to say it was cleared.
  - Suspensions went live May 7: staff could flag a questionable profile in the admin view, and suspended users saw a page asking them to email for reactivation. Audio prompts also worked by then.
  - You recruited a single capstone-group member without admitting you had built the app: somebody else mentioned JumboSmash, and you casually said you had seen it was live.
  - Swipe supply was a real product constraint. With about 100 complete profiles, the team debated 15 or 20 profiles every 12 hours—advertised colloquially as “daily”—so people would return without exhausting the pool. It ultimately shipped as 25 profiles per period on launch night.
  - The gender ratio was skewed, although Dan’s quick analysis suggested preference balance was less bad. The sharpest shortage was for men seeking men, leading to discussion of recruiting more men through frats and senior group chats.
  - Dan found a crucial reciprocal-preference bug the night before launch by temporarily setting himself as a man seeking men and receiving “a bunch of decidedly straight men.” The code filtered for whether a candidate matched *your* preference but had not checked whether *you* matched *theirs*. You fixed that in commit `0e0dd93`.

- Launch day, Thursday May 8:
  - The original [release plan](https://app.notion.com/p/1c7602f7e55780f79a55fe90d1346dfd) was profile access on May 1 and full access May 8; the actual waitlist email promised 3 p.m. Thursday.
  - You wanted to launch by 3 p.m., but after lunch at Hodge with Trisha and Gaby you were still working at Trisha’s apartment and clearly would not make it before the planned Boston outing with Alex, Airi, Dan, and Neya.
  - You and Trisha drove into Boston later, met everyone at Beacon Hill Books and Newbury Street, and then separated. You went back to Tufts and used your final Dewick meal swipe to sit in a corner and finish the app over dinner. ([Sunrise](https://app.notion.com/p/1ed602f7e5578156830ed4d2cd4af5b7))
  - The launch was officially moved to 9 p.m. in a 3:22 p.m. commit. Alex’s blocking/directory-search PR merged at 7:30. During the final hours you wired up blocking, chat, match editing, chat notifications, a match modal, admin counters, and the last release gates.
  - The production `Go live` commit was at **9:13:05 p.m. Eastern**. Your text to Trisha three minutes later was “we live!”
  - You went to Trisha’s pregame immediately afterward and watched somebody already trying the app, then headed to Dan’s apartment where Alex and Airi were. There was a brief report that the app was not loading, followed within minutes by confirmation that it worked.
  - The work did not actually stop at launch: later that night you added a “we’re live” push, chat-message text in notifications, admin swipe/match/message counters, and more chat fixes.
  - Trisha raised a privacy concern that Gaby was telling people the team could see profiles. You then asked the build chat to keep staff profile access quiet because it could scare users. This is a useful lead-in to an honest retrospective about the improvised admin/privacy model.

- The live week, May 9–18:
  - May 9 at 8:25 a.m., Alex reported that messages had “around doubled.” Git that morning fixed duplicate matches and added decision/match counts; later it added a small feedback survey about why somebody said no, including an “I know them” reason.
  - May 10: chat got larger text, last-message previews, unread counts, `lastMessageAt` ordering, schema/index work, and performance/cache improvements.
  - May 11: you spent Mother’s Day evening implementing unmatch/delete-match and the ability to undo a prior No. The latter was enabled for everyone on May 14. ([Sunrise](https://app.notion.com/p/1f0602f7e557817b8a1cea4c69d74e72))
  - Somebody outside the intended final-week cohort lobbied hard for access. The team found the effort funny; one joking proposed response was “pls go touch grass. best, jumbosmash team.” The eligibility boundary was socially awkward, not merely technical.
  - Trisha asked on May 13 whether you wanted any posters and noted that they were a pain to cart around—evidence that there were still physical promotional materials in the mix during Senior Week.
  - Small pushes and fixes continued through May 16. On May 17 you changed the cap from 25 to 100 profiles per 12-hour period, essentially opening the floodgates for the final day.
  - The archived, later-anonymized data contains 564 profiles, 74,632 decisions (18,333 Yes and 56,299 No), and 1,249 real matches, plus three placeholder/test match records. Decisions began within minutes of launch and continued until about 8:18 a.m. on graduation morning.
  - May 17’s shutdown commit hard-coded **Sunday, May 18 at 9:00 a.m. Eastern**, the beginning of graduation. After that time, the UI said JumboSmash was over, wished the Class of 2025 luck, and offered a final feedback form.
  - At 6:40 a.m. on graduation morning, Trisha texted to ask whether you were shutting it off. You answered that it would happen at 9. The automatic cutoff then closed the app as everyone was gathering for commencement.

- Possible retrospective threads worth writing about:
  - Roughly three months of native-app work became a six-day web-app rewrite because a single App Review category treated “another dating app” as spam.
  - The project was simultaneously carefully planned (schema, tickets, eligibility, moderation) and extremely improvised (manual approvals, fake Sidechat marketing, hard-coded exceptions, late privacy worries, shipping chat minutes before launch).
  - The social setting is as memorable as the software: weekly JCC/Halligan sessions, Spring Fling, last classes, the final Dewick swipe, launching from a dining-hall corner, checking the app at a pregame, and shutting it down as graduation began.
  - The one-week constraint made otherwise questionable product choices rational: strict swipe rationing, fast push-notification work, continuous production changes, then 100 profiles on the last day and an irreversible scheduled ending.
  - The team’s friendship dynamic mattered: Dan as co-planner/product conscience, Alex and Gaby picking up bounded UI areas, Trisha as the constant sounding board and privacy/marketing reality check, and you doing the high-volume integration sprint.
  - The funniest contrast may be that the original January plan was “Want to land in app store,” while the eventual lesson was that the web worked completely fine and did not require Apple’s permission.

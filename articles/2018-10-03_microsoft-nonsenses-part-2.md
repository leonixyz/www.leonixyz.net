# Microsoft Nonsenses - Part 2

**Disclaimer**: this series of posts is to share a couple of weird things learned in the past years. Please note that I'm not throwing s#!t against MS because of my belief that free and open source software is an added value by itself. I just want to share my opinions, which are probably due to my FOSS background, but in the first place surely due to my ignorance.

## Internet Explorer and Edge

Suppose your team is currently working on redeveloping from scratch, using Angular web apps, the whole intranet portal of an organization having some thousands of users. The previous version of the intranet portal has become, after many years, an extremely hard to maintain ASP&#x0002e;NET monolith: lots of users are complaining that it's very slow because of [the nature of ASP&#x0002e;NET web controls](/blog/microsoft-nonsenses-part-1). If you manage to develop the same functionalities of the previous version, but using single-page-apps and consuming webservices asynchronously, you will certainly achieve a great goal.

Part of your team's effort is directed to develop RESTful webservices to expose business logic to both web and native mobile clients. Because the previous version of the intranet portal was built on top of ASP&#x0002e;NET, and because most of the developers have a MS-oriented background, the best choice for the technology behind these new webservices is to use ASP&#x0002e;NET Web APIs.

Given all the premises above, MS Azure is the natural choice for a cloud service provider if you need to tie these requirements together. In this scenario, one of the most important integrations that Azure offers, is with an on-premises instance of *Active Directory Federation Services*: your AD domain users will be able to log into federated apps seamlessy thanks to SSO.

Moreover, and here comes the interesting part, your federated apps can also include the ASP&#x0002e;NET web APIs that your backend team is developing! Using *OAuth2 implicit flow*, you are able to authenticate users against webservices. You just have to make sure that with each HTTP request they also include a bearer `Authorization` header containing a token issued by Azure during authentication, and that your federated webservices are able to validate.

In the recent years, probably because of the open nature of the World Wide Web and its success, MS has finally begun to embrace open source. One of its new open products, is the Javascript library [ADAL.js](https://github.com/AzureAD/azure-activedirectory-library-for-js). ADAL is supposed to provide web developers with a MS supported tool for implementing SSO on single-page-apps against Azure AD.

Suppose your team tested the library months ago while you were still analyzing the migration. You developed some proof-of-concepts and, finally, started coding. Surprise, surprise! Before releasing the first module you get an interesting feedback from QA: the app does not work at all on Internet Explorer and Edge!

Ok, you might have heard of the love, ironically speaking, [between software developers and the MS browsers](https://www.reddit.com/r/OutOfTheLoop/comments/1rew5e/why_do_people_hate_on_internet_explorer_so_much/). But this time is different. With all polyfills out there, it wasn't a big deal for you to fill the gap with real browsers. In fact, just uncommenting a bunch of lines of code that angular-cli produces by default when you create a new project, will solve almost all the issues.

But what QA reports, is instead a much subtler issue: an infinite redirection loop straight after logging in using Edge. On IE, on the other hand, all HTTP requests to federated ASP&#x0002e;NET web APIs are failing with a 401 status.

**WHAT??** how's it possible? You are using MS's own tool, which was specifically created to integrate web apps with Azure, and it works on any browser except MS ones? QA must be kidding... Unfortunately, QA is deadly serious. The error you're getting is the following:

```
AADSTS50058: A silent sign-in request was sent but no user is signed in. The cookies used to represent the user's session were not sent in the request to Azure AD. This can happen if the user is using Internet Explorer or Edge, and the web app sending the silent sign-in request is in different IE security zone than the Azure AD endpoint (login.microsoftonline.com)
```

After some research, you realize that OAuth2 implicit grant flow is failing because of some default security settings in MS browsers themselves. It turns out that MS browsers apply a concept of "*security zones*", partitioning the Internet in trusted and untrusted sites. All MS and Office365 sites are obviously listed as trusted, while all the rest, including the domain where you deployed your SPA are bad, untrusted guys.

As long as your distrust does not affect your objectivity you are free to distrust all the world. Come on, we live in bad days, nobody expects you to blindly trust anything out there. But, if you have to build a trust relationship with an application hosted on some random domain, at some point there should be some kind of information exchange between your "security zones".

What people suggest, in order to fix that error is to add your random, bad domain to the list of trusted ones in IE settings (and for fixing Edge there is a similar setting but at system level, in the Windows settings panel). This is a viable solution if you have 10 users, provided that you remind them every couple of weeks that if they reinstall their MS OS, or if the buy a new laptop, they have to redo the procedure manually. But your organization has thousands of users, you have to find a workaround. You are considering to drop support for MS browsers.

After a while you're struggling to solve the problem, you land on the [ADAL.js wiki, on "known issues" page](https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Known-issues-on-Edge). Your choice now is whether to laugh or blame MS.

Concluding: the solution is trivial, in your ADAL settings you have to configure the library to use localStorage as `cacheLocation`. This is basically circumventing IE and Edge own security settings.
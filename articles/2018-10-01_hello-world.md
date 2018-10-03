# Hello World

This site is my personal homepage and blog, I hope I will find some time in the future to regularly write some articles about what I think is worth of being shared. In my first post on this blog I'd like to describe this website.

I just finished coding my first [Vue.js](https://vuejs.org/) web app and have to honestly admit it: it's really cool! During my job I usually develop Angular websites, I also have some experience with AngularJs, but Vue is really impressive.

You might have noticed from the design of this website that I like minimalism: my personal notebook runs [Arch Linux](https://archlinux.org) with a custom (and guess... lightweight) [Awesome](https://awesomewm.org/) theme. It might be a little bit early for these kind of statemets, but I think Vue.js is the perfect match for me. Its modularity and flexibility are simply great.

IMHO, a nice feature of this website is its architecture. On the hosting provider for www.leonixyz.net I only deploy static files, i.e. my Vue app. All the content (like this article) is instead hosted on [Github](https://github.com/leonixyz/www.leonixyz.net), which provides an API that doesn't require a key in some cases.

I'm currently hooking to [a method](https://developer.github.com/v3/repos/contents/#get-contents) that returns the content of a directory in my repository. I first list the content of the directory to get the list of posts: each file in the directory is a post, and its metadata is limited to release date and title, which are encoded in the file name itself.

Then, when a user opens the article page (like this one) the app performs an additional HTTP request to get the actual content of the file. The markdown code returned is processed by your browser and converted to HTML, which is finally injected in the page.

In this way I have several benefits:

* my SPA is lightweight and fast
* I get for free ultra performant webservices, thanks to Github
* I get free storage for my files, thanks to Github
* I only need to push my changes to the repo in order to publish a new article or edit an existing one

If you want to have a look a the code of this app you can click on the fake `</html>` tag in the footer of this page.

Happy hacking!
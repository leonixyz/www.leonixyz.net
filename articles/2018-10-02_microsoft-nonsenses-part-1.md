# Microsoft Nonsenses - Part 1

**Disclaimer**: this series of posts is to share a couple of weird things learned in the past years. Please note that I'm not throwing s#!t against MS because of my belief that free and open source software is an added value by itself. I just want to share my opinions, which are probably due to my FOSS background, but in the first place surely due to my ignorance.

## ASP&#x0002e;NET

One of the first, extreme weird things I encountered, is the confuse way of how [ASP.NET controls](https://msdn.microsoft.com/en-us/library/bb386451.aspx) are handled: they are rendered on the client, but the code responsible for their logic (e.g. disabled state of a button) is written on a server-side script. There is no such hard distinction between frontend and backend (at least I did not encountered it in my experience).

I have never seen anything like this: you need to hide a button? just put `myButton.Visible = false;` in your "code behind" which is executed on the server, and the button magically disappears. No CSS, not a single line of Javascript that a developer has to write. No idea of how the server is telling the client to hide the button. The concept itself of "code behind" made me struggle for long time, because I did not simply accepted that the button has gone, I wanted to understand how it was possible since the first code responsible for the disappearance is executed on the backend.

Long story short: the ASP&#x0002e;NET framework keeps the state of your page encoded in a string (so called "[view state](https://msdn.microsoft.com/en-us/library/ms972976.aspx)") that is shipped to the client, and is used to carry some misterious information back and forth. Moreover, almost each user interaction with the page, like clicking on a table header to sort a column, results in a complete page reload: the client in some way tells the server: "hey, I just clicked on this table header", and the HTML returned by the server contains the table rows sorted accordingly.

A positive thing in all this weirdness resulted from the unification of client and server side logic, is the extreme ease to develop a working piece of software using basic ASP&#x0002e;NET controls.

1. You choose to display some data in a table, and you write some special markup for it.
2. You provide a C# object containing your data-set as "input" to the table.
3. You define which property of the data should be rendered by each column.

And you are done: you get a table and, for free, a lot of useful functionality like sorting, adding new records, deleting existing ones and even editing them from inside of the table rows. The persistency is handled transparently, you don't have to care about it, as long as everything works well.

[![An example of an editable table.](http://www.aspneto.com/webblogscontent/uploads/images/gridview-inline-add-insert-edit-update-delete-data-example-in-asp-net.png)](http://www.aspneto.com/webblogscontent/uploads/images/gridview-inline-add-insert-edit-update-delete-data-example-in-asp-net.png)

The problem arises when the functionality offered (which, I admit, is huge), or the way a control is rendered, does not satisfies you anymore: customizations might become painful.

Another downside is the way of interacting with the page: the fact that each trivial action requires a complete page reload. If your code takes some time to execute because you have to join a lot of tables together and pre-process the resulting data, and maybe a user just wants to sort the table by clicking on a `<th>`, then the browser will likely be stuck for some time before the response is sent back. Nowadays, this is unacceptable. One might say: "yes, but if you cache the data, the response will be faster", and that's correct but, IMHO, all this architecture is real deceit.

In conclusion, I think it's pretty ok to hide complexity by stacking abstraction layers, this is what IT people did since decades, but coupling together server- and client-side is, at least in my case, leading to counter-intuitive and weird outcomes.

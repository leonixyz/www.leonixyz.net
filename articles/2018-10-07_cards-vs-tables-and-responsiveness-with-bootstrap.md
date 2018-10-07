# Cards vs. tables and responsiveness with Bootstrap

In the past weeks I have had a heated discussion about which is the "best" way of displaying certain data on a web page. My opinion was that, given the mostly mobile nature of the web nowadays, cards are much easier to handle than tables and should be favoured when possible, such in that specific case.

Cards are easy to implement, and they adapt nicely to all screen widths, but they also take some drawbacks. In the end, I identified two preconditions that, given a data set, will turn my decision against cards, and in favor of tables:

1. If a user is supposed to sort the data set according to different properties, clicking on a table header and getting its rows sorted is the most easy and understandable pattern.
2. If a user is supposed to scan visually between records, having the data listed row by row allows the user's eye to smoothly scan on a particular column, instead of jumping from one card to another.

On the other hand, there are two cases in which a card layout cannot be questioned:

* If the data set is skew: i.e. if using a table will result in having a certain set of empty columns in some cases, and another set of empty columns in other cases.
* If the record is going to contain properties which are lists of variable length.

Bootstrap offers a `table-responsive` class, which allows a table to be scrolled horizontally if it exceeds the width of the viewport, and has to be applied to the wrapper element of a table.

```
<div class="table-responsive">
  <table class="table">
    ...
  </table>
</div>
```

This is fine in some cases, but not really everytime. **To achieve the best compromise, some columns of a table can easily be grouped together when the viewport is small enough, while other columns might even be hidden.** This strategy still allows the data to be displayed using a table, with the advanteges of sortability and scannability previously mentioned, and without having to implement complex functionality like toggling the view mode.

To achieve this result using Bootstrap, we can rely on [responsive utility classes](https://getbootstrap.com/docs/3.3/css/#responsive-utilities). By applying them on entire columns, we can decide what to show within specific viewport breakpoints.

To hide a column on small and extra-small viewports, for example, it's sufficient to apply `.hidden-xs` and `.hidden-sm` to the cells of a given column.

Grouping together two or more columns, on the other hand, requires some additional effort. First you have to apply, for example, `.visible-md` and `.visible-lg` classes to each column that is going to become part of the group. Then, you have to add *an additional column* to your table, containing a *repetition* of the information, and apply the complementary classes `.visible-xs` and `.visible-sm` to it. By doing so, you will toggle the visibility of the columns depending on the viewport size, in such a way that on small screens the "condensed" column is shown, whereas in bigger screens it gets hidden, and the separate columns are displayed instead.

Following example illustrates both cases of hiding a column and grouping together some other.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th class="visible-lg">First name</th>
                    <th class="visible-lg">Last name</th>
                    <th class="visible-md">Name</th>
                    <th class="visible-lg visible-md">Email</th>
                    <th class="visible-lg visible-md">Phone</th>
                    <th class="visible-lg">Street</th>
                    <th class="visible-lg">City</th>
                    <th class="visible-lg">ZIP</th>
                    <th class="visible-lg">Country</th>
                    <th class="visible-md">Address</th>
                    <th class="visible-lg">Comment</th>
                    <th class="visible-xs visible-sm">Person</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="visible-lg">Max</td>
                    <td class="visible-lg">Mustermann</td>
                    <td class="visible-md">Max Mustermann</td>
                    <td class="visible-lg visible-md">max.mustermann@office.com</td>
                    <td class="visible-lg visible-md">+39 123 456 7890</td>
                    <td class="visible-lg">via Roma 155</td>
                    <td class="visible-lg">Bolzano</td>
                    <td class="visible-lg">39100</td>
                    <td class="visible-lg">Italy</td>
                    <td class="visible-md">via Roma 155, Bolzano, 39100, Italy</td>
                    <td class="visible-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                    <td class="visible-xs visible-sm">
                        Max Mustermann<br>
                        max.mustermann@office.com<br>
                        +39 123 456 7890<br>
                        via Roma 155, Bolzano, 39100, Italy
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <!-- here comes the pagination: out of scope for this example -->
            </tfoot>
        </table>
    </div>
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  </body>
</html>
```
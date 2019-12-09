WATER README

Water is a single page application that displays a data visualization showing the
relationship of water consumption amongst animal and crop products from the years
1996-2005. 

Warning: This application is not setup server-side and requires the use of a Python HTTP Server. Without running this server and loading the website from the local host, the HTML
file will not show the full application.

Directories:
- data : Folder consisting of the .csv file used for this application, as well as the
original spreadsheets from which the data was collected from.
- lib : Folder containing the D3 Libraries, called in the 'index.HTML' webpage.
- style/style.css : Folder containing a CSS sheet that stylizes the DOM elements according
to the individual CSS rules established in this file.
- index.html : HTML file that creates the initial layout of the webpage. Additionally, 
it links the HTML, CSS and JavaScript files together to create the application.
- script.js : A JavaScript file that utilizes the D3 Library stored in /lib directory in
the local directory to create the data visualization using SVG elements. Additionally, 
this file modifies DOM elements based on the user's interactive actions with the website.

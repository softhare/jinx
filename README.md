JINX is a web application that allows you to examine web pages structure and content without loading the page in a browser.
Modern browsers have powerful tools to examine the DOM structure and the pages contents, but you most first load the desired page.
So they are not suited to open unknown sources neither known malware sources!
 
I wrote JINX with the purpos to examine any sort of web malware I can find.
It loads the page or file you specify and does not render it in the browser: it only shows the code as ascii text.
 
It can show the source html/js/vb code, the enbedded scripting, the CSS, the links, the images and many other source content from any web page or application.
Of course you cannot see sources of code executed "server-side" such as php or asp: you can only examine what the server outputs to the client.

JINX allows you to open any page in a sure way, as it will not execute any code, applet or other active content in the page: it just shows the content as plain text with many different layouts:

- general info and headers: filesize, filetype, etc
- hexadecimal dump: source listing as hex values
- decimal dump: source listing as decimal values
- full html source: complete html source of the page
- html only: only html portions of the source
- scripts only: only scripting portions of the source
- stylesheets only: only stylesheet portions of the source
- referred images: list all images referred in the source
- list links: list all links found in the source
- printable text: show only the printable texts contained in the source

...although Jinx is not a new project, it can be improved and boosted by going Git...

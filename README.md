# cs373-idb
---
#### How to view pages
[Must have npm install of node.js on linux. Commands are for the lab machines Ubuntu 14.04 LTS]

1. Open terminal and go into the file that contains the cloned repository and ```cd apps```   

2. Run the command ```npm start``` to start a connection at address 0.0.0.0 and port 8000. This is set in the file ```apps/package.json``` and can be changed if necessary.   

3. In order to view the page, open a browser and go to [address]:[port]/A.html#/ . In the default case that would be ```http://0.0.0.0:8000/A.html#/```   

4. Now you can make edits to the pages in apps/views to change the pages that appear when _about_, _crimes_, or _players_ is clicked.

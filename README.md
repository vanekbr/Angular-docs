# AngularDocs  
  
Simple collaborative document editor.
Based on angular-cli
  
## Basic info
Apllication uses auto-login feature to allow instantly start working.
Used Firebase anonymous login
Your username is system-wide, if you change it - it will be changed in all you chat messages across all documents.
  
 
 
## Tslint additional rules
Angular cli tslint rules are pretty good, but they were extended by:

 - no-duplicate-imports (duplication is not good)
 - newline-before-return (easier to find and more structural code)
 - ordered-imports (easier to look for information)
 - no-console (at all, cause you should log to server logs or throw an exception)
 - max-line-length (140 except import/export lines, because they are auto-generated)

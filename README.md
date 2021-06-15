# impulseven

### Deployment Information

To deploy this website, use these files/dirs
 - index.html
 - favicon.ico
 - dist (folder)
 
 ### To clone this repo
 
 After cloning & running 'npm install' or equivalent, you need to modify node_modules/bootstrap
 - remove node_modules/bootstrap/scss directory and all its contents
 - then, from the repo, add back the scss directory from customBootstrap
 Some of the files in the imported bootstrap from package.json were customized, so this is a necessary
 step when cloning this repo locally to make modifications

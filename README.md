# impulseven

### Deployment Information

To deploy this website, use these files/dirs
 - index.html
 - favicon.ico
 - dist (folder)
 
 ### To clone this repo
 
 After cloning & running 'npm install' or equivalent, you need to modify node_modules/bootstrap
 - remove node_modules/bootstrap/scss directory and all its contents
 - then, from the repo, add back the scss directory from customBootstrap.
 - 
 Some of the files in the imported bootstrap from package.json were customized, so this is a necessary
 step when cloning this repo locally to make modifications

 - cd node_modules/bootstrap
 - rm -rf ./scss

 You can use a file manager to cp recursively, or use 'cp -r', or this tar command to restore the scsss dir in node_modules/bootstrap
 - tar -cf - -C ../customBootstrap scss | tar -xvpf -

### Gulp is used to manage the site assets
 - Any css changes should be made in the sass/styles.scss file.
 - To generate dis/styles.css, which is what the site imports when running, invoke gulp
 
  - Just type 'gulp' from the command line in the root directory and it will compile the site and start a local web server

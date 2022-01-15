# tictactrip-Exo Back

A nice project done for the purpose of technical test for tictactrip 

- La longueur des lignes du texte justifié doit être de 80 caractères.
- L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain
- L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne un token d’une requête POST avec un json body {"email": "foo@bar.com"}.
- Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.
- Le code doit être déployé sur un url ou une ip public
- Le code doit être rendu sur github
- Langage : Nodejs
- PAS d’usage de bibliothèque externe pour la justification


---
## Requirements
- nodejs
- mongodb compass
- postman


For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.1

    $ npm --version
    6.14.13

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/amine-1-1/tictactrip
    $ cd tictactrip
    $ yarn install

## Running the project

    $ yarn start
    $ npm run dev

## Simple build for production

    $ yarn build
    
## View documentation
  To view the documentation of this api 
    Just go on [documentation](https://tictactrip-justify-text-amine.herokuapp.com/api-docs/).

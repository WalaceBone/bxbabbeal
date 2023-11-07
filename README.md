# Boond Manager X Basile

## Description

À partir d’un **export manuel** de la **liste des collaborateurs** “Abbeal” depuis “Boond Manager”, on cherche à *formater* puis *déposer automatiquement* un fichier sur le *serveur SFTP* de “Basile”, afin de pour pouvoir **communiquer** pro-activement auprès des collaborateurs et les **engager** dans un programme de cooptation.

## Instructions

1. Prendre connaissance de la documentation et des tâches en cours (voir la section **liens utiles** ci-dessous).
2. Cloner le repository sur votre poste.
3. Installer les dépendences : `$ npm install`
4. Créer un fichier `.env` contenant les variables d'environnement suivantes :

    ```env
    # Web Server
    WEB_SERVER_HOST=localhost
    WEB_SERVER_PORT=8080

    # Basile SFTP Server
    SFTP_HOST=<CHECK_DOCUMENTATION>
    SFTP_PORT=<CHECK_DOCUMENTATION>
    SFTP_USERNAME=<CHECK_DOCUMENTATION>
    SFTP_PWD=<CHECK_DOCUMENTATION>
    ```

5. Lancer l'application NodeJS : `$ npm start`
6. Consulter le Front-End statique en cliquant [ici](http://localhost:8080).

## Liens utiles

La **documentation fonctionnelle et technique** se trouve sur [Notion](https://www.notion.so/abbeal/Boond-Manager-X-Basile-dc0ff6d38e094100b3ba6f219d94ff29).

Le **panneau Kanban** du projet se trouve sur [Shortcut](https://app.shortcut.com/abbealvalley/epic/3259?group_by=none&vc_group_by=day&ct_workflow=all&cf_workflow=500001946).

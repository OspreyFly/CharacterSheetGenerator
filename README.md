

# Unofficial D&D 5e Character Generator 
## Description
This project is a simple Flask application designed to demonstrate basic CRUD operations. It utilizes Flask's ORM capabilities to interact with a SQLite database, showcasing how to perform create, read, update, and delete operations on a hypothetical "Characters" entity. This web app allows users to create basic character profiles for Dungeons & Dragons 5e. On the 'New Character' page they can choose a character's race and class. Once they choose an option it shows more information about their selection. There is also some interface for setting stat scores, but it isn't fully implemented yet. Once they are happy with their character, they name them then hit accept to save the profile. After creating a character, users can find their creations on the 'Characters' page. It shows the name of the character as well as the other options they chose. Under the list of characters, they can enter a name of a character they'd like to have a character sheet for. If they typed the name correctly and hit accept they will automatically download a pdf with the options they choose added to the character sheet.

## Installation

### Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed the latest version of Python 3.x.
- You have installed Flask and SQLAlchemy. You can do this using pip.


## Install

```
1. If using venv -> source venv/bin/activate
2. Install project dependencies pip install -r requirements.txt
3. Use psql to make new database named 'dndchar' 
4. Run 'seed.py' to generate relevant SQL tables in the database.
5. Start the server 'flask run'
```

## Usage

```
Created By: Noah Goff
*D&D API used in project*
https://www.dnd5eapi.co/api/

*FUTURE VERSIONS*
Fully implementing the stat scores and prompting all necessary input will enable the app to fill out the pdf completely. I chose to ommit some complexity from the current version because this is only a proof of concept. Another step further would be to overhaul the user interface so that a limited window with multiple 'steps' or pages. The UI is made entirely from JS so there is some liberty to allow for a more graphic and detailed experience. Also, adding complexity to the database could allow for users to sort/filter their characters based on some characteristics they share e.g. sort by level or filter by race.

*Tech Stack*
- Front-end (HTML, CSS, JS)
- Back-end (Flask, Jinja2)
- Database (PostgreSQL, SQAlchemy)
```

## Testing

```
1. Complete Install steps above
2. Run the command 'npm test'
```



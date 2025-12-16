#!/bin/bash

rm db.sqlite3
rm -rf ./vmapi/migrations
python3 manage.py migrate
python3 manage.py makemigrations vmapi
python3 manage.py migrate vmapi
python3 manage.py loaddata users
python3 manage.py loaddata tokens


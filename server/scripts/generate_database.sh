#!/bin/bash

# Load environment variables
source /home/oumaima/Documents/QuizWebApp/server/models/.env

# Define MySQL commands
create_db_sql="CREATE DATABASE IF NOT EXISTS ${EDU_MYSQL_DB};"
create_user_sql="CREATE USER '${EDU_MYSQL_USER}'@'${EDU_MYSQL_HOST}' IDENTIFIED BY '${EDU_MYSQL_PWD}';"
grant_privileges_sql="GRANT ALL PRIVILEGES ON ${EDU_MYSQL_DB}.* TO '${EDU_MYSQL_USER}'@'${EDU_MYSQL_HOST}';"

create_user_sql="CREATE USER '${EDU_MYSQL_USER}'@'${EDU_MYSQL_HOST}' IDENTIFIED BY '${EDU_MYSQL_PWD}';"
grant_privileges_sql="GRANT ALL PRIVILEGES ON ${EDU_MYSQL_DB}.* TO '${EDU_MYSQL_USER}'@'${EDU_MYSQL_HOST}';"
flush_privileges_sql="FLUSH PRIVILEGES;"

# Combine commands
sql_script="${create_db_sql}\n${grant_privileges_sql}\n${flush_privileges_sql}"

# Write SQL script to file
echo "${sql_script}" > create_db_and_grant_privileges.sql

echo "SQL script generated: create_db_and_grant_privileges.sql"

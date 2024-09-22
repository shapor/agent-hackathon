CREATE DATABASE company_data;

CREATE TABLE company_profiles (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255),
    company_url VARCHAR(255),
    html_response TEXT
);

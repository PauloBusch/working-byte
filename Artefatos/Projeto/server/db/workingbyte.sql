-- script de criação do banco de dados
create database workingbyte;
use workingbyte;

-- tabela de usuários
create table users(
    id int not null identity(1,1) primary key,
    name varchar(45) not null,
    email varhcar(45) not null,
    endereco varchar(45) not null,
    idade int not null,
    login varchar(45) not null,
    password varchar(45) not null
);
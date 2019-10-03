-- script de criação do banco de dados
create database workingbyte;
use workingbyte;

-- tabela de usuários
create table users(
    id int not null auto_increment,
    first_name varchar(30) not null,
    last_name varchar(60) not null,
    email varchar(200) not null,
    address varchar(200) not null,
    phone varchar(20) not null,
    cpf varchar(14) not null,
    age int,
    is_personal bit not null default 0,
    sexo char(1) not null,
    login varchar(50) not null,
    password varchar(50) not null,
    removed bit not null default 0,
    
    constraint PK_users primary key(id),
    constraint CK_users check(sexo in('M', 'F')),
    constraint UQ_users unique(first_name, last_name)
); 
create table account (
  id int unsigned primary key auto_increment not null,
  username varchar(255) not null unique,
  email varchar(255) not null unique,
  password varchar(255) not null 
);

insert into account(id, username, email, password)
values
  (1, "admin", "guevaer8@gmail.com" "admin");



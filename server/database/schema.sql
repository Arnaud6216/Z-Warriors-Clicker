CREATE TABLE account (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  hashed_password VARCHAR(100) NOT NULL
);

CREATE TABLE ennemy (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(50) NOT NULL UNIQUE,
  img_src VARCHAR(255) NOT NULL UNIQUE,
  life SMALLINT UNSIGNED NOT NULL
);

CREATE TABLE progress (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  account_id INT UNSIGNED NOT NULL,
  ennemy_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
  FOREIGN KEY (ennemy_id) REFERENCES ennemy(id) ON DELETE CASCADE
);

INSERT INTO ennemy (name, img_src, life)
VALUES
    ("Nappa", "src/assets/nappa.webp", 50),
    ("Vegeta", "src/assets/vegeta.webp", 500),
    ("Guldo", "src/assets/guldo.webp", 150),
    ("Burter", "src/assets/burter.webp", 160),
    ("Jeice", "src/assets/jeice.webp", 170),
    ("Recome", "src/assets/recome.webp", 180),
    ("Ginyu", "src/assets/ginyu.webp", 200),
    ("Freezer", "src/assets/freezer.webp", 1000),
    ("C 17", "src/assets/c17.webp", 500),
    ("C 18", "src/assets/c18.webp", 600),
    ("Cell", "src/assets/cell.webp", 3000),
    ("Buu", "src/assets/buu.webp", 5000);

CREATE TRIGGER add_default_progress
AFTER INSERT ON account
FOR EACH ROW
BEGIN
    INSERT INTO progress (account_id, ennemy_id)
    VALUES (NEW.id, 1); 
END;
CREATE TABLE images (
  id SERIAL NOT NULL PRIMARY KEY,
  filename TEXT UNIQUE, 
  filepath TEXT, 
  mimetype TEXT, 
  size BIGINT,
  description TEXT,
  price INTEGER
);



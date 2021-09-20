\echo 'Delete and recreate shopify db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE shopify;
CREATE DATABASE shopify;
\connect shopify

\i schema.sql

\echo 'Delete and recreate shopify_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE shopify_test;
CREATE DATABASE shopify_test;
\connect shopify_test

\i schema.sql

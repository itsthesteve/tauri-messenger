-- +goose Up
CREATE TABLE metadata (
  id INTEGER PRIMARY KEY,
  last_update DATETIME DEFAULT CURRENT_TIMESTAMP,
  version_number TEXT
);

-- +goose Down
DROP TABLE IF EXISTS metadata;

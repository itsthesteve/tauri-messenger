package database

import (
	"context"
	"fmt"
	"log/slog"

	"database/sql"

	"its.dev/aim/migrations"
	_ "modernc.org/sqlite"
)

const (
	TAG              = "DB"
	MIGRATIONS_DIR   = "migrations"
	PRAGMAS          = "?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)&_pragma=foreign_keys(ON)&_pragma=synchronous=NORMAL"
	READER_MAX_CONNS = 10
	WRITER_MAX_CONNS = 1
)

type DBPool struct {
	log    *slog.Logger
	Reader *sql.DB
	Writer *sql.DB
}

func CreatePool(ctx context.Context, filename string, log *slog.Logger) (*DBPool, error) {
	if err := ctx.Err(); err != nil {
		return nil, err
	}

	writeDb, err := createDb(filename, WRITER_MAX_CONNS)
	if err != nil {
		return nil, fmt.Errorf("unable to create writer: %w", err)
	}

	readDb, err := createDb(filename, 10)
	if err != nil {
		return nil, fmt.Errorf("unable to create reader: %w", err)
	}

	log.Info(TAG, "created", "successfully created read/write db")

	return &DBPool{
		log:    log,
		Reader: readDb,
		Writer: writeDb,
	}, nil
}

// Create a new sqlite db wi the the provided number of max open connections
// This is used to create reader/writers with different configurations.
func createDb(name string, maxOpenConns int) (*sql.DB, error) {
	db, err := sql.Open("sqlite", name+PRAGMAS)
	if err != nil {
		return nil, fmt.Errorf("unable to create db (max: %d) with filename: %s", maxOpenConns, name)
	}

	db.SetMaxOpenConns(maxOpenConns)

	// migrate here
	if err = migrations.Up(db); err != nil {
		return nil, fmt.Errorf("unable to migrate up: %w", err)
	}

	if err = db.Ping(); err != nil {
		return nil, fmt.Errorf("unable to ping db: %w", err)
	}

	return db, nil
}

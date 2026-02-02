package migrations

import (
	"database/sql"
	"embed"
	"log"

	"github.com/pressly/goose/v3"
)

//go:embed *.sql
var embedMigrations embed.FS

func setup() error {
	goose.SetBaseFS(embedMigrations)
	if err := goose.SetDialect("sqlite"); err != nil {
		log.Println("error setting goose dialect")
		return err
	}

	return nil
}

func Up(db *sql.DB) error {
	if err := setup(); err != nil {
		return err
	}

	if err := goose.Up(db, "."); err != nil {
		return err
	}

	return nil
}

func Down(db *sql.DB) error {
	if err := setup(); err != nil {
		return err
	}

	if err := goose.Down(db, "."); err != nil {
		return err
	}

	return nil
}

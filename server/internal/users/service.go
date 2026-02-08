package users

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"runtime"
	"time"

	"github.com/alexedwards/argon2id"
	database "its.dev/aim/internal/database"
)

const TAG string = "UserService"

type UserService struct {
	pool *database.DBPool
	log  *slog.Logger
}

func New(pool *database.DBPool, slog *slog.Logger) *UserService {
	return &UserService{
		pool: pool,
		log:  slog,
	}
}

func (u *UserService) CreateNewName(ctx context.Context, name, password string) (*string, error) {
	u.log.Info(TAG, "createNewName:attempt", name)
	if existsErr := u.checkScreenNameExists(ctx, name); existsErr != nil {
		u.log.Error(TAG, "createNewName:failed", name)
		return nil, existsErr
	}

	u.log.Info(TAG, "createNewName:inserting", name)

	// Screen name doesn't exist, continue saving it
	query := `INSERT INTO
    screen_names
      (owner_id, screen_name, password, created_at)
    VALUES
      (?, ?, ?, ?);`

	hash, err := hashPassword(password)
	if err != nil {
		u.log.Error(TAG, "createNewName:failed", err.Error())
		return nil, err
	}

	// TODO: The owner_id should not be hard coded
	// It's fine for testing until the rest of the user flow is created (#25)
	_, err = u.pool.Writer.Exec(query, 1, name, hash, time.Now())
	if err != nil {
		u.log.Error(TAG, "saveName:failed", err.Error())
		return nil, fmt.Errorf("unable to create new screen name: %w", err)
	}

	return &name, nil
}

func (u *UserService) checkScreenNameExists(ctx context.Context, name string) error {
	if name == "" {
		u.log.Error(TAG, "checkNameExists", "fail:null")
		return fmt.Errorf("cannot check screen name against null value")
	}

	query := "SELECT 1 from screen_names WHERE screen_name = ?;"

	var exists int
	row := u.pool.Reader.QueryRowContext(ctx, query, name)
	err := row.Scan(&exists)

	if err == sql.ErrNoRows {
		return nil
	} else {
		return fmt.Errorf("screen name '%s' exists", name)
	}
}

func hashPassword(password string) (*string, error) {
	// Base recommended defaults the repo
	params := &argon2id.Params{
		Memory:      128 * 1024,
		Iterations:  4,
		Parallelism: uint8(runtime.NumCPU()),
		SaltLength:  16,
		KeyLength:   32,
	}

	hash, err := argon2id.CreateHash(password, params)
	if err != nil {
		return nil, fmt.Errorf("unable to hash password: %w", err)
	}

	return &hash, nil
}

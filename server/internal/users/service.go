package users

import (
	database "its.dev/aim/internal/database"
)

type UserService struct {
	pool *database.DBPool
}

func New(pool *database.DBPool) *UserService {
	return &UserService{
		pool: pool,
	}
}

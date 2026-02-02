package database

import (
	"github.com/redis/go-redis/v9"
)

func CreateRedis(pwd string) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: pwd, // todo
		DB:       0,   // todo
	})

	return client, nil
}

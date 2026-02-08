package http

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/redis/go-redis/v9"
	"its.dev/aim/internal/database"
	"its.dev/aim/internal/users"
)

const (
	TAG            = "AppServer"
	ADDR           = ":8080"
	DB_NAME        = "aim.db"
	WS_BUFFER_SIZE = 1024
)

type AppServer struct {
	log        *slog.Logger
	router     *http.ServeMux
	server     *http.Server
	users      *users.UserService
	redis      *redis.Client
	stop       context.CancelFunc
	wsUpgrader websocket.Upgrader
}

func Create(ctx context.Context, stopFn context.CancelFunc, log *slog.Logger) (*AppServer, error) {
	pool, err := database.CreatePool(ctx, DB_NAME, log)
	if err != nil {
		return nil, fmt.Errorf("unable to open the database: %w", err)
	}

	redis, err := database.CreateRedis("")
	if err != nil {
		return nil, fmt.Errorf("unable to create redis client: %w", err)
	}

	mux := http.NewServeMux()
	server := &http.Server{
		Addr:    ADDR,
		Handler: mux,
	}

	appServer := &AppServer{
		log:    log,
		server: server,
		users:  users.New(pool, log),
		redis:  redis,
		stop:   stopFn,
		wsUpgrader: websocket.Upgrader{
			ReadBufferSize:  WS_BUFFER_SIZE,
			WriteBufferSize: WS_BUFFER_SIZE,
			CheckOrigin: func(r *http.Request) bool {
				return true // TODO: Restrict this
			},
		},
	}

	appServer.connectRoutes(mux)

	return appServer, nil
}

func (s *AppServer) Serve() error {
	s.log.Info(TAG, "listening", s.server.Addr)
	return s.server.ListenAndServe()
}

func (s *AppServer) Shutdown(ctx context.Context) error {
	s.log.Info(TAG, "shutdownReceived", true)
	return s.server.Shutdown(ctx)
}

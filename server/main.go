package main

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	server "its.dev/aim/internal/http"
)

func run() error {
	ctx, stop := context.WithCancel(context.Background())
	defer stop()

	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	appServer, err := server.Create(ctx, stop, logger)
	if err != nil {
		log.Println("error creating server:", err)
		return err
	}

	quitCh := make(chan os.Signal, 1)

	go func() {
		if err := appServer.Serve(); err != http.ErrServerClosed {
			fmt.Println("error starting server", err)
		}
	}()

	signal.Notify(quitCh, os.Interrupt, syscall.SIGTERM)
	<-quitCh // Block waiting for an interrupt

	timeoutCtx, timeout := context.WithTimeout(ctx, 5*time.Second)
	defer timeout()

	if err := appServer.Shutdown(timeoutCtx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server shutdown OK")

	return nil
}

func main() {
	if err := run(); err != nil {
		log.Println("error in run()", err)
		os.Exit(1)
	}
}

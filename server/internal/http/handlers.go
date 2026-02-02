package http

import (
	"log/slog"
	"net/http"
)

func handleHealth(log *slog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		encodeResponse(w, http.StatusOK, "")
		log.Info(TAG, "endpoint:/_health", http.StatusOK)
	})
}

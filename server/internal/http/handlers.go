package http

import (
	"fmt"
	"log/slog"
	"net/http"
)

func handleHealth(log *slog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		encodeResponse(w, http.StatusOK, "")
		log.Info(TAG, "endpoint:/_health", http.StatusOK)
	})
}

func handleCreateName(log *slog.Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		type createBody struct {
			ScreenName string `json:"screenName"`
			Password   string `json:"password"`
		}

		body, err := decode[createBody](r)
		if err != nil {
			http.Error(w, "Unable to decode body", http.StatusBadRequest)
			return
		}

		log.Info(TAG, "names:create", body)
		encodeResponse(w, http.StatusOK, fmt.Sprintf("OK: %s\n", body.ScreenName))
	})
}

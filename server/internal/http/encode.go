package http

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// https://grafana.com/blog/how-i-write-http-services-in-go-after-13-years/
func encode[T any](w http.ResponseWriter, status int, v T) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(v); err != nil {
		return fmt.Errorf("encode json: %w", err)
	}
	return nil
}

func decode[T any](r *http.Request) (T, error) {
	var v T
	if err := json.NewDecoder(r.Body).Decode(&v); err != nil {
		return v, fmt.Errorf("decode json: %w", err)
	}
	return v, nil
}

func encodeResponse(w http.ResponseWriter, statusCode int, body string) {
	encode(w, statusCode, apiResponse{
		StatusCode: statusCode,
		Body:       body,
	})
}

package http

// Generic HTTP response
type apiResponse struct {
	Body       string `json:"body,omitempty"`
	StatusCode int    `json:"statusCode"`
}

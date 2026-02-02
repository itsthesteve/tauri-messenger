package http

import (
	"net/http"
)

func (s *AppServer) connectRoutes(r *http.ServeMux) {
	r.Handle("/_health", handleHealth(s.log))
}

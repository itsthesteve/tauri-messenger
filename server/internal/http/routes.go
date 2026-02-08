package http

import (
	"net/http"
)

func (s *AppServer) connectRoutes(r *http.ServeMux) {
	r.Handle("/_health", handleHealth(s.log))
	r.Handle("POST /api/v1/screenName", handleCreateName(s.log, s.users))
}

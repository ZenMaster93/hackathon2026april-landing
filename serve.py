"""Tiny static file server that respects the PORT env var (so `autoPort: true` works).
Serves the current directory. Falls back to 8000 if PORT is unset."""
import http.server
import os
import socketserver

PORT = int(os.environ.get("PORT", 8000))

with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving static files at http://localhost:{PORT}")
    httpd.serve_forever()

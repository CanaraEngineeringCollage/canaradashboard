server {
    listen 80;
    server_name testapi.megamind.studio;

    location / {
        return 301 https://$host$request_uri;  # Redirect HTTP to HTTPS
    }
}

server {
  listen 443 ssl http2;
  server_name testapi.megamind.studio;

  ssl_certificate /etc/letsencrypt/live/testapi.megamind.studio/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/testapi.megamind.studio/privkey.pem;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers off;
  ssl_ciphers "ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384";

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header Set-Cookie $http_set_cookie; # Forward Set-Cookie
    proxy_cookie_path / /; # Ensure cookies are passed
  }
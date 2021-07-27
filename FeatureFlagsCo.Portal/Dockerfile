# nginx state for serving content
FROM nginx:stable

# Copy static assets from builder stage
COPY dist/feature-flagsco-fontend /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
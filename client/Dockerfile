# Use Node.js image for building the React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use Nginx to serve static files
FROM nginx:1.23
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
# Replace with the paths to your SSL certificate and key files
COPY ./certs/riabanerjee_dev.crt /etc/nginx/certs/riabanerjee_dev.crt
COPY ./certs/riabanerjee.key /etc/nginx/certs/riabanerjee.key
COPY ./certs/riabanerjee_dev.ca-bundle /etc/nginx/certs/riabanerjee_dev.ca-bundle


# Expose Nginx port
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

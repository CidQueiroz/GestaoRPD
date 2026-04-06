# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Copy the .npmrc template
COPY .npmrc.template .npmrc

# Accept NODE_AUTH_TOKEN as a build argument
ARG NODE_AUTH_TOKEN

# Inject the actual token into .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}" >> .npmrc

# Install dependencies.
RUN npm install

# Debug: Check if package was installed
RUN ls -l node_modules/@cidqueiroz || echo "Package not found after install"
RUN ls -la node_modules/@cidqueiroz/cdkteck-ui || echo "cdkteck-ui package not found"

# Copy the rest of the application's code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
# Use an official node runtime as a parent image
FROM node:20.12-alpine

# Set the working directory
WORKDIR /client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the necessary packages
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app for production
RUN npm start

# Install serve to serve the app
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]

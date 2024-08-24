# Use an official Node.js image as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY client/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY client/ .

# Build the React app
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Start the app using serve
CMD ["npm" "start"]

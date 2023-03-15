# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set the environment variable for the port
ENV PORT=${API_PORT}

ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_NAME=${DB_NAME}
ENV MONGO_URI=${MONGO_URI}

# Expose a port to allow incoming connections
EXPOSE ${PORT}

# Set the command to start the application
CMD [ "npm", "start" ]

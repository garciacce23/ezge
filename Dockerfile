# Set Node.js version 14 as base image
FROM node:14

# Set working directory
WORKDIR /app

# Copy app code into container
COPY . /app

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Make exposed port environmental variable
ENV PORT=3000

# Start app
CMD ["npm", "start"]



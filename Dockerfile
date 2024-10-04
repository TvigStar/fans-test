# Use the official Node.js 20.18.0 image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (3000 by default in NestJS)
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "run", "start:prod"]

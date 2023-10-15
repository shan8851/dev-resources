# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Set the environment variable for Node.js (this can be overridden when starting a container)
ENV NODE_ENV=production

# Make port 5001 available to the outside world
EXPOSE 5001

# Define the command to run the application
CMD [ "node", "index.js" ]

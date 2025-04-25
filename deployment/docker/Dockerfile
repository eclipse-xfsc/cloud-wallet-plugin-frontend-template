# Stage 1: Build
FROM node:14-alpine as builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build your application (adjust this command based on your build process)
RUN npm run build

# Stage 2: Run
FROM node:14-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/dist /usr/src/app/transpiled

# Expose the port that your application will run on
EXPOSE 3000

# Command to run when the container starts
CMD node -e "const http=require('http'),fs=require('fs'),server=http.createServer((req,res)=>{console.log('Received request:',req.method,req.url);res.writeHead(200,{'Content-Type':'text/javascript'});const content=fs.readFileSync('./transpiled/main.js','utf-8');res.end(content);});server.listen(3000,()=>{console.log('Server is listening on port 3000');});process.on('SIGINT',()=>{console.log('Received SIGINT (Ctrl+C). Shutting down gracefully.');server.close(()=>{console.log('Server closed. Exiting.');process.exit(0);});});"
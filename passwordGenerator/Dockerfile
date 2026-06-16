FROM golang:1.22-alpine

WORKDIR /app

# Copy Go modules manifests
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source code
COPY . .

# Build the Go app
RUN go build -o password-generator .

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["./password-generator"]

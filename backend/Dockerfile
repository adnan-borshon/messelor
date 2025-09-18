# Use OpenJDK 17
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Install bash, curl, and netcat (netcat-openbsd for Alpine)
RUN apk add --no-cache bash curl netcat-openbsd

# Copy wait-for-it.sh script
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Copy Maven wrapper and config
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source code
COPY src src

# Build the project (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Expose application port
EXPOSE 8080

# Set environment variables for DB host and port (you can override in docker-compose)
ENV DB_HOST=database
ENV DB_PORT=5432

# Wait for DB to be ready, then start backend
CMD ["/app/wait-for-it.sh", "$DB_HOST:$DB_PORT", "--", "java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]

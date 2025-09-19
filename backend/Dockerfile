# Use OpenJDK 17
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

RUN apk add --no-cache bash curl netcat-openbsd

# Copy wait-for-it
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Copy Maven wrapper & config
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Copy source
COPY src src

# Build (skip tests)
RUN ./mvnw clean package -DskipTests

# Show built files (debugging)
RUN ls -lh target/

EXPOSE 8080

# IMPORTANT: Match DB host + MySQL port
ENV DB_HOST=mysql
ENV DB_PORT=3306

# Run app with correct JAR dynamically
CMD /app/wait-for-it.sh $DB_HOST:$DB_PORT -- \
    java -jar target/*.jar

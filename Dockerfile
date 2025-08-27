# Base image
FROM eclipse-temurin:21-jdk-alpine

# Çalışma dizini
WORKDIR /app

# Maven paketini kopyala
COPY target/privateRezerve-1.0-SNAPSHOT.jar app.jar

# Port ayarı
EXPOSE 8080

# Uygulamayı çalıştır
ENTRYPOINT ["java","-jar","app.jar"]
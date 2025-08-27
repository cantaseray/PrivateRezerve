# Temel image olarak resmi Maven + JDK image'ını kullanıyoruz
FROM maven:3.9.4-eclipse-temurin-21 AS build

# Çalışma dizinini belirle
WORKDIR /app

# Pom ve kaynak dosyalarını kopyala
COPY pom.xml .
COPY src ./src

# Maven ile package oluştur
RUN mvn clean package -DskipTests

# Yeni bir JDK image'ında sadece çalıştırma için package'ı al
FROM eclipse-temurin:21-jdk-jammy

WORKDIR /app

# Build aşamasından jar dosyasını al
COPY --from=build /app/target/*.jar app.jar

# Jar dosyasını çalıştır
ENTRYPOINT ["java", "-jar", "app.jar"]

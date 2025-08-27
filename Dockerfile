# Temel image
FROM openjdk:21-jdk-slim

# Çalışma dizini
WORKDIR /app

# Maven wrapper ve pom dosyasını kopyala
COPY mvnw .
COPY pom.xml .

# Maven wrapper izinlerini ver
RUN chmod +x mvnw

# Bağımlılıkları indir
RUN ./mvnw dependency:go-offline

# Kaynak kodu kopyala
COPY src ./src

# Uygulamayı paketle
RUN ./mvnw clean package -DskipTests

# Çalıştır
CMD ["java", "-jar", "target/privateRezerve-1.0-SNAPSHOT.jar"]

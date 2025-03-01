# Usar una imagen base de OpenJDK
FROM eclipse-temurin:17-jdk-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo de construcción de Gradle o Maven si los usas (opcional)
# COPY build.gradle settings.gradle gradle /app/
# COPY pom.xml /app/

# Copiar el código fuente al contenedor
COPY . /app

# Construir la aplicación
RUN ./mvnw clean package -DskipTests

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 8080

# Ejecutar la aplicación Spring Boot
CMD ["java", "-jar", "target/todo-0.0.1-SNAPSHOT.jar"]

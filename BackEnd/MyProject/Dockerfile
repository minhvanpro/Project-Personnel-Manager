# Use a suitable OpenJDK base image
FROM eclipse-temurin:17-jre-alpine
COPY ./out/artifacts/personnel_manager_jar/ .
CMD ["java", "-jar", "personnel-manager.jar"]
EXPOSE 8080
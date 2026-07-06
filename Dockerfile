FROM eclipse-temurin:17-jdk

VOLUME /tmp

COPY target/task-management-*.jar app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
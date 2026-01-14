# 멀티 스테이지 빌드: 프론트엔드 빌드 스테이지
FROM node:20-alpine AS frontend-builder

WORKDIR /frontend

# 프론트엔드 의존성 파일 복사
COPY soju/frontend/package*.json ./

# 의존성 설치
RUN npm install

# 프론트엔드 소스 복사
COPY soju/frontend/ ./

# 프론트엔드 빌드
RUN npm run build

# 백엔드 빌드 스테이지
FROM gradle:8.5-jdk17 AS backend-builder

WORKDIR /app

# Gradle 캐싱을 위해 의존성 파일들 먼저 복사
COPY soju/build.gradle soju/settings.gradle soju/gradlew ./
COPY soju/gradle gradle

# 의존성 다운로드 (캐시 레이어)
RUN gradle dependencies --no-daemon || true

# 소스 코드 복사
COPY soju/src src

# 프론트엔드 빌드 결과물을 백엔드 static 폴더로 복사
COPY --from=frontend-builder /frontend/dist src/main/resources/static/

# 애플리케이션 빌드 (테스트 제외)
RUN gradle clean build -x test --no-daemon

# 실행 스테이지
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# 빌드 스테이지에서 WAR 파일 복사
COPY --from=backend-builder /app/build/libs/*.war app.war

# 환경 변수 설정 (기본값)
ENV SPRING_PROFILES_ACTIVE=prod \
    SERVER_PORT=8080 \
    DB_HOST=localhost \
    DB_PORT=1521 \
    DB_NAME=ORCL \
    DB_USERNAME=soju \
    DB_PASSWORD=changeme \
    JAVA_OPTS="-Xmx512m -Xms256m"

# 애플리케이션 포트 노출
EXPOSE 8080

# 헬스체크 설정
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# 애플리케이션 실행
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.war"]

# 전국 소주 관리 시스템

## 📋 프로젝트 개요
Spring Boot와 React를 사용한 소주 정보 관리 시스템입니다. 소주 데이터를 등록, 조회, 삭제할 수 있는 웹 애플리케이션입니다.

---

## 🛠 기술 스택

### 백엔드
- **Framework**: Spring Boot 4.0.1
- **Language**: Java 17
- **Build Tool**: Gradle 9.2.1
- **Database**: Oracle Database 21c
- **ORM**: Hibernate (JPA)
- **주요 라이브러리**:
  - Spring Data JPA
  - Spring Web MVC
  - Lombok
  - Oracle JDBC Driver (ojdbc11)

### 프론트엔드
- **Framework**: React 18
- **Build Tool**: Vite 7.2.5 (Rolldown)
- **HTTP Client**: Axios
- **Language**: JavaScript (JSX)

---

## 📁 프로젝트 구조

```
soju/
├── src/
│   ├── main/
│   │   ├── java/com/zerog/soju/
│   │   │   ├── SojuApplication.java          # 메인 애플리케이션
│   │   │   ├── config/
│   │   │   │   └── WebConfig.java            # CORS 설정
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java
│   │   │   │   └── SojuController.java       # REST API 컨트롤러
│   │   │   ├── dto/
│   │   │   │   └── sojudto.java              # 데이터 전송 객체
│   │   │   ├── entity/
│   │   │   │   └── sojuentiy.java            # JPA 엔티티
│   │   │   ├── repository/
│   │   │   │   └── SojuRepository.java       # JPA Repository
│   │   │   └── service/
│   │   │       └── SojuService.java          # 비즈니스 로직
│   │   └── resources/
│   │       ├── application.properties        # 애플리케이션 설정
│   │       └── static/
│   │           └── index.html                # 정적 HTML (참고용)
│   └── test/
│       └── java/com/zerog/soju/
│           └── SojuApplicationTests.java
├── frontend/                                  # React 프로젝트
│   ├── src/
│   │   ├── App.jsx                           # 메인 컴포넌트
│   │   ├── App.css                           # 스타일
│   │   ├── main.jsx                          # 엔트리 포인트
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── build.gradle
└── settings.gradle
```

---

## ⚙️ 설정 파일

### application.properties
```properties
spring.application.name=soju

# DB 접속 정보
spring.datasource.driver-class-name=oracle.jdbc.OracleDriver
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:xe
spring.datasource.username=BASAN
spring.datasource.password=oracle

# JPA 설정
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.OracleDialect
```

### CORS 설정 (WebConfig.java)
- **허용 Origin**: `http://localhost:5173`, `http://localhost:5174`
- **허용 메서드**: GET, POST, PUT, DELETE, OPTIONS
- **Credentials**: true

---

## 🗄️ 데이터베이스 스키마

### SOJU 테이블
| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| ID | NUMBER(19,0) | PRIMARY KEY, IDENTITY | 자동 증가 ID |
| NAME | VARCHAR2(255) | NOT NULL, UNIQUE | 소주 이름 |
| BRAND | VARCHAR2(255) | - | 브랜드명 |
| ALCOHOL | BINARY_DOUBLE | NOT NULL | 알코올 도수(%) |

---

## 🚀 설치 및 실행 방법

### 1️⃣ 사전 요구사항
- Java 17 이상
- Node.js 16 이상
- Oracle Database 21c
- Gradle (프로젝트에 포함됨)

### 2️⃣ 데이터베이스 설정
1. Oracle Database 실행
2. 사용자 생성 및 권한 부여:
```sql
CREATE USER BASAN IDENTIFIED BY oracle;
GRANT CONNECT, RESOURCE TO BASAN;
GRANT CREATE SESSION TO BASAN;
```

### 3️⃣ 백엔드 실행
```bash
# 프로젝트 루트 디렉토리에서
cd c:\java\Implementation\soju
./gradlew bootRun
```
- 실행 포트: `http://localhost:8080`

### 4️⃣ 프론트엔드 실행
```bash
# frontend 디렉토리에서
cd c:\java\Implementation\soju\frontend
npm install  # 최초 1회만
npm run dev
```
- 실행 포트: `http://localhost:5173` 또는 `http://localhost:5174`

---

## 📡 API 명세

### Base URL
```
http://localhost:8080/api/soju
```

### 1. 소주 목록 조회
- **Endpoint**: `GET /list`
- **Response**:
```json
[
  {
    "id": 1,
    "name": "한라산",
    "brand": "썬",
    "alcohol": 19.1
  }
]
```

### 2. 소주 등록
- **Endpoint**: `POST /add`
- **Request Body**:
```json
{
  "name": "참이슬",
  "brand": "하이트진로",
  "alcohol": 16.5
}
```
- **Response**: `"등록 성공: 참이슬"`

### 3. 소주 삭제
- **Endpoint**: `DELETE /delete/{name}`
- **Path Variable**: `name` - 삭제할 소주 이름
- **Response**: `"삭제 성공: 참이슬"`

---

## 🎨 주요 기능

### 프론트엔드
1. **소주 등록 폼**
   - 소주 이름, 브랜드, 알코올 도수 입력
   - 유효성 검사 (모든 필드 필수)
   - 등록 후 목록 자동 갱신

2. **소주 목록 테이블**
   - 등록된 모든 소주 표시
   - 이름, 브랜드, 도수, 삭제 버튼
   - 빈 목록 안내 메시지

3. **삭제 기능**
   - 확인 다이얼로그
   - 삭제 후 목록 자동 갱신

### 백엔드
1. **데이터 영속성**
   - JPA를 통한 자동 테이블 생성/관리
   - 트랜잭션 관리

2. **비즈니스 로직**
   - 중복 이름 체크 (UNIQUE 제약조건)
   - 서비스 레이어 분리

3. **로깅**
   - Log4j2를 통한 요청/응답 로깅
   - SQL 쿼리 로깅

---

## 🔧 개발 환경

### IDE
- VS Code (또는 IntelliJ IDEA)

### 유용한 명령어
```bash
# 빌드만 실행
./gradlew build

# 테스트 실행
./gradlew test

# 클린 빌드
./gradlew clean build

# React 프로덕션 빌드
cd frontend
npm run build
```

---

## ⚠️ 주의사항

1. **포트 충돌**
   - 백엔드: 8080 포트가 사용 중이면 실행 불가
   - 프론트엔드: 5173 포트가 사용 중이면 자동으로 다음 포트 사용

2. **데이터베이스 연결**
   - Oracle DB가 실행 중이어야 함
   - `application.properties`의 DB 정보 확인 필요

3. **CORS 설정**
   - 프론트엔드 포트가 변경되면 `WebConfig.java`에서 허용 포트 추가 필요

4. **DDL 설정**
   - `ddl-auto=update`: 개발용, 데이터 유지
   - `ddl-auto=create-drop`: 테스트용, 재시작 시 데이터 삭제

---

## 🐛 트러블슈팅 및 개발 중 발생한 오류 해결

### 1. Entity 클래스 컴파일 오류
**문제**:
```
error: cannot find symbol @Table(name = "soju")
error: cannot find symbol @GeneratedValue(strategy = GenerationType.IDENTITY)
error: cannot find symbol @Column(nullable = false, unique = true)
```

**원인**:
- 잘못된 import 사용 (Spring Data JDBC 어노테이션을 JPA와 혼용)
- `@EntityScan` 어노테이션을 엔티티 클래스에 잘못 사용
- `GeneratedValue` 속성명 오타 (`Strategy` → `strategy`, `GeneratedType` → `GenerationType`)

**해결방법**:
```java
// 변경 전 (잘못된 import)
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

// 변경 후 (올바른 JPA import)
import jakarta.persistence.*;
```

**교훈**: JPA 프로젝트에서는 `jakarta.persistence.*` 패키지의 어노테이션을 사용해야 함

---

### 2. Service 클래스 구조 오류
**문제**:
```java
private final SojuApplication sojuApplication;  // 잘못된 의존성
private final SojuRepository sojuRepository;     // 주입되지 않음

SojuService(SojuApplication sojuApplication) {   // 잘못된 생성자
    this.sojuApplication = sojuApplication;
}
```

**원인**:
- Repository 대신 Application 클래스를 주입받음
- Repository는 선언만 하고 주입받지 않음
- 여러 오타 존재 (`saver` → `save`, `spju` → `soju`, `findByname` → `findByName`)

**해결방법**:
```java
@Service
@RequiredArgsConstructor  // Lombok으로 생성자 자동 생성
public class SojuService {
    private final SojuRepository sojuRepository;  // 올바른 의존성
    
    // Lombok이 생성자를 자동 생성
}
```

**교훈**: 
- Service는 Repository를 주입받아야 함
- `@RequiredArgsConstructor`를 사용하면 final 필드의 생성자를 자동 생성

---

### 3. Controller 클래스 오류
**문제**:
```java
private final SojuController sojuController;  // 자기 자신 참조

SojuController(SojuService sojuService) {     // 수동 생성자
    this.sojuService = sojuService;
}

@DeleteMapping("/delete")  // PathVariable 없이 경로 선언
public String deleteSoju(@PathVariable String name) { ... }
```

**원인**:
- 자기 자신을 의존성으로 선언하는 순환 참조
- `@RequiredArgsConstructor`와 수동 생성자 중복
- `@PathVariable` 사용 시 경로에 변수 지정 누락

**해결방법**:
```java
@RestController
@RequestMapping("/api/soju")
@RequiredArgsConstructor
public class SojuController {
    private final SojuService sojuService;  // Service만 주입
    
    @DeleteMapping("/delete/{name}")  // 경로 변수 추가
    public String deleteSoju(@PathVariable String name) { ... }
}
```

**교훈**: 
- Controller는 Service만 주입받음
- `@PathVariable` 사용 시 경로에 `{변수명}` 필수

---

### 4. 포트 충돌 문제
**문제**:
```
Web server failed to start. Port 8080 was already in use.
```

**원인**: 이전에 실행한 Spring Boot 애플리케이션이 종료되지 않고 백그라운드에서 실행 중

**해결방법**:
```bash
# 1. 포트 사용 프로세스 확인
netstat -ano | findstr :8080

# 2. 프로세스 강제 종료
taskkill /F /PID [프로세스ID]

# 3. 애플리케이션 재실행
./gradlew bootRun
```

**교훈**: 개발 중에는 이전 프로세스를 완전히 종료하고 새로 실행

---

### 5. DDL 실행 오류 (테이블 스키마 변경 실패)
**문제**:
```
Error executing DDL "alter table soju modify alcohol binary_double" 
via JDBC [ORA-01439: 데이터 유형을 변경할 열은 비어 있어야 합니다]
```

**원인**:
- 테이블에 데이터가 있는 상태에서 컬럼 타입 변경 시도
- `ddl-auto=update`는 기존 데이터가 있으면 타입 변경 불가

**해결방법 (임시)**:
```properties
# 개발 초기 단계에서만 사용
spring.jpa.hibernate.ddl-auto=create-drop
```

**해결방법 (운영)**:
```sql
-- 수동으로 테이블 삭제 후 재생성
DROP TABLE soju CASCADE CONSTRAINTS;
```

**최종 설정**:
```properties
# 개발 환경: 스키마 자동 업데이트, 데이터 유지
spring.jpa.hibernate.ddl-auto=update
```

**교훈**: 
- `create-drop`: 서버 재시작 시 테이블 삭제/재생성 (데이터 손실)
- `update`: 스키마만 업데이트, 데이터 유지 (타입 변경은 수동)

---

### 6. 데이터가 표시되지 않는 문제
**문제**: SQL에 수동으로 입력한 데이터가 React 앱에서 보이지 않음

**원인**:
1. `ddl-auto=create-drop` 설정으로 서버 재시작 시 데이터 삭제됨
2. React 개발 서버가 실행되지 않음
3. 백엔드 API는 정상 작동하나 프론트엔드 연결 안 됨

**해결방법**:
```bash
# 1. 백엔드 API 테스트 (정상 작동 확인)
Invoke-RestMethod -Uri "http://localhost:8080/api/soju/list" -Method GET

# 2. React 개발 서버 실행
cd frontend
npm run dev

# 3. 브라우저에서 접속
# http://localhost:5173 (또는 5174)
```

**설정 변경**:
```properties
# 데이터 유지를 위해 update로 변경
spring.jpa.hibernate.ddl-auto=update
```

**교훈**: 
- 백엔드와 프론트엔드를 모두 실행해야 함
- API 테스트로 백엔드 정상 작동 먼저 확인
- DDL 설정에 따라 데이터 유지 여부가 결정됨

---

### 7. CORS 오류
**문제**: 브라우저 콘솔에 CORS 관련 에러 발생

**원인**: 프론트엔드(5173)에서 백엔드(8080) API 호출 시 Same-Origin Policy 위반

**해결방법**:
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "http://localhost:5174")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

**교훈**: 프론트엔드/백엔드 분리 시 CORS 설정 필수

---

### 8. Repository가 인식되지 않는 문제
**경고 로그**:
```
Spring Data JDBC - Could not safely identify store assignment 
for repository candidate interface com.zerog.soju.repository.SojuRepository
```

**원인**: Spring Data JDBC와 JPA를 동시에 의존성으로 가지고 있어서 혼동

**해결**: 
- Repository는 JPA로 인식되어 정상 작동
- 경고는 무시 가능하거나, Spring Data JDBC 의존성 제거 가능

---

### 일반적인 디버깅 팁

1. **백엔드 로그 확인**
```bash
# 콘솔에서 SQL 쿼리와 에러 로그 확인
spring.jpa.show-sql=true
```

2. **API 직접 테스트**
```bash
# PowerShell
Invoke-RestMethod -Uri "http://localhost:8080/api/soju/list" -Method GET
```

3. **브라우저 개발자 도구**
- F12 → Console 탭: JavaScript 에러 확인
- Network 탭: API 요청/응답 확인

4. **포트 확인**
```bash
netstat -ano | findstr :8080
netstat -ano | findstr :5173
```

---

## 📝 향후 개선 사항

- [ ] 페이징 처리
- [ ] 검색 기능
- [ ] 소주 수정 기능
- [ ] 이미지 업로드
- [ ] 사용자 인증/권한
- [ ] Spring Security 적용
- [ ] Docker 컨테이너화
- [ ] 프로덕션 배포 설정

---

## 👨‍💻 개발자 정보

- **프로젝트명**: soju
- **버전**: 0.0.1-SNAPSHOT
- **그룹**: com.zerog
- **개발 기간**: 2026년 1월

---

## 📄 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

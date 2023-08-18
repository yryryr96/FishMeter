# CICD 구축

## 백엔드 서버   

1. 메모리 스왑   
`sudo dd if=/dev/zero of=/swapfile bs=128M count=16`
`sudo chmod 600 /swapfile`
`sudo swapon /swapfile`
`sudo swapon -s`
`sudo chmod +x /swapfile`

- /etc/fstab 파일을 vim으로 열어 추가   
    `/swapfile swap swap defaults 0 0`

- 메모리 확인   
    `free -m`

2. 스프링 프로필 세팅   
- WebRestController 생성
```
@RestController
@RequiredArgsConstructor
public class WebRestController {
    private final Environment env;

    @GetMapping("/profile")
    public String getProfile(){
        return Arrays.stream(env.getActiveProfiles()).findFirst().orElse("");
    }
}
```

- application.properties에 추가
```
#---
spring.config.activate.on-profile=set1
server.port=8080

#---
spring.config.activate.on-profile=set2
server.port=8081
```

-> 프로필 설정 set1일때 8080포트 동작, set2일때 8082포트로 동작

3. nginx 설치 및 실행   
- nginx 설치   
    `sudo apt-get install nginx`   
- nginx 실행   
    `sudo service nginx start`   
- nginx가 잘 실행되었는지 확인   
    `sudo service nginx status`   

4. nginx 설정하기   
- nginx 설정 파일 열기   
    `sudo vim /etc/nginx/sites-enabled/default`

- server_name 밑에 추가   
    `include /etc/nginx/conf.d/service-url.inc;`   

- location 안에 추가   
    `proxy_pass $service_url;`   

- /etc/nginx/conf.d/ 디렉터리 안에 service-rul.inc 파일 생성하고   
    `set $service_url http://127.0.0.1:8080;`   
    추가   

- nginx 재시작   
    `sudo service nginx restart`   

- 프로필 확인   
    `curl -s localhost/profile`   

5. 재시동 및 전환 쉘 스크립트 작성   

**재시동 쉘 스크립트**   
- deploy.sh 파일을 만들고 원하는 경로에 저장   
```
#!/bin/bash
echo "> 현재 구동중인 profile 확인"
CURRENT_PROFILE=$(curl -s http://localhost/profile)
echo "> $CURRENT_PROFILE"

if [ "$CURRENT_PROFILE" == "set1" ]
then
  IDLE_PROFILE=set2
  IDLE_PORT=8081
elif [ "$CURRENT_PROFILE" == "set2" ]
then
  IDLE_PROFILE=set1
  IDLE_PORT=8080
else
  echo "> 일치하는 Profile이 없습니다. Profile: $CURRENT_PROFILE"
  echo "> set1을 할당합니다. IDLE_PROFILE: set1"
  IDLE_PROFILE=set1
  IDLE_PORT=8080
fi

echo "> $IDLE_PROFILE 배포"
sudo fuser -k -n tcp $IDLE_PORT
sudo {환경변수} nohup java -jar /home/ubuntu/{파일이름}.jar --spring.profiles.active=$IDLE1_PROFILE &
echo "> $IDLE_PROFILE 10초 후 Health check 시작"
echo "> curl -s http://localhost:$IDLE_PORT/health "
sleep 10

for retry_count in {1..10}
do
  response=$(curl -s http://localhost:$IDLE_PORT/actuator/health)
  echo $response
  echo $(curl -s http://localhost:$IDLE_PORT/actuator/info)
  up_count=$(echo $response | grep 'UP' | wc -l)
  echo $(curl -s http://localhost:$IDLE_PORT/actuator/health)
  
  if [ $up_count -ge 1 ]
  then
    echo "> Health check 성공"
    break
  else
    echo "> Health check의 응답을 알 수 없거나 혹은 status가 UP이 아닙니다."
    echo "> Health check: ${response}"
  fi

  if [ $retry_count -eq 10 ]
  then
    echo "> Health check 실패. "
    echo "> Nginx에 연결하지 않고 배포를 종료합니다."
    exit 1
  fi

  echo "> Health check 연결 실패. 재시도..."
  sleep 10
done

echo "> 스위칭을 시도합니다..."
sleep 10

/home/ubuntu/switch.sh
```   
- 사용된 환경변수   
`secretKey="o6KyrfGMvhgzx0Hizlp9GEwqi/QagHK51YQFFeSN" accessKey="AKIAYKLKVG4FFSMEQUWU" ClientSecret="4ZZ07UyEPUPcL1JNfCZ385BK9rHv1u8S" kakaoApi="bfb3a5fe04584883d5fd7c02dc1c1532" password="ssafy" username="root"`

- 사용된 파일 이름   
`fishdex*`   

**전환 스크립트**   
- switch.sh 파일 저장

```
#!/bin/bash
echo "> 현재 구동중인 Port 확인"
CURRENT_PROFILE=$(curl -s http://localhost/profile)

if [ $CURRENT_PROFILE == set1 ]
then
  IDLE_PORT=8081
elif [ $CURRENT_PROFILE == set2 ]
then
  IDLE_PORT=8080
else
  echo "> 일치하는 Profile이 없습니다. Profile:$CURRENT_PROFILE"
  echo "> 8080을 할당합니다."
  IDLE_PORT=8080
fi

PROXY_PORT=$(curl -s http://localhost/profile)
echo "> 현재 구동중인 Port: $PROXY_PORT"

echo "> 전환할 Port : $IDLE_PORT"
echo "> Port 전환"
echo "set \$service_url http://127.0.0.1:${IDLE_PORT};" | sudo tee /etc/nginx/conf.d/service-url.inc

echo "> Nginx Reload"
sudo service nginx reload
```

- 쉘스크립트 실행 권한 주기   
`chmod +x deploy.sh`   
`chmod +x deploy.sh`   

    deploy.sh 파일 실행   
`./deploy.sh`   

## 젠킨스 설치
1. 메모리 스왑하기   
    백엔드 서버와 동일

2. 젠킨스 설치
    
```
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

- 에러시 아래 코드 실행   

```
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \ /usr/share/keyrings/jenkins-keyring.asc > /dev/null  
```
```
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \ https://pkg.jenkins.io/debian-stable binary/ | sudo tee \ /etc/apt/sources.list.d/jenkins.list > /dev/null
```   

- 젠킨스 실행   
`sudo systemctl start jenkins`

- 비밀번호 확인   
`/var/lib/jenkins/secrets/initialAdminPassword` 경로에서 비밀번호 확인 후 접속

- 플러그인 선택 및 계정 설정

- 젠킨스 플러그인 설치

3. 젠킨스 설정   

**System 환경 설정**   

- 깃허브 또는 깃랩 설정 (웹훅)
- 백엔드 서버 연결

**파이프라인 설정**   

- git 정보 설정
- 빌드 유발 설정

- Build Steps   
    Gradle 버전 설정(7.2)   
    Task -> bootjar   

**MatterMost 연동**   
- 빌드 후 조치 (알림 설정)   

**Send build artifacts over SSH**   
- 빌드파일이 생성되는 경로 설정   
- 프로젝트 이름/build/libs/*.jar   


java : 11.0.19   
gradle : 7.2   
intellij : 2023.2
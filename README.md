# WOD 타이머

크로스핏용 운동 타이머. `index.html` 파일 하나로 동작하며 인터넷 연결이 필요 없습니다.

## 사용법
- `index.html`을 브라우저(Chrome, Edge, Safari 등)로 열면 바로 사용할 수 있습니다.
- 모드: 타바타 / EMOM / AMRAP / For Time / 사용자 지정
- 키보드: **스페이스** 시작·일시정지 · **R** 리셋 · **F** 전체 화면
- 큰 숫자를 눌러도 시작·일시정지됩니다.
- 마지막으로 쓴 설정과 저장한 설정은 브라우저에 기억됩니다(브라우저·기기마다 따로 저장됩니다).

### 동작 규칙
- 타바타와 사용자 지정에서는 마지막 라운드 뒤의 휴식을 생략합니다(타바타 기본값은 운동 3:50, 준비 포함 4:00).
- 사용자 지정에서는 사이클과 사이클 사이에 라운드 휴식 대신 "사이클 휴식"이 들어갑니다.
- EMOM의 총 시간이 간격으로 나누어떨어지지 않으면, 남는 시간은 빼고 진행합니다(설정 화면에 표시됨).
- For Time은 시간이 올라가며, 끝나면 위쪽의 **완료** 버튼을 누릅니다. 상한 시간에 도달하면 자동으로 끝납니다.
- 남은 라운드·사이클 수에는 지금 진행 중인 것도 포함됩니다.

### 참고
- 소리: 아이폰은 무음 스위치가 켜져 있으면 소리가 나지 않습니다.
- 화면 꺼짐 방지(Wake Lock)는 지원하는 브라우저에서만 작동하며, 보통 https 주소(아래 GitHub Pages)에서 가장 안정적입니다.
- 아이폰 Safari는 웹페이지의 전체 화면을 지원하지 않습니다. 대신 "홈 화면에 추가"로 열면 주소창 없이 볼 수 있습니다.

## GitHub Pages에 올려서 휴대폰으로 쓰기

### 방법 A: 웹 브라우저에서만 (가장 쉬움)
1. https://github.com 에 로그인한 뒤, 오른쪽 위 **+** 를 누르고 **New repository** 를 선택합니다.
2. Repository name에 `wod-timer` 를 입력하고 **Public** 을 선택한 뒤 **Create repository** 를 누릅니다.
3. 새 저장소 화면에서 **uploading an existing file** 링크를 누르고 `index.html` 을 끌어다 놓은 뒤, **Commit changes** 를 누릅니다.
4. 저장소의 **Settings** → 왼쪽 메뉴 **Pages** 로 갑니다.
5. **Build and deployment** 의 Source는 **Deploy from a branch**, Branch는 **main** / **/(root)** 를 선택하고 **Save** 를 누릅니다.
6. 1~2분 뒤 같은 화면 위쪽에 주소가 표시됩니다: `https://<내 아이디>.github.io/wod-timer/`
7. 휴대폰에서 이 주소를 열고 홈 화면에 추가합니다.
   - 아이폰(Safari): 공유 버튼 → **홈 화면에 추가**
   - 안드로이드(Chrome): ⋮ 메뉴 → **홈 화면에 추가**

### 방법 B: 명령어로 (git, GitHub CLI 사용)
```bash
cd D:\wod-timer
git init -b main
git add index.html README.md
git commit -m "WOD 타이머"
gh repo create wod-timer --public --source . --push
gh api -X POST repos/{owner}/wod-timer/pages -f "source[branch]=main" -f "source[path]=/"
```
1~2분 뒤 `https://<내 아이디>.github.io/wod-timer/` 에서 열립니다.

### 수정한 뒤 다시 올리기
- 방법 A: 저장소에서 `index.html` 을 다시 업로드하고 Commit 합니다.
- 방법 B: `git commit -am "수정" && git push`

반영까지 1~2분 걸리고, 휴대폰에서는 새로고침해야 바뀐 내용이 보입니다.

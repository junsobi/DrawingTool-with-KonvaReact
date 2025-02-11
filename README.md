![이미지](https://i.imgur.com/HQZUkMP.png)

# 🖌 Drawing Tool 프로젝트

이 프로젝트는 Konva-React를 활용한 벡터(SVG) 기반의 드로잉 툰입니다. 사용자가 자유롭게 도형을 그리고, 실행 취소 및 다시 실행 등의 기능을 사용할 수 있도록 설계되어 있습니다.

## 🌐 배포 주소

<a href="https://drawing-tool-with-konva-react.vercel.app/" target="_blank">Drawing Tool 배포 사이트</a>

## 🌐 관련 블로그 주소

Component Mapping - <a href="https://www.junsob.kim/blog/component-mapping" target="_blank">https://www.junsob.kim/blog/component-mapping</a>

Undo, Redo in Canvas - <a href="https://www.junsob.kim/blog/undo-redo-canvas" target="_blank">https://www.junsob.kim/blog/undo-redo-canvas</a>

Zustand Persist - <a href="https://www.junsob.kim/blog/zustand-localstorage" target="_blank">https://www.junsob.kim/blog/zustand-localstorage</a>

## 📂 프로젝트 구조

```
📦src
┣ 📂app
┃ ┣ 📜favicon.ico
┃ ┣ 📜globals.css
┃ ┣ 📜layout.tsx
┃ ┗ 📜page.tsx
┣ 📂components
┃ ┣ 📂canvas
┃ ┃ ┣ 📜canvas-component.tsx
┃ ┃ ┣ 📜canvas-controller.tsx
┃ ┃ ┣ 📜canvas.tsx
┃ ┃ ┗ 📜tool-panel.tsx
┃ ┣ 📂drawing-tools
┃ ┃ ┣ 📂tools
┃ ┃ ┃ ┣ 📜draw-ellipse.tsx
┃ ┃ ┃ ┣ 📜draw-line.tsx
┃ ┃ ┃ ┣ 📜draw-polygon.tsx
┃ ┃ ┃ ┗ 📜draw-rect.tsx
┃ ┃ ┣ 📜color-picker.tsx
┃ ┃ ┣ 📜thickness-slider.tsx
┃ ┃ ┗ 📜tool-selector.tsx
┃ ┣ 📂ui
┃ ┃ ┣ 📜button.tsx
┃ ┃ ┣ 📜popover.tsx
┃ ┃ ┣ 📜slider.tsx
┃ ┃ ┣ 📜toggle-group.tsx
┃ ┃ ┗ 📜toggle.tsx
┣ 📂constants
┃ ┗ 📜constants.ts
┣ 📂hooks
┃ ┗ 📜use-drawing.ts
┣ 📂layouts
┃ ┣ 📜control-panel.tsx
┃ ┗ 📜main-layout.tsx
┣ 📂lib
┃ ┗ 📜utils.ts
┣ 📂store
┃ ┗ 📜drawing-store.ts
┣ 📂types
┃ ┗ 📜types.ts
┗ 📂utils
┃ ┣ 📜drawing-utils.ts
┃ ┗ 📜render-shapes.tsx
```

## ✨ 주요 기능

- **도형 그리기**: 프리 드로잉 , 직선, 직사각형, 타일, 폴리곤 그리기 기능.
- **실행 취소 / 다시 실행 (Undo/Redo)**: 사용자가 직접 작업을 취소하고 복구 가능.
- **도형 속성 조정**: 색상 및 선 두께 조정.
- **캔버스 초기화**
- **상태 유지**: Zustand를 활용한 상태 관리 및 localStorage 유지.
- **확장성 있는 설계**

## 🚀 실행 방법

1. 레포지트를 클론합니다.

```bash
git clone https://github.com/junsobi/kova_draw.git
```

2. 패키지를 설치합니다.

```bash
npm install
```

3. 개발 서버를 실행합니다.

```bash
npm run dev
```

---

## 📌 향후 개선할 점

- 도형 변형 기능 추가 (크기 조절 및 이동)
- 다양한 도형 추가 (별, 삼각형 등)
- 캔버스 다운로드 기능 추가
- 키보드 단축키 추가 (Undo/Redo 실행)
- 복제/붙여넣기 기능

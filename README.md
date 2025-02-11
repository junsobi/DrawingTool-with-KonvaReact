# 🖌 Drawing Tool 프로젝트

이 프로젝트는 Konva-React를 활용한 벡터(SVG) 기반의 드로잉 툴입니다. 사용자가 자유롭게 도형을 그리고, 실행 취소 및 다시 실행 등의 기능을 사용할 수 있도록 설계되었습니다.

## 🌐 배포 주소

[Drawing Tool 배포 사이트](https://drawing-tool-with-konva-react.vercel.app/)

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

- **도형 그리기**: 자유 곡선, 직선, 직사각형, 타원, 폴리곤을 그릴 수 있습니다.
- **실행 취소 / 다시 실행 (Undo/Redo)**: 사용자가 수행한 작업을 취소하고 복구할 수 있습니다.
- **도형 속성 조정**: 색상 및 선 두께 조정이 가능합니다.
- **캔버스 초기화**: 캔버스를 초기 상태로 되돌릴 수 있습니다.
- **상태 유지**: zustand 상태 관리 및 localStorage를 이용한 상태 저장 기능.
- **모듈화된 도형 렌더링**: render-shapes.tsx를 통해 도형을 효율적으로 렌더링.

## ⚙️ 기술 스택

- **Frontend**:
  - Next.js
  - React.js
  - TypeScript
  - Tailwind CSS
  - React-Konva
  - zustand (상태 관리)
  - react-color (컬러 피커)

## 🏗️ 로직 구조

### 1. **상태 관리 (zustand)**

- zustand를 활용하여 도형 데이터와 도구 상태를 효율적으로 관리합니다.
- history와 redoStack을 사용하여 Undo/Redo 기능을 구현하였습니다.

```typescript
export const useDrawingStore = create<DrawingState>()(
  persist(
    (set) => ({
      tool: 'free-draw',
      setTool: (tool) => set({ tool }),
      thickness: 5,
      setThickness: (thickness) => set({ thickness }),
      color: '#000000',
      setColor: (color) => set({ color }),
      shapes: [],
      history: [] as Shape[][],
      redoStack: [] as Shape[][],
      addShape: (shape) =>
        set((state) => ({
          history: [...state.history, state.shapes],
          shapes: [...state.shapes, shape],
          redoStack: [],
        })),
      undo: () => {
        /* 로직 */
      },
      redo: () => {
        /* 로직 */
      },
    }),
    { name: 'drawing-storage', storage: safeLocalStorage }
  )
);
```

### 2. **도형 렌더링 모듈화**

- 도형 렌더링을 위한 컴포넌트를 render-shapes.tsx에서 객체 매핑 방식으로 효율적으로 관리합니다.

#### ✅ renderShape vs renderTempShape

- **renderShape**는 완성된 도형을 렌더링합니다.
- **renderTempShape**는 사용자가 현재 그리고 있는 도형을 실시간으로 렌더링합니다.
- 두 함수는 같은 컴포넌트를 사용하지만 다른 데이터를 받아 다른 동작을 수행합니다. 이를 통해 모듈화 및 유지보수성을 향상시켰습니다.

```typescript
const components: Record<Shape['type'], React.ElementType> = {
  'free-draw': DrawLine,
  line: DrawLine,
  ellipse: DrawEllipse,
  rect: DrawRect,
  polygon: DrawPolygon,
};

export const renderShape = (shape: Shape) => {
  const Component = components[shape.type];
  return Component ? <Component key={shape.id} shape={shape} /> : null;
};

export const renderTempShape = (
  tool: ToolType,
  currentShape: number[],
  color: string,
  thickness: number,
  polygonPoints: number[][]
) => {
  const tempProps = {
    'free-draw': { id: 'temp', type: tool, points: currentShape, color, thickness },
    line: { id: 'temp', type: tool, points: currentShape, color, thickness },
    ellipse: { id: 'temp', type: 'ellipse', x: currentShape[0], y: currentShape[1], radiusX: currentShape[2], radiusY: currentShape[3], color, thickness },
    rect: { id: 'temp', type: 'rect', x: currentShape[0], y: currentShape[1], width: currentShape[2], height: currentShape[3], color, thickness },
    polygon: { id: 'temp', type: 'polygon', points: [...polygonPoints, [currentShape[2], currentShape[3]]], color, thickness, closed: false },
  };

  const Component = components[tool];
  return Component ? <Component shape={tempProps[tool]} /> : null;
};
```

## 🚀 실행 방법

1. 레포지토리를 클론합니다.

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

## 📌 향후 개선할 점

- 도형 변형 기능 추가 (크기 조절 및 이동)
- 다양한 도형 추가 (별, 삼각형 등)
- 캔버스 다운로드 기능 추가
- 키보드 단축키 추가 (Undo/Redo 실행)
- 복제/붙여넣기 기능

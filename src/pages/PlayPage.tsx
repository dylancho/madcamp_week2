import {
  Component,
  createSignal,
  onMount,
  onCleanup,
  createEffect,
} from "solid-js";

const [x, setX] = createSignal(0); // Horizontal position
const [y, setY] = createSignal(0); // Vertical position
const [isSuccess, setIsSuccess] = createSignal(false);
const [isJumping, setIsJumping] = createSignal(false); // Prevent mid-air jumps
const [velocityX, setVelocityX] = createSignal(0); // Horizontal velocity
const [velocityY, setVelocityY] = createSignal(0); // Vertical velocity
const [is3DMode, setIs3DMode] = createSignal(false); // Mode toggle
const [deathCnt, setDeathCnt] = createSignal(0);
const [largestOverlap, setLargestOverlap] = createSignal(0);
const gravity = 0.05; // Gravity strength for 2D mode
const jumpStrength = 1; // Initial upward velocity
const groundLevel = 10; // Ground level (y-coordinate)
const ceilingLevel = 85;
const leftWall = 10;
const rightWall = 160;
const speed = 0.6;
const pressedKeys: Record<string, boolean> = {}; // Track pressed keys
let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };
let animationFrameId: number;

// Obstacles: Array of rectangular clusters of squares
type Obstacle = { x: number; y: number; width: number; height: number };
const [obstacles, setObstacles] = createSignal<Obstacle[]>([]);

type Floor = { x: number; y: number; width: number; height: number };
const [floors, setFloors] = createSignal<Floor[]>([]);

// Jump logic for 2D mode
function jump() {
  if (!isJumping()) {
    setVelocityY(jumpStrength); // Set upward velocity (negative to move up)
    setIsJumping(true); // Prevent mid-air jumps
  }
}

// Handle key presses
function handleKeyDown(e: KeyboardEvent) {
  pressedKeys[e.key] = true; // Mark the key as pressed

  if (e.key === "2" && is3DMode()) {
    setIs3DMode(false);
  } else if (e.key === "3" && !is3DMode()) {
    setIs3DMode(true);
  }

  // Update horizontal movement
  if (!pressedKeys["ArrowLeft"] && !pressedKeys["ArrowRight"]) {
    setVelocityX(0); // Stop horizontal movement
  } else if (pressedKeys["ArrowLeft"]) {
    setVelocityX(-speed); // Move left
  } else if (pressedKeys["ArrowRight"]) {
    setVelocityX(speed); // Move right
  }

  if (is3DMode()) {
    // 3D mode vertical movement
    if (pressedKeys["ArrowUp"]) setVelocityY(speed); // Move up
    if (pressedKeys["ArrowDown"]) setVelocityY(-speed); // Move down
  } else {
    // Jump in 2D mode
    if (pressedKeys["ArrowUp"]) jump();
  }
}

function handleKeyUp(e: KeyboardEvent) {
  pressedKeys[e.key] = false; // Mark the key as released

  // Update horizontal movement based on remaining pressed keys
  if (!pressedKeys["ArrowLeft"] && !pressedKeys["ArrowRight"]) {
    setVelocityX(0); // Stop horizontal movement
  } else if (pressedKeys["ArrowLeft"]) {
    setVelocityX(-speed); // Move left
  } else if (pressedKeys["ArrowRight"]) {
    setVelocityX(speed); // Move right
  }

  // Stop vertical movement in 3D mode
  if (is3DMode() && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
    setVelocityY(0);
  }
}

// Collision detection
function checkCollisionObstacle() {
  const charLeft = x();
  const charRight = x() + 5; // Character width
  const charTop = y() + 5; // Character top edge
  const charBottom = y(); // Character bottom edge

  for (const obstacle of obstacles()) {
    const obsLeft = obstacle.x;
    const obsRight = obstacle.x + obstacle.width;
    const obsTop = obstacle.y + obstacle.height;
    const obsBottom = obstacle.y;

    // Check if character intersects with the obstacle
    if (
      charRight > obsLeft && // Character's right edge passes obstacle's left edge
      charLeft < obsRight && // Character's left edge passes obstacle's right edge
      charTop > obsBottom && // Character's top edge passes obstacle's bottom edge
      charBottom < obsTop // Character's bottom edge passes obstacle's top edge
    ) {
      setDeathCnt(deathCnt() + 1);
      setX(start.x); // Reset to start
      setY(start.y);
    }
  }

  for (const floor of floors()) {
    const floorLeft = floor.x;
    const floorRight = floor.x + floor.width;
    const floorTop = floor.y + floor.height;
    const floorBottom = floor.y;
  }

  if (
    charRight > end.x &&
    charLeft < end.x + 5 &&
    charTop > end.y &&
    charBottom < end.y + 5
  ) {
    setIsSuccess(true);
  }
}

function checkCollisionFloor() {
  const charLeft = x();
  const charRight = x() + 5; // Character width
  const charTop = y() + 5; // Character top edge
  const charBottom = y(); // Character bottom edge

  let correctedX = x();
  let correctedY = y();
  let isColliding = false;

  for (const floor of floors()) {
    const floorLeft = floor.x;
    const floorRight = floor.x + floor.width;
    const floorTop = floor.y + floor.height;
    const floorBottom = floor.y;

    // Check if character intersects with the floor
    if (
      charRight > floorLeft &&
      charLeft < floorRight &&
      charTop > floorBottom &&
      charBottom < floorTop
    ) {
      isColliding = true;

      // Calculate overlaps on all sides // Overlap with the left side
      const overlapX = Math.min(charTop - floorBottom, floorTop - charBottom);
      const overlapY = Math.min(charRight - floorLeft, floorRight - charLeft);

      // Find the largest overlap to resolve the collision
      setLargestOverlap(Math.max(overlapX, overlapY));

      if (largestOverlap() === overlapX) {
        if (charRight < floorRight) {
          correctedX = floorLeft - 5;
        } else {
          correctedX = floorRight;
        }
        setVelocityX(0);
      } else if (largestOverlap() === overlapY) {
        if (charTop < floorTop) {
          correctedY = floorBottom - 5;
        } else {
          correctedY = floorTop;
          setIsJumping(false);
        }
        setVelocityY(0);
      }
    }
  }

  // Update character position if there's a collision
  if (isColliding) {
    setX(correctedX);
    setY(correctedY);
  }

  return isColliding;
}

// Game loop to update position
function updatePosition() {
  setX((x) => x + velocityX()); // Update horizontal position
  setY((y) => y + velocityY()); // Update vertical position

  // Check if the character lands on the ground
  if (y() <= 0) {
    setY(0); // Reset to ground level
    setVelocityY(0); // Stop vertical movement
    setIsJumping(false); // Allow jumping again
  }

  if (y() >= 70) {
    setY(70); // Reset to ground level
    setVelocityY(0); // Stop vertical movement
    setIsJumping(false); // Allow jumping again
  }

  if (x() <= 0) {
    setX(0); // Reset to ground level
    setVelocityX(0); // Stop vertical movement
  }

  if (x() >= 145) {
    setX(145); // Reset to ground level
    setVelocityX(0); // Stop vertical movement
  }

  if (!is3DMode()) {
    // Apply gravity in 2D mode
    setVelocityY((vY) => vY - gravity);
  }

  // Check collision with obstacles
  checkCollisionObstacle();
  checkCollisionFloor();

  if (animationFrameId !== 0) {
    animationFrameId = requestAnimationFrame(updatePosition);
  } // Loop the update
}

// PlayPage Component
const PlayPage: Component<{
  grid: number[];
  closePopup: () => void;
  enableSave: () => void;
}> = (props) => {
  createEffect(() => {
    if (isSuccess()) {
      setIsSuccess(false);
      props.closePopup(); // Close the popup
      props.enableSave(); // Enable the Save button
    }
  });

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const parsedObstacles: Obstacle[] = [];
    const parsedFloors: Floor[] = [];
    props.grid.forEach((cell, index) => {
      const col = index % 30;
      const row = Math.floor(index / 30);

      if (cell === 1) {
        parsedObstacles.push({
          x: col * 5,
          y: 70 - row * 5,
          width: 5,
          height: 5,
        });
      } else if (cell === 2) {
        start = { x: col * 5, y: 70 - row * 5 };
        setX(start.x);
        setY(start.y);
      } else if (cell === 3) {
        end = { x: col * 5, y: 70 - row * 5 };
      } else if (cell === 4) {
        parsedFloors.push({
          x: col * 5,
          y: 70 - row * 5,
          width: 5,
          height: 5,
        });
      }
    });

    setObstacles(parsedObstacles);
    setFloors(parsedFloors);

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  onCleanup(() => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  });

  return (
    <>
      <div>
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            "background-color": "#bde0fe", // Background color outside the grid
            overflow: "hidden",
          }}
        >
          {/* Game Area */}
          <div
            style={{
              position: "absolute",
              left: `${leftWall}vh`,
              bottom: `${groundLevel}vh`, // Adjust for grid alignment
              width: `${rightWall - leftWall}vh`,
              height: `${ceilingLevel - groundLevel}vh`,
              "background-image": `
                linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
              `,
              "background-size": "5vh 5vh", // Grid size
              "background-position": "0 100%", // Align grid to the bottom-left
              "background-color": "#ffffff", // Game area background color
              border: "2px solid black", // Boundary box border
            }}
          >
            {/* Obstacles */}
            <div>
              {obstacles().map((obs) => (
                <div
                  style={{
                    position: "absolute",
                    left: `${obs.x}vh`,
                    bottom: `${obs.y}vh`,
                    width: `${obs.width}vh`,
                    height: `${obs.height}vh`,
                    background: "green",
                  }}
                ></div>
              ))}
            </div>

            {/* Floors */}
            <div>
              {floors().map((fls) => (
                <div
                  style={{
                    position: "absolute",
                    left: `${fls.x}vh`,
                    bottom: `${fls.y}vh`,
                    width: `${fls.width}vh`,
                    height: `${fls.height}vh`,
                    background: "orange",
                  }}
                ></div>
              ))}
            </div>

            {/* Endpoint */}
            <div
              style={{
                position: "absolute",
                left: `${end.x}vh`,
                bottom: `${end.y}vh`,
                width: "5vh",
                height: "5vh",
                background: "yellow",
              }}
            ></div>

            {/* Character */}
            <div
              style={{
                position: "absolute",
                left: `${x()}vh`,
                bottom: `${y()}vh`,
                width: "5vh",
                height: "5vh",
                background: "red",
              }}
            ></div>
          </div>

          {/* Mode Indicator */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "black",
              background: "white",
              padding: "5px",
              "border-radius": "5px",
            }}
          >
            Mode: {is3DMode() ? "3D-like" : "2D"}
            <br />
            {"You died " + deathCnt() + " times"}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayPage;

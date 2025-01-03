import { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";

const [x, setX] = createSignal(100); // Horizontal position
const [y, setY] = createSignal(500); // Vertical position
const [isJumping, setIsJumping] = createSignal(false); // Prevent mid-air jumps
const [velocityX, setVelocityX] = createSignal(0); // Horizontal velocity
const [velocityY, setVelocityY] = createSignal(0); // Vertical velocity
const [is3DMode, setIs3DMode] = createSignal(false); // Mode toggle
const [deathCnt, setDeathCnt] = createSignal(0);
const gravity = 0.5; // Gravity strength for 2D mode
const jumpStrength = -10; // Initial upward velocity
const groundLevel = 700; // Ground level (y-coordinate)
const ceilingLevel = 0;
const leftWall = 100;
const rightWall = 1500;
const pressedKeys: Record<string, boolean> = {}; // Track pressed keys

// Obstacles: Array of rectangular clusters of squares
const obstacles = [
  { x: 300, y: 650, width: 50, height: 50 }, // Example obstacle 1
  { x: 400, y: 600, width: 50, height: 50 }, // Example obstacle 2
  { x: 400, y: 650, width: 50, height: 50 },
  { x: 400, y: 250, width: 50, height: 50 },
];

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
    // Switch to 2D mode, convert y to 2D coordinate
    setY(window.innerHeight - y());
    setIs3DMode(false);
  } else if (e.key === "3" && !is3DMode()) {
    // Switch to 3D mode, convert y to 3D coordinate
    setY(window.innerHeight - y());
    setIs3DMode(true);
  }

  // Update horizontal movement
  if (!pressedKeys["ArrowLeft"] && !pressedKeys["ArrowRight"]) {
    setVelocityX(0); // Stop horizontal movement
  } else if (pressedKeys["ArrowLeft"]) {
    setVelocityX(-6); // Move left
  } else if (pressedKeys["ArrowRight"]) {
    setVelocityX(6); // Move right
  }

  if (is3DMode()) {
    // 3D mode vertical movement
    if (pressedKeys["ArrowUp"]) setVelocityY(6); // Move up
    if (pressedKeys["ArrowDown"]) setVelocityY(-6); // Move down
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
    setVelocityX(-6); // Move left
  } else if (pressedKeys["ArrowRight"]) {
    setVelocityX(6); // Move right
  }

  // Stop vertical movement in 3D mode
  if (is3DMode() && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
    setVelocityY(0);
  }
}

// Collision detection
function checkCollision() {
  const charLeft = x();
  const charRight = x() + 50; // Character width
  const charTop = is3DMode() ? y() : window.innerHeight - y();
  const charBottom = charTop - 50; // Character height (subtract height since bottom is smaller in coordinate space)

  for (const obstacle of obstacles) {
    const obsLeft = obstacle.x;
    const obsRight = obstacle.x + obstacle.width;
    const obsTop = obstacle.y;
    const obsBottom = obstacle.y - obstacle.height;

    // Check if character intersects with the obstacle
    if (
      charRight > obsLeft && // Character's right edge passes obstacle's left edge
      charLeft < obsRight && // Character's left edge passes obstacle's right edge
      charTop > obsBottom && // Character's top edge passes obstacle's bottom edge
      charBottom < obsTop // Character's bottom edge passes obstacle's top edge
    ) {
      setDeathCnt(deathCnt() + 1);
      return true; // Collision detected
    }
  }

  return false; // No collision
}

// Game loop to update position
function updatePosition() {
  setX((x) => x + velocityX()); // Update horizontal position
  setY((y) => y + velocityY()); // Update vertical position

  // Check if the character lands on the ground
  if (y() >= groundLevel) {
    setY(groundLevel); // Reset to ground level
    setVelocityY(0); // Stop vertical movement
    setIsJumping(false); // Allow jumping again
  }

  if (y() <= ceilingLevel) {
    setY(ceilingLevel); // Reset to ground level
    setVelocityY(0); // Stop vertical movement
    setIsJumping(false); // Allow jumping again
  }

  if (x() <= leftWall) {
    setX(leftWall); // Reset to ground level
    setVelocityX(0); // Stop vertical movement
  }

  if (x() >= rightWall) {
    setX(rightWall); // Reset to ground level
    setVelocityX(0); // Stop vertical movement
  }

  if (!is3DMode()) {
    // Apply gravity in 2D mode
    setVelocityY((vY) => vY + gravity);
  }

  // Check collision with obstacles
  if (checkCollision()) {
    // Reset character position on collision
    setX(100);
    setY(500);
  }

  requestAnimationFrame(updatePosition); // Loop the update
}

// PlayPage Component
const PlayPage: Component = () => {
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    updatePosition(); // Start game loop

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  });

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "#bde0fe",
          overflow: "hidden",
        }}
      >
        {/* Ground */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "50px",
            background: "#2b2d42",
          }}
        ></div>

        {/* Obstacles */}
        {obstacles.map((obstacle) => (
          <div
            style={{
              position: "absolute",
              left: `${obstacle.x}px`,
              bottom: `${obstacle.y}px`,
              width: `${obstacle.width}px`,
              height: `${obstacle.height}px`,
              background: "green",
            }}
          ></div>
        ))}

        {/* Character */}
        <div
          style={{
            position: "absolute",
            left: `${x()}px`,
            bottom: `${is3DMode() ? y() : window.innerHeight - y()}px`, // Keep position consistent
            width: "50px",
            height: "50px",
            background: "red",
            "border-radius": "10px",
          }}
        ></div>

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
          {"You died "  + deathCnt() + " times"}
        </div>
      </div>
    </>
  );
};

export default PlayPage;

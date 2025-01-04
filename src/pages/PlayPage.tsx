import { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";

const [x, setX] = createSignal(10); // Horizontal position
const [y, setY] = createSignal(50); // Vertical position
const [isJumping, setIsJumping] = createSignal(false); // Prevent mid-air jumps
const [velocityX, setVelocityX] = createSignal(0); // Horizontal velocity
const [velocityY, setVelocityY] = createSignal(0); // Vertical velocity
const [is3DMode, setIs3DMode] = createSignal(false); // Mode toggle
const [deathCnt, setDeathCnt] = createSignal(0);
const gravity = 0.05; // Gravity strength for 2D mode
const jumpStrength = 1; // Initial upward velocity
const groundLevel = 10; // Ground level (y-coordinate)
const ceilingLevel = 85;
const leftWall = 10;
const rightWall = 160;
const speed = 0.6;
const pressedKeys: Record<string, boolean> = {}; // Track pressed keys

// Obstacles: Array of rectangular clusters of squares
const obstacles = [
  { x: 30, y: 65, width: 5, height: 5 }, // Example obstacle 1
  { x: 40, y: 60, width: 5, height: 5 }, // Example obstacle 2
  { x: 40, y: 65, width: 5, height: 5 },
  { x: 100, y: 0, width: 5, height: 5 },
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
function checkCollision() {
  const charLeft = x();
  const charRight = x() + 5; // Character width
  const charTop = y() + 5;
  const charBottom = y(); // Character height (subtract height since bottom is smaller in coordinate space)

  for (const obstacle of obstacles) {
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
  if (checkCollision()) {
    // Reset character position on collision
    setX(10);
    setY(50);
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
            {obstacles.map((obstacle) => (
              <div
                style={{
                  position: "absolute",
                  left: `${obstacle.x}vh`, 
                  bottom: `${obstacle.y}vh`,
                  width: `${obstacle.width}vh`,
                  height: `${obstacle.height}vh`,
                  background: "green",
                }}
              ></div>
            ))}
  
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
      </>
    );
  };
  
  export default PlayPage;
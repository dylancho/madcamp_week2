import { Component } from "solid-js";
import { createSignal, onMount } from "solid-js";

const [x, setX] = createSignal(100); // Horizontal position
  const [y, setY] = createSignal(500); // Vertical position
  const [isJumping, setIsJumping] = createSignal(false); // Prevent mid-air jumps
  const [velocityX, setVelocityX] = createSignal(0); // Horizontal velocity
  const [velocityY, setVelocityY] = createSignal(0); // Vertical velocity
  const [is3DMode, setIs3DMode] = createSignal(false); // Mode toggle
  const gravity = 0.5; // Gravity strength for 2D mode
  const jumpStrength = -10; // Initial upward velocity
  const groundLevel = 700; // Ground level (y-coordinate)
  const pressedKeys: Record<string, boolean> = {}; // Track pressed keys

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
      setVelocityX(-2); // Move left
    } else if (pressedKeys["ArrowRight"]) {
      setVelocityX(2); // Move right
    }

    // Update vertical movement
    if (is3DMode()) {
      // 3D mode vertical movement
      if (pressedKeys["ArrowUp"]) setVelocityY(2); // Move up
      if (pressedKeys["ArrowDown"]) setVelocityY(-2); // Move down
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
      setVelocityX(-2); // Prioritize ArrowLeft if still pressed
    } else if (pressedKeys["ArrowRight"]) {
      setVelocityX(2); // Prioritize ArrowRight if still pressed
    }

    // Stop vertical movement in 3D mode
    if (is3DMode() && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
      setVelocityY(0);
    }
  }

  // Game loop to update position
  function updatePosition() {
    setX((x) => x + velocityX()); // Update horizontal position
    setY((y) => y + velocityY()); // Update vertical position

    if (!is3DMode()) {
      // Apply gravity in 2D mode
      setVelocityY((vY) => vY + gravity);

      // Check if the character lands on the ground
      if (y() >= groundLevel) {
        setY(groundLevel); // Reset to ground level
        setVelocityY(0); // Stop vertical movement
        setIsJumping(false); // Allow jumping again
      }
    }

    requestAnimationFrame(updatePosition); // Loop the update
  }

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
        <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#bde0fe", overflow: "hidden" }}>
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
      </div>
    </div>
        </>
    );
}

export default PlayPage
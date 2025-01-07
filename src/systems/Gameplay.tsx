import { Accessor, createSignal, Setter } from "solid-js"
import { createStore, SetStoreFunction } from "solid-js/store"
import { Size } from "../property/Size"

export interface twoDimScaleType {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

class GameplaySys {
    world: number[]
    setWorld: SetStoreFunction<number[]>

    startPos: twoDimScaleType
    setStartPos: SetStoreFunction<twoDimScaleType>

    endPos: twoDimScaleType
    setEndPos: SetStoreFunction<twoDimScaleType>

    position: twoDimScaleType
    setPosition: SetStoreFunction<twoDimScaleType>

    velocity: twoDimScaleType
    setVelocity: SetStoreFunction<twoDimScaleType>

    obstacles: Rect[]
    setObstacles: SetStoreFunction<Rect[]>

    floors: Rect[]
    setFloors: SetStoreFunction<Rect[]>

    isSuccess: Accessor<boolean>
    setIsSuccess: Setter<boolean>

    isJumping: Accessor<boolean>
    setIsJumping: Setter<boolean>

    is3DMode: Accessor<boolean>
    setIs3DMode: Setter<boolean>

    deathCnt: Accessor<number>
    setDeathCnt: Setter<number>

    largestOverlap: Accessor<number>
    setLargestOverlap: Setter<number>

    constructor() {
        ([this.world, this.setWorld] = createStore<number[]>(Array(Size.world.col * Size.world.row).fill(0))),
        ([this.startPos, this.setStartPos] = createStore<twoDimScaleType>({x: 0, y: 0})),
        ([this.endPos, this.setEndPos] = createStore<twoDimScaleType>({x: 0, y: 0})),
        ([this.position, this.setPosition] = createStore<twoDimScaleType>({x: 0, y: 0})),
        ([this.velocity, this.setVelocity] = createStore<twoDimScaleType>({x: 0, y: 0})),
        ([this.obstacles, this.setObstacles] = createStore<Rect[]>([])),
        ([this.floors, this.setFloors] = createStore<Rect[]>([])),
        ([this.isSuccess, this.setIsSuccess] = createSignal<boolean>(false)),
        ([this.isJumping, this.setIsJumping] = createSignal<boolean>(false)),
        ([this.is3DMode, this.setIs3DMode] = createSignal<boolean>(false)),
        ([this.deathCnt, this.setDeathCnt] = createSignal<number>(0)),
        ([this.largestOverlap, this.setLargestOverlap] = createSignal<number>(0))
    }

  gravity = 0.05; // Gravity strength for 2D mode
  jumpStrength = 1; // Initial upward velocity
  groundLevel = 10; // Ground level (y-coordinate)
  ceilingLevel = 85;
  leftWall = 10;
  rightWall = 160;
  speed = 0.6;
  pressedKeys: Record<string, boolean> = {}; // Track pressed keys
  animationFrameId: number = -1;
  keys: string[] = []; // Store the user's custom key bindings
  keyMappings: Record<string, string> = {};

  async fetchUserKeys() {
    try {
      const user = await dataSys.getUser(dataSys.curCreatingAccount.email); // Fetch the user
      if (user?.keys && user.keys.length >= 6) {
        this.keys = user.keys; // Use the fetched keys
      } else {
        // Fallback to default keys if keys are missing or incomplete
        this.keys = [
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "2",
          "3",
        ];
      }
      this.updateKeyMappings(); // Update key mappings after fetching
    } catch (error) {
      console.error("Failed to fetch user keys:", error);
      // Fallback to default keys on error
      this.keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "2", "3"];
      this.updateKeyMappings();
    }
  }

  updateKeyMappings() {
    this.keyMappings = {
      keyRight: this.keys[0],
      keyLeft: this.keys[1],
      keyDown: this.keys[2],
      keyUp: this.keys[3],
      key2: this.keys[4],
      key3: this.keys[5],
    };
  }

  // Jump logic for 2D mode
  jump = () => {
    if (!this.isJumping()) {
      this.setVelocity("y", this.jumpStrength); // Set upward velocity (negative to move up)
      this.setIsJumping(true); // Prevent mid-air jumps
    }
  };

  // Handle key presses
  handleKeyDown = (e: KeyboardEvent) => {
    this.pressedKeys[e.key] = true;

    const { keyRight, keyLeft, keyUp, keyDown, key2, key3 } = this.keyMappings;

    if (e.key === key2 && this.is3DMode()) {
      this.setIs3DMode(false);
    } else if (e.key === key3 && !this.is3DMode()) {
      this.setIs3DMode(true);
    }

    if (!this.pressedKeys[keyLeft] && !this.pressedKeys[keyRight]) {
      this.setVelocity("x", 0);
    } else if (this.pressedKeys[keyLeft]) {
      this.setVelocity("x", -this.speed);
    } else if (this.pressedKeys[keyRight]) {
      this.setVelocity("x", this.speed);
    }

    if (this.is3DMode()) {
      if (this.pressedKeys[keyUp]) this.setVelocity("y", this.speed);
      if (this.pressedKeys[keyDown]) this.setVelocity("y", -this.speed);
    } else {
      if (this.pressedKeys[keyUp]) this.jump();
    }
  };

    handleKeyUp = (e: KeyboardEvent) => {
        this.pressedKeys[e.key] = false; // Mark the key as released
      
        // Update horizontal movement based on remaining pressed keys
        if (!this.pressedKeys["ArrowLeft"] && !this.pressedKeys["ArrowRight"]) {
          this.setVelocity('x', 0); // Stop horizontal movement
        } else if (this.pressedKeys["ArrowLeft"]) {
          this.setVelocity('x', -this.speed); // Move left
        } else if (this.pressedKeys["ArrowRight"]) {
          this.setVelocity('x', this.speed); // Move right
        }
      
        // Stop vertical movement in 3D mode
        if (this.is3DMode() && (e.key === "ArrowUp" || e.key === "ArrowDown")) {
            this.setVelocity('y', 0);
        }
    }

  // Collision detection
  checkCollisionObstacle = () => {
    const charLeft = this.position.x;
    const charRight = this.position.x + 5; // Character width
    const charTop = this.position.y + 5; // Character top edge
    const charBottom = this.position.y; // Character bottom edge

    for (const obstacle of this.obstacles) {
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
        this.setDeathCnt(this.deathCnt() + 1);
        this.setPosition("x", this.startPos.x); // Reset to start
        this.setPosition("y", this.startPos.y);
      }
    }

    if (
      charRight > this.endPos.x &&
      charLeft < this.endPos.x + 5 &&
      charTop > this.endPos.y &&
      charBottom < this.endPos.y + 5
    ) {
      //this.setIsSuccess(true);
    }
  };
    // Collision detection
    checkCollisionObstacle = () => {
        const charLeft = this.position.x;
        const charRight = this.position.x + 5; // Character width
        const charTop = this.position.y + 5; // Character top edge
        const charBottom = this.position.y; // Character bottom edge
    
        for (const obstacle of this.obstacles) {
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
                this.setDeathCnt(this.deathCnt() + 1);
                this.setPosition('x', this.startPos.x); // Reset to start
                this.setPosition('y', this.startPos.y);
            }
        }
    
        if (
            charRight > this.endPos.x &&
            charLeft < this.endPos.x + 5 &&
            charTop > this.endPos.y &&
            charBottom < this.endPos.y + 5
        ) {
            this.setIsSuccess(true);
        }
    }

  checkCollisionFloor() {
    const charLeft = this.position.x;
    const charRight = this.position.x + 5; // Character width
    const charTop = this.position.y + 5; // Character top edge
    const charBottom = this.position.y; // Character bottom edge

    let correctedX = this.position.x;
    let correctedY = this.position.y;
    let isColliding = false;

    for (const floor of this.floors) {
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
        this.setLargestOverlap(Math.max(overlapX, overlapY));

        if (this.largestOverlap() === overlapX) {
          if (charRight < floorRight) {
            correctedX = floorLeft - 5;
          } else {
            correctedX = floorRight;
          }
          this.setVelocity("x", 0);
        } else if (this.largestOverlap() === overlapY) {
          if (charTop < floorTop) {
            correctedY = floorBottom - 5;
          } else {
            correctedY = floorTop;
            this.setIsJumping(false);
          }
          this.setVelocity("y", 0);
        }
      }
    }
    // Update character position if there's a collision
    if (isColliding) {
      this.setPosition("x", correctedX);
      this.setPosition("y", correctedY);
    }

    return isColliding;
  }

  // Game loop to update position
  updatePosition = () => {
    this.setPosition("x", (x) => x + this.velocity.x); // Update horizontal position
    this.setPosition("y", (y) => y + this.velocity.y); // Update vertical position

    // Check if the character lands on the ground
    if (this.position.y <= 0) {
      this.setPosition("y", 0); // Reset to ground level
      this.setVelocity("y", 0); // Stop vertical movement
      this.setIsJumping(false); // Allow jumping again
    }

    if (this.position.y >= 70) {
      this.setPosition("y", 70); // Reset to ground level
      this.setVelocity("y", 0); // Stop vertical movement
      this.setIsJumping(false); // Allow jumping again
    }

    if (this.position.x <= 0) {
      this.setPosition("x", 0); // Reset to ground level
      this.setVelocity("x", 0); // Stop vertical movement
    }

    if (this.position.x >= 145) {
      this.setPosition("x", 145); // Reset to ground level
      this.setVelocity("x", 0); // Stop vertical movement
    }

    if (!this.is3DMode()) {
      // Apply gravity in 2D mode
      this.setVelocity("y", (vY) => vY - this.gravity);
    }

    // Check collision with obstacles
    this.checkCollisionObstacle();
    this.checkCollisionFloor();

    if (this.animationFrameId !== 0) {
      this.animationFrameId = requestAnimationFrame(this.updatePosition);
    } // Loop the update
  };
}

export const gameplaySys = new GameplaySys();

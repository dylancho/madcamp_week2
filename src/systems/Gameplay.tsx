import { Accessor, createSignal, Setter } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { Size } from "../property/Size";
import { dataSys } from "./Data";

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

export interface Turt {
  x: number;
  y: number;
  width: number;
  height: number;
  fall: number;
  direction: number;
}

class GameplaySys {
  world: number[];
  setWorld: SetStoreFunction<number[]>;

  startPos: twoDimScaleType;
  setStartPos: SetStoreFunction<twoDimScaleType>;

  endPos: twoDimScaleType;
  setEndPos: SetStoreFunction<twoDimScaleType>;

  position: twoDimScaleType;
  setPosition: SetStoreFunction<twoDimScaleType>;

  velocity: twoDimScaleType;
  setVelocity: SetStoreFunction<twoDimScaleType>;

  obstacles: Rect[];
  setObstacles: SetStoreFunction<Rect[]>;

  floors: Rect[];
  setFloors: SetStoreFunction<Rect[]>;

  turtles: Turt[];
  setTurtles: SetStoreFunction<Turt[]>;

  isSuccess: Accessor<boolean>;
  setIsSuccess: Setter<boolean>;

  isJumping: Accessor<boolean>;
  setIsJumping: Setter<boolean>;

  is3DMode: Accessor<boolean>;
  setIs3DMode: Setter<boolean>;

  deathCnt: Accessor<number>;
  setDeathCnt: Setter<number>;

  largestOverlap: Accessor<number>;
  setLargestOverlap: Setter<number>;

  constructor() {
    ([this.world, this.setWorld] = createStore<number[]>(
      Array(Size.world.col * Size.world.row).fill(0)
    )),
      ([this.startPos, this.setStartPos] = createStore<twoDimScaleType>({
        x: 0,
        y: 0,
      })),
      ([this.endPos, this.setEndPos] = createStore<twoDimScaleType>({
        x: 0,
        y: 0,
      })),
      ([this.position, this.setPosition] = createStore<twoDimScaleType>({
        x: 0,
        y: 0,
      })),
      ([this.velocity, this.setVelocity] = createStore<twoDimScaleType>({
        x: 0,
        y: 0,
      })),
      ([this.obstacles, this.setObstacles] = createStore<Rect[]>([])),
      ([this.floors, this.setFloors] = createStore<Rect[]>([])),
      ([this.turtles, this.setTurtles] = createStore<Turt[]>([])),
      ([this.isSuccess, this.setIsSuccess] = createSignal<boolean>(false)),
      ([this.isJumping, this.setIsJumping] = createSignal<boolean>(false)),
      ([this.is3DMode, this.setIs3DMode] = createSignal<boolean>(false)),
      ([this.deathCnt, this.setDeathCnt] = createSignal<number>(0)),
      ([this.largestOverlap, this.setLargestOverlap] = createSignal<number>(0));
  }

  gravity = 0.05; // Gravity strength for 2D mode
  jumpStrength = 1; // Initial upward velocity
  groundLevel = 10; // Ground level (y-coordinate)
  ceilingLevel = 85;
  leftWall = 10;
  rightWall = 160;
  speed = 0.6;
  turtleSpeed = 0.4;
  pressedKeys: Record<string, boolean> = {}; // Track pressed keys
  animationFrameId: number = -1;
  keys: string[] = []; // Store the user's custom key bindings
  keyMappings: Record<string, string> = {};

  fetchUserKeys = async () => {
    try {
      const user = await dataSys.getUser(dataSys.curUser.email); // Fetch the user
      console.log("user", user);
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
  };

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

    const { keyRight, keyLeft, keyDown, keyUp, key2, key3 } = this.keyMappings;

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
    if (
      !this.pressedKeys[this.keyMappings["keyLeft"]] &&
      !this.pressedKeys[this.keyMappings["keyRight"]]
    ) {
      this.setVelocity("x", 0); // Stop horizontal movement
    } else if (this.pressedKeys[this.keyMappings["keyLeft"]]) {
      this.setVelocity("x", -this.speed); // Move left
    } else if (this.pressedKeys[this.keyMappings["keyRight"]]) {
      this.setVelocity("x", this.speed); // Move right
    }

    // Stop vertical movement in 3D mode
    if (
      this.is3DMode() &&
      (e.key === this.keyMappings["keyUp"] ||
        e.key === this.keyMappings["keyDown"])
    ) {
      this.setVelocity("y", 0);
    }
  };

  // Collision detection
  checkCollisionObstacle = () => {
    const charLeft = this.position.x;
    const charRight = this.position.x + 5; // Character width
    const charTop = this.position.y + 5; // Character top edge
    const charBottom = this.position.y; // Character bottom edge
    let isCollide = false;

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
        isCollide = true;
      }
    }

    this.turtles.forEach((_, index) => {
      const ttsLeft = this.turtles[index].x;
      const ttsRight = this.turtles[index].x + this.turtles[index].width;
      const ttsTop = this.turtles[index].y + this.turtles[index].height;
      const ttsBottom = this.turtles[index].y;
      if (
        charRight > ttsLeft && // Character's right edge passes obstacle's left edge
        charLeft < ttsRight && // Character's left edge passes obstacle's right edge
        charTop > ttsBottom && // Character's top edge passes obstacle's bottom edge
        charBottom < ttsTop // Character's bottom edge passes obstacle's top edge
      ) {
        isCollide = true;
      }
    });

    if (
      charRight > this.endPos.x &&
      charLeft < this.endPos.x + 5 &&
      charTop > this.endPos.y &&
      charBottom < this.endPos.y + 5
    ) {
      this.setIsSuccess(true);
    }

    if (isCollide) {
      this.setDeathCnt(this.deathCnt() + 1);
      this.setPosition("x", this.startPos.x);
      this.setPosition("y", this.startPos.y);
    }
  };

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

  checkTurtleColliding(index: number): boolean {
    const turtle = this.turtles[index]; // Access the current turtle
    const turtLeft = turtle.x;
    const turtRight = turtle.x + 5; // Turtle width
    const turtTop = turtle.y + 5; // Turtle top edge
    const turtBottom = turtle.y; // Turtle bottom edge

    let correctedX = turtle.x;
    let correctedY = turtle.y;
    let isColliding = false;

    for (const floor of this.floors) {
      const floorLeft = floor.x;
      const floorRight = floor.x + floor.width;
      const floorTop = floor.y + floor.height;
      const floorBottom = floor.y;

      // Check if turtle intersects with the floor
      if (
        turtRight > floorLeft &&
        turtLeft < floorRight &&
        turtTop > floorBottom &&
        turtBottom < floorTop
      ) {
        isColliding = true;

        // Calculate overlaps on all sides
        const overlapX = Math.min(turtTop - floorBottom, floorTop - turtBottom);
        const overlapY = Math.min(turtRight - floorLeft, floorRight - turtLeft);

        // Resolve the collision based on the largest overlap
        if (overlapX > overlapY) {
          // Horizontal collision
          correctedX = turtRight < floorRight ? floorLeft - 5 : floorRight;
          this.setTurtles(index, "direction", (dir) => -dir); // Reverse direction
        } else {
          // Vertical collision
          correctedY = turtTop < floorTop ? floorBottom - 5 : floorTop;
          this.setTurtles(index, "fall", 0); // Stop falling
        }
      }
    }

    // Update turtle position if there was a collision
    if (isColliding) {
      this.setTurtles(index, "x", correctedX);
      this.setTurtles(index, "y", correctedY);
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

    /////////////////////////////////////////////////
    //Turtles logic

    this.turtles.forEach((_, index) => {
      if (!this.is3DMode()) {
        // Update horizontal movement
        this.setTurtles(
          index,
          "x",
          (x) => x + this.turtleSpeed * this.turtles[index].direction
        );

        // Reverse direction if turtle hits borders
        if (this.turtles[index].x <= 0) {
          this.setTurtles(index, "x", (x) => 0);

          this.setTurtles(index, "direction", (dir) => -dir);
        }

        if (this.turtles[index].x >= 145) {
          this.setTurtles(index, "x", (x) => 145);

          this.setTurtles(index, "direction", (dir) => -dir);
        }

        // Apply vertical movement (falling)
        this.setTurtles(index, "y", (y) => y + this.turtles[index].fall);
        this.setTurtles(index, "fall", (fall) => fall - this.gravity); // Gravity effect

        // Check collision with floors
        this.checkTurtleColliding(index);

        // If no floor, reset to ground level
        if (this.turtles[index].y <= 0) {
          this.setTurtles(index, "y", 0);
          this.setTurtles(index, "fall", 0);
        }
      }
    });

    if (this.animationFrameId !== 0) {
      this.animationFrameId = requestAnimationFrame(this.updatePosition);
    } // Loop the update
  };
}

export const gameplaySys = new GameplaySys();

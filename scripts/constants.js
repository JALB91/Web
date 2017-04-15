const WORLD_WIDTH = 320;
const WORLD_HEIGHT = 320;

const TILE_WIDTH = 16;
const TILE_HEIGHT = 16;

const MAP_WIDTH = WORLD_WIDTH / TILE_WIDTH;
const MAP_HEIGHT = WORLD_HEIGHT / TILE_HEIGHT;

const States = { IDLE: "idle", MOVE: "move", STOP: "stop", DEAD: "dead", NONE: "none" };
const Directions = { UP: "up", DOWN: "down", RIGHT: "right", LEFT: "left" };
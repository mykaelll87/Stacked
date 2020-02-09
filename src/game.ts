import { Mesh, Scene } from "three";
import { IBox, makeBoxMesh, resizeBox, makeFrom, BOX_HEIGHT } from "./objects/boxes";
import createLights from "./scene/lights";
import makeGameState, { GameState } from "./state/gameState";

export default class Game {
  state: GameState = makeGameState();

  private cubes: Mesh[] = [];
  private currentBox: IBox = null;
  private scene: Scene;
  private scoreEl = document.getElementById("score");

  constructor(scene: Scene) {
    scene.add(...createLights());

    const base = makeBoxMesh(5, 5, "#754d1c");

    base.position.y -= 1;

    this.cubes.push(base);

    scene.add(base);
    this.scene = scene;
  }

  public startGame() {
    if (!this.state.started) {
      this.state.started = true;

      document.addEventListener("keydown", this.handleSpace);

      const box = makeFrom(this.cubes[0], "#0f0");
      // const box = makeBox(5, 5, "#0f0");
      this.currentBox = box;

      this.scene.add(box.mesh);
    }
  }

  handleSpace = (e: KeyboardEvent) => {
    if (e.key === " " && this.currentBox !== null) {
      const {mesh: box} = this.currentBox;
      this.currentBox = null;
      
      const size = resizeBox(box, this.cubes[this.cubes.length-1]);

      if (size <= 0){
        this.scene.remove(box);
        this.endGame()
      } else {
        this.cubes.push(box);
        this.cubes.forEach(c=>c.position.y-=BOX_HEIGHT)

        this.currentBox = makeFrom(box, "#0f0");

        this.scene.add(this.currentBox.mesh);
        
        this.scoreEl.textContent = (++this.state.stacked).toString();
      }
    }
  };

  public endGame(){
    this.state.started = false;
    alert(`Game ended\nYou stacked ${this.state.stacked} points`)
  }

  public update() {
    if (this.state.started) {
      if (this.currentBox != null) {
        this.currentBox.update();
      }
    }
  }
}

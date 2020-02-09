import { BoxGeometry, FrontSide, Mesh, MeshStandardMaterial, Sphere, SphereGeometry, MeshBasicMaterial, Geometry } from "three";

export const BOX_HEIGHT = 1;
export interface IBox {
  mesh: Mesh,
  update: ()=>void;
}

export function makeBoxMesh(width: number, depth: number, color: string): Mesh {
  const material = new MeshStandardMaterial({
    color
  });
  const box = new Mesh(new BoxGeometry(width, BOX_HEIGHT, depth), material);
  return box;
}

export function makeFrom(copied: Mesh, color: string): IBox {
  const {width, depth} = (copied.geometry as BoxGeometry).parameters
  const box = makeBoxMesh(width, depth, color);

  box.position.z = copied.position.z

  return {
    mesh: box,
    update: makeUpdate(box)
  }
}

const makeUpdate = (mesh: Mesh)=>{
  let i = 0;
  const a = (mesh.geometry as BoxGeometry).parameters.depth+1;
  const baseZ = mesh.position.z;
  return ()=>{
    mesh.position.z = a*Math.sin(i) +baseZ;

    i+=0.025
  }
}

export function resizeBox(box: Mesh, maskedBy: Mesh): number {
  const {depth, width} = (box.geometry as BoxGeometry).parameters;  
  const depthDiff = (box.position.z - maskedBy.position.z);
  let newDepth = depth- Math.abs(depthDiff);

  if(newDepth< 0) newDepth = 0;

  const newGeo = new BoxGeometry(width, BOX_HEIGHT, newDepth)
  box.geometry = newGeo;
  box.position.z -= depthDiff/2;
  
  return newDepth;
}
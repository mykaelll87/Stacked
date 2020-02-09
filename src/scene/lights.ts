import { Object3D, AmbientLight, DirectionalLight } from 'three';

export default function makeLights(): Object3D[] {

  const ambiant = new AmbientLight(0xffffff, .4);

  const topLight = new DirectionalLight("#fffaf4");
  topLight.position.set(2,7,3);

  return [ambiant, topLight];
}
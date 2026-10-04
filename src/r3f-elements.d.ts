import { Object3DNode } from '@react-three/fiber'
import { Color } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      color: Object3DNode<Color, typeof Color>;
    }
  }
}

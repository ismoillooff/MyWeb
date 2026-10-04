import { Object3DNode } from '@react-three/fiber'
import { Color } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      color: Object3DNode<Color, typeof Color>;
    }
  }
}

declare module 'next-themes' {
  export const ThemeProvider: any;
  export const useTheme: () => {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    resolvedTheme: string | undefined;
    systemTheme: string | undefined;
  };
}

import 'react'

declare module 'react' {
  interface ReactNode {}
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {}
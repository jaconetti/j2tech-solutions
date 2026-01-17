import {ReactNode} from 'react'

type Props = {
  children: ReactNode
}

// Since we have a root layout, it must pass children through
// The actual HTML structure is in app/[locale]/layout.tsx
export default function RootLayout({children}: Props) {
  return children
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  // The /work route uses the global Navbar and Footer from the root layout.
  // VaultGrid has its own sub-header filter bar that sits below the Navbar.
  return <>{children}</>
}

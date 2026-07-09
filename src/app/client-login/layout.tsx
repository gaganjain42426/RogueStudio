export default function ClientLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
      />
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#131313]">
      {children}
    </div>
    </>
  )
}

export default function ClientLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#131313]">
      {children}
    </div>
  )
}

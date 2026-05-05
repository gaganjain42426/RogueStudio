'use client'

export function DownloadPDFButton() {
  const handleDownload = () => {
    window.print()
  }

  return (
    <button
      onClick={handleDownload}
      data-print-hide="true"
      className="flex items-center gap-2 border border-[#C8A96E] text-[#C8A96E] font-bold px-6 py-3 rounded-full hover:bg-[#C8A96E] hover:text-black transition-all duration-300 text-sm"
    >
      <span className="material-symbols-outlined text-base leading-none select-none">
        download
      </span>
      Download Portfolio PDF
    </button>
  )
}

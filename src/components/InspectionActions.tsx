'use client'

import { Download, Printer } from 'lucide-react'

interface InspectionActionsProps {
  printText: string
  downloadText: string
}

export default function InspectionActions({ printText, downloadText }: InspectionActionsProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Download report')
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
      >
        <Printer className="h-4 w-4" />
        {printText}
      </button>
      <button
        onClick={handleDownload}
        className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-medium"
      >
        <Download className="h-4 w-4" />
        {downloadText}
      </button>
    </div>
  )
}


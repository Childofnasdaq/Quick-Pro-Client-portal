export function CandlestickIcon({ className }: { className?: string }) {
  return (
    <div className={`${className} grid grid-cols-5 gap-2`}>
      {/* Green (Buy) Candlestick */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-4 bg-blue-500" />
        <div className="w-4 h-6 bg-blue-500 rounded-sm" />
        <div className="w-0.5 h-3 bg-blue-500" />
      </div>
      {/* Red (Sell) Candlestick */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-3 bg-red-500" />
        <div className="w-4 h-6 bg-red-500 rounded-sm" />
        <div className="w-0.5 h-4 bg-red-500" />
      </div>
      {/* Blue (Buy) Candlestick */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-5 bg-blue-500" />
        <div className="w-4 h-4 bg-blue-500 rounded-sm" />
        <div className="w-0.5 h-2 bg-blue-500" />
      </div>
      {/* Red (Sell) Candlestick */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-2 bg-red-500" />
        <div className="w-4 h-5 bg-red-500 rounded-sm" />
        <div className="w-0.5 h-4 bg-red-500" />
      </div>
      {/* Blue (Buy) Candlestick */}
      <div className="flex flex-col items-center">
        <div className="w-0.5 h-4 bg-blue-500" />
        <div className="w-4 h-6 bg-blue-500 rounded-sm" />
        <div className="w-0.5 h-3 bg-blue-500" />
      </div>
    </div>
  )
}

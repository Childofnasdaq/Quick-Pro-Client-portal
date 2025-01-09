'use client'

import { useEffect, useRef } from 'react'

interface Candle {
  time: number
  open: number
  high: number
  low: number
  close: number
}

interface Trade {
  time: number
  type: 'buy' | 'sell'
  price: number
}

export function CandlestickChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Sample data - in a real app, this would come from your API
  const candles: Candle[] = [
    { time: 0, open: 100, high: 110, low: 95, close: 105 },
    { time: 1, open: 105, high: 115, low: 100, close: 95 },
    { time: 2, open: 95, high: 100, low: 90, close: 98 },
    { time: 3, open: 98, high: 105, low: 95, close: 102 },
    { time: 4, open: 102, high: 108, low: 100, close: 103 },
  ]

  const trades: Trade[] = [
    { time: 1, type: 'buy', price: 102 },
    { time: 2, type: 'sell', price: 98 },
    { time: 4, type: 'buy', price: 103 },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Calculate scales
    const prices = candles.flatMap(c => [c.high, c.low])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    const candleWidth = 40
    const spacing = 20
    const chartWidth = canvas.width / window.devicePixelRatio
    const chartHeight = canvas.height / window.devicePixelRatio

    // Draw candles
    candles.forEach((candle, i) => {
      const x = i * (candleWidth + spacing) + spacing
      const y = chartHeight - ((candle.close - minPrice) / priceRange) * chartHeight

      // Draw candlestick body
      ctx.fillStyle = candle.close > candle.open ? '#22c55e' : '#ef4444'
      ctx.fillRect(
        x,
        chartHeight - ((Math.max(candle.open, candle.close) - minPrice) / priceRange) * chartHeight,
        candleWidth,
        Math.abs(((candle.close - candle.open) / priceRange) * chartHeight)
      )

      // Draw wicks
      ctx.beginPath()
      ctx.strokeStyle = '#666'
      ctx.moveTo(x + candleWidth / 2, chartHeight - ((candle.high - minPrice) / priceRange) * chartHeight)
      ctx.lineTo(x + candleWidth / 2, chartHeight - ((Math.max(candle.open, candle.close) - minPrice) / priceRange) * chartHeight)
      ctx.moveTo(x + candleWidth / 2, chartHeight - ((Math.min(candle.open, candle.close) - minPrice) / priceRange) * chartHeight)
      ctx.lineTo(x + candleWidth / 2, chartHeight - ((candle.low - minPrice) / priceRange) * chartHeight)
      ctx.stroke()
    })

    // Draw trade signals
    trades.forEach(trade => {
      const x = trade.time * (candleWidth + spacing) + spacing + candleWidth / 2
      const y = chartHeight - ((trade.price - minPrice) / priceRange) * chartHeight

      ctx.beginPath()
      ctx.fillStyle = trade.type === 'buy' ? '#3b82f6' : '#ef4444'
      
      if (trade.type === 'buy') {
        // Draw triangle pointing up
        ctx.moveTo(x, y - 10)
        ctx.lineTo(x - 5, y)
        ctx.lineTo(x + 5, y)
      } else {
        // Draw triangle pointing down
        ctx.moveTo(x, y + 10)
        ctx.lineTo(x - 5, y)
        ctx.lineTo(x + 5, y)
      }
      
      ctx.fill()
    })

  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px]"
      style={{ width: '100%', height: 400 }}
    />
  )
}

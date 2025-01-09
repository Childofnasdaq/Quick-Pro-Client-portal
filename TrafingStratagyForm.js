'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEAStore, type TradingSymbol } from '@/lib/stores/ea-store'
import { EAIconUpload } from './ea-icon-upload'

export function TradingStrategyForm({ id }: { id?: string }) {
  const router = useRouter()
  const ea = useEAStore((state) => id ? state.getEA(id) : undefined)
  const addEA = useEAStore((state) => state.addEA)
  const updateEA = useEAStore((state) => state.updateEA)
  const deleteEA = useEAStore((state) => state.deleteEA)

  const [strategyName, setStrategyName] = useState(ea?.strategyName || '')
  const [ownerName, setOwnerName] = useState(ea?.ownerName || '')
  const [description, setDescription] = useState(ea?.description || '')
  const [image, setImage] = useState(ea?.image || '')
  const [symbols, setSymbols] = useState<TradingSymbol[]>(ea?.symbols || [])
  const [newSymbol, setNewSymbol] = useState('')
  const [volatility, setVolatility] = useState('0.01')

  const handleAddSymbol = () => {
    if (newSymbol) {
      setSymbols([
        ...symbols,
        {
          id: Math.random().toString(36).substring(7),
          name: newSymbol.toUpperCase(),
          volatility: parseFloat(volatility),
        },
      ])
      setNewSymbol('')
      setVolatility('0.01')
    }
  }

  const handleRemoveSymbol = (id: string) => {
    setSymbols(symbols.filter((symbol) => symbol.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      strategyName,
      ownerName,
      description,
      image: image || '/placeholder.svg?height=200&width=400',
      symbols,
    }

    if (id) {
      updateEA(id, data)
    } else {
      addEA(data)
    }
    router.push('/dashboard/eas')
  }

  const handleDelete = () => {
    if (id) {
      deleteEA(id)
      router.push('/dashboard/eas')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start gap-6">
        <EAIconUpload
          currentIcon={image}
          onIconChange={(iconUrl) => setImage(iconUrl)}
        />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="strategyName">Strategy Name</Label>
            <Input
              id="strategyName"
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner Name</Label>
            <Input
              id="ownerName"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Label>Trading Symbols</Label>
        <div className="flex flex-wrap gap-2">
          {symbols.map((symbol) => (
            <div
              key={symbol.id}
              className="flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1"
            >
              <span className="text-sm text-purple-600">{symbol.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveSymbol(symbol.id)}
                className="text-purple-600 hover:text-purple-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add new symbol (eg. EURUSD)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
          />
          <Input
            type="number"
            step="0.01"
            min="0.01"
            value={volatility}
            onChange={(e) => setVolatility(e.target.value)}
            className="w-24"
          />
          <Button type="button" onClick={handleAddSymbol}>
            Add Symbol
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Save Changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/eas')}
        >
          Cancel
        </Button>
        {id && (
          <Button
            type="button"
            variant="destructive"
            className="ml-auto"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </form>
  )
              }

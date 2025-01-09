import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { EA } from '@/lib/stores/ea-store'

export function EAProfileCard({ ea }: { ea: EA }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={ea.image || '/placeholder.svg?height=200&width=400'}
            alt={ea.strategyName}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{ea.strategyName}</h3>
        <p className="text-sm text-gray-500">{ea.ownerName}</p>
        <p className="mt-2 text-sm">{ea.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {ea.symbols.map((symbol) => (
            <span
              key={symbol.id}
              className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-600"
            >
              {symbol.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

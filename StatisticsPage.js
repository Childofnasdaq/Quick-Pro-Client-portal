'use client'

import { BarChart, LineChart } from 'lucide-react'
import ProtectedLayout from '@/components/layouts/protected-layout'
import { useEAStore } from '@/lib/stores/ea-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function StatsPage() {
  const eas = useEAStore((state) => state.eas)

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <h1 className="text-2xl font-bold">Trading Statistics</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {eas.map((ea) => (
            <Card key={ea.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {ea.strategyName}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <BarChart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,350.25</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  )
}

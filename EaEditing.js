import ProtectedLayout from '@/components/layouts/protected-layout'
import { TradingStrategyForm } from '@/components/trading-strategy-form'

export default function EditEAPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Edit Trading Strategy</h1>
        <TradingStrategyForm id={params.id} />
      </div>
    </ProtectedLayout>
  )
}

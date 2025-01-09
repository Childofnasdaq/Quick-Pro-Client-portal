import ProtectedLayout from '@/components/layouts/protected-layout'
import { TradingStrategyForm } from '@/components/trading-strategy-form'

export default function NewEAPage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold">Create New Trading Strategy</h1>
        <TradingStrategyForm />
      </div>
    </ProtectedLayout>
  )
}

import ProtectedLayout from "@/components/layouts/protected-layout"

export default function PurchasePage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">Purchase Keys</h1>
        <div className="mt-6 rounded-lg border bg-white p-6">
          <div className="space-y-4">
            <p className="text-lg">Purchase additional license keys for your EAs:</p>
            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="font-medium">Payment Details:</p>
              <p>Skrill Account: childofnasdaq@gmail.com</p>
              <p>Amount per key: R300</p>
            </div>
            <p className="text-sm text-gray-500">
              After payment, your license keys will be generated and available in your dashboard.
            </p>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  )
}

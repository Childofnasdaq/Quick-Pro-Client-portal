import ProtectedLayout from "@/components/layouts/protected-layout"

export default function HelpPage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <div className="mt-6 space-y-6">
          <section className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold">Contact Support</h2>
            <p className="mt-2 text-gray-600">
              For any questions or assistance, please contact us at:
              help@childofnasdaqservices.co.za
            </p>
          </section>
          
          <section className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold">FAQ</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium">How do I activate my license key?</h3>
                <p className="text-gray-600">
                  After purchase, your license key will be automatically activated and available in your dashboard.
                </p>
              </div>
              <div>
                <h3 className="font-medium">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We currently accept payments through Skrill.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ProtectedLayout>
  )
}

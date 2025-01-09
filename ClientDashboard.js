'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAuthStore } from '@/lib/stores/auth-store'
import { ProtectedLayout } from '@/components/layouts/protected-layout'

function PaymentInstructions() {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account Activation Required</DialogTitle>
          <DialogDescription>
            To activate your account, please follow these steps:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>1. Send R600 to activate your account and receive 2 license keys.</p>
          <div className="rounded-lg border bg-gray-50 p-4">
            <p className="font-medium">Payment Details:</p>
            <p>Skrill Account: childofnasdaq@gmail.com</p>
            <p>Amount: R600</p>
          </div>
          <p>
            2. After payment, your account will be reviewed and activated within 24
            hours.
          </p>
          <p className="text-sm text-gray-500">
            Each license key costs R300. The initial payment includes 2 keys.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function StatCard({
  title,
  value,
  description,
  className,
}: {
  title: string
  value: string | number
  description: string
  className?: string
}) {
  return (
    <div className={`rounded-3xl p-6 text-white ${className}`}>
      <h3 className="text-xl font-light">{title}</h3>
      <p className="mt-4 text-5xl font-light">{value}</p>
      <p className="mt-2 text-lg font-light">{description}</p>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const currentUser = useAuthStore((state) => state.currentUser)
  const markAsPaid = useAuthStore((state) => state.markAsPaid)

  useEffect(() => {
    if (!currentUser) {
      router.push('/')
    }
  }, [currentUser, router])

  if (!currentUser) return null

  const handleMarkAsPaid = () => {
    if (currentUser) {
      markAsPaid(currentUser.id)
    }
  }

  if (currentUser.status === 'pending') {
    return (
      <ProtectedLayout>
        <PaymentInstructions />
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-lg border bg-yellow-50 p-4">
            <p className="text-yellow-800">
              Your account is pending activation. Please complete the payment to
              continue.
            </p>
            <Button
              className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600"
              onClick={handleMarkAsPaid}
            >
              I&apos;ve Made the Payment
            </Button>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  if (currentUser.status === 'pending_approval') {
    return (
      <ProtectedLayout>
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-lg border bg-blue-50 p-4">
            <p className="text-blue-800">
              Thank you for your payment. Your account is pending approval from an
              administrator.
            </p>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  if (currentUser.status === 'rejected') {
    return (
      <ProtectedLayout>
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-lg border bg-red-50 p-4">
            <p className="text-red-800">
              Your account has been rejected. Please contact support for
              assistance.
            </p>
          </div>
        </div>
      </ProtectedLayout>
    )
  }

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StatCard
            title="Total Licences"
            value={currentUser.licenseKeys.length}
            description="All time EA users."
            className="bg-blue-400"
          />
          <StatCard
            title="Active Licences"
            value={currentUser.licenseKeys.length}
            description="Current EA users."
            className="bg-indigo-600"
          />
          <StatCard
            title="Total EAs"
            value="2"
            description="All EAs you are Licencing"
            className="bg-blue-500"
          />
          <StatCard
            title="Maximum Licences"
            value="100"
            description="Total licences You can generate"
            className="bg-red-400"
          />
        </div>

        {currentUser.licenseKeys.length > 0 && (
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">Your License Keys</h2>
            <div className="space-y-2">
              {currentUser.licenseKeys.map((key, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm font-mono">{key}</code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(key)}
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedLayout>
  )
    }

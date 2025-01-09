'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EAProfileCard } from '@/components/ea-profile-card'
import ProtectedLayout from '@/components/layouts/protected-layout'
import { useEAStore } from '@/lib/stores/ea-store'

export default function EAsPage() {
  const eas = useEAStore((state) => state.eas)

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Expert Advisors</h1>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <Link href="/dashboard/eas/new">
              <Plus className="mr-2 h-4 w-4" />
              New EA
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eas.map((ea) => (
            <Link key={ea.id} href={`/dashboard/eas/${ea.id}`}>
              <EAProfileCard ea={ea} />
            </Link>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  )
}

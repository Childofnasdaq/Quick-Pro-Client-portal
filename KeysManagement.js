import ProtectedLayout from "@/components/layouts/protected-layout"
import { LicenseList } from "@/components/license-list"

export default function KeysPage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl">
        <LicenseList />
      </div>
    </ProtectedLayout>
  )
}

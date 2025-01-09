'use client'

import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useLicenseStore } from '@/lib/stores/license-store'
import { CreateLicenseModal } from './create-license-modal'

export function LicenseList() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const licenses = useLicenseStore((state) => state.licenses)
  const toggleStatus = useLicenseStore((state) => state.toggleStatus)

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      license.email.toLowerCase().includes(search.toLowerCase()) ||
      license.username.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === 'all' || license.status === filter
    return matchesSearch && matchesFilter
  })

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">License Management</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          Add New License
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search licenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        {filteredLicenses.map((license) => (
          <div
            key={license.id}
            className="flex items-center justify-between border-b p-4 last:border-0"
          >
            <div className="space-y-1">
              <p className="font-medium">{license.username}</p>
              <p className="text-sm text-gray-500">{license.email}</p>
              <div className="flex items-center gap-2">
                <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                  {license.key}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(license.key)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Switch
                checked={license.status === 'active'}
                onCheckedChange={() => toggleStatus(license.id)}
              />
              <span className="text-sm">
                {license.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <CreateLicenseModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
            }

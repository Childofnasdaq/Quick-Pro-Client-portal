import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type License = {
  id: string
  username: string
  email: string
  key: string
  status: 'active' | 'inactive'
  duration: string
  createdAt: string
}

type LicenseStore = {
  licenses: License[]
  addLicense: (license: Omit<License, 'id' | 'key' | 'createdAt'>) => void
  toggleStatus: (id: string) => void
  getTotalLicenses: () => number
  getActiveLicenses: () => number
}

export const useLicenseStore = create<LicenseStore>()(
  persist(
    (set, get) => ({
      licenses: [],
      addLicense: (license) => {
        const id = Math.random().toString(36).substring(7)
        const key = generateLicenseKey()
        set((state) => ({
          licenses: [
            ...state.licenses,
            {
              ...license,
              id,
              key,
              createdAt: new Date().toISOString(),
            },
          ],
        }))
      },
      toggleStatus: (id) =>
        set((state) => ({
          licenses: state.licenses.map((license) =>
            license.id === id
              ? {
                  ...license,
                  status: license.status === 'active' ? 'inactive' : 'active',
                }
              : license
          ),
        })),
      getTotalLicenses: () => get().licenses.length,
      getActiveLicenses: () =>
        get().licenses.filter((license) => license.status === 'active').length,
    }),
    {
      name: 'license-storage',
    }
  )
)

function generateLicenseKey() {
  const randomPart = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase()
  return `QUI-CK-PRO-${randomPart}`
}

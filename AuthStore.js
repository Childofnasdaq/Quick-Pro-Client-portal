import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = {
  id: string
  email: string
  status: 'pending' | 'pending_approval' | 'approved' | 'rejected'
  paymentStatus: 'unpaid' | 'paid'
  paymentAmount: number
  createdAt: string
  licenseKeys: string[]
}

function generateLicenseKey() {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `QUI-CK-PRO-${timestamp}-${random}`
}

type AuthStore = {
  users: User[]
  currentUser: User | null
  addUser: (email: string, password: string) => User
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  login: (email: string, password: string) => User | null
  logout: () => void
  markAsPaid: (id: string) => void
  approveUser: (id: string) => void
  rejectUser: (id: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      addUser: (email, password) => {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          status: 'pending',
          paymentStatus: 'unpaid',
          paymentAmount: 0,
          createdAt: new Date().toISOString(),
          licenseKeys: [],
        }
        set((state) => ({ users: [...state.users, user] }))
        return user
      },
      updateUser: (id, updates) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...updates } : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, ...updates }
              : state.currentUser,
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
        })),
      login: (email, password) => {
        const user = get().users.find((u) => u.email === email)
        if (user) {
          set({ currentUser: user })
          return user
        }
        return null
      },
      logout: () => set({ currentUser: null }),
      markAsPaid: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id
              ? {
                  ...user,
                  paymentStatus: 'paid',
                  paymentAmount: 600,
                  status: 'pending_approval',
                }
              : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? {
                  ...state.currentUser,
                  paymentStatus: 'paid',
                  paymentAmount: 600,
                  status: 'pending_approval',
                }
              : state.currentUser,
        })),
      approveUser: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id
              ? {
                  ...user,
                  status: 'approved',
                  licenseKeys: [generateLicenseKey(), generateLicenseKey()],
                }
              : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? {
                  ...state.currentUser,
                  status: 'approved',
                  licenseKeys: [generateLicenseKey(), generateLicenseKey()],
                }
              : state.currentUser,
        })),
      rejectUser: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, status: 'rejected' } : user
          ),
          currentUser:
            state.currentUser?.id === id
              ? { ...state.currentUser, status: 'rejected' }
              : state.currentUser,
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
)

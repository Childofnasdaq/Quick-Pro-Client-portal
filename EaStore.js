import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TradingSymbol = {
  id: string
  name: string
  volatility: number
}

export type EA = {
  id: string
  strategyName: string
  ownerName: string
  description: string
  image: string
  symbols: TradingSymbol[]
  createdAt: string
}

type EAStore = {
  eas: EA[]
  addEA: (ea: Omit<EA, 'id' | 'createdAt'>) => void
  updateEA: (id: string, ea: Partial<EA>) => void
  deleteEA: (id: string) => void
  getEA: (id: string) => EA | undefined
}

export const useEAStore = create<EAStore>()(
  persist(
    (set, get) => ({
      eas: [],
      addEA: (ea) => {
        const id = Math.random().toString(36).substring(7)
        set((state) => ({
          eas: [
            ...state.eas,
            {
              ...ea,
              id,
              createdAt: new Date().toISOString(),
            },
          ],
        }))
      },
      updateEA: (id, ea) =>
        set((state) => ({
          eas: state.eas.map((existing) =>
            existing.id === id ? { ...existing, ...ea } : existing
          ),
        })),
      deleteEA: (id) =>
        set((state) => ({
          eas: state.eas.filter((ea) => ea.id !== id),
        })),
      getEA: (id) => get().eas.find((ea) => ea.id === id),
    }),
    {
      name: 'ea-storage',
    }
  )
)

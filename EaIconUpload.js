'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function EAIconUpload({
  currentIcon,
  onIconChange,
}: {
  currentIcon?: string
  onIconChange: (iconUrl: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreviewUrl(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (previewUrl) {
      onIconChange(previewUrl)
      setIsOpen(false)
      setPreviewUrl(null)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative h-32 w-32 rounded-full border-2 border-dashed"
      >
        {currentIcon ? (
          <Image
            src={currentIcon}
            alt="EA Icon"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-6 w-6" />
            <span className="text-sm">Upload Icon</span>
          </div>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload EA Icon</DialogTitle>
            <DialogDescription>
              Choose an icon for your Expert Advisor
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative h-40 w-40 rounded-full border-2 border-dashed">
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">No file chosen</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="icon-upload"
              />
              <label htmlFor="icon-upload">
                <Button variant="outline" className="w-full" asChild>
                  <span>Choose File</span>
                </Button>
              </label>
              <Button
                onClick={handleSave}
                disabled={!previewUrl}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Save Icon
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

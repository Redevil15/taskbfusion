"use client"

import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { defaultImages } from "@/constants/images"

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({
  id,
  errors
}: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'], // Collecion de donde se sacaran las fotos random
          count: 9
        });

        if (result && result.response) {
          const newImages = (result.response as Array<Record<string, any>>);
          setImages(newImages);
        } else {
          console.error("Failed to get images from unsplash")
        }


      } catch (error) {
        console.log(error)
        setImages(defaultImages)
      } finally {
        setIsLoading(false)
      }
    };

    fetchImages();
  }, [])

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader
          className="h-6 w-6 text-sky-700 animate-spin"
        />
      </div>
    )
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) {
                return;
              }
              setSelectedImageId(image.id)
            }}
          >
            <Image
              alt="unsplash image"
              src={image.urls.thumb}
              fill
              className="object-cover rounded-sm"
            />
          </div>
        ))}

      </div>
      Form picker!
    </div>
  )
}
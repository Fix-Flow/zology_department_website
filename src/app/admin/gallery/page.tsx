import GalleryUploadForm from "@/components/admin/forms/GalleryUploadForm";
import AdminModal from "@/components/admin/AdminModal";
import Link from "next/link";
import { Plus, Image as ImageIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteGalleryImageButton from "@/components/admin/buttons/DeleteGalleryImageButton";


export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<{ [key: string]: string | undefined }> };
  export default async function AdminGalleryPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const isNew = searchParams.new === 'true';
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div data-component="Gallery_page" className="space-y-6 w-full max-w-full">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-govt-text">
            Photo Gallery
          </h1>
          <p className="text-sm text-govt-muted mt-0.5">
            Manage department photos and campus pictures
          </p>
      </div>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl border border-govt-border p-12 text-center text-govt-muted">
          <ImageIcon size={32} className="mx-auto mb-3 text-govt-muted/40" />
          <p>No images in gallery.</p>
          <Link
            href="?new=true"
            className="text-primary hover:underline mt-1 inline-block text-sm"
          >
            Upload your first image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-neutral-bg border border-govt-border rounded-xl overflow-hidden aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt || "Gallery image"}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="inline-block px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded capitalize mb-1">
                  {image.category.toLowerCase()}
                </span>
                {image.alt && (
                  <p className="text-white text-xs line-clamp-2">
                    {image.alt}
                  </p>
                )}
              </div>
              <DeleteGalleryImageButton id={image.id} />
            </div>
          ))}
        </div>
      )}
    
      {isNew && (
        <AdminModal returnTo="/admin/gallery">
          <GalleryUploadForm />
        </AdminModal>
      )}
    </div>
  );
}

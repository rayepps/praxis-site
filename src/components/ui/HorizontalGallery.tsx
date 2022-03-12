

export default function HorizontalGallery({
  images
}: {
  images: string[]
}) {
  return (
    <div
      className="flex flex-row overflow-x-scroll"
    >
      {(images ?? []).map((imageUrl, i) => (
        <img key={imageUrl} className="rounded h-52 w-auto mr-4" src={imageUrl} />  
      ))}
    </div>
  )
}
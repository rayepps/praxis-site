export default function Meta({ 
  title,
  description,
  thumbnailUrl 
}: {
  title: string
  description: string
  thumbnailUrl: string 
}) {
  return (
    <>
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta property="og:type" content="website" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={thumbnailUrl} property="og:image" />
      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={thumbnailUrl} property="twitter:image" />
      <meta content="@praxiscous" name="twitter:creator" />
      <meta content={description} name="twitter:card" />
    </>
  )
}

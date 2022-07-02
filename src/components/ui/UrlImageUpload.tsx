import _ from 'radash'
import * as t from 'src/types'
import { useState } from 'react'
import { HiOutlineCloudUpload, HiOutlineUpload, HiX } from 'react-icons/hi'
import imagekit from 'src/imagekit'

type UploadedAsset = {
  id: string | null
  url: string | null
  loading: boolean
  pending: boolean
}

export default function UrlImageUpload({
  onUpload,
  onRemove,
  initial,
  preview = true,
  columns = 2
}: {
  onUpload?: (asset: t.Asset) => void
  onRemove?: (asset: t.Asset) => void
  initial?: t.Asset
  preview?: boolean
  columns?: 1 | 2 | 3 | 4
}) {
  const [url, setUrl] = useState('')
  const [asset, setAsset] = useState<UploadedAsset | null>(
    initial
      ? {
          id: initial.id,
          url: initial.url,
          loading: false,
          pending: false
        }
      : null
  )

  const upload = async () => {
    setAsset({
      url: null,
      id: null,
      loading: false,
      pending: false
    })
    const [result] = await imagekit.upload.url([url])
    setAsset({
      url: result.url,
      id: result.id,
      loading: false,
      pending: false
    })
    onUpload?.({
      url: result.url,
      id: result.id
    })
  }

  const removeAsset = () => {
    if (!asset) return
    setAsset(null)
    onRemove?.({
      url: asset.url!,
      id: asset.id!
    })
  }

  return (
    <div>
      <div className="flex flex-row items-stretch">
        <input
          onChange={e => setUrl(e.target.value)}
          value={url}
          type="text"
          name="image_url"
          placeholder="https://warriorpoetsupplyco.com/assets/john-fighting.jpg"
          className="grow p-2 border-y border-l border-slate-200 rounded"
        />
        <button onClick={upload} className="bg-blue-600 rounded-r p-2">
          <HiOutlineCloudUpload size={26} className="text-white" />
        </button>
      </div>
      {preview && asset && (
        <div className={`grid grid-cols-${columns} gap-2 mt-2`}>
          <div key={asset.id} className="relative bg-slate-200">
            {!asset.loading && <img className="w-full h-28 object-contain object-center" src={asset.url ?? ''} />}
            {asset.loading && <span>loading...</span>}
            <div
              className="absolute bg-black-opaque p-1 top-0 right-0 inline-block hover:bg-black hover:cursor-pointer"
              onClick={removeAsset}
            >
              <HiX className="text-slate-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

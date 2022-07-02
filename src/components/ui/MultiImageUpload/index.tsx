import _ from 'radash'
import * as t from 'src/types'

import { ChangeEventHandler, useState } from 'react'
import { HiX } from 'react-icons/hi'
import imagekit from 'src/imagekit'
import { v4 as uuid } from 'uuid'

type FileAsset = {
  file: File | null
  loading: boolean
  url: string | null
  id: string
  pending: boolean
}

export default function MultiImageUpload({
  onUpload,
  onRemove,
  initial = [],
  preview = true,
  columns = 2
}: {
  onUpload?: (assets: t.Asset[]) => void
  onRemove?: (asset: t.Asset) => void
  initial?: t.Asset[]
  preview?: boolean
  columns?: 1 | 2 | 3 | 4
}) {
  const [assets, setAssets] = useState<Record<string, FileAsset>>(
    _.objectify(
      initial.map(init => ({
        id: init.id,
        url: init.url,
        file: null,
        loading: false,
        pending: false
      })),
      x => x.id,
      x => x
    )
  )

  const handleChange: ChangeEventHandler<HTMLInputElement> = async event => {
    const fileList = event.target.files
    if (!fileList) return
    const files = _.iter(fileList.length, (acc, idx) => [...acc, fileList[idx - 1]], [] as File[])
    let latestAssets: Record<string, FileAsset> = {
      ...assets,
      ..._.objectify(
        files.map(file => ({
          id: uuid(),
          loading: true,
          url: null,
          file,
          pending: true
        })),
        na => na.id,
        na => na
      )
    }
    setAssets(latestAssets)
    for (const newAsset of Object.values(latestAssets)) {
      const [result] = await imagekit.upload.file([newAsset.file!])
      latestAssets = _.shake({
        ...latestAssets,
        [newAsset.id]: undefined as any,
        [result.id]: {
          id: result.id,
          url: result.url,
          file: newAsset.file,
          loading: false
        }
      })
      setAssets(latestAssets)
    }
    onUpload?.(
      Object.values(latestAssets).map(fa => ({
        id: fa.id,
        url: fa.url ?? ''
      }))
    )
  }

  const removeAsset = (asset: FileAsset) => () => {
    const newAssets: Record<string, FileAsset> = _.shake({
      ...assets,
      [asset.id]: undefined as any
    })
    setAssets(newAssets)
    onRemove?.({
      url: asset.url!,
      id: asset.id
    })
  }

  return (
    <div>
      <form>
        {/* <input onChange={handleChange} accept="image/*" type="file" name="files[]" multiple /> */}
        <label className="w-full h-20 flex flex-row hover:cursor-pointer items-center justify-center border border-dashed border-slate-400 bg-slate-50 rounded-xl" htmlFor="multiupload">
          <span className="text-slate-400 font-semibold">Upload Images</span>
        </label>
        <input
          onChange={handleChange}
          id="multiupload"
          type="file"
          multiple
          name="files[]"
          accept="image/*"
          className="invisible"
        />
      </form>
      {preview && (
        <div className={`grid grid-cols-${columns} gap-2 mt-2`}>
          {Object.values(assets).map((asset, idx) => (
            <div key={asset.id} className="relative bg-slate-200">
              {!asset.loading && (
                <img key={idx} className="w-full h-28 object-contain object-center" src={asset.url ?? ''} />
              )}
              {asset.loading && <span>loading...</span>}
              <div
                className="absolute bg-black-opaque p-1 top-0 right-0 inline-block hover:bg-black hover:cursor-pointer"
                onClick={removeAsset(asset)}
              >
                <HiX className="text-slate-200" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

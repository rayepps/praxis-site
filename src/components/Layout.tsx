type AnyFunc = (props: any) => any

/**
 * flex-direction: row
 */
export const Split: AnyFunc = ({ className = '', ...rest }: JSX.IntrinsicElements['div']) => (
  <div className={`${className} flex flex-row`} {...rest} />
)

/**
 * flex-direction: column
 */
export const Stack: AnyFunc = ({ className = '', ...rest }: JSX.IntrinsicElements['div']) => (
  <div className={`${className} flex flex-col`} {...rest} />
)

/**
 * align: center center
 */
export const Center: AnyFunc = ({ className = '', ...rest }: JSX.IntrinsicElements['div']) => (
  <div className={`${className} flex flex-col items-center justify-center`} {...rest} />
)

export const Axis: AnyFunc = (
  props: JSX.IntrinsicElements['div'] & {
    stack?: boolean
    split?: boolean
  }
) => {
  const { stack, split, ...rest } = props
  if (stack) return <Stack {...rest} />
  if (split) return <Split {...rest} />
  return <div {...rest} />
}

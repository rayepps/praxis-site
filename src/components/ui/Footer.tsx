import PraxisBox from '../svg/PraxisBox'
import { Split } from '../Layout'
import theme from 'src/theme'

export default function Footer() {
  return (
    <Split className="p-4 text-white bg-black">
      <div>
        <span className="text-lg text-white">Praxis Co.</span>
        <p className="mb-4 text-base max-w-sm">
          The difference between theory and practice. It's time to stop thinking you're ready. Get up, get out, and get
          trained.
        </p>
        <PraxisBox color={theme.colors.white.hex()} height={100} />
      </div>
    </Split>
  )
}

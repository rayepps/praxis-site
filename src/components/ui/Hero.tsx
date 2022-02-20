import { majorScale, Pane, Heading } from 'evergreen-ui'
import { Center } from 'src/components/Layout'
import theme from 'src/theme'

export default function Hero({
  text,
  backgroundImage,
  align = 'center'
}: {
  text: string
  backgroundImage: string
  align?: 'top' | 'bottom' | 'center'
}) {
  const content = (
    <Pane padding={majorScale(2)} backgroundColor={theme.colors.white.alpha(0.5).rgb().string()}>
      <Heading size={900}>{text} Trainings</Heading>
    </Pane>
  )
  return (
    <Center
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition={align}
      backgroundRepeat="no-repeat"
      minHeight="85vh"
    >
      {content}
    </Center>
  )
}

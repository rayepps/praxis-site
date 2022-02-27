import { Center } from '../Layout'

export default function AboutScene() {
  return (
    <Center className="py-4">
      <Center maxWidth={800}>
        <span className="text-center text-lg">Who We Are</span>
        <h2 className="text-center text-lg mb-2">Curating Badass Factories</h2>
        <p className="max-w-lg px-4">
          We bring all the great training companies in the USA to you. We find them, we make sure they're tier one, and
          we list their trainings here where they're easy to search and sort. Our goal is to make quality training more
          available. There are dozens of tactical companies in each state. Many of them travel. Many of them have awful
          websites. This does not work for the current and coming generations. We are your one stop shop to find a
          training near you on the date you need.We're based in the Treasure Valley of Idaho.
        </p>
      </Center>
    </Center>
  )
}

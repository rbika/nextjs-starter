import { Container } from '@/components/container'

const AppPage = () => {
  return (
    <Container className="mt-5">
      <strong>Protected route</strong>: only authenticated users can access
      routes under <code>/app</code>.
    </Container>
  )
}

export default AppPage

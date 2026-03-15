import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { paths } from '@/utils/paths'

const NotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-2xl font-semibold">
          404 - Not Found
        </EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>
          <Link href={paths.home()}>Go home</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export default NotFound

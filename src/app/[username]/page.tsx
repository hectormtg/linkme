import Header from './Header'
import Preview from './Preview'

export default function Home() {
  return (
    <main className='h-screen flex flex-col gap-6 p-4 md:p-6 items-center relative'>
      <div className='hidden md:block absolute top-0 right-0 left-0 rounded-b-[32px] bg-purple-main h-[40%] -z-[1] min-h-[364px]' />

      <Header />

      <Preview />
    </main>
  )
}

import { ReactNode } from 'react'

interface Item {
  title: string
  content: ReactNode
}

interface Props {
  items: Array<Item>
}

const Section = ({ items }: Props) => {
  return (
    <div className='flex flex-col bg-primary rounded-xl gap-4 px-4 py-6'>
      {items.map((item, index) => (
        <SectionItem
          key={index}
          item={item}
        />
      ))}
    </div>
  )
}

const SectionItem = ({ item }: { item: Item }) => {
  return (
    <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-8'>
      <span className='text-gray md:w-1/4 flex-shrink-0'>{item.title}</span>
      {item.content}
    </div>
  )
}

export default Section

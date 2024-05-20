import { SVGProps } from 'react'

const DragIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='6'
      fill={props.fill || 'inherit'}
      viewBox='0 0 12 6'
      {...props}
    >
      <path d='M0 0h12v1H0zM0 5h12v1H0z' />
    </svg>
  )
}

export default DragIcon

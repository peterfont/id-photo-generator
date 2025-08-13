import classNames from 'classnames'
import { HTMLAttributes, ReactElement, cloneElement } from 'react'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export interface CloseButtonProps extends HTMLAttributes<HTMLElement> {
  icon?: ReactElement
}

export function CloseButton({ className, icon, ...props }: CloseButtonProps) {
  return (
    <Box
      {...props}
      className={classNames(
        'relative flex items-center justify-center w-[40px] h-[40px] cursor-pointer sm:w-[48px] sm:h-[48px]',
        className
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 49 49"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.3649 0.180992C28.0196 -0.733814 34.7211 1.89323 39.7419 6.38811C45.07 11.1582 49.3197 17.7311 48.9811 24.9046C48.6526 31.8636 43.3118 37.1927 38.0731 41.7397C33.3088 45.875 27.6425 48.5057 21.3649 48.8747C14.6415 49.2699 6.92928 49.0124 2.58655 43.8257C-1.61927 38.8024 0.346728 31.4068 1.29547 24.9046C2.06367 19.6399 4.05683 14.9531 7.40045 10.8341C11.2431 6.10024 15.3512 1.0077 21.3649 0.180992Z"
          fill="rgba(0, 0, 0, 0.2)"
        />
      </svg>
      {icon ? (
        cloneElement(icon, {
          className: 'relative text-2xl text-white',
        })
      ) : (
        <CloseIcon className="relative text-2xl text-white" />
      )}
    </Box>
  )
}

export default CloseButton

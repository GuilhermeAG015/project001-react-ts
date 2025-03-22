import type { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean
}

export function Avatar({ hasBorder = true,  alt = 'avatar-img', ...props }: AvatarProps) {
  return (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      alt={alt}
      {...props}
    />
  )
}
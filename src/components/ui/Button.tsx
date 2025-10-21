import { ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fda932] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95',
      {
        'bg-gradient-to-r from-[#fda932] to-[#fcc530] text-white hover:from-[#fd9d31] hover:to-[#fda932] shadow-lg hover:shadow-xl': variant === 'primary',
        'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl': variant === 'secondary',
        'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#fda932] shadow-sm hover:shadow-md': variant === 'outline',
        'text-gray-700 hover:bg-gray-100 hover:text-[#fda932]': variant === 'ghost',
      },
      {
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4 text-sm': size === 'md',
        'h-12 px-6 text-base': size === 'lg',
      },
      className
    )

    // Temporarily disable asChild functionality to fix build
    // if (asChild && isValidElement(children)) {
    //   return cloneElement(children, {
    //     ...children.props,
    //     className: cn(baseClasses, children.props.className)
    //   })
    // }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }

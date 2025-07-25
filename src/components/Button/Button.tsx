import { forwardRef, ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-accent text-white hover:bg-digiqo-accent-light hover:shadow-accent hover:scale-105 focus:ring-digiqo-accent/30',
        secondary: 'bg-white text-digiqo-primary border-2 border-digiqo-primary hover:bg-digiqo-primary hover:text-white hover:shadow-digiqo focus:ring-digiqo-primary/30',
        ghost: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-digiqo-primary hover:shadow-lg focus:ring-white/30',
        subtle: 'bg-digiqo-primary/10 text-digiqo-primary hover:bg-digiqo-primary/20 hover:shadow-sm focus:ring-digiqo-primary/30',
        danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-600/30',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  animate?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      animate = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const MotionButton = motion.button
    
    const buttonContent = (
      <>
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </>
    )

    if (animate) {
      return (
        <MotionButton
          ref={ref}
          className={buttonVariants({ variant, size, fullWidth, className })}
          disabled={disabled || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          {...(props as HTMLMotionProps<"button">)}
        >
          {buttonContent}
        </MotionButton>
      )
    }

    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {buttonContent}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
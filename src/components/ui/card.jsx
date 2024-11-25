import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion"; // 애니메이션용

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "shadow-sm hover:shadow-md",
        outline: "border-2",
        ghost: "border-none shadow-none",
        elevated: "shadow-md hover:shadow-xl",
        interactive: "cursor-pointer hover:-translate-y-1 hover:shadow-lg",
        gradient: "bg-gradient-to-br from-primary/50 to-primary border-none text-white",
      },
      rounded: {
        default: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-3xl",
      },
      padding: {
        default: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      rounded: "default",
      padding: "default",
    },
  }
);

const Card = React.forwardRef(({ 
  className, 
  variant,
  rounded,
  padding,
  isAnimated = false,
  ...props 
}, ref) => {
  const Component = isAnimated ? motion.div : "div";
  const animationProps = isAnimated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(cardVariants({ variant, rounded, padding }), className)}
      {...animationProps}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ 
  className,
  compact = false,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      compact ? "p-4 space-y-1" : "p-6 space-y-1.5",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ 
  className,
  size = "default",
  ...props 
}, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-semibold leading-none tracking-tight",
      {
        "text-xl": size === "sm",
        "text-2xl": size === "default",
        "text-3xl": size === "lg",
      },
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ 
  className,
  compact = false,
  ...props 
}, ref) => (
  <div 
    ref={ref} 
    className={cn(
      compact ? "p-4 pt-0" : "p-6 pt-0",
      className
    )} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ 
  className,
  compact = false,
  ...props 
}, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      compact ? "p-4 pt-0" : "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
};
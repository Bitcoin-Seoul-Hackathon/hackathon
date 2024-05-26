import { cn } from '@/lib/utils';

export function BoxContainer({
  title,
  subtitle,
  className,
  children,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn([
        'flex flex-col gap-8',
        'p-6 rounded-md bg-white border dark:bg-gray-800',
        className,
      ])}
    >
      {title && <h2 className={'text-lg font-semibold'}>{title}</h2>}
      {subtitle && <h4 className={'text-sm text-subtile'}>{subtitle}</h4>}
      {children}
    </div>
  );
}

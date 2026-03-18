import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  title: string;
  description: string;
};

export function ServicesCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="rounded-xl border border-card bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand/20 text-brand">
          <Icon size={22} />
        </span>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-ink-softer">{description}</p>
    </div>
  );
}

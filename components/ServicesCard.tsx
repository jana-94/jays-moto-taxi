import { IconType } from 'react-icons';

type Props = {
  icon: IconType;
  title: string;
  description: string;
  price: string;
};

export function ServicesCard({ icon: Icon, title, description, price }: Props) {
  return (
    <div className="flex flex-col h-full rounded-2xl border border-card bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-6">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-md">
          <Icon size={30} />
        </span>
      </div>
      <h3 className="text-xl font-bold text-ink mb-3">{title}</h3>
      <p className="text-sm text-ink-softer leading-relaxed mb-6">{description}</p>
      <div className="mt-auto">
        <p className="text-brand font-bold text-lg">{price}</p>
      </div>
    </div>
  );
}

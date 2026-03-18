import Image from 'next/image';
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';

type Props = {
  name: string;
  role: string;
  imageUrl: string;
};

export function TeamCard({ name, role, imageUrl }: Props) {
  return (
    <div className="rounded-xl border border-card bg-card shadow-soft">
      <div className="relative h-56">
        <Image src={imageUrl} alt={name} fill className="object-cover rounded-t-xl" />
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-ink-softer">{role}</p>
        <div className="mt-3 flex gap-3 text-ink-softer">
          <a href="#" aria-label="LinkedIn" className="hover:text-brand">
            <FiLinkedin />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-brand">
            <FiTwitter />
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-brand">
            <FiGithub />
          </a>
        </div>
      </div>
    </div>
  );
}

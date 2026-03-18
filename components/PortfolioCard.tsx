import Image from 'next/image';
import { motion } from 'framer-motion';

type Props = {
  title: string;
  category: string;
  imageUrl: string;
};

export function PortfolioCard({ title, category, imageUrl }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl border border-card bg-card"
    >
      <div className="relative h-56">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition group-hover:opacity-100">
        <span className="text-xs uppercase text-brand">{category}</span>
        <h4 className="mt-1 font-semibold">{title}</h4>
      </div>
    </motion.div>
  );
}

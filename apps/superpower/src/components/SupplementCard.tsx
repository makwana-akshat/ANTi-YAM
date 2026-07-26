
import { motion } from 'framer-motion';

interface SupplementCardProps {
  type: 'green' | 'blue' | 'orange';
  badge: 'Best Seller' | 'Top Price';
  title: string;
  price: string;
}

const GlassOrb = ({ baseClass, shadowClass, coreClass, double = false }: { baseClass: string, shadowClass: string, coreClass: string, double?: boolean }) => (
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Soft ground shadow/glow */}
    <div className={`absolute bottom-2 ${shadowClass} opacity-40 blur-xl rounded-full w-16 h-16`}></div>
    
    {double ? (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Orb 1 */}
        <div className={`absolute left-2 top-4 w-12 h-12 rounded-full bg-gradient-to-br from-white/90 to-transparent backdrop-blur-md shadow-lg border border-white flex items-center justify-center overflow-hidden ${baseClass}`}>
          <div className="absolute top-1 left-2 w-4 h-2 bg-white/80 rounded-full blur-[1px] -rotate-12"></div>
          <div className={`absolute -bottom-1 -right-1 w-8 h-8 ${shadowClass} opacity-60 rounded-full blur-md`}></div>
          <div className={`w-4 h-4 ${coreClass} rounded-full shadow-inner z-10 opacity-90`}></div>
        </div>
        {/* Orb 2 */}
        <div className={`absolute right-2 bottom-4 w-14 h-14 rounded-full bg-gradient-to-br from-white/90 to-transparent backdrop-blur-md shadow-lg border border-white flex items-center justify-center overflow-hidden z-10 ${baseClass}`}>
          <div className="absolute top-1 left-2 w-4 h-2 bg-white/80 rounded-full blur-[1px] -rotate-12"></div>
          <div className={`absolute -bottom-1 -right-1 w-8 h-8 ${shadowClass} opacity-60 rounded-full blur-md`}></div>
          <div className={`w-5 h-5 ${coreClass} rounded-full shadow-inner z-20 opacity-90`}></div>
        </div>
      </div>
    ) : (
      /* Single Glass sphere */
      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br from-white/90 to-transparent backdrop-blur-md shadow-lg border border-white flex items-center justify-center overflow-hidden ${baseClass}`}>
        {/* Inner reflection */}
        <div className="absolute top-2 left-2 w-6 h-3 bg-white/90 rounded-full blur-[2px] -rotate-12"></div>
        {/* Darker bottom shade */}
        <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${shadowClass} opacity-60 rounded-full blur-md`}></div>
        {/* Solid Core */}
        <div className={`w-6 h-6 ${coreClass} rounded-full shadow-inner z-10 opacity-90`}></div>
      </div>
    )}
  </div>
);

export default function SupplementCard({ type, badge, title, price }: SupplementCardProps) {
  const getGraphics = () => {
    switch(type) {
      case 'green':
        return <GlassOrb baseClass="bg-status-green/20" shadowClass="bg-status-green" coreClass="bg-[#2a7a48]" />;
      case 'blue':
        return <GlassOrb baseClass="bg-[#598bf0]/20" shadowClass="bg-[#598bf0]" coreClass="bg-[#3866c2]" double />;
      case 'orange':
        return <GlassOrb baseClass="bg-status-orange/20" shadowClass="bg-status-orange" coreClass="bg-[#c2621f]" />;
    }
  }

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-surface rounded-[32px] p-6 h-[260px] w-[200px] flex flex-col items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border-hairline/20 cursor-pointer snap-start shrink-0"
    >
      <div className="w-full flex justify-start h-6">
        {badge === 'Best Seller' ? (
           <div className="bg-accent-lime text-accent-lime-text text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap">{badge}</div>
        ) : (
           <div className="text-text-tertiary text-[10px] font-medium px-2 py-1">{badge}</div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center w-full my-2">
        {getGraphics()}
      </div>

      <div className="w-full text-center mt-auto">
        <div className="text-text-tertiary text-[10px] font-medium mb-1 truncate px-1">{title}</div>
        <div className="text-text-primary text-[15px] font-semibold">{price}</div>
      </div>
    </motion.div>
  )
}

// import { Send, Youtube, Music } from 'lucide-react'; // Імпортуємо іконки

// export default function SocialLinks() {
//   // Загальні стилі для всіх кнопок: повна ширина, закруглення, відступи, hover
//   const buttonBaseClass = "flex items-center justify-between w-full px-7 py-4 rounded-full text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-150";

//   return (
//     // Колонковий контейнер для кнопок
//     <div className="flex flex-col gap-4 w-full mt-4">
      
//       {/* Telegram button - синій градієнт */}
//       <a 
//         href="#" // Встав посилання на ТГ-канал
//         target="_blank" 
//         rel="noopener noreferrer"
//         className={`${buttonBaseClass} bg-gradient-to-r from-[#2862B8] to-[#3EBAE6]`}>
//         <span>Telegram</span>
//         <Send size={22} className="opacity-80" />
//       </a>

//       {/* YouTube button - червоний градієнт */}
//       <a 
//         href="#" // Встав посилання на Ютуб-канал
//         target="_blank" 
//         rel="noopener noreferrer"
//         className={`${buttonBaseClass} bg-gradient-to-r from-[#870000] to-[#F44444]`}>
//         <span>YouTube</span>
//         <Youtube size={22} className="opacity-80" />
//       </a>

//       {/* TikTok button - темний фон (ближчий до чорного) */}
//       <a 
//         href="#" // Встав посилання на ТікТок
//         target="_blank" 
//         rel="noopener noreferrer"
//         className={`${buttonBaseClass} bg-gradient-to-r from-[#191919] to-[#575353]`}>
//         <span>TikTok</span>
//         <Music size={22} className="opacity-80" /> {/* Іконка Music схожа на TikTok */}
//       </a>

//     </div>
//   );
// }

// Імпортуємо оригінальні логотипи з react-icons
import { FaYoutube, FaTelegramPlane, FaTiktok } from 'react-icons/fa';

export default function SocialLinks() {
  const circleButtonClass = "w-14 h-14 rounded-full bg-[#EBE6DF] text-[#292929] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200";

  return (
    <div className="flex flex-row justify-center gap-6 w-full mt-2 mb-2">
      
      {/* YouTube */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className={circleButtonClass}
      >
        {/* Розмір 28 ідеально підходить для YouTube */}
        <FaYoutube size={28} />
      </a>

      {/* Telegram */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className={circleButtonClass}
      >
        {/* -ml-1 зміщує літачок трохи лівіше, щоб візуально він здавався рівно по центру кола */}
        <FaTelegramPlane size={28} className="-ml-1 pr-0.5" /> 
      </a>

      {/* TikTok */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className={circleButtonClass}
      >
        {/* Лого TikTok зазвичай трохи витягнуте, тому розмір 24 виглядає збалансовано */}
        <FaTiktok size={24} /> 
      </a>

    </div>
  );
}
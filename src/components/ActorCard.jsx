import { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';
import 'swiper/css'; // Базові стилі для каруселі
import { Pagination, Navigation } from 'swiper/modules'; // Імпортуємо модулі
import 'swiper/css/pagination'; // Стилі для крапочок
import 'swiper/css/navigation'; // Стилі для стрілок

export default function ActorCard({ actor, activeMediaId, onMediaPlay }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const videoRefs = useRef([]);

  // Ініціалізація WaveSurfer
  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4b5563', // Сірий колір неактивної хвилі
        progressColor: '#ffffff', // Білий (в стилі ютуба) для програної частини
        height: 40,
        barWidth: 3,
        barGap: 2,
        barRadius: 3,
        cursorWidth: 0,
        url: actor.audioUrl, // Посилання на аудіо з пропсів
      });

      wavesurfer.current.on('finish', () => setIsPlaying(false));
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [actor.audioUrl]);

  // 2. Слідкуємо за тим, чи не увімкнули щось інше
  useEffect(() => {
    // Якщо зараз грає НЕ аудіо цієї картки, ставимо на паузу
    if (activeMediaId !== `audio-${actor.id}` && isPlaying) {
      wavesurfer.current?.pause();
      setIsPlaying(false);
    }
  }, [activeMediaId, isPlaying, actor.id]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (wavesurfer.current) {
      if (!isPlaying) onMediaPlay(`audio-${actor.id}`); 
      wavesurfer.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  // --- НОВА ЛОГІКА ВІДЕО ---

  const handleToggleExpand = () => {
    if (isExpanded) {
      // Якщо закриваємо: ставимо все на паузу і повертаємо повзунок на 1-ше відео
      videoRefs.current.forEach(vid => vid && vid.pause());
      setActiveVideoIndex(0);
    }
    setIsExpanded(!isExpanded);
  };
  
  // Автоплей при розгортанні картки або зміні слайда (свайпі)
  useEffect(() => {
    if (isExpanded) {
      // Ставимо на паузу всі інші відео в ЦІЙ картці
      videoRefs.current.forEach((vid, i) => {
        if (i !== activeVideoIndex && vid) vid.pause();
      });

      // Вмикаємо активне відео
      const currentVideo = videoRefs.current[activeVideoIndex];
      if (currentVideo) {
        currentVideo.play().catch(e => console.log("Autoplay blocked:", e));
      }
    }
  }, [isExpanded, activeVideoIndex]);

  // 3. Правильна взаємодія з Глобальним Пультом
  useEffect(() => {
    // Перевіряємо, чи те, що зараз грає глобально — це відео з ЦІЄЇ картки
    const isMyVideoPlaying = activeMediaId?.startsWith(`video-${actor.id}-`);
    
    // Якщо грає чуже аудіо чи чуже відео — вимикаємо всі свої відео
    if (!isMyVideoPlaying) {
      videoRefs.current.forEach(vid => vid && vid.pause());
    }
  }, [activeMediaId, actor.id]);


  return (
    <div 
      className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 shadow-lg transition-all duration-300"
      onClick={handleToggleExpand}
    >
      {/* --- ВЕРХНЯ ЧАСТИНА (ЗАВЖДИ ВИДИМА) --- */}
      <div className="flex flex-col gap-3 cursor-pointer">
        <div className="flex justify-between items-center">
          <h3 className="text-xl text-white">{actor.name}</h3>
          {isExpanded ? <ChevronUp className="text-white/50" /> : <ChevronDown className="text-white/50" />}
        </div>

        {/* Аудіоплеєр */}
        <div 
          className="flex items-center gap-3 bg-black/40 p-2 rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={togglePlay}
            className="w-10 h-10 flex-shrink-0 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <div ref={waveformRef} className="w-full overflow-hidden" />
        </div>
      </div>

      {/* --- НИЖНЯ ЧАСТИНА (РОЗГОРТАННЯ) --- */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10 cursor-default" onClick={(e) => e.stopPropagation()}>
          <p className="text-white/70 text-sm mb-4 leading-relaxed">
            {actor.description}
          </p>
          
          {/* Карусель з відео */}
          {actor.videos && actor.videos.length > 0 && (
            <Swiper 
              modules={[Pagination, Navigation]}
              spaceBetween={12} 
              slidesPerView={1} // 1.2 показує шматочок наступного відео, підказуючи, що можна свайпати
              pagination={{ clickable: true, dynamicBullets: true }}
              className="w-full"
                style={{
                  "--swiper-pagination-bottom": "0px", // Опускаємо крапки в самий низ (у порожню зону pb-10)
                  "--swiper-pagination-color": "#ffffff", // Колір активної крапки (червоний, як і аудіо)
                  "--swiper-pagination-bullet-inactive-color": "#ffffff", // Колір неактивних крапок (білий)
                  "--swiper-pagination-bullet-inactive-opacity": "0.3", // Прозорість неактивних (30%)
                  "--swiper-pagination-bullet-size": "10px", // Розмір крапок (можеш збільшити, наприклад до 10px)
                }}
                onSlideChange={(swiper) => {
                  const newIndex = swiper.activeIndex;
                  setActiveVideoIndex(newIndex);
                  onMediaPlay(`video-${actor.id}-${newIndex}`); 
                }}
            >
              {actor.videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden relative mb-6">
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      src={video.url} 
                    //   poster={video.poster}
                      loop
                      playsInline 
                      controlsList="nodownload"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={(e) => {
                          const vid = e.target;
                          if (vid.paused) {
                            vid.play();
                            onMediaPlay(`video-${actor.id}-${index}`);
                          } else {
                            vid.pause();
                          }
                        }}
                      onPlay={() => onMediaPlay(`video-${actor.id}-${index}`)}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      )}
    </div>
  );
}
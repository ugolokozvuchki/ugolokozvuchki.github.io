import logo from '../assets/logo.png';

export default function Header() {
  return (
    // Колонковий флекс, елементи по центру items-center text-center
    <header className="flex flex-col gap-3">
      
      {/* Контейнер для логотипу: кругла рамка з білим контуром */}
      <div className="w-30 h-30 rounded-full border-2 border-white/10 p-2 bg-black flex items-center justify-center overflow-hidden">
        <img src={logo} alt="Лого Уголок Озвучки" className="w-full h-auto" />
      </div>

      {/* Малий опис: сірий, малі літери (uppercase) */}
      <p className="text-xs uppercase tracking-[0.3rem] text-white/40 mt-2 font-light">
        Студия звукозаписи
      </p>

      {/* Головна назва: велика, жирна */}
      <h1 className="text-5xl font-light tracking-tight text-white mt-5 mb-5">
        Уголок Озвучки
      </h1>

      {/* Основний опис: середній розмір */}
      <p className="text-md text-white/60 max-w-sm font-light leading-7">
        Мы – команда энтузиастов, которая озвучивает комиксы!
      </p>
    </header>
  );
}
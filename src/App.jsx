import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import ActorList from './components/ActorList';
import patternBg from './assets/pattern.svg';
import { ACTORS_DATA } from './data.js';

function App() {
return (
    // 2. Зовнішній контейнер на весь екран з чорним фоном і нашим паттерном
    <div 
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{
        backgroundColor: '#000000',
        backgroundImage: `url(${patternBg})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '700px' // Можеш змінити це число, щоб зробити візерунок дрібнішим або більшим
      }}
    >
      
      {/* 3. Центральна "картка": темно-сірий фон, великі заокруглення (rounded-[2.5rem]), тінь */}
      <main className="w-full max-w-xl bg-gradient-to-tr from-[#1D1D24]/35 to-[#333340]/50 backdrop-blur-[0.15rem] rounded-[2.25rem] p-6 sm:p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">

        <Header />
        <SocialLinks />
        <ActorList actors={ACTORS_DATA} />

      </main>
    </div>
  );
}

export default App;
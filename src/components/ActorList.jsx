import { useState } from 'react';
import ActorCard from './ActorCard';

export default function ActorList({ actors }) {
  const [activeMediaId, setActiveMediaId] = useState(null);
  
  return (
    <div className="w-full flex flex-col gap-4 mt-6 pb-12">
      <h2 className="text-3xl text-white/90 mb-2 px-2">Наши голоса</h2>
      
      {actors.map((actor) => (
        <ActorCard 
          key={actor.id} 
          actor={actor} 
          activeMediaId={activeMediaId}
          onMediaPlay={setActiveMediaId} 
        />
      ))}
    </div>
  );
}
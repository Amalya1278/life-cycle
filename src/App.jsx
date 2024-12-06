import { useState } from 'react';
import { Timer } from './timer'; 

function App() {
  const [timer, setTimer] = useState([]);

  const renderTime = () => {
    const current = new Date();
    setTimer([
      ...timer,
      {
        id: Date.now(),
        minute: current.getMinutes(),
        seconds: current.getSeconds(),
      },
    ]);
  };

  const handleDelete = (id) => {
    setTimer(timer.filter((item) => item.id !== id));
  };

  return (
    <div className='p-20 w-1/2 mx-auto'>
      <button
        onClick={renderTime}
      >
        create 
      </button>
      {timer.map((item) => (
        <Timer
          key={item.id}
          minute={item.minute}
          seconds={item.seconds}
          id={item.id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default App;

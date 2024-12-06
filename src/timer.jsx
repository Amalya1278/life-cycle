import { useEffect, useState, useRef } from "react";

export const Timer = ({ minute, seconds, id, onDelete }) => {
  const [minutes, setMinutes] = useState(minute);
  const [second, setSecond] = useState(seconds);
  const [working, setWorking] = useState(true);
  const intervalId = useRef(null);//useStatei jnm anyndhat render klini idi popoxmn jamanak

  const start = () => {
    intervalId.current = setInterval(() => {
      setSecond((prevSecond) => {
        let newSecond = prevSecond - 1;
        let newMinute = minutes;

        if (newSecond < 0) {
          newSecond = 59;
          if (newMinute !== 0) {
            newMinute -= 1;
          } else {
            newMinute = 59;
          }
          setMinutes(newMinute);
        }

        return newSecond;
      });
    }, 1000);
  };

  const pause = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
    setWorking(false);
  };

  const Continue = () => {
    start();
    setWorking(true);
  };

  useEffect(() => {
    if (working) {
      start();
    } else {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [working]);

  const handleDelete = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    onDelete(id);
  };

  return (
    <div className="p-4 bg-gray-200 rounded-md shadow-md m-2">
      <h1 className="text-2xl font-bold text-center mb-2">
        {minutes < 10 ? "0" + minutes : minutes}:{second < 10 ? "0" + second : second}
      </h1>
      <div className="flex justify-center gap-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            !working ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={pause}
          disabled={!working}
        >
          Pause
        </button>
        <button
          className={`px-4 py-2 bg-green-500 text-white rounded-md ${
            working ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={Continue}
          disabled={working}
        >
          Continue
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

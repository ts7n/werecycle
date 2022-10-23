import { useState } from 'react';

export default function Game(): JSX.Element {
  const [item, setItem] = useState<number | null>(null);

  return (
    <>
      <div className="flex gap-6">
        <div>
          <p className="font-cursive text-center mt-1 mb-3 text-md text-gray-50">What do you want to recycle?</p>
          <div className="grid gap-2 grid-cols-3">
            <button onClick={() => setItem(1)}>
                <img className={`${item === 1 ? 'border-2 border-white p-1 rounded-xl' : ''} w-48 h-auto`} alt="Plastic water bottle" src="/module1/page6/item1.png" />
            </button>
            <button onClick={() => setItem(2)}>
                <img className={`${item === 2 ? 'border-2 border-white p-1 rounded-xl' : ''} w-48 h-auto`} alt="Socks" src="/module1/page6/item2.png" />
            </button>
            <button onClick={() => setItem(3)}>
                <img className={`${item === 3 ? 'border-2 border-white p-1 rounded-xl' : ''} w-48 h-auto`} alt="Empty egg carton" src="/module1/page6/item3.png" />
            </button>
            <button onClick={() => setItem(4)}>
                <img className={`${item === 4 ? 'border-2 border-white p-1 rounded-xl' : ''} w-48 h-auto`} alt="Cardboard box" src="/module1/page6/item4.png" />
            </button>
            <button onClick={() => setItem(5)}>
                <img className={`${item === 5 ? 'border-2 border-white p-1 rounded-xl' : ''} w-48 h-auto`} alt="Glass bottle" src="/module1/page6/item5.png" />
            </button>
          </div>
        </div>
        {item ? <div>
          <p className="font-cursive text-center mt-1 mb-3 text-md text-gray-50">You could turn that into this!</p>
          {(() => {
            if(item === 1) {
              return <img alt="What you could recycle!" src="/module1/page6/item1.png" />
            } else if(item === 2) {
              return <img alt="What you could recycle!" src="/module1/page6/item2.png" />
            } else if(item === 3) {
              return <img alt="What you could recycle!" src="/module1/page6/item3.png" />
            } else if(item === 4) {
              return <img alt="What you could recycle!" src="/module1/page6/item4.png" />
            } else if(item === 5) {
              return <img alt="What you could recycle!" src="/module1/page6/item5.png" />
            }
          })()}
        </div> : null}
      </div>
    </>
  )
}
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module1({ onComplete }: { onComplete: any }): JSX.Element {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [fading, setFading] = useState(false);

  const nextPage = () => {
    if (page >= 5) {
      setLeaving(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      setFading(true);
      setTimeout(() => {
        setPage(page + 1);
        console.log(page + 1);
      }, 300);
      setTimeout(() => {
        setFading(false);
      }, 500);
    }
  }

  useEffect(() => {
    window.onkeypress = (e) => {
      if(page === 5) return;
      if (e.key === ' ') nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // <-- Game state & logic
  const [hidden, setHidden] = useState<number[]>([]);
  const [selection, setSelection] = useState<number | null>(null);

  const handleSelect = (num: number) => {
    if (selection && String(selection).charAt(0) === String(num).charAt(0) && selection !== num) {
      setHidden([...hidden, selection, num]);
      setSelection(null);
    } else {
      setSelection(num);
    }
  }

  useEffect(() => {
    if(hidden.length === 10) nextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hidden ]);
  // -->

  return (
    <>
      <AnimatePresence>
        {leaving ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
      </AnimatePresence>
      <div className="absolute w-full h-full bg-[url('/public/module1/bg.png')] bg-bottom" />
      <div className="absolute z-10 w-full h-full">
        <Center>
          <div className="w-1/2 h-auto">
            {/* Page Content */}
            <AnimatePresence>
              {!fading ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {(() => {
                  if (page === 1) {
                    return (
                      <>
                        <img alt="Thought bubble asking what recycling is" src="/module1/page1/thought.png" className="" />
                      </>
                    )
                  } else if (page === 2) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Recycling is when someone takes an item you don’t need anymore and finds a new use for it.</h1>
                      </>
                    )
                  } else if (page === 3) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Often you can do an art project to find a new use for an item.</h1>
                      </>
                    )
                  } else if (page === 4) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Otherwise, you can put it in a recycling bin and someone else will give it a second life for you.</h1>
                      </>
                    )
                  } else if (page === 5) {
                    return (
                      <>
                        {/* Game: Match items and what they can turn it into if recycled */}
                        <p className="font-cursive text-center mt-1 mb-4 text-md text-gray-50">Game: match items and what they can turn into if upcycled (turned into something new instead of thrown out).</p>
                        <div className="grid gap-2 grid-cols-4">
                          {!hidden.includes(50) ?
                            <button onClick={() => handleSelect(50)}>
                              <img className={`${selection === 50 ? 'border-2 border-gray-400 rounded-xl' : ''} w-36 h-auto`} alt="Upcycled mason jar" src="/module1/game/item5pair.png" />
                            </button>
                            : null}
                          {!hidden.includes(1) ?
                            <button onClick={() => handleSelect(1)}>
                              <img className={`${selection === 1 ? 'border-2 border-gray-400 rounded-xl' : ''} w-36 h-auto`} alt="Plastic water bottle" src="/module1/game/item1.png" />
                            </button>
                            : null}
                          {!hidden.includes(10) ?
                            <button onClick={() => handleSelect(10)}>
                              <img className={`${selection === 10 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Upcycled water bottle" src="/module1/game/item1pair.png" />
                            </button>
                            : null}
                          {!hidden.includes(2) &&
                            <button onClick={() => handleSelect(2)}>
                              <img className={`${selection === 2 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Socks" src="/module1/game/item2.png" />
                            </button>}
                          {!hidden.includes(3) &&
                            <button onClick={() => handleSelect(3)}>
                              <img className={`${selection === 3 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Empty egg carton" src="/module1/game/item3.png" />
                            </button>}
                          {!hidden.includes(30) ?
                            <button onClick={() => handleSelect(30)}>
                              <img className={`${selection === 30 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Upcycled empty egg carton" src="/module1/game/item3pair.png" />
                            </button>
                            : null}
                          {!hidden.includes(4) &&
                            <button onClick={() => handleSelect(4)}>
                              <img className={`${selection === 4 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Cardboard box" src="/module1/game/item4.png" />
                            </button>}
                          {!hidden.includes(40) ?
                            <button onClick={() => handleSelect(40)}>
                              <img className={`${selection === 40 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Upcycled cardboard box" src="/module1/game/item4pair.png" />
                            </button>
                            : null}
                          {!hidden.includes(20) ?
                            <button onClick={() => handleSelect(20)}>
                              <img className={`${selection === 20 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Upcycled socks" src="/module1/game/item2pair.png" />
                            </button>
                            : null}
                          {!hidden.includes(5) &&
                            <button onClick={() => handleSelect(5)}>
                              <img className={`${selection === 5 ? 'border-2 border-gray-400 rounded-xl' : ''} w-24 h-auto`} alt="Mason jar" src="/module1/game/item5.png" />
                            </button>}
                        </div>
                        <p className="mt-3 font-cursive text-center text-xs text-gray-300">Water bottle: https://foshbottle.com/blogs/fosh/60-ways-to-reuse-plastic-bottles</p>
                        <p className="font-cursive text-center mt-1 text-xs text-gray-300">Socks: https://masandpas.com/sock-puppets/</p>
                        <p className="font-cursive text-center mt-1 text-xs text-gray-300">Egg carton: https://artsycraftsymom.com/egg-carton-crafts-for-kids/#16_Make_an_Egg_Carton_Boat</p>
                        <p className="font-cursive text-center mt-1 text-xs text-gray-300">Cardboard box: https://www.hellowonderful.co/post/10-creative-ways-to-recycle-cardboard-into-kids-crafts/</p>
                        <p className="font-cursive text-center mt-1 text-xs text-gray-300">Mason jar: https://cutediyprojects.com/home-decor/40-awesome-cheap-diy-ways-recycle-mason-jars/</p>
                      </>
                    )
                  }
                })()}
              </motion.div> : null}
            </AnimatePresence>
            {/* Controls */}
            {page !== 5 &&
              <div className="absolute bottom-12 right-12">
                <button
                  id="next-page"
                  type="button"
                  onClick={nextPage}
                  className="font-cursive drop-shadow-lg hover:bg-teal-700 ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
                >
                  Next
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            }
          </div>
        </Center>
      </div>
    </>
  )
}
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module4({ onComplete }: { onComplete: any }): JSX.Element {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [fading, setFading] = useState(false);

  const nextPage = () => {
    if (page === 9) {
      setLeaving(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    } else {
      setFading(true);
      setTimeout(() => {
        setPage(page + 1);
      }, 300);
      setTimeout(() => {
        setFading(false);
      }, 500);
    }
  }

  useEffect(() => {
    window.onkeypress = (e) => {
      if (!(page < 9 || score >= 20)) return;
      if (e.key === ' ') nextPage();
    }
  });

  // Game state & logic
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    if(page === 9) {
      const resetBoard = () => {
        if(score >= 20) nextPage();
        setBoard([ ...Array(20).keys() ].map((i) => {
          const random = Math.floor(Math.random() * 33);
          if(random > 25) {
            return {
              item: random - 25,
              valid: [3, 4, 5, 6, 7].includes(random - 25)
            }
          } else {
            return null;
          }
        }));
        setTimeout(resetBoard, 4500);
      }
      resetBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ]);

  return (
    <>
      <AnimatePresence>
        {leaving ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
      </AnimatePresence>
      <div className="absolute w-full h-full bg-[url('/public/module4/bg.png')] bg-left" />
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
                        <img alt="Thought bubble asking what can I recycle" src="/module4/page1/thought.png" />
                      </>
                    )
                  } else if (page === 2) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">There's a few common materials you can put in recycling bins. If you're ever unsure, you can ask an adult or friend!</h1>
                      </>
                    )
                  } else if (page === 3) {
                    return (
                      <>
                        <img alt="Paper" className="mb-6 rounded-2xl w-full object-cover drop-shadow-xl" src="/module4/page3/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">#1: Paper</h1>
                      </>
                    )
                  } else if (page === 4) {
                    return (
                      <>
                        <img alt="Cardboard" className="mb-6 rounded-2xl h-96 w-full object-cover drop-shadow-xl" src="/module4/page4/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">#2: Cardboard</h1>
                      </>
                    )
                  } else if (page === 5) {
                    return (
                      <>
                        <img alt="Glass" className="mb-6 rounded-2xl h-64 w-full object-cover drop-shadow-xl" src="/module4/page5/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">#3: Glass Containers</h1>
                      </>
                    )
                  } else if (page === 6) {
                    return (
                      <>
                        <img alt="Aluminum" className="mb-6 rounded-2xl h-96 w-full object-cover drop-shadow-xl" src="/module4/page6/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">#4: Aluminum Foil and Aluminum Containers</h1>
                      </>
                    )
                  } else if (page === 7) {
                    return (
                      <>
                        <img alt="Plastic" className="mb-6 rounded-2xl h-96 w-full object-cover drop-shadow-xl" src="/module4/page7/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">#5: Plastic Containers</h1>
                      </>
                    )
                  } else if(page === 8) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Game: Now, test your knowledge by playing whack a mole but you can only hit items that can be recycled. The game will start immediately when you go to the next page.</h1>
                      </>
                    )
                  } else if (page === 9) {
                    return (
                      <>
                        {/* Game: Whack a mole but you can only hit recyclable items */}
                        <h1 className="absolute top-4 right-6 text-xl text-white font-mono font-bold">Score: {score} / 20</h1>
                        <p className="font-cursive text-center mt-1 mb-4 text-md text-gray-50">Game: Click only the items that are recyclable as quick as possible.</p>
                        <div className="grid grid-cols-5">
                          {[ ...Array(20).keys() ].map((i) => {
                            return (
                              <>
                                <button onClick={() => {
                                  if(!board[i]) return;
                                  if(board[i]?.valid) {
                                    setScore(score + 1);
                                  } else {
                                    setScore(score - 1);
                                  }
                                  setBoard(board.map((e, n) => n !== i ? e : null));
                                }} className="w-[130px] h-[130px] rounded-lg">
                                  {board[i] && <img alt="Item" src={`/module4/game/item${board[i].item}.png`} />}
                                </button>
                              </>
                            )
                          })}
                        </div>
                      </>
                    )
                  }
                })()}
              </motion.div> : null}
            </AnimatePresence>
            {/* Controls */}
            {(page < 9 || score >= 20) &&
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
            </div>}
          </div>
        </Center>
      </div>
    </>
  )
}
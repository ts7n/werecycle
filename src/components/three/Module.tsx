import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module3({ onComplete }: { onComplete: any }): JSX.Element {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [fading, setFading] = useState(false);

  const nextPage = () => {
    if (page >= 8) {
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
      if (!(page < 7)) return;
      if (e.key === ' ') nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // Game state & logic
  const [found, setFound] = useState<number[]>([]);

  useEffect(() => {
    if ([ ...new Set(found) ].length === 2) {
      setFound([]);
      nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [found]);

  return (
    <>
      <AnimatePresence>
        {leaving ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
      </AnimatePresence>
      <div className="absolute w-full h-full bg-[url('/public/module3/bg.png')] bg-left" />
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
                        <img alt="Thought bubble asking how to recycle" src="/module3/page1/thought.png" />
                      </>
                    )
                  } else if (page === 2) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">There are three ways to recycle something: reuse it, upcycle it, or put it in a recycling bin.</h1>
                      </>
                    )
                  } else if (page === 3) {
                    return (
                      <>
                        <img alt="A glass of jelly being reused to store other food" className="mb-6 rounded-2xl h-56 w-full object-cover drop-shadow-xl" src="/module3/page3/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">The first way to recycle is reusing something. One example is with a plastic or glass bottle, you can wash it and use it again.</h1>
                      </>
                    )
                  } else if (page === 4) {
                    return (
                      <>
                        <img alt="Someone upcycling tissue paper from a gift" className="mb-6 rounded-2xl h-56 w-full object-cover drop-shadow-xl" src="/module3/page4/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">The second way is to upcycle/find a new purpose for something. An example is taking tissue paper from a gift bag and turning it into paper flowers.</h1>
                      </>
                    )
                  } else if (page === 5) {
                    return (
                      <>
                        <img alt="A recycle bin" className="mb-6 rounded-2xl h-56 w-full object-cover drop-shadow-xl" src="/module3/page5/image.png" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">If there is no way to reuse or repurpose somethihng (or don't have time), you can put it in a recycling bin and it will go to a facility where it is cleaned and processed so it can have a second life.</h1>
                      </>
                    )
                  } else if (page === 6) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Please note that only some materials and items can be put in recycling bins. In the next section you'll learn what those are.</h1>
                      </>
                    )
                  } else if (page === 7) {
                    return (
                      <>
                        {/* Game: Where's Waldo but with recycling bins */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <p className="font-cursive text-center mt-1 mb-4 text-md text-gray-50">Game: Identify (and click) the recycling bins in this picture.</p>
                          <div className="flex justify-center">
                            <button onClick={() => setFound([...found, 0])} className={`${found.includes(0) ? 'bg-green-400/50' : ''} cursor-default z-10 absolute p-3 left-[121px] top-[411px] rounded-full`} />
                            <button onClick={() => setFound([...found, 1])} className={`${found.includes(1) ? 'bg-blue-400/50' : ''} cursor-default z-10 absolute p-3 left-[276px] top-[407px] rounded-full`} />
                            <img alt="City with two recycling bins" className="w-[442px] h-[589.328px] object-cover drop-shadow-xl rounded-2xl" src="/module3/game/img1.png" />
                          </div>
                        </div>
                      </>
                    )
                  } else if (page === 8) {
                    return (
                      <>
                        {/* Game - puzzle #2 */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <p className="font-cursive text-center mt-1 mb-4 text-md text-gray-50">Game: Identify (and click) the recycling bins in this picture.</p>
                          <div className="flex justify-center">
                            <button onClick={() => setFound([...found, 0])} className={`${found.includes(0) ? 'bg-green-400/50' : ''} cursor-default z-10 absolute p-3 left-[51.1px] top-[419px] rounded-full`} />
                            <button onClick={() => setFound([...found, 1])} className={`${found.includes(1) ? 'bg-blue-400/50' : ''} cursor-default z-10 absolute p-4 left-[358px] top-[395px] rounded-full`} />
                            <img alt="City with two recycling bins" className="w-[447.844px] h-[597.125px] object-cover drop-shadow-xl rounded-2xl" src="/module3/game/img2.png" />
                          </div>
                        </div>
                      </>
                    )
                  }
                })()}
              </motion.div> : null}
            </AnimatePresence>
            {/* Controls */}
            {page < 7 &&
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
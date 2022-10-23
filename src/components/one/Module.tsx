import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module1({ onComplete }: { onComplete: any }): JSX.Element {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [fading, setFading] = useState(false);

  const nextPage = () => {
    if (page >= 6) {
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
      if (e.key === ' ') nextPage();
    }
  });

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
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Let’s play a game to see what recycling is like! Match the items and what they can turn into when reused.</h1>
                      </>
                    )
                  } else if (page >= 6) {
                    return (
                      <>
                        {/* Game: Match items and what they can turn it into if recycled */}
                      </>
                    )
                  }
                })()}
              </motion.div> : null}
            </AnimatePresence>
            {/* Controls */}
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
          </div>
        </Center>
      </div>
    </>
  )
}
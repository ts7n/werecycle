import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module2({ onComplete }: { onComplete: any }): JSX.Element {
  const [page, setPage] = useState(1);
  const [leaving, setLeaving] = useState(false);
  const [fading, setFading] = useState(false);

  const nextPage = () => {
    if (page >= 9) {
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
      <div className="absolute w-full h-full bg-[url('/public/module2/bg.png')] bg-left" />
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
                        <img alt="Thought bubble asking why recycling is important" src="/module2/page1/thought.png" />
                      </>
                    )
                  } else if (page === 2) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Recycling has many benefits for our environment, including helping slow climate change.</h1>
                      </>
                    )
                  } else if(page === 3) {
                    return (
                      <>
                        <img alt="A landfill" className="mb-6 rounded-2xl h-56 w-full object-cover drop-shadow-xl" src="/module2/page3/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Recycling prevents waste from going to landfills.</h1>
                      </>
                    )
                  } else if(page === 4) {
                    return (
                      <>
                        <img alt="Air pollution" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page4/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It also prevents air and water pollution.</h1>
                      </>
                    )
                  } else if(page === 5) {
                    return (
                      <>
                        <img alt="Trees" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page5/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It conserves natural resources.</h1>
                      </>
                    )
                  } else if(page === 6) {
                    return (
                      <>
                        <img alt="Telephone wires" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page6/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It conserves energy.</h1>
                      </>
                    )
                  } else if(page === 7) {
                    return (
                      <>
                        <img alt="Telephone wires" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page7/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Finally, it helps the economy by creating jobs and saving money.</h1>
                      </>
                    )
                  } else if(page === 8) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">To summarize, recycling reduces waste going to landfills, prevents air and water pollution, conserves natural resources and energy, and helps the environment.</h1>
                      </>
                    )
                  } else if(page === 9) {
                    return (
                      <>
                        {/* Game: Pick to throw something out or recycle it, and using physics.js show the landfill based on what you choose */}
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
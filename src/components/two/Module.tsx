import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Center from "../Center";

export default function Module2({ onComplete }: { onComplete: any }): JSX.Element {
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
      if(!(page !== 9 || showGameHint)) return;
      if (e.key === ' ') nextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // Game state & logic
  const [showGameHint, setShowGameHint] = useState(false);

  useEffect(() => {
    if (page === 9) {
      const existingCanvas = document.getElementsByTagName('canvas');
      if (existingCanvas.length !== 0) return;

      const Matter = (window as any).Matter;
      const engine = Matter.Engine.create();

      const container = document.getElementById('physics-pit') as HTMLElement;
      if(!container) return;
      
      const render = Matter.Render.create({
        element: container,
        engine: engine,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          background: 'transparent',
          wireframes: false,
          wireframeBackground: 'transparent',
        }
      });

      Matter.Render.run(render);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const canvas = document.getElementsByTagName('canvas')[0];
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      window.onmessage = () => {
        setShowGameHint(true);
        const x = Math.random() * (canvas.width - 90 - 73) + 73;
        const r = Math.random() * 360;
        const obj = Matter.Bodies.rectangle(x, 0, 40, 100, {
          render: {
            sprite: {
              texture: '/module2/game/body.png',
              xScale: 0.2,
              yScale: 0.2,
            }
          }
        });
        Matter.Body.rotate(obj, r);
        Matter.Composite.add(engine.world, obj);
      }

      Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(canvas.width / 2, canvas.height + 30, canvas.width, 15, { isStatic: true, render: { fillStyle: 'rgba(0, 0, 0, 0.5)' } }),
        Matter.Bodies.rectangle(-30, canvas.height / 2, 15, canvas.height, { isStatic: true, render: { fillStyle: 'transparent' } }),
        Matter.Bodies.rectangle(canvas.width + 30, canvas.height / 2, 15, canvas.height, { isStatic: true, render: { fillStyle: 'transparent' } }),
      ]);

      Matter.Composite.add(engine.world, [...Array(50).keys()].map((i) => {
        const x = Math.random() * (canvas.width - 90 - 73) + 73;
        const r = Math.random() * 360;
        const obj = Matter.Bodies.rectangle(x, 0, 40, 100, {
          render: {
            sprite: {
              texture: '/module2/game/body.png',
              xScale: 0.2,
              yScale: 0.2,
            }
          }
        });
        Matter.Body.rotate(obj, r);
        return obj;
      }));

      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      Matter.Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Matter.Render.lookAt(render, {
        min: { x: 73, y: -32 },
        max: { x: canvas.width - 90, y: canvas.height + 32 },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      <AnimatePresence>
        {leaving ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
      </AnimatePresence>
      <div className="absolute w-full h-full bg-[url('/public/module2/bg.png')] bg-left" />
      <div className="absolute z-10 w-full h-full">
        <Center skip={page === 9}>
          <div className={`${page === 9 ? 'w-full h-full' : 'w-1/2 h-auto'}`}>
            {/* Page Content */}
            <AnimatePresence>
              {!fading ? <motion.div className={page === 9 ? 'w-full h-full' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
                  } else if (page === 3) {
                    return (
                      <>
                        <img alt="A landfill" className="mb-6 rounded-2xl h-56 w-full object-cover drop-shadow-xl" src="/module2/page3/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Recycling prevents waste from going to landfills.</h1>
                      </>
                    )
                  } else if (page === 4) {
                    return (
                      <>
                        <img alt="Air pollution" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page4/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It also prevents air and water pollution.</h1>
                      </>
                    )
                  } else if (page === 5) {
                    return (
                      <>
                        <img alt="Trees" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page5/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It conserves natural resources.</h1>
                      </>
                    )
                  } else if (page === 6) {
                    return (
                      <>
                        <img alt="Telephone wires" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page6/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">It conserves energy.</h1>
                      </>
                    )
                  } else if (page === 7) {
                    return (
                      <>
                        <img alt="Telephone wires" className="mb-6 rounded-2xl h-56 w-full object-center object-cover drop-shadow-xl" src="/module2/page7/image.jpg" />
                        <h1 className="font-cursive text-center text-white text-xl font-bold">Finally, it helps the economy by creating jobs and saving money.</h1>
                      </>
                    )
                  } else if (page === 8) {
                    return (
                      <>
                        <h1 className="font-cursive text-center text-white text-xl font-bold">When you throw things out, they go to landfills. These are bad for the environment because they make the temperature of the earth go up, which has unintended side effects.</h1>
                      </>
                    )
                  } else if (page === 9) {
                    return (
                      <>
                        {/* Game: Pick to throw something out or recycle it, and using physics.js show the landfill based on what you choose */}
                        <div className="z-20 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center items-center">
                          <p className="font-cursive text-center mt-1 mb-4 text-md text-gray-50">Game: This is a simulation of a landfill. Press the button to see what happens when you throw something out.</p>
                          <button
                            id="next-page"
                            type="button"
                            onClick={() => window.postMessage(null)}
                            className="font-cursive drop-shadow-lg hover:bg-amber-700 ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-900"
                          >
                            Throw something out
                            <TrashIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                          </button>
                          {showGameHint && <p className="absolute transition duration-200 mt-32 font-cursive text-center mt-1 mb-4 text-md text-gray-50">In here, there are only a few dozen bottles. In the real world there will be millions.</p>}
                        </div>
                        <div id="physics-pit" className="absolute w-full h-full" />
                      </>
                    )
                  }
                })()}
              </motion.div> : null}
            </AnimatePresence>
            {/* Controls */}
            {(page !== 9 || showGameHint) &&
              <div className="absolute bottom-12 right-12">
                <button
                  id="next-page"
                  type="button"
                  onClick={nextPage}
                  className="transition duration-200 font-cursive drop-shadow-lg hover:bg-teal-700 ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
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
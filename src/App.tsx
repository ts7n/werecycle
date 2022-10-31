import './Globals.css';
import './App.css';
import { CheckBadgeIcon, CheckIcon, EnvelopeIcon, IdentificationIcon, LinkIcon, PaperAirplaneIcon, PresentationChartLineIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import Center from './components/Center';
import Module1 from './components/one/Module';
import Module2 from './components/two/Module';
import Module3 from './components/three/Module';
import Module4 from './components/four/Module';
import { auth, database, googleProvider } from './lib/firebase';
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInAnonymously, signInWithEmailLink, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FadeLoader } from 'react-spinners';

function App(): JSX.Element {
  const [module, setModule] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [groupCode, setGroupCode] = useState('');

  const [fading, setFading] = useState(false);
  const [backFading, setBackFading] = useState(false);

  const [showBadge, setShowBadge] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);

  const switchModule = (module: number | string | null, backFade = false) => {
    if (backFade) {
      setBackFading(true);
    } else {
      setFading(true);
    }
    setTimeout(() => {
      setModule(module);
      if (!module) setShowBadge(true);
    }, 500);
    setTimeout(() => {
      setBackFading(false);
      setFading(false);
    }, 1500);
  }

  const ContinuedFadeScreen = () => (
    <AnimatePresence>
      {fading ? <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
    </AnimatePresence>
  )

  useEffect(() => {
    if (module) return;

    (window as any).particlesJS.load('particles', '/particles.json');

    (window as any).tippy('#module1', {
      content: 'What is recycling?'
    });
    (window as any).tippy('#module2', {
      content: 'Why is it important?'
    });
    (window as any).tippy('#module3', {
      content: 'How/where do I recycle?'
    });
    (window as any).tippy('#module4', {
      content: 'What can I recycle?'
    });
  }, [module]);

  useEffect(() => {
    auth.onAuthStateChanged(async (state) => {
      if (state) {
        const data = (await getDoc(doc(database, 'users', state?.uid))).data();
        setUser(data);
      }

      setAuthUser(state);
      setLoading(false);
    });

    if (isSignInWithEmailLink(auth, window.location.href)) {
      const loginEmail = window.localStorage.getItem('loginEmail') as string;
      signInWithEmailLink(auth, loginEmail, window.location.href);
      window.history.pushState(null, '', window.location.href.split('?')[0]);
    }
  }, []);

  if (module === 1) { // What is recycling?
    return (
      <>
        <ContinuedFadeScreen />
        <Module1 onComplete={async () => {
          await updateDoc(doc(database, 'users', authUser.uid), {
            progress: user?.progress + 1
          });
          setUser({ ...user, progress: user?.progress + 1 });
          switchModule(null, true);
        }} />
      </>
    )
  } else if (module === 2) { // Why is it important?
    return (
      <>
        <ContinuedFadeScreen />
        <Module2 onComplete={async () => {
          await updateDoc(doc(database, 'users', authUser.uid), {
            progress: user?.progress + 1
          });
          setUser({ ...user, progress: user?.progress + 1 });
          switchModule(null, true);
        }} />
      </>
    )
  } else if (module === 3) { // How do you recycle?
    return (
      <>
        <ContinuedFadeScreen />
        <Module3 onComplete={async () => {
          await updateDoc(doc(database, 'users', authUser.uid), {
            progress: user?.progress + 1
          });
          setUser({ ...user, progress: user?.progress + 1 });
          switchModule(null, true);
        }} />
      </>
    )
  } else if (module === 4) { // What can you recycle?
    return (
      <>
        <ContinuedFadeScreen />
        <Module4 onComplete={async () => {
          await updateDoc(doc(database, 'users', authUser.uid), {
            progress: user?.progress + 1
          });
          setUser({ ...user, progress: user?.progress + 1 });
          switchModule(null, true);
        }} />
      </>
    )
  } else { // Homepage/lesson selector
    return (
      <>
        <CompletionModal open={showBadge} setOpen={setShowBadge} progress={user?.progress} />
        <CertificateModal open={showCertificate} setOpen={setShowCertificate} user={user} />
        <LoginEmailModal open={showEmailSentModal} setOpen={setShowEmailSentModal} />
        <AnimatePresence>
          {backFading ? <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
          {fading ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="z-30 absolute w-full h-full bg-black transition duration-500" /> : null}
        </AnimatePresence>
        <div className="-z-10 absolute w-full h-full" id="particles" />
        <div className="w-full h-full bg-[url('/public/bg.png')] bg-top">
          <Center>
            {!loading ?
              <div className="w-1/2 h-auto">
                <div className="px-12 py-10 rounded-2xl border-4 border-teal-500 backdrop-blur shadow-2xl shadow-teal-500">
                  <div className="font-cursive text-center">
                    <h1 className="text-3xl text-white font-bold">Learn to recycle!</h1>
                    <p className="mt-1 mb-3 text-md text-gray-50">A fun game to teach kids how to recycle. Complete all 4 modules to earn a certificate!</p>
                    {authUser ? (
                      user ?
                        <div>
                          <div className="flex gap-3 mb-4 w-full justify-center">
                            <button id="module1" onClick={() => {
                              if (user?.progress === 0) {
                                switchModule(1);
                              }
                            }} className="border-gray-300 drop-shadow-xl">
                              <img alt="Icon for Module 1" className={`${user?.progress === 0 ? 'grayscale-0' : 'grayscale'} rounded-lg w-14 h-14`} src="/module1/icon.png" />
                            </button>
                            <button id="module2" onClick={() => {
                              if (user?.progress === 1) {
                                switchModule(2);
                              }
                            }} className="border-gray-300 drop-shadow-xl">
                              <img alt="Icon for Module 2" className={`${user?.progress === 1 ? 'grayscale-0' : 'grayscale'} rounded-lg w-14 h-14`} src="/module2/icon.png" />
                            </button>
                            <button id="module3" onClick={() => {
                              if (user?.progress === 2) {
                                switchModule(3);
                              }
                            }} className="border-gray-300 drop-shadow-xl">
                              <img alt="Icon for Module 3" className={`${user?.progress === 2 ? 'grayscale-0' : 'grayscale'} rounded-lg w-14 h-14`} src="/module3/icon.png" />
                            </button>
                            <button id="module4" onClick={() => {
                              if (user?.progress === 3) {
                                switchModule(4);
                              }
                            }} className="border-gray-300 drop-shadow-xl">
                              <img alt="Icon for Module 4" className={`${user?.progress === 3 ? 'grayscale-0' : 'grayscale'} rounded-lg w-14 h-14`} src="/module4/icon.png" />
                            </button>
                          </div>
                          <button
                            id="get-certificate"
                            type="button"
                            onClick={() => { if (user?.progress === 4) setShowCertificate(true) }}
                            disabled={user?.progress !== 4}
                            className={`${user?.progress === 4 ? 'hover:bg-teal-700 ripple' : ''} transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900`}
                          >
                            {
                              user?.progress === 4 ? <>
                                <CheckBadgeIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                                Get your certificate!
                              </> : <>
                                <PresentationChartLineIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                                Progress to certificate: {user?.progress}/4
                              </>
                            }
                          </button>
                        </div> : <div>
                          <div>
                            <label htmlFor="name" className="text-left block text-sm font-medium text-gray-400">
                              Your Name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                className="transition duration-200 text-white bg-teal-900/30 block w-full rounded-md border-teal-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                placeholder="John Doe"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <label htmlFor="group-code" className="text-left block text-sm font-medium text-gray-400">
                              Group Code (Optional)
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="group-code"
                                id="group-code"
                                onChange={(e) => setGroupCode(e.target.value)}
                                className="transition duration-200 text-white bg-teal-900/30 block w-full rounded-md border-teal-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                                placeholder="123456"
                              />
                              <p className="text-left mt-2 text-xs text-gray-400" id="group-code-description">
                                A teacher or parent may provide this so they can track your progress.
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={async () => {
                              if (!name) return alert('Your account name is required to play. Feel free to choose a pseudonym if you\'re uncomfortable providing one.');

                              if (groupCode) {
                                const group = (await getDoc(doc(database, 'groups', groupCode))).data();
                                if (!group) return alert('That group does not exist. Please double check the code!');
                              }

                              await setDoc(doc(database, 'users', authUser.uid), {
                                name,
                                groupId: groupCode || null,
                                progress: 0,
                              });

                              setUser({
                                name,
                                groupId: groupCode || null,
                                progress: 0,
                              });
                            }}
                            className="mt-3 flex justify-center ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
                          >
                            <CheckIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                            Save and Continue
                          </button>
                        </div>
                    ) : <div>
                      <div>
                        <label htmlFor="email" className="text-left block text-sm font-medium text-gray-400">
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="transition duration-200 text-white bg-teal-900/30 block w-full rounded-md border-teal-700 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center mt-3 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            window.localStorage.setItem('loginEmail', email);
                            sendSignInLinkToEmail(auth, email, {
                              url: 'http://127.0.0.1:3000',
                              handleCodeInApp: true
                            }).then(console.log).catch(console.error);
                            setShowEmailSentModal(true);
                          }}
                          className="ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
                        >
                          <EnvelopeIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                          Email Link
                        </button>

                        <button
                          type="button"
                          onClick={() => signInWithPopup(auth, googleProvider)}
                          className="ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
                        >
                          <LinkIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                          Use Google
                        </button>

                        <button
                          type="button"
                          onClick={() => signInAnonymously(auth)}
                          className="ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900"
                        >
                          <XMarkIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                          Play Signed Out
                        </button>
                      </div>
                    </div>}
                  </div>
                </div>
                {user &&
                <div className="relative z-20 m-2 font-cursive text-gray-400">
                  <button onClick={() => {
                    signOut(auth);
                    window.location.reload();
                  }} className="cursor-pointer text-gray-300 mr-1">Log out</button> • <a href="/manage" className="text-gray-300 mr-1">Progress Tracking</a>
                </div>}
              </div> : <FadeLoader className="ml-12" color="#14b8a6" />}
          </Center>
        </div>
      </>
    )
  }
}

export function CompletionModal({ open, setOpen, progress }: { open: boolean, setOpen: any, progress: number }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 backdrop-blur bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="border-2 border-teal-500 relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="border-2 border-teal-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-700">
                    <CheckIcon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-cursive font-medium leading-6 text-gray-300">
                      Good job!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="font-cursive text-sm text-gray-400">
                        You completed the module. You're {progress}/4 done!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="font-cursive ripple transition duration-200 inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export function CertificateModal({ open, setOpen, user }: { open: boolean, setOpen: any, user: any }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 backdrop-blur bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="border-2 border-teal-500 relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="border-2 border-teal-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-700">
                    <TrophyIcon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-cursive font-medium leading-6 text-gray-300">
                      Congratulations!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="font-cursive text-sm text-gray-400">
                        You completed the game and learned all about recycling. You can now generate and download your certificate. Please be patient as this process may take a few seconds!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="ripple transition duration-200 inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 sm:text-sm"
                    onClick={() => {
                      window.location.href = `https://us-central1-werecycle-d5675.cloudfunctions.net/generateCertificate?name=${encodeURIComponent(user.name)}`;
                      setOpen(false);
                    }}
                  >
                    Generate
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export function LoginEmailModal({ open, setOpen }: { open: boolean, setOpen: any }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => { }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800 backdrop-blur bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="border-2 border-teal-500 relative transform overflow-hidden rounded-lg bg-gray-700 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="border-2 border-teal-500 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-700">
                    <PaperAirplaneIcon className="h-6 w-6 text-teal-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="font-cursive text-lg font-medium leading-6 text-gray-300">
                      We sent you an email!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="font-cursive text-sm text-gray-400">
                        Please click the link attached on this device to finish signing in. If you do not see the email, check your Junk/Spam folder.
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default App;
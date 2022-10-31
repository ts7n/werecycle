import './Globals.css';
import './Admin.css';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowRightOnRectangleIcon, BackwardIcon, Bars3Icon, BellIcon, EllipsisVerticalIcon, ExclamationTriangleIcon, EyeIcon, PlusIcon, UserCircleIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, database } from './lib/firebase';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { FadeLoader } from 'react-spinners';

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Admin(): JSX.Element {
  const [module, setModule] = useState<number | string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [authUser, setAuthUser] = useState<any>(null);
  const [group, setGroup] = useState<any>(null);
  const [groups, setGroups] = useState<any>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    (window as any).tippy('#back-button', {
      content: 'Back to App'
    });

    auth.onAuthStateChanged(async (state) => {
      if (!state) return window.location.href = '/';

      const data = (await getDoc(doc(database, 'users', state?.uid))).data();
      if (!data) return window.location.href = '/';

      const groupQuery = query(collection(database, 'groups'), where('authorId', '==', state.uid));
      setGroups((await getDocs(groupQuery)).docs.map((doc) => { return { ...doc.data(), id: doc.id } }));

      setUser(data);
      setAuthUser(state);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <CreateModal open={showCreateModal} setOpen={setShowCreateModal} setGroups={setGroups} authUser={authUser} />
      <div className="min-h-full">
        <div className="bg-teal-900 pb-32">
          <Disclosure as="nav" className="bg-teal-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div>
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src="/logo.png"
                            alt="WeRecycle Logo"
                          />
                        </div>
                        <div className="hidden md:block">
                          {/* <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            ))}
                          </div> */}
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* Profile dropdown */}
                          <a href="/" id="back-button" className="flex max-w-xs items-center rounded-full bg-teal-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2 focus:ring-offset-teal-800">
                            <span className="sr-only">Back to app</span>
                            <ArrowUturnLeftIcon className="text-teal-400 h-6 w-6" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="font-cursive text-3xl font-bold tracking-tight text-white">Progress Tracking</h1>
            </div>
          </header>
        </div>

        <main className="-mt-32 h-full">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="h-[27.5rem] rounded-lg bg-gray-700 px-8 py-6 shadow border-2 border-gray-900">
              {!loading ? <>
                {group ? <div>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="mt-2 font-cursive text-xl font-bold text-gray-300">Showing Group: {group.name}</h1>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGroup(null)}
                      className="font-cursive ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900 drop-shadow-xl"
                    >
                      <ArrowLeftIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                      Back
                    </button>
                  </div>
                  <h3 className="mt-1 font-cursive text-md font-bold text-gray-400">Invite Code: {group.id}</h3>

                  <div className="relative">
                    <div className="my-3 absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-600" />
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-4">
                    {group.members.sort((a: any, b: any) => b.progress - a.progress).map((member: any) => {
                      return (
                        <div className="font-cursive text-gray-500">
                          <span className="font-bold text-gray-400 mr-1">{member.name}</span> • <span className="text-gray-400 ml-1">{member.progress} / 4</span>
                        </div>
                      )
                    })}
                  </div>
                </div> : <div>
                  <div className="flex justify-between">
                    <h1 className="mt-2 font-cursive text-xl font-bold text-gray-300">Your groups ({groups.length})</h1>
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(true)}
                      className="font-cursive ripple transition duration-200 inline-flex items-center rounded-md border border-transparent bg-teal-600 hover:bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-teal-900 drop-shadow-xl"
                    >
                      <PlusIcon className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
                      Create
                    </button>
                  </div>

                  {groups.length === 0 &&
                    <div className="mt-10 text-center border-dashed">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                      </svg>

                      <h3 className="font-cursive mt-2 text-sm font-medium text-gray-400">No groups found</h3>
                      <p className="font-cursive mt-1 text-sm text-gray-500">Groups let you track the progress of your children or students.</p>
                    </div>
                  }

                  <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                    {groups.map((group: any, idx: number) => (
                      <li key={idx} onClick={async () => {
                        const members = (await getDocs(query(collection(database, 'users'), where('groupId', '==', group.id)))).docs.map((doc) => doc.data());
                        setGroup({ ...group, members });
                      }} className="cursor-pointer drop-shadow-lg col-span-1 flex rounded-md shadow-sm">
                        <div
                          className="font-cursive bg-teal-600 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                        >
                          {group.name.split(' ').map((word: string) => word.charAt(0)).join('')}
                        </div>
                        <div className="flex flex-1 items-center justify-between truncate rounded-r-md bg-gray-800">
                          <div className="flex-1 truncate px-4 py-2 text-sm">
                            <span className="font-cursive font-bold text-gray-400">
                              {group.name}
                            </span>
                            <p className="font-cursive text-gray-500">Code: {group.id}</p>
                          </div>
                          <div className="flex-shrink-0 pr-4 text-gray-400">
                            <span className="sr-only">Show group</span>
                            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>}
              </> : <FadeLoader color="14b8a6" />
              }
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}

export function CreateModal({ open, setOpen, setGroups, authUser }: { open: boolean, setOpen: any, setGroups: any, authUser: any }) {
  const [name, setName] = useState('');
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <Dialog.Panel className="bg-gray-700 relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-700 sm:mx-0 sm:h-10 sm:w-10">
                      <UserGroupIcon className="h-6 w-6 text-teal-500" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="font-cursive text-lg font-medium leading-6 text-gray-300">
                        Create group
                      </Dialog.Title>
                      <div className="mt-1">
                        <p className="font-cursive text-sm text-gray-400">
                          You'll get a 6-digit code that you can share with people. When they sign up, they can join the group using this.
                        </p>
                      </div>

                      <div className="mt-2 font-cursive">
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            className="transition duration-200 text-white bg-gray-900/30 block w-full rounded-md border-gray-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                            placeholder="Group Name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#2e3644] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="font-cursive ripple transition duration-200 inline-flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-[#2e3644] sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={async () => {
                      if (!name) return alert('Please provide a name/label for your group.');

                      let id = '';
                      for (let i = 0; i < 6; i++) {
                        id += '0123456789'.charAt(Math.floor(Math.random() * 10));
                      }

                      const existing = (await getDoc(doc(database, 'groups', id))).data();
                      if (existing) return alert('Sorry, there was a problem generating an ID for your group. Please try again.');

                      await setDoc(doc(database, 'groups', id), {
                        authorId: authUser.uid,
                        name,
                      });

                      const groupQuery = query(collection(database, 'groups'), where('authorId', '==', authUser.uid));
                      setGroups((await getDocs(groupQuery)).docs.map((doc) => { return { ...doc.data(), id: doc.id } }));

                      setOpen(false);
                    }}
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    className="font-cursive ripple transition duration-200 mt-3 inline-flex w-full justify-center rounded-md border border-gray-700 bg-gray-700 px-4 py-2 text-base font-medium text-gray-400 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#2e3644] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
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
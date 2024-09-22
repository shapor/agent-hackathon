import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
// import PipeIcon from '../assets/PipeIcon';
// import DuctIcon from '../assets/DuctIcon';
import agents from '../assets/agents.jpg';
// pipe
const navigation = [
//   { name: 'Pipe Submittal', href: '/pipe-submittal', icon: PipeIcon, count: '5' },
//   { name: 'Duct Submittal', href: '/duct-submittal', icon: DuctIcon },
  // { name: 'Projects', href: '/projects', icon: FolderIcon, count: '12' },
  { name: 'Calendar', href: '/calendar', icon: CalendarIcon, count: '20+' },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', href: '/reports', icon: ChartPieIcon },
];
// team
const teams = [
  { id: 1, name: 'Heroicons', href: '/team/heroicons', initial: 'H' },
  { id: 2, name: 'Tailwind Labs', href: '/team/tailwind-labs', initial: 'T' },
  { id: 3, name: 'Workcation', href: '/team/workcation', initial: 'W' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [currentMenuItem, setCurrentMenuItem] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = navigation.find(item => item.href === currentPath);
    setCurrentMenuItem(activeMenuItem ? activeMenuItem.name : '');
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-64 bg-gray-900 px-6">
      <div className="flex h-16 shrink-0 items-center mb-6 mt-6 px-12">
        <img
          className="h-14 w-auto"
         src={agents}
          alt="Your Company"

          // className="rounded-md bg-indigo-600 mb-6 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

        />
      </div>
      <div className="min-w-0">
        <h2 className="text-2xl mb-2  font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
          2331046
        </h2>
      </div>
      <div className="min-w-0">
        <h2 className="text-sm font-medium text-gray-400 hover:text-gray-200">
          SLE ASC Expansion and Renovation
        </h2>
      </div>
      <button
        type="button"
        className="rounded-md bg-indigo-600 mb-6 mt-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Change Project
      </button>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={classNames(
                      currentMenuItem === item.name
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    )}
                    onClick={() => setCurrentMenuItem(item.name)}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                    {item.count ? (
                      <span
                        className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-900 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-gray-700"
                        aria-hidden="true"
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <Link
                    to={team.href}
                    className={classNames(
                      currentMenuItem === team.name
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    )}
                    onClick={() => setCurrentMenuItem(team.name)}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <Link
              to="/profile"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-800"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
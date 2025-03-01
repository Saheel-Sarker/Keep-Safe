'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LockOpen, Notebook, Settings, User, LogOut, CreditCard, Users, Crown } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import { motion } from 'framer-motion';

export default function Sidebar({showPricing, setShowPricing}) {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);
  const {logout, user} = useAuthStore();
  const name = user?.name;
  const initial = name ? name.charAt(0).toUpperCase() : '';
  const router = useRouter();

  async function handleSignout(e){
    e.preventDefault();
    await logout();
    router.push('/');
  }
  function logoutDisplay() {
    return showLogout && (
      <div>
      <Tooltip id="logout-tooltip" place="top" effect="solid" />
      <motion.div
      data-tooltip-id="logout-tooltip"
      data-tooltip-content='Logout'
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 mb-4"
      onClick={handleSignout}
      >
      <LogOut className="w-5 h-5 text-white" />
      </motion.div>
      </div>
    );
  }

  return (
    <nav className='px-6 bg-gray-950 text-white w-64 h-screen flex flex-col items-start shadow-lg'>
      {/* Logo and Title */}
      <div className='flex items-center pt-10 mx-auto'>
        <img src='/GuyPasscode.svg' alt='hacker illustration' className='h-14 mr-3' />
        <h1 className='text-5xl font-serif text-white'>keepr</h1>
      </div>

      <div className="w-full h-px bg-white my-4 opacity-50"></div>

      {/* Navigation Links */}
      <ul className='w-full pt-10 px-4'>
        {[{ href: '/dashboard/passwords', label: 'Passwords', Icon: LockOpen },
          { href: '/dashboard/notes', label: 'Notes', Icon: Notebook },
          { href: '/dashboard/cards', label: 'Cards', Icon: CreditCard },
          { href: '/dashboard/identities', label: 'Identities', Icon: Users},
        ].map(({ href, label, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center space-x-3 cursor-pointer px-4 py-2 text-slate-300 relative
                ${pathname === href ? 'border-l-4 border-red-700 text-white' : 'hover:border-l-4 hover:border-red-900'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${pathname === href ? 'bg-red-900': 'bg-red-950'}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
 
      <div className='mt-auto pb-16 w-full pt-10 px-8'>
        {logoutDisplay()}
        <div className='flex items-center'>
          <div
            className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600"
            onClick={() => setShowLogout(!showLogout)}
            data-tooltip-id="user-tooltip"
            data-tooltip-content={name}>
            <span className="text-white font-semibold text-xl">{initial}</span>
          </div>
          <span className="ml-3 text-white">{name}</span>
          <Tooltip id="user-tooltip" place="top" effect="solid" />
        </div>
        <div className='flex items-center mt-4'>
          <div
            className="w-10 h-10 bg-violet-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-600"
            onClick={() => setShowPricing(!showPricing)}
            data-tooltip-id="user-tooltip"
            data-tooltip-content={'upgrade plan'}>
            <Crown className="w-5 h-5"></Crown>
          </div>
          <Tooltip id="user-tooltip" place="top" effect="solid" />
        </div>
        
      </div>
    </nav>
  );
}

import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import { CartButton, Container, SearchInput } from './';
import { cn } from '@/shared/lib/utils';

interface Props {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
  return (
    <header className={className}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        { hasSearch && 
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        }

        { hasCart &&
          <div className='flex items-center gap-2'>
            <CartButton />
          </div>
        }
      </Container>
    </header>
  )
}
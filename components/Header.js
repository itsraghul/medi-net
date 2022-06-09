import React from 'react';
import { Menu } from 'semantic-ui-react';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <Menu style={{ marginTop: '15px' }}>
        <Link href="/">
          <a
            className="item"
            style={{ fontSize: '1.3rem', fontWeight: 'bold' }}
          >
            MediNet{' '}
          </a>
        </Link>

        <Menu.Menu position="right">
          <Link href="/medical-records">
            <a
              className="item"
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Patient
            </a>
          </Link>
          <Link href="/network">
            <a
              className="item"
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Network
            </a>
          </Link>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Header;

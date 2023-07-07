import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { profile } from '../assets/icons';
import { Button, Dropdown } from 'antd';

export const AccountInfo = () => {
    const { token, onLogout } = useAuth();

    if (!token) {
        return (
            <Link to="/login" className="btn-sign-in">
                {profile}
                <span>Sign in</span>
            </Link>
        );
    }

    const user = JSON.parse(atob(token));

    const onClick = ({ key }) => {
        switch(key) {
            case 'logout': 
                onLogout();
                break
            default:
        }
    };

    const items = [
        {
          key: 'logout',
          label: (
            <span>
                Logout
            </span>
          ),
        },
      ];

    return (
        <Dropdown
            menu={{
                items,
                onClick
            }}
            placement="bottomLeft"
        >
            <Button icon={profile()}>
                <span>{user.username}</span>
            </Button>
        </Dropdown>
    );
};

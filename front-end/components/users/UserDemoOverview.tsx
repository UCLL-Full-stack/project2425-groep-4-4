
import { useRouter } from 'next/router';
import React from 'react';

const UserDemoOverview: React.FC = () => {
    const router = useRouter();
  const users = [
    {
      role: 'admin',
      voornaam: "Admin",
      achternaam: "Admin",
      email: "admin@cinema.com",
      password: 'admin123',
    },
    {
      role: 'regisseur',
      voornaam: "Christopher",
      achternaam: "Nolan",
      email: "Christopher.Nolan@example.com",
      password: 'password123',
    },
    {
      role: 'user',
      voornaam: "Jane",
      achternaam: "Smith",
      email: "jane.smith@example.com",
      password: 'password123',
    },
  ];

  return (
    <div className='center users-table'>
      <h2 className='center-text'>Gebruikers Tabel</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid white', padding: '8px' }}>fullname</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Wachtwoord</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Role</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
                <td style={{ border: '1px solid white', padding: '8px' }}>{`${user.voornaam} ${user.achternaam}`}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{user.email}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{user.password}</td>
                <td style={{ border: '1px solid white', padding: '8px' }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDemoOverview;

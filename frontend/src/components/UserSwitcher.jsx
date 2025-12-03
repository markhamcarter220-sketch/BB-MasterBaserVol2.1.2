import React from 'react';

export default function UserSwitcher({ userId, setUserId }) {
  const users = ['demo_user', 'bettor42', 'sharpsharp', 'risk_mgmt'];

  return (
    <div style={{ marginBottom: 10 }}>
      <label htmlFor="user">👤 User:&nbsp;</label>
      <select id="user" value={userId} onChange={(e) => setUserId(e.target.value)}>
        {users.map(u => <option key={u} value={u}>{u}</option>)}
      </select>
    </div>
  );
}

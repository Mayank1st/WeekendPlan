import React from 'react';
import UserSidebar from '../../../components/UserSidebar'; // Adjust the path as needed
import UserProfileEdit from './UpdateProfile';
    
function UserProfileSetting() {
  return (
    <UserSidebar>
      <UserProfileEdit />
    </UserSidebar>
  );
}

export default UserProfileSetting;

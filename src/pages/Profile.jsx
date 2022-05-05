import Container from '@mui/material/Container';
import { useState } from 'react';
import EditProfileContent from '../components/EditProfileContent';
import ProfileContent from '../components/ProfileContent';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <Container component="main" maxWidth="m">
      {isEditing ? (
        <EditProfileContent isEditing={isEditing} toggleEdit={toggleEdit} />
      ) : (
        <ProfileContent isEditing={isEditing} toggleEdit={toggleEdit} />
      )}
    </Container>
  );
}

export default Profile;

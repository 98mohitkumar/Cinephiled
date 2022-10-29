import { Fragment } from 'react';
import { LoginButton, LoginText } from './ProfileStyles';

const Profile = ({ loggedIn, loginHandler }) => {
  return (
    <Fragment>
      {!loggedIn ? (
        <div className='text-center'>
          <LoginText className='fw-bold text-center d-block mb-3'>
            Login in to view profile
          </LoginText>

          <LoginButton className='m-auto' onClick={loginHandler}>
            Login with TMDb
          </LoginButton>
        </div>
      ) : (
        <p>test</p>
      )}
    </Fragment>
  );
};

export default Profile;

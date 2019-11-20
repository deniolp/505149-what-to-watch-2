import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Avatar = (props) => {
  const {user} = props;

  return <div className="user-block">
    <div className="user-block__avatar">
      <Link
        to="/favorites"
        style={{
          color: `#dfcf77`,
          textDecoration: `none`,
        }}
      >{!user.avatarUrl ?
          <p>
            Sign in
          </p> : <img
            src={`https://htmlacademy-react-2.appspot.com${user.avatarUrl}`}
            alt="User avatar" width="63" height="63"
          />}
      </Link>
    </div>
  </div>;
};

Avatar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default Avatar;

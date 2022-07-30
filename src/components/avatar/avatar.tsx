import * as React from 'react';
import {Link} from 'react-router-dom';

import {User} from "../../types";

interface Props {
  user: User;
}

const Avatar = (props: Props): React.SFC => {
  const {user} = props;

  return <div className="user-block">
    <div className="user-block__avatar">
      <Link
        to="/mylist"
        style={{
          color: `#dfcf77`,
          textDecoration: `none`,
        }}
      >{!user.avatarUrl ?
          <p>
            Sign in
          </p> : <img
            src={user.avatarUrl}
            alt="User avatar" width="63" height="63"
          />}
      </Link>
    </div>
  </div>;
};

export default React.memo(Avatar);

import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function SignIn() {
  return (
    <section className='section-SignIn'>
      <div className='container-SignIn'>
        <div className='container-title-SignIn'>
          <FontAwesomeIcon icon={faCircleUser} className='icon-SignIn' />
          <h1 className='title-SignI'>Sign In</h1>
        </div>
        <form>
          <label for='username' className='label-SignIn'>
            Username
          </label>
          <input type='text' id='username' className='input-SignIn' />
          <label for='password' className='label-SignIn'>
            Password
          </label>
          <input type='text' id='password' className='input-SignIn' />
          <input type='checkbox' id='remenber' />
          <label for='remenber' className='label-remenber-SignIn'>
            Remenber me
          </label>
        </form>

        <Link to='/User'>
          <button type='submit' className='btn-submit-SignIn'>
            Sign In
          </button>
        </Link>
      </div>
    </section>
  );
}

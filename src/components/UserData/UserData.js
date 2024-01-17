import { useEffect, useState } from 'react';
//import userimg from './assets/userimage.png';
import Loader from './loader/loader';
import './UserData.css';

function UserData(){
	const [isLoading, setLoader] = useState(false);
	const [user, setUser] = useState({});

	async function getUser(){
		setLoader(true);
		try{
				const response = await fetch('https://random-data-api.com/api/users/random_user?size=1');
				const output = await response.json();
				setUser(output[0]);
		}catch(err){
				console.log("Error in loading user-data: ", err);
		}
		setLoader(false);
  }

  useEffect(()=>{
	   getUser();
  }, []);

	function handleSubmit(){
		getUser();
	}

  return (
	<div>
		{
		isLoading ? <Loader/> : 
		 (
			<div className='user-container'>

		      <div className='image-container'>
			       <img src={user.avatar} alt='userimg'/>
		      </div>

		      <div className='user-details'>
						<div>
			          <div>Name: {`${user.first_name} ${user.last_name}`} </div>
			          <div>Email: {user.email}</div>
			          <div>Sex: {user.gender}</div>
			          <div>Job: {user?.employment?.title}</div>
		        </div>

					  <div>
						    <button onClick={handleSubmit}>Next {`>>`} </button>
					  </div>
					</div>

	    </div>
		 )
	}
	</div>
	)
}

export default UserData;
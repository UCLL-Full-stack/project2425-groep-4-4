import { Acteur, ActeurInput, Film, UserInput, UserLogin } from '@/types';
import { UserInfo } from 'os';

const getAllUsers = async () => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const role = loggedInUser ? JSON.parse(loggedInUser).role : null;
  if (role !== 'admin') {
    throw new Error('You are not authorized to view all users');
  }
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/getAll', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const getUserById = async (id: number) => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/' + id, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
  });
  return response;
};

const createUser = async (user: UserInput) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
  return response;
}

const loginUser = (user: UserLogin) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const UserService = {
    loginUser,
    getAllUsers,
    getUserById,
    createUser
};

export default UserService;

  
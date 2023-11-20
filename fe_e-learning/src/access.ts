/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import jwt_decode from 'jwt-decode';

export default function access() {
  const accessToken = localStorage.getItem('user_accessToken');
  let role;
  if (accessToken) {
    const decode = jwt_decode(accessToken || '') as any;
    role = decode?.resource_access['e-learning-client'].roles;
  }

  return {
    canAdmin: role && role.includes('ADMIN'),
    canStudent: role && role.includes('STUDENT') && !role.includes('TEACHER'),
    canTeacher: role && role.includes('TEACHER'),
  };
}

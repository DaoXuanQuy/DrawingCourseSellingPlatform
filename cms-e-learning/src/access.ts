/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
import jwt_decode from 'jwt-decode';

export default function access() {
  const accessToken = localStorage.getItem('accessToken');
  let role;
  if (accessToken) {
    const decode = jwt_decode(accessToken || '') as any;
    role = decode?.resource_access['e-learning-client'].roles;
  }

  return {
    canRootAdmin: role && role.includes('ROOT_ADMIN'),
    canAdmin: role && (role.includes('ADMIN') || role.includes('ROOT_ADMIN')),
    canStudent: role && role.includes('STUDENT'),
    canTeacher: role && role.includes('TEACHER'),
  };
}

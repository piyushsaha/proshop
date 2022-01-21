import bcryptjs from 'bcryptjs';

const users = [
    { name: 'Admin', email: 'admin@proshop.com', password: bcryptjs.hashSync('password'), isAdmin: true },
    { name: 'Piyush Saha', email: 'piyush@example.com', password: bcryptjs.hashSync('password')},
    { name: 'John Doe', email: 'john@exmaple.com', password: bcryptjs.hashSync('password')}
];

export default users;
export class Token {

set(token) {
    localStorage.setItem('token', `Bearer ${token}`);
};

get(){
return localStorage.getItem('token');
};

remove(){
    return localStorage.removeItem('token');
}
}

const token = new Token();

export default token;
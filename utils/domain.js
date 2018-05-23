const host = process.env.NODE_ENV === '' ? '106.14.125.126' : 'http://localhost:3000/';

console.log(host);

const domain = {
	host:process.env.NODE_ENV === '' ? '106.14.125.126' : 'http://localhost:3000/'
}
export default domain;
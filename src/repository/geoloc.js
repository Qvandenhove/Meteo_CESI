export default{
    async getCity(latitude, longitude){
        const request = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`);
        return request.json()
    }
}